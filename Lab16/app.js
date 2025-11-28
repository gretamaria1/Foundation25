import { logout } from './auth.js';

const logoutBtn = document.getElementById('logout');
const messageDiv = document.getElementById('message');

const showMessage = (msg, isError = false) => {
    messageDiv.textContent = msg;
    messageDiv.style.color = isError ? 'red' : 'green';
};

logoutBtn.addEventListener('click', async () => {
    try {
        await logout ();
        showMessage("You have been logged out.");
        setTimeout (() => {
            window.location.href = "index.html";
        }, 1000);
    } catch (error) {
        showMessage(error.message, true);
    }
});