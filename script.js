// Збереження даних у локальному сховищі браузера
let activeClasses = JSON.parse(localStorage.getItem('activeClasses')) || {
    1: false, 2: false, 3: false, 4: false, 5: false,
    6: false, 7: false, 8: false, 9: true, 10: false, 11: false
};

let exercises = JSON.parse(localStorage.getItem('exercises')) || [];

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('classesGrid')) renderClasses();
    if (document.getElementById('adminClassToggles')) renderAdminToggles();
    if (document.getElementById('classSelect')) renderAdminSelect();
    if (document.getElementById('adminExercisesList')) renderAdminList();
});

// Рендер кнопок класів 1-11
function renderClasses() {
    const grid = document.getElementById('classesGrid');
    grid.innerHTML = '';

    for (let i = 1; i <= 11; i++) {
        const btn = document.createElement('button');
        btn.className = 'class-btn';
        btn.innerText = `${i} клас`;
        btn.onclick = () => openClass(i);
        grid.appendChild(btn);
    }
}

// Натискання на кнопку класу
function openClass(classNum) {
    if (activeClasses[classNum]) {
        // Якщо клас увімкнено в адмінці
        const container = document.getElementById('exercisesContainer');
        const list = document.getElementById('exercisesList');
        document.getElementById('selectedClassHeader').innerText = `Вправи для ${classNum} класу`;
        
        const filtered = exercises.filter(e => e.classNum === classNum);
        
        if (filtered.length === 0) {
            list.innerHTML = '<p style="margin-top:15px; color:#aaa;">Вправ для цього класу поки немає.</p>';
        } else {
            list.innerHTML = filtered.map(item => `
                <div class="exercise-item">
                    <h3>${item.title}</h3>
                    <img src="${item.imagePath}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/500x200?text=Зображення+не+знайдено';">
                </div>
            `).join('');
        }
        
        container.style.display = 'block';
    } else {
        // Якщо клас закритий — показуємо модальне вікно
        const modal = document.getElementById('modalOverlay');
        const modalText = document.getElementById('modalText');
        modalText.innerText = `Цей клас тимчасово недоступний. Зараз працює лише 9 клас, матеріали для інших класів додаються!`;
        modal.style.display = 'flex';
    }
}

// ФУНКЦІЯ ЗАКРИТТЯ МОДАЛЬНОГО ВІКНА (Кнопка "Зрозуміло")
function closeModal() {
    const modal = document.getElementById('modalOverlay');
    if (modal) {
        modal.style.display = 'none';
    }
}

// --- АДМІНІСТРУВАННЯ ---

function renderAdminToggles() {
    const container = document.getElementById('adminClassToggles');
    container.innerHTML = '';
    for (let i = 1; i <= 11; i++) {
        container.innerHTML += `
            <label class="toggle-label">
                <input type="checkbox" ${activeClasses[i] ? 'checked' : ''} onchange="toggleAccess(${i}, this.checked)"> ${i} клас
            </label>
        `;
    }
}

function toggleAccess(classNum, isChecked) {
    activeClasses[classNum] = isChecked;
    localStorage.setItem('activeClasses', JSON.stringify(activeClasses));
}

function renderAdminSelect() {
    const select = document.getElementById('classSelect');
    select.innerHTML = '';
    for (let i = 1; i <= 11; i++) {
        select.innerHTML += `<option value="${i}">${i} клас</option>`;
    }
}

function saveExercise(e) {
    e.preventDefault();
    const index = parseInt(document.getElementById('editIndex').value);
    const classNum = parseInt(document.getElementById('classSelect').value);
    const title = document.getElementById('exerciseTitle').value;
    const imagePath = document.getElementById('imagePath').value;

    const data = { classNum, title, imagePath };

    if (index === -1) {
        exercises.push(data);
    } else {
        exercises[index] = data;
    }

    localStorage.setItem('exercises', JSON.stringify(exercises));
    resetForm();
    renderAdminList();
}

function renderAdminList() {
    const container = document.getElementById('adminExercisesList');
    if (exercises.length === 0) {
        container.innerHTML = '<p>Немає доданих вправ.</p>';
        return;
    }

    container.innerHTML = exercises.map((item, idx) => `
        <div class="admin-ex-row">
            <div><strong>[${item.classNum} кл]</strong> ${item.title}</div>
            <div>
                <button class="btn-edit" onclick="editEx(${idx})">✏️</button>
                <button class="btn-del" onclick="deleteEx(${idx})">🗑️</button>
            </div>
        </div>
    `).join('');
}

function editEx(idx) {
    const item = exercises[idx];
    document.getElementById('editIndex').value = idx;
    document.getElementById('classSelect').value = item.classNum;
    document.getElementById('exerciseTitle').value = item.title;
    document.getElementById('imagePath').value = item.imagePath;

    document.getElementById('formTitle').innerText = '2. Редагувати вправу';
    document.getElementById('saveBtn').innerText = 'Оновити';
    document.getElementById('cancelBtn').style.display = 'inline-block';
}

function deleteEx(idx) {
    if (confirm('Видалити цю вправу?')) {
        exercises.splice(idx, 1);
        localStorage.setItem('exercises', JSON.stringify(exercises));
        renderAdminList();
    }
}

function resetForm() {
    document.getElementById('editIndex').value = -1;
    document.getElementById('exerciseForm').reset();
    document.getElementById('formTitle').innerText = '2. Додати / Редагувати вправу';
    document.getElementById('saveBtn').innerText = 'Зберегти';
    document.getElementById('cancelBtn').style.display = 'none';
}
