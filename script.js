// Ініціалізація Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAmCzZAEKq4BMo6eWAN96IawhF95cH1sHM",
  authDomain: "keysbrawl-c4ae6.firebaseapp.com",
  databaseURL: "https://keysbrawl-c4ae6-default-rtdb.firebaseio.com",
  projectId: "keysbrawl-c4ae6",
  storageBucket: "keysbrawl-c4ae6.firebasestorage.app",
  messagingSenderId: "1090859079662",
  appId: "1:1090859079662:web:932bf6463cb0601083a0ff",
  measurementId: "G-PJR0BQBYVM"
};

// Запуск Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

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
    
    if (subjectName.toLowerCase().includes('укр')) {
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
    const solutionContent = document.getElementById('solution-content');

    // Зчитування розв'язання з Firebase (якщо запис існуватиме в базі)
    const formattedExKey = exName.replace(/\s+/g, '_');
    database.ref('solutions/' + formattedExKey).once('value').then((snapshot) => {
        if (snapshot.exists() && snapshot.val().imageUrl) {
            solutionContent.innerHTML = `<img src="${snapshot.val().imageUrl}" alt="${exName}" style="max-width:100%; border-radius:8px;">`;
        } else {
            solutionContent.innerHTML = `📌 Тут розміщується фото або текст готового завдання (${exName}).`;
        }
    }).catch(() => {
        solutionContent.innerHTML = `📌 Тут розміщується фото або текст готового завдання (${exName}).`;
    });

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
