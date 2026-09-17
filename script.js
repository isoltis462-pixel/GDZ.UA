// Функція вибору класу
function selectClass(classNumber) {
    if (classNumber === 9) {
        // Якщо 9 клас - переходимо до предметів
        switchStep('step-classes', 'step-subjects');
    } else {
        // Якщо інший клас - показуємо модальне вікно
        document.getElementById('modal').classList.add('active');
    }
}

// Функція закриття модального вікна
function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

// Функція вибору предмета
function selectSubject(subjectName) {
    // Змінюємо заголовок на обраний предмет
    document.getElementById('selected-subject-title').innerText = `Підручники: ${subjectName}`;
    // Переходимо до книг
    switchStep('step-subjects', 'step-books');
}

// Універсальна функція перемикання екранів (вперед)
function switchStep(fromId, toId) {
    document.getElementById(fromId).classList.remove('active');
    document.getElementById(toId).classList.add('active');
}

// Функція кнопки "Назад"
function goBack(toId) {
    // Ховаємо всі кроки
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => step.classList.remove('active'));
    
    // Показуємо потрібний
    document.getElementById(toId).classList.add('active');
}

// Закриття модалки при кліку на темний фон поза нею
document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});
