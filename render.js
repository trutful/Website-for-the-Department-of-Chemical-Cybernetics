// код выполнятся после полной загрузки HTML
document.addEventListener('DOMContentLoaded', function() {
    console.log('   --- DOMContentLoaded - запущен ---  ');

    document.querySelectorAll(".teacher").forEach((teacher) => {
        const name = teacher.querySelector(".teacher-name");
        const info = teacher.querySelector(".teacher-info");

        name.addEventListener("click", (e) => {
            e.stopPropagation();

            const isOpen = teacher.classList.contains("open");

            closeAllTeachers();

            if (!isOpen) {
                teacher.classList.add("open");
                info.style.display = "block";
            }
        });
    });

    document.addEventListener("click", () => {
        closeAllTeachers();
    });

    callAll();
});

// функция для вызова всех функций
function callAll() {
    enterButton();
    closeButton();
    showEnter();

    authInit();
    loginSubmit();
    logoutButton();
    registerSubmit();
}

// функция закрытия всех teacher
function closeAllTeachers() {
    document.querySelectorAll(".teacher").forEach((t) => {
        t.classList.remove("open");
        t.querySelector(".teacher-info").style.display = "none";
    });
}

// функция показа ошибки
function showError(msg) {
    const errorText = document.getElementById('error-text');
    if (!errorText) return;

    errorText.textContent = msg;
    errorText.classList.add('active');
    setTimeout(() => {
        errorText.classList.remove('active');
        errorText.textContent = '';
    }, 3000);
}

// Функция очистки полей инпута
function clearAuthForm() {
    const ids = ['register-username','register-password',
        'username','password'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });

    const errorText = document.getElementById('error-text');
    if (errorText) {
        errorText.classList.remove('active');
        errorText.textContent = '';
    }
}

// функция показа окна Вход
function showLoginTab() {
    const regis = document.getElementById('regis');
    const login = document.getElementById('login');
    if (!regis || !login) return;

    regis.classList.remove('active');
    login.classList.add('active');
}

// функция показа окна Регистрация
function showRegisterTab() {
    const regis = document.getElementById('regis');
    const login = document.getElementById('login');
    if (!regis || !login) return;

    login.classList.remove('active');
    regis.classList.add('active');
}


// функция обработки кнопки входа
function enterButton() {
    const entrance = document.getElementById('entrance');
    const loginOverlay = document.querySelector('.login-overlay');

    if (!entrance || !loginOverlay) return;

    entrance.addEventListener('click', function(e) {
        e.preventDefault();

        clearAuthForm();
        showLoginTab();
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
    const createButton = document.getElementById('create-button');
    const regButton = document.getElementById('reg-button');

    if (!createButton || !regButton) return;

    createButton.addEventListener('click', function() {
        clearAuthForm();
        showLoginTab();
    });

    regButton.addEventListener('click', function() {
        clearAuthForm();
        showRegisterTab();
    });
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

    clearAuthForm();
    showLoginTab();
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
}

// функция выхода
function logoutButton() {
    const logout = document.getElementById('logout');
    if (!logout) return;

    logout.addEventListener('click', function () {
        localStorage.removeItem('currentUser');
        clearUserUI();

        clearAuthForm();
        showLoginTab();
    });
}
