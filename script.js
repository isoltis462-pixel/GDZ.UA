// Стан класів та вправ
let availableClasses = JSON.parse(localStorage.getItem('availableClasses')) || {
    1: false, 2: false, 3: false, 4: false, 5: false,
    6: false, 7: false, 8: false, 9: true, 10: false, 11: false
};

let exercises = JSON.parse(localStorage.getItem('exercises')) || [];
let selectedClass = null;

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('classesGrid')) renderClassesGrid();
    if (document.getElementById('adminClassToggles')) renderAdminControls();
    if (document.getElementById('classSelect')) renderClassSelectOptions();
    if (document.getElementById('adminExercisesList')) renderAdminExercisesList();
});

// РЕНДЕР КЛАСІВ
function renderClassesGrid() {
    const grid = document.getElementById('classesGrid');
    grid.innerHTML = '';

    for (let i = 1; i <= 11; i++) {
        const btn = document.createElement('button');
        btn.className = `class-btn ${!availableClasses[i] ? 'disabled' : ''}`;
        btn.innerText = `${i} кл.`;
        btn.onclick = () => handleClassClick(i);
        grid.appendChild(btn);
    }
}

function handleClassClick(classNum) {
    if (availableClasses[classNum]) {
        selectedClass = classNum;
        document.getElementById('contentSection').style.display = 'block';
        document.getElementById('selectedClassTitle').innerText = `Вправи для ${classNum} класу`;
        renderExercisesList(classNum);
    } else {
        showModal(`Увага! ${classNum} клас тимчасово недоступний.`);
    }
}

function renderExercisesList(classNum) {
    const container = document.getElementById('exercisesList');
    const filtered = exercises.filter(e => e.classNum === classNum);

    if (filtered.length === 0) {
        container.innerHTML = '<p class="empty-msg">Список вправ порожній. Вони будуть додані згодом.</p>';
        return;
    }

    container.innerHTML = filtered.map(item => `
        <div class="exercise-card">
            <h4>${item.title}</h4>
            <img src="${item.imagePath}" alt="${item.title}" onerror="this.onerror=null; this.src='https://via.placeholder.com/600x200?text=Зображення+не+знайдено';">
        </div>
    `).join('');
}

// МОДАЛЬНЕ ВІКНО
function showModal(message) {
    document.getElementById('modalMessage').innerText = message;
    document.getElementById('classModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('classModal').style.display = 'none';
}

// АДМІНКА
function renderAdminControls() {
    const container = document.getElementById('adminClassToggles');
    container.innerHTML = '';

    for (let i = 1; i <= 11; i++) {
        const item = document.createElement('div');
        item.className = 'toggle-item';
        item.innerHTML = `
            <input type="checkbox" id="toggle-${i}" ${availableClasses[i] ? 'checked' : ''} onchange="toggleClassAccess(${i}, this.checked)">
            <label for="toggle-${i}">${i} кл.</label>
        `;
        container.appendChild(item);
    }
}

function toggleClassAccess(classNum, isChecked) {
    availableClasses[classNum] = isChecked;
    localStorage.setItem('availableClasses', JSON.stringify(availableClasses));
}

function renderClassSelectOptions() {
    const select = document.getElementById('classSelect');
    select.innerHTML = '';
    for (let i = 1; i <= 11; i++) {
        select.innerHTML += `<option value="${i}">${i} клас</option>`;
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const editIndex = parseInt(document.getElementById('editIndex').value);
    const classNum = parseInt(document.getElementById('classSelect').value);
    const title = document.getElementById('exerciseTitle').value;
    const imagePath = document.getElementById('imagePath').value;

    const exerciseData = { classNum, title, imagePath };

    if (editIndex === -1) {
        exercises.push(exerciseData);
    } else {
        exercises[editIndex] = exerciseData;
    }

    localStorage.setItem('exercises', JSON.stringify(exercises));
    resetForm();
    renderAdminExercisesList();
}

function renderAdminExercisesList() {
    const container = document.getElementById('adminExercisesList');
    if (exercises.length === 0) {
        container.innerHTML = '<p>Немає доданих вправ.</p>';
        return;
    }

    container.innerHTML = exercises.map((item, index) => `
        <div class="admin-exercise-item">
            <div>
                <strong>[${item.classNum} клас]</strong> ${item.title}
                <br><small style="color:#666">${item.imagePath}</small>
            </div>
            <div>
                <button class="btn btn-secondary" onclick="editExercise(${index})">Редагувати</button>
                <button class="btn btn-danger" onclick="deleteExercise(${index})">Видалити</button>
            </div>
        </div>
    `).join('');
}

function editExercise(index) {
    const item = exercises[index];
    document.getElementById('editIndex').value = index;
    document.getElementById('classSelect').value = item.classNum;
    document.getElementById('exerciseTitle').value = item.title;
    document.getElementById('imagePath').value = item.imagePath;

    document.getElementById('formTitle').innerText = 'Редагувати вправу';
    document.getElementById('saveBtn').innerText = 'Оновити вправу';
    document.getElementById('cancelEditBtn').style.display = 'inline-block';
}

function deleteExercise(index) {
    if (confirm('Ви дійсно хочете видалити цю вправу?')) {
        exercises.splice(index, 1);
        localStorage.setItem('exercises', JSON.stringify(exercises));
        renderAdminExercisesList();
    }
}

function resetForm() {
    document.getElementById('editIndex').value = -1;
    document.getElementById('exerciseForm').reset();
    document.getElementById('formTitle').innerText = 'Додати вправу';
    document.getElementById('saveBtn').innerText = 'Зберегти вправу';
    document.getElementById('cancelEditBtn').style.display = 'none';
}
