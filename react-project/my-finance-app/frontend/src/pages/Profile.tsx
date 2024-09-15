// Profile.tsx
import React from "react";

const Profile: React.FC = () => {
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatar: "https://via.placeholder.com/150", // תמונה לדוגמה
  };

  return (
    <div>
      <h1>User Profile</h1>
      <div className="profile-details">
        <img
          src={user.avatar}
          alt={`${user.name}'s avatar`}
          className="avatar"
        />
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        {/* תוכל להוסיף עוד פרטים או רכיבים כאן */}
      </div>
    </div>
  );
};

export default Profile;
