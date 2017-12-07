var tasklist = [
  {
    text: "Throw the garbage",
    done: "true"
  },
  {
    text: "Brush my teeth",
    done: "false"
  }
];

function Task(text) {
  this.text = text;
  this.done = false;
}

window.onload = function() {
  var heading = document.querySelector(".heading");
  var inp = document.querySelector(".input-field");
  var hint = document.querySelector(".hint");
  var todoList = document.querySelector(".todo-list");
  var resBtn = document.querySelector(".reset");
  var count = 0;
  var itemsArr = [];
  // Saves array to local storage
  function saveArrToLocalStor(arr) {
    if (arr.length) {
      for (let i = 0; i < arr.length; i++) {
        localStorage.setItem(i, arr[i]);
      }
    }
  }
  // Creates array from local storage items
  function getArrFromLocalStor() {
    inp.focus();
    let arr = [];
    if (localStorage.length !== 0) {
      for (var i = 0; i < localStorage.length; i++) {
        arr.push(localStorage.getItem(i));
      }
      return arr;
    }
    return arr;
  }
  // Creates tasks by combining data with HTML template
  function createTask(number, taskText) {
    return (
      '<div class="task-body">' +
      '<input type="checkbox" class="checkbox">' +
      '<span class="task-number">' +
      number +
      ". " +
      "</span>" +
      '<span class="task-text">' +
      taskText +
      "</span>" +
      "</div>" +
      '<button class="rem-btn">' +
      "&#215" +
      "</button>"
    );
  }
  // Adds task to the page
  function addTask(taskText) {
    let newItem = document.createElement("div");
    newItem.className = "item";
    newItem.innerHTML = taskText;
    todoList.appendChild(newItem);
  }
  // Loads all tasks when application loads
  function loadAllTasks(arr) {
    if (arr.length) {
      for (var i = 0; i < arr.length; i++) {
        count = i;
        addTask(createTask(count + 1, arr[i]));
      }
    }
  }

  itemsArr = getArrFromLocalStor();

  loadAllTasks(itemsArr);
  // Hides header and shows reset button if tasklist is not empty
  if (todoList.innerHTML !== "") {
    inp.style = "margin-top: 0";
    resBtn.style = "display: block;";
    heading.style = "display: none;";
    hint.style = "display: none;";
  }
  // Allows user to add tasks by hitting 'Enter' key
  inp.addEventListener("keydown", function(e) {
    // Check if the input field is no empty
    // before display hint to user
    inp.value
      ? (hint.style = "display: block;")
    : (hint.style = "display: none;");
    // Check is pressed key == 'Enter' key
    if (e.keyCode == 13 && inp.value && inp.value !== " ") {
      // Adds to tasks counter
      count++;
      //creates task from input data
      let currentTask = createTask(count, inp.value);
      // Adds task to the task-list
      addTask(currentTask);
      // Stores new task to the tasks array
      itemsArr.push(inp.value);
      // Stores tasks array to the local storage
      saveArrToLocalStor(itemsArr);
      // Cleares the input field
      inp.value = "";
      // Conditional for the animations (should be rewritten)
      if (todoList.innerHTML !== "") {
        inp.style = "margin-top: 0";
        resBtn.style = "display: block;";
        heading.style = "display: none;";
        hint.style = "display: none;";
      }
    }
  });
  // Reset button logic
  resBtn.addEventListener("click", function() {
    itemsArr = [];
    localStorage.clear();
    todoList.innerHTML = "";
    count = 0;
    if (todoList.innerHTML === "") {
      inp.style = "margin-top: 15%";
      inp.focus();
      resBtn.style = "display: none;";
      heading.style = "display: block;";
    }
  });
  // Listening to events
  document.querySelector("body").addEventListener("click", function(event) {
    if (event.target.classList.contains("checkbox")) {
      event.target.parentNode.parentNode.classList.toggle("done");
    }
    inp.focus();
  });

  document.querySelector("body").addEventListener("click", function(event) {
    if (event.target.classList.contains("rem-btn")) {
      event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    }
    inp.focus();
  });
};
