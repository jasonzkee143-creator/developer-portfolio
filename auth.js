document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('authForm');
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const authTitle = document.getElementById('authTitle');
    const submitBtn = document.getElementById('submitBtn');
    const toggleModeLink = document.getElementById('toggleModeLink');
    const togglePrompt = document.getElementById('togglePrompt');
    const authMessage = document.getElementById('authMessage');

    let isLoginMode = true; // Tracks state machine toggle between Register and Login UI layouts

    toggleModeLink.addEventListener('click', (e) => {
        e.preventDefault();
        isLoginMode = !isLoginMode;
        authMessage.style.display = 'none';

        if (isLoginMode) {
            authTitle.innerText = "Account Sign In";
            submitBtn.innerText = "Sign In";
            togglePrompt.innerText = "Don't have an account?";
            toggleModeLink.innerText = "Create Account";
        } else {
            authTitle.innerText = "Register New Account";
            submitBtn.innerText = "Sign Up";
            togglePrompt.innerText = "Already registered?";
            toggleModeLink.innerText = "Sign In instead";
        }
    });

    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        
        // Dynamic route target determination based on current active screen state
        const targetRoute = isLoginMode ? '/api/auth/login' : '/api/auth/register';

        authMessage.style.display = 'block';
        authMessage.innerText = "Verifying secure pipeline records...";
        authMessage.style.backgroundColor = "rgba(255,255,255,0.05)";
        authMessage.style.color = "white";

        fetch(targetRoute, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === "Success") {
                authMessage.innerText = `✅ ${data.message}`;
                authMessage.style.backgroundColor = "rgba(34, 197, 94, 0.1)";
                authMessage.style.color = "#22c55e";
                authForm.reset();
            } else {
                authMessage.innerText = `❌ ${data.error}`;
                authMessage.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
                authMessage.style.color = "#ef4444";
            }
        })
        .catch(() => {
            authMessage.innerText = "❌ Secure auth proxy connection timed out.";
            authMessage.style.color = "#ef4444";
        });
    });
});
