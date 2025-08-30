document.addEventListener('DOMContentLoaded', () => {
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginBtn = loginForm.querySelector('.btn');
    const signupBtn = signupForm.querySelector('.btn');

    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '../index.html';
    });

    signupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/';
    });
});