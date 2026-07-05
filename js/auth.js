const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const exists = users.find(user => user.email === email);

        if (exists) {
            alert("User already exists!");
            return;
        }

        users.push({
            name,
            email,
            password
        });

        localStorage.setItem("users", JSON.stringify(users));

        alert("Account created successfully!");

        window.location.href = "login.html";

    });

}



// ========================
// LOGIN
// ========================
alert("auth.js loaded");

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();
        alert("Login button clicked");

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const remember = document.getElementById("remember").checked;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(
            u => u.email === email && u.password === password
        );

        if (!user) {

            alert("Invalid Email or Password");

            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(user));

        if (remember) {

            localStorage.setItem("rememberMe", "true");

        } else {

            localStorage.removeItem("rememberMe");

        }

        window.location.href = "dashboard.html";

    });

}



// ========================
// AUTO LOGIN
// ========================

if (
    window.location.pathname.includes("login.html")
) {

    const remember = localStorage.getItem("rememberMe");

    const currentUser = localStorage.getItem("currentUser");

    if (remember && currentUser) {

        window.location.href = "dashboard.html";

    }

}



// ========================
// PROTECT DASHBOARD
// ========================

if (
    window.location.pathname.includes("dashboard.html")
) {

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    if (!currentUser) {

        window.location.href = "login.html";

    }

    const username = document.getElementById("username");

    if (username) {

        username.innerHTML =
            "Welcome, " + currentUser.name + " 👋";

    }

}



// ========================
// LOGOUT
// ========================

function logout() {

    localStorage.removeItem("currentUser");

    localStorage.removeItem("rememberMe");

    window.location.href = "login.html";

}