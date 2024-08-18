const inputItemElement = document.querySelector(".input-box-item");
const inputAmountElement = document.querySelector(".input-box-amount");
const btnAddElement = document.querySelector('.btn-add');
const btnDeleteAllElement = document.querySelector(".btn-delete-all");
const listConatinerElement = document.querySelector('.list-container');

function addItem() {
    if (!inputItemElement.value || inputAmountElement.value === "") {
        alert("add item and amount")
    } else {
        const liElement = document.createElement("li");
        liElement.className = "list-item";
        liElement.innerHTML = `${inputItemElement.value} X${inputAmountElement.value}`;
        listConatinerElement.appendChild(liElement);

        const spanElement = document.createElement("span");
        spanElement.classList = "btn-delete";
        spanElement.innerHTML = "X";
        liElement.appendChild(spanElement);

        inputItemElement.value = "";
        inputAmountElement.value = "";

        localStorage.setItem("shoppingList", listConatinerElement.innerHTML);
        checkItemsExist();
    }
}

function handleDeleteAll() {
    const response = window.confirm('Are you sure you want to delete all?');

    if (response) {
        localStorage.removeItem("shoppingList");
        listConatinerElement.innerHTML = "";
        checkItemsExist();
    }
}

function checkItemsExist() {
    const items = localStorage.getItem("shoppingList");
    if (items) {
        btnDeleteAllElement.classList.remove("none");
    } else {
        btnDeleteAllElement.classList.add("none");
    }
}

listConatinerElement.addEventListener("click", (e) => {
    if (e.target.classList.contains("list-item")) {
        e.target.classList.toggle("checked")
    } else if (e.target.classList.contains("btn-delete")) {
        e.target.parentElement.remove();
        localStorage.setItem("shoppingList", listConatinerElement.innerHTML);
        checkItemsExist();
    }
})

btnAddElement.addEventListener("click", addItem);

btnDeleteAllElement.addEventListener("click", handleDeleteAll)

window.addEventListener("load", () => {
    const savedList = localStorage.getItem("shoppingList");
    checkItemsExist();
    if (savedList) {
        listConatinerElement.innerHTML = savedList;
    }
})