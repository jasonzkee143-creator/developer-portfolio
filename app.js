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
    // --- LIVE DEMO APPLICATION SANDBOX CONTROLLER ---
const sandboxInput = document.getElementById('sandboxInput');
const sandboxRunBtn = document.getElementById('sandboxRunBtn');
const sandboxConsoleOutput = document.getElementById('sandboxConsoleOutput');

if (sandboxRunBtn && sandboxInput && sandboxConsoleOutput) {
    sandboxRunBtn.addEventListener('click', () => {
        const userText = sandboxInput.value.trim();
        
        if (!userText) {
            sandboxConsoleOutput.innerText = "❌ System Halt: Input string specification array cannot be empty.";
            sandboxConsoleOutput.style.color = "#ef4444";
            return;
        }

        sandboxConsoleOutput.style.color = "#38bdf8";
        sandboxConsoleOutput.innerText = "⚡ Compiling... Parsing indices... Hashing streams...";

        // Simulate high-speed pipeline compiling processing loops
        setTimeout(() => {
            const mockHash = btoa(userText).substring(0, 12).toUpperCase();
            const timestampCode = new Date().toLocaleTimeString();
            
            sandboxConsoleOutput.style.color = "#22c55e";
            sandboxConsoleOutput.innerHTML = `
                <div>🚀 [SUCCESS] Compilation payload complete.</div>
                <div style="margin-top: 0.25rem; color: #cbd5e1;">↳ Raw Data: "${userText}"</div>
                <div style="margin-top: 0.25rem; color: #eab308;">↳ Secure Hash ID: SHA-${mockHash}</div>
                <div style="margin-top: 0.25rem; color: #64748b;">↳ Registry Time: ${timestampCode}</div>
            `;
        }, 600); // 600ms micro-loading effect for an authentic developer feel
    });
}
