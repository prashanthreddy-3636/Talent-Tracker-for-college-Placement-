let students = JSON.parse(localStorage.getItem('students')) || [];

// Handle adding students (on add-student.html)
const form = document.getElementById('studentForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const dept = document.getElementById('dept').value.trim();
    const status = document.getElementById('status').value;
    if (name && dept) {
      const student = { id: Date.now(), name, dept, status };
      students.push(student);
      localStorage.setItem('students', JSON.stringify(students));
      alert('✅ Student Added Successfully!');
      form.reset();
    }
  });
}

// Handle displaying students (on view-students.html)
const tableBody = document.querySelector('#studentTable tbody');
const filterStatus = document.getElementById('filterStatus');

function displayStudents(filter = "All") {
  if (!tableBody) return;
  tableBody.innerHTML = '';
  const filtered = students.filter(stu =>
    filter === "All" ? true : stu.status === filter
  );

  filtered.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.dept}</td>
      <td>${student.status}</td>
      <td>
        <button class="action edit-btn" onclick="editStudent(${student.id})">Edit</button>
        <button class="action delete-btn" onclick="deleteStudent(${student.id})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function editStudent(id) {
  const student = students.find(s => s.id === id);
  if (student) {
    localStorage.setItem('editStudent', JSON.stringify(student));
    window.location.href = 'add-student.html';
  }
}

function deleteStudent(id) {
  students = students.filter(s => s.id !== id);
  localStorage.setItem('students', JSON.stringify(students));
  displayStudents(filterStatus.value);
}

if (filterStatus) {
  filterStatus.addEventListener('change', () => {
    displayStudents(filterStatus.value);
  });
  displayStudents();
}

// Auto-fill form if editing
if (form && localStorage.getItem('editStudent')) {
  const stu = JSON.parse(localStorage.getItem('editStudent'));
  document.getElementById('name').value = stu.name;
  document.getElementById('dept').value = stu.dept;
  document.getElementById('status').value = stu.status;
  localStorage.removeItem('editStudent');
}
