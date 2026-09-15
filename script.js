document.addEventListener('DOMContentLoaded', () => {
    // Мобільне меню (простий toggle для демонстрації)
    const burgerMenu = document.getElementById('burger-menu');
    const navList = document.querySelector('.nav-list');

    burgerMenu.addEventListener('click', () => {
        if (navList.style.display === 'flex') {
            navList.style.display = 'none';
        } else {
            navList.style.display = 'flex';
            navList.style.flexDirection = 'column';
            navList.style.position = 'absolute';
            navList.style.top = '70px';
            navList.style.left = '0';
            navList.style.width = '100%';
            navList.style.background = 'var(--primary-dark)';
            navList.style.padding = '20px 0';
            navList.style.textAlign = 'center';
        }
    });

    // Проста імітація пошуку
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.btn-search');

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            alert(`Шукаємо підручники за запитом: "${query}"`);
        } else {
            alert('Будь ласка, введіть назву предмета або автора.');
        }
    });
});
