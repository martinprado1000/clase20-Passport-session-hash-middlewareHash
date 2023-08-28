const socket = io();
console.log(socket);

const submitForm = document.getElementById("formUser");
const btnRegister = document.getElementById("btnRegister");
const name = document.getElementById("name");
const lastname = document.getElementById("lastname");
const age = document.getElementById("age");
const email = document.getElementById("email");
const password = document.getElementById("password");

submitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    name: name.value,
    lastname: lastname.value,
    age: age.value,
    email: email.value,
    password: password.value,
  };
  //console.log(data);
  socket.emit("regiterUser", data);
});

socket.on("registerUser", (response) => {
  console.log(response);
  const user = JSON.parse(response);
  Swal.fire({
    title: `${user.data}`,
    icon: "success", // succes , warning , info , question
    timer: 3000,
    timerProgressBar: true,
  });
  name.value = "";
  lastname.value = "";
  age.value = "";
  email.value = "";
  password.value = "";
  setTimeout(() => {
    window.location.href = "http://localhost:8080/login";
  }, 3000);
});

socket.on("errorRegister", (e) => {
  const error = JSON.parse(e);
  console.log(error.data);
  Swal.fire({
    title: "Error",
    text: `${error.data}`,
    icon: "error", // succes , warning , info , question
  });
});
