const userForm = document.getElementById("userForm");
const userIdInput = document.getElementById("userId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const userTableBody = document.querySelector("#userTable tbody");

async function loadUsers() {
  const res = await fetch("/users");
  const users = await res.json();
  userTableBody.innerHTML = "";
  users.forEach((u) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${u.id}</td>
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td>${u.age}</td>
      <td>
        <button onclick="editUser(${u.id}, '${u.name}', '${u.email}', ${u.age})">Edit</button>
        <button onclick="deleteUser(${u.id})">Hapus</button>
      </td>
    `;
    userTableBody.appendChild(tr);
  });
}

userForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = userIdInput.value;
  const user = {
    name: nameInput.value,
    email: emailInput.value,
    age: parseInt(ageInput.value, 10),
  };
  let url = "/users",
    method = "POST";
  if (id) {
    url = `/users/${id}`;
    method = "PUT";
  }

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (res.ok) {
    resetForm();
    loadUsers();
  } else {
    alert("Error simpan user");
  }
});

function editUser(id, name, email, age) {
  userIdInput.value = id;
  nameInput.value = name;
  emailInput.value = email;
  ageInput.value = age;
  submitBtn.textContent = "Update User";
  cancelBtn.style.display = "inline";
}

async function deleteUser(id) {
  if (confirm("Yakin hapus user ini?")) {
    const res = await fetch(`/users/${id}`, { method: "DELETE" });
    if (res.ok) loadUsers();
  }
}

cancelBtn.addEventListener("click", resetForm);
function resetForm() {
  userIdInput.value = "";
  nameInput.value = "";
  emailInput.value = "";
  ageInput.value = "";
  submitBtn.textContent = "Tambah User";
  cancelBtn.style.display = "none";
}

loadUsers();
