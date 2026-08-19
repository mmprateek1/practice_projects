// ================================
// GET HTML ELEMENTS
// ================================

const todoInput = document.getElementById("todoInput");

const addTodoButton = document.getElementById("addTodo");

const todoList = document.getElementById("todoList");

const allButton = document.getElementById("allBtn");

const activeButton = document.getElementById("activeBtn");

const completedButton = document.getElementById("completedBtn");

const taskCount = document.getElementById("taskCount");


// ================================
// TODO DATA
// ================================

// Get saved todos from localStorage

let todos = JSON.parse(localStorage.getItem("todos")) || [];


// Current filter

let currentFilter = "all";


// ================================
// ADD TODO
// ================================

function addTodo() {

    // Get input value

    const text = todoInput.value.trim();


    // Don't add empty task

    if (text === "") {

        alert("Please enter a task.");

        return;
    }


    // Create todo object

    const todo = {

        id: Date.now(),

        text: text,

        completed: false

    };


    // Add todo to array

    todos.push(todo);


    // Save todos

    saveTodos();


    // Clear input

    todoInput.value = "";


    // Display todos

    renderTodos();

}


// ================================
// SAVE TODOS
// ================================

function saveTodos() {

    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );

}


// ================================
// DISPLAY TODOS
// ================================

function renderTodos() {

    // Clear current list

    todoList.innerHTML = "";


    // Filter todos

    let filteredTodos = todos;


    if (currentFilter === "active") {

        filteredTodos = todos.filter(function(todo) {

            return todo.completed === false;

        });

    }


    if (currentFilter === "completed") {

        filteredTodos = todos.filter(function(todo) {

            return todo.completed === true;

        });

    }


    // Display each todo

    filteredTodos.forEach(function(todo) {

        // Create list item

        const li = document.createElement("li");

        li.classList.add("todo-item");


        // Create checkbox

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = todo.completed;


        // Create text

        const span = document.createElement("span");

        span.classList.add("todo-text");

        span.textContent = todo.text;


        // Add completed class

        if (todo.completed) {

            span.classList.add("completed");

        }


        // Create edit button

        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.classList.add("edit-btn");


        // Create delete button

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.classList.add("delete-btn");


        // Add everything to li

        li.appendChild(checkbox);

        li.appendChild(span);

        li.appendChild(editButton);

        li.appendChild(deleteButton);


        // Add li to list

        todoList.appendChild(li);


        // ================================
        // COMPLETE TODO
        // ================================

        checkbox.addEventListener("change", function() {

            todo.completed = checkbox.checked;

            saveTodos();

            renderTodos();

        });


        // ================================
        // EDIT TODO
        // ================================

        editButton.addEventListener("click", function() {

            const newText = prompt(
                "Edit your task:",
                todo.text
            );


            // User clicked Cancel

            if (newText === null) {

                return;

            }


            const updatedText = newText.trim();


            // Don't allow empty text

            if (updatedText === "") {

                alert("Task cannot be empty.");

                return;

            }


            // Update todo

            todo.text = updatedText;


            // Save

            saveTodos();


            // Display again

            renderTodos();

        });


        // ================================
        // DELETE TODO
        // ================================

        deleteButton.addEventListener("click", function() {

            const confirmDelete = confirm(
                "Are you sure you want to delete this task?"
            );


            if (!confirmDelete) {

                return;

            }


            // Remove todo

            todos = todos.filter(function(item) {

                return item.id !== todo.id;

            });


            // Save

            saveTodos();


            // Display again

            renderTodos();

        });

    });


    // Update task count

    updateTaskCount();

}


// ================================
// TASK COUNT
// ================================

function updateTaskCount() {

    const remainingTasks = todos.filter(function(todo) {

        return todo.completed === false;

    });


    const count = remainingTasks.length;


    if (count === 1) {

        taskCount.textContent = "1 task remaining";

    } else {

        taskCount.textContent = count + " tasks remaining";

    }

}


// ================================
// FILTER: ALL
// ================================

allButton.addEventListener("click", function() {

    currentFilter = "all";

    renderTodos();

});


// ================================
// FILTER: ACTIVE
// ================================

activeButton.addEventListener("click", function() {

    currentFilter = "active";

    renderTodos();

});


// ================================
// FILTER: COMPLETED
// ================================

completedButton.addEventListener("click", function() {

    currentFilter = "completed";

    renderTodos();

});


// ================================
// ADD TODO BUTTON
// ================================

addTodoButton.addEventListener("click", function() {

    addTodo();

});


// ================================
// PRESS ENTER TO ADD
// ================================

todoInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTodo();

    }

});


// ================================
// INITIAL LOAD
// ================================

// Display saved todos when page opens

renderTodos();