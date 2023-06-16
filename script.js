window.addEventListener("load", () => {
  let form = document.getElementById("form-id");

  let table = document.getElementById("table-id");


  table.style.visibility = "hidden";

  form.addEventListener("submit", generate);

  table.addEventListener("click", buttonTableClick);

});

let id = 0;

let message = document.getElementById("msg");

function generate(event) {
  event.preventDefault();
  let task = document.getElementById("task-id").value;
  let table = document.getElementById("table-id");
  let form = document.getElementById("form-id");
  table.style.visibility = "visible";

  if (task.length === 0) {
    alert("Merci de renseigner les champs demandés");
    table.style.visibility = "hidden";
  } else {
    let td_task = document.createElement("td");
    td_task.textContent = task.toUpperCase();

    let editBtn = document.createElement("td");
    editBtn.innerHTML =
      `<button class='edit-btn'>Edit</button><button class='done-btn'>Done</button>`;

    let tr = document.createElement("tr");
    tr.setAttribute("id", ++id);
    td_task.setAttribute("id", id);
    td_task.setAttribute("class", "task");

    tr.appendChild(td_task);
    tr.appendChild(editBtn);
    table.appendChild(tr);

    form.reset();
  }
}

function displayMsg(deleteRow, editRow, nonEdit) {
  message.style.visibility = "visible";

  if (deleteRow) {
    message.innerHTML =
      "<div class='alert alert-success' role='alert' style=font-weight:bolder;>Task done</div>";
  } else if (editRow) {
    message.innerHTML =
      "<div class='alert alert-primary' role='alert'style=font-weight:bolder;>Task edited</div>";
  } else if (nonEdit) {
    message.innerHTML =
      "<div class='alert alert-primary' role='alert'style=font-weight:bolder;>Task was not edited</div>";
  }

  setTimeout(function () {
    message.style.visibility = "hidden";
  }, 1500);

  setTimeout(function () {
    message.classList.add("fade-out");
  }, 1000);

  setTimeout(function () {
    message.style.visibility = "hidden";
    message.classList.remove("fade-out");
  }, 1500);
}

function buttonTableClick(event) {
  let target = event.target;
  // DELETE 

  if (target.classList.contains("done-btn")) {
    
    let btnEdit = target.parentNode.querySelector(".edit-btn");
    let btnDone = target;

    
    let row = target.closest("tr");

    row.classList.add("clignoter");
   
    setTimeout(function () {
      row.classList.remove("clignoter");
    }, 1200);



    row.classList.add("done-row");

    btnEdit.style.visibility = "hidden";
    btnDone.style.visibility = "hidden";


    let message = document.getElementById("msg");
    message.style.visibility = "visible";

    displayMsg(true, false, false);
  }

  // EDIT

  if (target.classList.contains("edit-btn")) {
    let cell = target.closest("td");
    let row = cell.parentNode;
    let newTask = prompt("What is your new task ?");
    message.style.visibility = "visible";

    row.classList.add("clignoter");

    if (newTask) {
      let TaskNameCell = row.querySelector(".task");

      TaskNameCell.textContent = newTask.toUpperCase();

      displayMsg(false, true, false);

      setTimeout(function () {
        row.classList.remove("clignoter");
      }, 1200);
    } else {
      displayMsg(false, false, true);
    }
  }
}


