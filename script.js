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
