const userForm = document.getElementById('userForm');
const userIdInput = document.getElementById('userId');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const userTableBody = document.querySelector('#userTable tbody');

const API_URL = 'http://54.166.153.221:3000/';

// Fungsi untuk memuat semua user
async function loadUsers() {
    try {
        const response = await fetch(API_URL);
        const users = await response.json();
        userTableBody.innerHTML = ''; // Kosongkan tabel sebelum memuat ulang

        users.forEach(user => {
            const row = userTableBody.insertRow();
            row.insertCell(0).textContent = user.id;
            row.insertCell(1).textContent = user.name;
            row.insertCell(2).textContent = user.email;
            row.insertCell(3).textContent = user.age;

            const actionsCell = row.insertCell(4);
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'edit-btn';
            editButton.onclick = () => editUser(user);
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Hapus';
            deleteButton.className = 'delete-btn';
            deleteButton.onclick = () => deleteUser(user.id);
            actionsCell.appendChild(deleteButton);
        });
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

// Fungsi untuk menambah/mengupdate user
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = userIdInput.value;
    const name = nameInput.value;
    const email = emailInput.value;
    const age = parseInt(ageInput.value);

    const userData = { id, name, email, age };

    try {
        let response;
        if (id) {
            // Update user
            response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
        } else {
            // Add new user
            response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
        }

        if (response.ok) {
            userForm.reset();
            userIdInput.value = '';
            submitBtn.textContent = 'Tambah User';
            cancelBtn.style.display = 'none';
            loadUsers(); // Muat ulang daftar user
        } else {
            const errorData = await response.json();
            alert('Gagal menyimpan user: ' + errorData.message);
        }
    } catch (error) {
        console.error('Error saving user:', error);
        alert('Terjadi kesalahan saat menyimpan user.');
    }
});

// Fungsi untuk mengisi form saat mengedit user
function editUser(user) {
    userIdInput.value = user.id;
    nameInput.value = user.name;
    emailInput.value = user.email;
    ageInput.value = user.age;
    submitBtn.textContent = 'Update User';
    cancelBtn.style.display = 'inline-block';
}

// Fungsi untuk membatalkan mode edit
cancelBtn.addEventListener('click', () => {
    userForm.reset();
    userIdInput.value = '';
    submitBtn.textContent = 'Tambah User';
    cancelBtn.style.display = 'none';
});

// Fungsi untuk menghapus user
async function deleteUser(id) {
    if (confirm('Apakah Anda yakin ingin menghapus user ini?')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                loadUsers(); // Muat ulang daftar user
            } else {
                const errorData = await response.json();
                alert('Gagal menghapus user: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Terjadi kesalahan saat menghapus user.');
        }
    }
}

// Muat user saat halaman pertama kali dibuka
document.addEventListener('DOMContentLoaded', loadUsers);