const BACKEND_URL = "https://onrender.com";

// Wait for the webpage structure to fully load
document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('backend-banner');

    // Use JavaScript Fetch API to hit your live cloud backend endpoint
    fetch(`${BACKEND_URL}/api/message`)
        .then(response => response.json())
        .then(data => {
            // Dynamically replace the placeholder text with your real backend server message!
            banner.innerText = `✔️ Connected to Cloud Data Stream: ${data.message}`;
            banner.style.backgroundColor = "rgba(34, 197, 94, 0.1)"; // Change box to green accent
            banner.style.borderColor = "#22c55e";
            banner.style.color = "#22c55e";
        })
        .catch(error => {
            console.error('Error connecting to backend:', error);
            banner.innerText = "❌ Offline: Live cloud backend server is currently connecting...";
            banner.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
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
            fetch(`${BACKEND_URL}/api/contact`, {
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
// --- UPGRADED DUAL-MODE APPLICATION SANDBOX CONTROLLER ---
const tabPayloadBtn = document.getElementById('tabPayloadBtn');
const tabAuthBtn = document.getElementById('tabAuthBtn');
const containerPayload = document.getElementById('sandboxPayloadContainer');
const containerAuth = document.getElementById('sandboxAuthContainer');
const outputConsole = document.getElementById('sandboxConsoleOutput');

// Tab Switching Mechanics
if(tabPayloadBtn && tabAuthBtn && containerPayload && containerAuth) {
    tabPayloadBtn.addEventListener('click', () => {
        tabPayloadBtn.style.backgroundColor = '#223047'; tabPayloadBtn.style.color = '#38bdf8';
        tabAuthBtn.style.backgroundColor = 'transparent'; tabAuthBtn.style.color = '#64748b'; tabAuthBtn.style.border = '1px solid #223047';
        containerPayload.style.display = 'block'; containerAuth.style.display = 'none';
        outputConsole.style.color = '#22c55e'; outputConsole.innerText = 'Switched to Compiler Interface Engine. Ready to run payload.';
    });

    tabAuthBtn.addEventListener('click', () => {
        tabAuthBtn.style.backgroundColor = '#223047'; tabAuthBtn.style.color = '#22c55e';
        tabPayloadBtn.style.backgroundColor = 'transparent'; tabPayloadBtn.style.color = '#64748b'; tabPayloadBtn.style.border = '1px solid #223047';
        containerAuth.style.display = 'block'; containerPayload.style.display = 'none';
        outputConsole.style.color = '#22c55e'; outputConsole.innerText = 'Switched to Security Authentication Gate. Ready to validate credentials.';
    });
}

// Logic Hook for Demo 1: Compiler Pipeline
const runBtnCompiler = document.getElementById('sandboxRunBtn');
const inputCompiler = document.getElementById('sandboxInput');
if (runBtnCompiler && inputCompiler && outputConsole) {
    runBtnCompiler.addEventListener('click', () => {
        const text = inputCompiler.value.trim();
        if(!text) { outputConsole.style.color = '#ef4444'; outputConsole.innerText = '❌ Error: Payload empty.'; return; }
        outputConsole.style.color = '#38bdf8'; outputConsole.innerText = '⚡ Hashing and processing stream...';
        setTimeout(() => {
            const hash = btoa(text).substring(0, 12).toUpperCase();
            outputConsole.style.color = '#22c55e';
            outputConsole.innerHTML = `<div>🚀 [SUCCESS] Encryption payload complete.</div><div style="color: #cbd5e1; margin-top: 0.25rem;">↳ Secure Hash: SHA-${hash}</div>`;
        }, 500);
    });
}

// Logic Hook for Demo 2: Secure Identity Gate Login Validation
const runBtnAuth = document.getElementById('sandboxAuthBtn');
const inputUser = document.getElementById('sandboxUser');
const inputPass = document.getElementById('sandboxPass');
if (runBtnAuth && inputUser && inputPass && outputConsole) {
    runBtnAuth.addEventListener('click', () => {
        const user = inputUser.value.trim();
        const pass = inputPass.value;

        outputConsole.style.color = '#eab308'; outputConsole.innerText = '🔑 Querying user credential matching matrix...';

        setTimeout(() => {
            if (user === 'admin' && pass === 'password123') {
                outputConsole.style.color = '#22c55e';
                outputConsole.innerHTML = `<div>✅ [ACCESS GRANTED] Session verification successful!</div><div style="color: #cbd5e1; margin-top: 0.25rem;">↳ Assigned Token: Bearer_JWT_Auth_Success</div>`;
                inputUser.value = ''; inputPass.value = '';
            } else {
                outputConsole.style.color = '#ef4444';
                outputConsole.innerHTML = `<div>❌ [ACCESS DENIED] Auth verification failed.</div><div style="color: #cbd5e1; margin-top: 0.25rem;">↳ Reason: Invalid Username or Password.</div>`;
            }
        }, 600);
    });
}
