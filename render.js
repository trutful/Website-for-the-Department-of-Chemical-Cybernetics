// код выполнятся после полной загрузки HTML
document.addEventListener('DOMContentLoaded', function() {
    console.log('   --- DOMContentLoaded - запущен ---  ');

    document.querySelectorAll(".teacher").forEach((teacher) => {
        const name = teacher.querySelector(".teacher-name");
        const info = teacher.querySelector(".teacher-info");

        name.addEventListener("click", (e) => {
            e.stopPropagation();

            const isOpen = teacher.classList.contains("open");

            document.querySelectorAll(".teacher").forEach((t) => {
            t.classList.remove("open");
            t.querySelector(".teacher-info").style.display = "none";
            });

            if (!isOpen) {
            teacher.classList.add("open");
            info.style.display = "block";
            }
        });
    });

    document.addEventListener("click", () => {
        document.querySelectorAll(".teacher").forEach((t) => {
            t.classList.remove("open");
            t.querySelector(".teacher-info").style.display = "none";
        });
    });


    callAll();
});

// функция для вызова всех функций
function callAll() {
    enterButton();
    closeButton();
    showEnter();

    checkInput('register-username', 'register-password');
    checkInput('username', 'password');

    authInit();
    loginSubmit();
    logoutButton();
    registerSubmit();

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

// функция проверки input
function checkInput(login, password) { 
    const loginInp = document.getElementById(login);
    const passwordInp = document.getElementById(password);

    const errorText = document.getElementById('error-text');
    errorText.classList.remove('active');

    if (!loginInp || !passwordInp) {
        errorText.textContent = 'Введите полные данные';
        errorText.classList.add('active');

        setTimeout(() => {
            errorText.classList.remove('active');
            errorText.textContent = '';
        }, 3000);
    }
}

// функция показа Логина пользователя
function setUserUI(username) {
    const userName = document.getElementById('user-name');
    const entrance = document.getElementById('entrance');
    const logout = document.getElementById('logout');
    const loginOverlay = document.querySelector('.login-overlay');

    if (!userName || !entrance || !logout) return;

    userName.textContent = `${username}`;
    entrance.classList.add('hidden');
    logout.classList.remove('hidden');

    if (loginOverlay) loginOverlay.classList.remove('active');
}

// функция очистки Логина с экрана
function clearUserUI() {
    const userName = document.getElementById('user-name');
    const entrance = document.getElementById('entrance');
    const logout = document.getElementById('logout');

    if (!userName || !entrance || !logout) return;

    userName.textContent = '';
    entrance.classList.remove('hidden');
    logout.classList.add('hidden');
}

// функция проверки состояния пользователя
function authInit() {
    const saved = localStorage.getItem('currentUser');
    if (saved) setUserUI(saved);
}

// функция входа
function loginSubmit() {
    const goButton = document.getElementById('go-button');
    const loginInp = document.getElementById('username');
    const passwordInp = document.getElementById('password');
    const errorText = document.getElementById('error-text');

    if (!goButton || !loginInp || !passwordInp || !errorText) return;

    goButton.addEventListener('click', function () {
        const username = loginInp.value.trim();
        const password = passwordInp.value.trim();

        errorText.classList.remove('active');
        errorText.textContent = '';

        if (!username || !password) {
            showError('Введите логин и пароль');
            return;
        }

        const savedUser = localStorage.getItem('user_username');
        const savedPass = localStorage.getItem('user_password');

        if (username === savedUser && password === savedPass) {
            localStorage.setItem('currentUser', username);
            setUserUI(username);
        } else {
            showError('Неверный логин или пароль');
        }
    });

    function showError(msg) {
        errorText.textContent = msg;
        errorText.classList.add('active');
        setTimeout(() => {
            errorText.classList.remove('active');
            errorText.textContent = '';
        }, 3000);
    }
}

// функция регистрации
function registerSubmit() {
    const regBtn = document.getElementById('register-button');
    const regUser = document.getElementById('register-username');
    const regPass = document.getElementById('register-password');
    const errorText = document.getElementById('error-text');

    if (!regBtn || !regUser || !regPass || !errorText) return;

    regBtn.addEventListener('click', function () {
        const username = regUser.value.trim();
        const password = regPass.value.trim();

        errorText.classList.remove('active');
        errorText.textContent = '';

        if (!username || !password) {
            showError('Заполните логин и пароль');
            return;
        }

        localStorage.setItem('user_username', username);
        localStorage.setItem('user_password', password);

        localStorage.setItem('currentUser', username);
        setUserUI(username);
    });

    function showError(msg) {
        errorText.textContent = msg;
        errorText.classList.add('active');
        setTimeout(() => {
            errorText.classList.remove('active');
            errorText.textContent = '';
        }, 3000);
    }
}

// функция выхода
function logoutButton() {
    const logout = document.getElementById('logout');
    if (!logout) return;

    logout.addEventListener('click', function () {
        localStorage.removeItem('currentUser');
        clearUserUI();
    });
}
