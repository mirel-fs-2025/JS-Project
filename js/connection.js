document.addEventListener('DOMContentLoaded', function () {
    displayUserSection(); 
});

function displayUserSection() {
    const userNameDisplay = document.getElementById('userNameDisplay'); 
    const logoutButton = document.getElementById('logoutButton');

    let loggedUser = JSON.parse(sessionStorage.getItem('userLogged'));

    if (loggedUser) {
        userNameDisplay.innerText = `שלום, ${loggedUser.userName}`;
        logoutButton.style.display = 'inline';
    } else {
        userNameDisplay.innerText = '';
        logoutButton.style.display = 'none';
    }

    logoutButton.addEventListener('click', function () {
        sessionStorage.removeItem('userLogged'); 
        displayUserSection(); 
        window.location.href = '../html/home.html'; 
    });
}

function connection() {
    const name = document.getElementById('signInUserName').value; 
    const code = document.getElementById('signInPassword').value; 
    let checkIfAvailable = JSON.parse(sessionStorage.getItem('user'));

    if (checkIfAvailable) {
        let existUser = checkIfAvailable.find(u => u.userName === name && u.password === code);
        if (!existUser) {
            alert('שם משתמש או סיסמה אינם נכונים');
            signUp(); 
            return;
        }

        sessionStorage.setItem('userLogged', JSON.stringify(existUser));
        console.log('User logged:', JSON.parse(sessionStorage.getItem('userLogged')));
        alert(`שלום ${existUser.firstName}`);

        displayUserSection(); 

        let checkoutAttempt = sessionStorage.getItem('checkoutAttempt'); 
        if (checkoutAttempt) {
            sessionStorage.removeItem('checkoutAttempt');
            window.location.href = '../html/payment.html'; 
        } else {
            window.location.href = '../html/home.html';
        }
    } else {
        alert('לקוח לא רשום');
        signUp();
        return;
    }

    loginChange(true); 
}

function signUp() {
    alert('עבור להרשמה');
    window.location.href = '../html/signOn.html'; 
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhoneNumber(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
}

function validatePassword(password) {
    return password.length >= 6; 
}

function save() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const userName = document.getElementById('userName').value;
    const mail = document.getElementById('mail').value;
    const tel = document.getElementById('tel').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!firstName || !lastName || !userName || !password || !confirmPassword || !mail || !tel) {
        alert('יש להשלים פרטים חסרים');
        return;
    }

    if (!validateEmail(mail)) {
        alert('כתובת הדוא"ל אינה תקינה');
        return;
    }

    if (!validatePhoneNumber(tel)) {
        alert('מספר הטלפון אינו תקין');
        return;
    }

    if (password !== confirmPassword) {
        alert('אימות סיסמא נכשל, נסה שנית');
        return;
    }

    if (!validatePassword(password)) {
        alert('הסיסמא צריכה להכיל לפחות 6 תווים');
        return;
    }

    let existUsers = JSON.parse(sessionStorage.getItem('user'));
    if (existUsers) {
        let existUser = existUsers.find(u => u.userName === userName);
        if (existUser) {
            alert('שם המשתמש שנבחר כבר קיים במערכת, יש לבחור שם משתמש חדש');
            return;
        }
    }

    let newUser = {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        password: password,
        tel: tel,
        mail: mail
    };

    if (!existUsers) {
        existUsers = [];
    }

    existUsers.push(newUser);
    sessionStorage.setItem('user', JSON.stringify(existUsers));
    sessionStorage.setItem('userLogged', JSON.stringify(newUser));

    alert(`${newUser.firstName} ברוכים הבאים!!`);
    displayUserSection();

    let checkoutAttempt = sessionStorage.getItem('checkoutAttempt');
    if (checkoutAttempt) {
        sessionStorage.removeItem('checkoutAttempt');
        window.location.href = '../html/payment.html';
    }
    else {
        window.location.href = '../html/home.html';
    }
}
