window.addEventListener("load", () => {
    todoListApp();
});

function todoListApp() {
    /* Get List From LocalStorage */
    function getList() {
        const list = localStorage.getItem("todoList");

        if (list) {
            return JSON.parse(list);
        } else {
            return [];
        }
    }

    /* Render todo list data */
    function renderList() {
        const list = getList();

        checkInput();

        const listContainer = document.querySelector(".todo__list");

        console.log("list", list);

        /* Clear all list before add new */
        listContainer.innerHTML = "";

        for (let item of list) {
            const itemTemplate = `
                <div class="todo__item mb-2">
                    <input type="checkbox" class="" />
                    <span class="item__text ml-2">${item}</span>
                    <a href="#" class="removeButton ml-4 text-red-600 float-right">Delete</a>
                </div>
            `;

            listContainer.innerHTML += itemTemplate;
        }
    }
    renderList();

    /* Add new todo item */
    function addNewItem() {
        const input = document.getElementById("todoInput"),
            buttonAdd = document.getElementById("addTaskButton");

        buttonAdd.addEventListener("click", (e) => {
            e.preventDefault();

            const list = getList();

            if (!input.value) return;

            localStorage.setItem(
                "todoList",
                JSON.stringify([...list, input.value])
            );

            input.value = "";

            renderList();
            checkInput();
        });
    }
    addNewItem();

    /*  Remove todo item */
    function removeItem() {
        const listContainer = document.querySelector(".todo__list");

        listContainer.addEventListener("click", (e) => {
            e.preventDefault();

            if (e.target.classList.contains("removeButton")) {
                const list = getList();

                const itemParent = e.target.closest(".todo__item"),
                    itemText =
                        itemParent.querySelector(".item__text").innerText;

                const newList = list.filter(
                    (currentItem) => currentItem.trim() !== itemText.trim()
                );

                localStorage.setItem("todoList", JSON.stringify(newList));

                renderList();
                checkInput();
            }
        });
    }
    removeItem();

    function checkInput() {
        const input = document.getElementById("todoInput"),
            buttonAdd = document.getElementById("addTaskButton");

        if (input.value === "") {
            buttonAdd.classList.add("disabled");
        } else {
            buttonAdd.classList.remove("disabled");
        }
    }

    function onChangeInput() {
        const input = document.getElementById("todoInput");

        input.addEventListener("input", () => {
            checkInput();
        });
    }

    onChangeInput();
}
