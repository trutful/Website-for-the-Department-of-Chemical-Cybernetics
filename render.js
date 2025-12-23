// код выполнятся после полной загрузки HTML
document.addEventListener('DOMContentLoaded', function() {
    console.log('   --- DOMContentLoaded - запущен ---  ');

    callAll();
});

// функция для вызова всех функций
function callAll() {
    enterButton();
    closeButton();
    showEnter();
}

// функция обработки кнопки входа
function enterButton() {
    const entrance = document.getElementById('entrance');
    const loginOverlay = document.querySelector('.login-overlay');
    const login = document.getElementById('login');

    if (!entrance || !loginOverlay || !login) return;

    entrance.addEventListener('click', function(e) {
        e.preventDefault();
        login.classList.remove('active');

        loginOverlay.classList.add('active');
    });
}

// функция закрытие окна Входа
function closeButton() {
    const loginOverlay = document.querySelector('.login-overlay');
    const loginClose = document.querySelector('.login-close');

    if (!loginOverlay || !loginClose) return;

    loginClose.addEventListener('click', function() {
        loginOverlay.classList.remove('active');
    });
}

// функция переключения между вход/регистрация
function showEnter() {
    const loginOverlay = document.querySelector('.login-overlay');
    const createButton = document.getElementById('create-button');
    const regis = document.getElementById('regis');
    const login = document.getElementById('login');
    const regButton = document.getElementById('reg-button');

    if (!loginOverlay || !createButton || !regis || !login || !regButton) return;

    createButton.addEventListener('click', function() {
        regis.classList.remove('active')

        login.classList.add('active');
    });

    regButton.addEventListener('click', function() {
        regis.classList.add('active');

        login.classList.remove('active')
    });
}