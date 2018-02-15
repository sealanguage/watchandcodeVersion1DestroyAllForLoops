/* global deleteTodoPositionInput     
*/
//  watchandcodeVersion10ClickToDelete - all but the last video of the section working. 
//  The last code bits do not work from the last video here - deleteTodos function(position), and 
//  the last line, handlers.deleteTodo(parseInt(elementClicked.parentNode.id));

 
// adding objects instead of text to t o d o list
//  Loops have 3 parts - initialization; condition; final-expression
var todoList = {
    todos: [],
        
    addTodo: function(todoText) { 
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    changeTodo: function(position, todoText) {
        //this.todos[position] = newValue;
        this.todos[position].todoText = todoText;
    },
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
    },
    toggleCompleted: function(position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    toggleAll: function() {
        var totalTodos = this.todos.length;
        var completedTodos = 0;
        
        // get number of completed todos
        // for (var i = 0; i < totalTodos; i++) {
        //     if (this.todos[i].completed === true) {
        //     completedTodos++;
        //     }
        // }
        
        //  use callback function to replace the for loops - get number of completed todos
        // iterate over all the items in completed todos array
        this.todos.forEach(function(todo) {
            if (todo.completed === true) {
                completedTodos++;
            }
        });
        
        
    //     // case 1 if everything is true, make everything false
    //   if (completedTodos === totalTodos) {
    //         //make everything false
    //     //     for (var i = 0; i < totalTodos; i++) {
    //     //       this.todos[i].completed = false;
    //     // }
        
    //     this.todos.forEach(function(t odo) {
    //         t odo.completed === false;
    //     });
    //         //case 2 otherwise make everything true
    //         } else {
    //         //     for (var i = 0; i < totalTodos; i++) {
    //         //         this.todos[i].completed = true;
    //         //     }
    //         // }
    //         this.todos.forEach(function(t odo) {
    //             t odo.completed === true;
    //         });
        
    //     }
    
    //above code refactored to be simpler:
        this.todos.forEach(function(todo) {
            // case 1 if everything true, make everything false
                if (completedTodos === totalTodos) {
                    todo.completed = false;
                // case 2 otherwise make everthing true
                } else {
                    todo.completed = true;
                }
        })
        
    }
};


// REFACTORED CODE:
var handlers = {
    // we deleted this button because it's not needed - all displays are on the other buttons now
    // displayTodos: function() {
    // todoList.displayTodos()
    // },
    addTodo: function() { 
        var addTodoTextInput = document.getElementById("addTodoTextInput");
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = "";
        view.displayTodos();    // every one of these handlers changes data so displaying it proves it was changed
    },
    changeTodo: function() {
        var changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
        var changeTodoTextInput = document.getElementById("changeTodoTextInput");
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoPositionInput.value = "";
        changeTodoTextInput.value = "";
        view.displayTodos();    // every one of these handlers changes data so displaying it proves it was changed
    },
    deleteTodo: function(position) {
        //var deleteTodoPositionInput = document.getElementById("deleteTodoPositionInput");
        // todoList.deleteTodo(deleteTodoPosiitonInput.valueAsNumber);
        todoList.deleteTodo(position);
        //deleteTodoPositionInput.value = "";
        view.displayTodos();    // every one of these handlers changes data so displaying it proves it was changed
    },
    toggleCompleted: function() {
        var toggleCompletedPositionInput = document.getElementById("toggleCompletedPositionInput");
        todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
        toggleCompletedPositionInput.value = "";
        view.displayTodos();    // every one of these handlers changes data so displaying it proves it was changed
    },
    toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();   // every one of these handlers changes data so displaying it proves it was changed
    }
};
// view is responsible for what the user sees. does not change any data
var view = {
    displayTodos: function() {
        var todosUl = document.querySelector('ul');
        todosUl.innerHTML = '';
        // for (var i = 0; i < todoList.todos.length; i++) {
        //     var todoLi = document.createElement('li');
        //     var t odo = todoList.todos[i];
            
        //         // this is what we are trying to accomplish
        //         // '(x)' todoText
        //         // var todoTextWithCompletion = '';
        //         //if t odo.completed === true)
        //             // (x) todoText
        //         //else
        //             // ( ) todoText
        //         //todoLi.textContent = todoTextWithCompletion
            
        //     var todoTextWithCompletion = '';
        //     if (t odo.completed === true) {
        //         todoTextWithCompletion = '(x) ' + t odo.todoText;
        //     } else {
        //         todoTextWithCompletion = '( ) ' + t odo.todoText;
        //     }
            
        //     //  making i equal to each item in the array
        //     todoLi.id = i;
        //     todoLi.textContent = todoTextWithCompletion;
        //     //  append delete button to t odo(Li)
        //     todoLi.appendChild(this.createDeleteButton());
        //     todosUl.appendChild(todoLi);
        // }
        
        todoList.todos.forEach(function(todo, position) {
            var todoLi = document.createElement('li');
            var todoTextWithCompletion = '';
            if (todo.completed === true) {
                todoTextWithCompletion = '(x) ' + todo.todoText;
            } else {
                todoTextWithCompletion = '( ) ' + todo.todoText;
            }
            
            todoLi.id = position;
            todoLi.textContent = todoTextWithCompletion;
            //  append delete button to t odo(Li)
            todoLi.appendChild(this.createDeleteButton());
            todosUl.appendChild(todoLi);
            
        }, this);
    },
    createDeleteButton: function() {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        return deleteButton;
    },
    //  this is event delegation, look for event on the parent object (ul) 
    setUpEventListeners: function() {
        //  create event listener on the ul to allow delete buttons to remo
        //  putting event listener on ul and looking for which li delete button works on
        var todosUl = document.querySelector('ul');
        // function(event) is a callback function passes in an event object
        todosUl.addEventListener('click', function(event) {
            //console.log(event.target.parentNode.id);
            // get element that was clicked on, event.target is the item clicked
            var elementClicked = event.target;
            //check if element clicked is a delete button
            if (elementClicked.className === 'deleteButton');
                //run handlers.deleteTodo
                //parseInt turns string into number
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            
        });   
    }
};

view.setUpEventListeners();