function selectClass(classNumber) {
    if (classNumber === 9) {
        switchStep('step-classes', 'step-subjects');
    } else {
        document.getElementById('modal').classList.add('active');
    }
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

function selectSubject(subjectName) {
    document.getElementById('selected-subject-title').innerText = `Підручники: ${subjectName}`;
    
    const booksList = document.getElementById('books-list');
    
    if (subjectName === 'Укр. мова') {
        booksList.innerHTML = `
            <div class="book-card" onclick="openBook('ukr-mova-zabolotny')">
                <img src="ukr-mova-9.png" alt="Українська мова 9 клас Заболотний" class="book-cover">
                <div class="book-info">
                    <h3>Українська мова</h3>
                    <p>О.В. Заболотний, В.В. Заболотний</p>
                    <span class="year-tag">9 клас</span>
                </div>
            </div>
        `;
    } else {
        booksList.innerHTML = `
            <div style="text-align: center; color: #666; padding: 40px 0; width: 100%;">
                <p style="font-size: 18px;">Підручники з предмета <b>${subjectName}</b> скоро з'являться!</p>
            </div>
        `;
    }

    switchStep('step-subjects', 'step-books');
}

function openBook(bookId) {
    switchStep('step-books', 'step-exercises');
}

function openSolution(exName) {
    document.getElementById('solution-title').innerText = exName;
    switchStep('step-exercises', 'step-solution');
}

function switchStep(fromId, toId) {
    document.getElementById(fromId).classList.remove('active');
    document.getElementById(toId).classList.add('active');
}

function goBack(toId) {
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => step.classList.remove('active'));
    document.getElementById(toId).classList.add('active');
}

document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});
