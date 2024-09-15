const Transaction = require('../models/Transaction');

const getProgressDataFromDatabase = async () => {
  try {
    const startOfYear = new Date();
    startOfYear.setMonth(0); // ינואר
    startOfYear.setDate(1);
    startOfYear.setHours(0, 0, 0, 0);

    const endOfYear = new Date(startOfYear);
    endOfYear.setFullYear(endOfYear.getFullYear() + 1);

    const transactions = await Transaction.aggregate([
      {
        $match: {
          date: { $gte: startOfYear, $lt: endOfYear }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          income: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
            }
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
            }
          }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      },
      {
        $project: {
          name: { $concat: [{ $toString: "$_id.month" }, "/", { $toString: "$_id.year" }] },
          income: 1,
          expense: 1
        }
      }
    ]);

    return transactions;
  } catch (error) {
    console.error("Error fetching progress data:", error);
    throw error;
  }
};

module.exports = { getProgressDataFromDatabase };
