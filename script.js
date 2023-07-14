data = [];
let id;
const inputTask = document.getElementById("inputTask");
const listTask = document.getElementById("listTask");

fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Request failed"); // Handle non-200 HTTP status codes
    }
    return response.json(); // Parse response body as JSON
  })
  .then((d) => {
    // Process the array data
    data = d;
    id = d.length + 1;
    render();
  })
  .catch((error) => {
    // Handle any errors that occurred during the request
    console.log("Error:", error.message);
  });

function render() {
  while (listTask.firstChild) listTask.firstChild.remove();

  for (let i = 0; i < data.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = "title: " + data[i].title + "  " + "id: " + data[i].id;
    li.className = data[i].id;
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    listTask.appendChild(li);
  }
}

function add() {
  if (inputTask.value === "") {
    alert("Please enter a task.");
  } else {
    data.push({ title: inputTask.value, id: id });
    id++;
    inputTask.value = "";
    render();
  }
}

listTask.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "SPAN") {
      let id = e.target.parentElement.className;
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          data.splice(i, 1);
          break;
        }
      }
      render();
    }
  },
  false
);
