import {signup} from './auth.js';

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signupBtn = document.getElementById('signup');
const loginBtn = document.getElementById('login');
const messageDiv = document.getElementById('message');

const showMessage = (msg, isError=false) => {
    messageDiv.textContent = msg;
    messageDiv.style.color = isError? 'red' : 'green';
}

signupBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    //console.log ('Signup attempted with Email!', email, password);
    try {
        const user = await signup(email, password);
        showMessage("signup successful. Welcome", user.email);
        setTimeout(()=> {
            window.location.ref = "app.html";
        }, 1000)
    }
    catch {
        showMessage (error.message, true);
    }
    
    //console.log(user);
})