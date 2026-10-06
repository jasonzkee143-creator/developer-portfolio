// Wait for the webpage structure to fully load
document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('backend-banner');

    // Use JavaScript Fetch API to hit your local backend endpoint
    fetch('/api/message')
        .then(response => response.json())
        .then(data => {
            // Dynamically replace the placeholder text with your real backend server message!
            banner.innerText = `📡 Server Sync: ${data.message}`;
            banner.style.backgroundColor = "rgba(34, 197, 94, 0.1)"; // Change box to green accent
            banner.style.borderColor = "#22c55e";
            banner.style.color = "#22c55e";
        })
        .catch(error => {
            console.error('Error connecting to backend:', error);
            banner.innerText = "❌ Offline: Local backend server is not running.";
            banner.style.borderColor = "#ef4444";
            banner.style.color = "#ef4444";
        });
});
 // --- PORTFOLIO FORM HANDLER ---
    const contactForm = document.getElementById('portfolioForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Intercept page reload mechanics

            const payload = {
                name: document.getElementById('formName').value,
                email: document.getElementById('formEmail').value,
                message: document.getElementById('formMessage').value
            };

            formStatus.style.display = "block";
            formStatus.innerText = "Processing submission...";
            formStatus.style.color = "white";

            // Fire a secure POST API dispatch to the node back-end
            fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === "Success") {
                    formStatus.innerText = `✅ ${data.message}`;
                    formStatus.style.color = "#22c55e";
                    contactForm.reset(); // Clear all form validation input elements clean
                } else {
                    formStatus.innerText = `❌ Error: ${data.error}`;
                    formStatus.style.color = "#ef4444";
                }
            })
            .catch(err => {
                formStatus.innerText = "❌ Network connection timeout error.";
                formStatus.style.color = "#ef4444";
            });
        });
    }