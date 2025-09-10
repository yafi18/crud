const userForm = document.getElementById("userForm");
const userIdInput = document.getElementById("userId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const userTableBody = document.querySelector("#userTable tbody");

const apiUrl = "https://Bahlil-env.eba-pdweuxce.us-east-1.elasticbeanstalk.com i";


async function loadUsers() {
  try {
    const res = await fetch("/users");
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    const users = data.users || data; // Handle both new and old response formats
    
    userTableBody.innerHTML = "";
    
    if (users.length === 0) {
      userTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No users found</td></tr>';
      return;
    }
    
    users.forEach((u) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${u.id}</td>
        <td>${escapeHtml(u.name)}</td>
        <td>${escapeHtml(u.email)}</td>
        <td>${u.age}</td>
        <td>
          <button onclick="editUser(${u.id}, '${escapeHtml(u.name)}', '${escapeHtml(u.email)}', ${u.age})" class="edit-btn">Edit</button>
          <button onclick="deleteUser(${u.id})" class="delete-btn">Hapus</button>
        </td>
      `;
      userTableBody.appendChild(tr);
    });
  } catch (error) {
    console.error('Error loading users:', error);
    userTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: red;">Error loading users. Please try again.</td></tr>';
  }
}

// Helper function to escape HTML to prevent XSS
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.toString().replace(/[&<>"']/g, function(m) { return map[m]; });
}

userForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const submitButton = document.getElementById('submitBtn');
  const originalText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = 'Saving...';
  
  try {
    const id = userIdInput.value;
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const age = parseInt(ageInput.value, 10);
    
    // Client-side validation
    if (!name || !email || !age) {
      alert('Please fill in all fields');
      return;
    }
    
    if (age < 0 || age > 150) {
      alert('Age must be between 0 and 150');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please provide a valid email address');
      return;
    }
    
    const user = {
      name: name,
      email: email,
      age: age,
    };
    
    let url = "/users";
    let method = "POST";
    if (id) {
      url = `/users/${id}`;
      method = "PUT";
    }

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const responseData = await res.json();
    
    if (res.ok) {
      resetForm();
      loadUsers();
      alert(responseData.message || 'User saved successfully');
    } else {
      alert(responseData.message || 'Error saving user');
    }
  } catch (error) {
    console.error('Error saving user:', error);
    alert('Network error. Please check your connection and try again.');
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
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
  if (confirm("Are you sure you want to delete this user?")) {
    try {
      const res = await fetch(`/users/${id}`, { method: "DELETE" });
      const responseData = await res.json();
      
      if (res.ok) {
        loadUsers();
        alert(responseData.message || 'User deleted successfully');
      } else {
        alert(responseData.message || 'Error deleting user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Network error. Please check your connection and try again.');
    }
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
