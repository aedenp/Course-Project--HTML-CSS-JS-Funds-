document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    let currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark');
        if (darkModeToggle) darkModeToggle.textContent = '☀️ Light Mode';
    } else if (currentTheme === 'light') {
        document.body.classList.remove('dark');
        if (darkModeToggle) darkModeToggle.textContent = '🌙 Dark Mode';
    } else if (prefersDarkScheme.matches) {
        document.body.classList.add('dark');
        if (darkModeToggle) darkModeToggle.textContent = '☀️ Light Mode';
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            const isDark = document.body.classList.contains('dark');
            darkModeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Greeting functionality
    const greetBtn = document.getElementById('greetBtn');
    const visitorNameInput = document.getElementById('visitorName');
    const greetingMsg = document.getElementById('greetingMessage');
    
    if (greetBtn && visitorNameInput && greetingMsg) {
        greetBtn.addEventListener('click', () => {
            let name = visitorNameInput.value.trim();
            if (name === "") {
                greetingMsg.textContent = "👋 Hello there! Please enter your name to get a personal greeting.";
                greetingMsg.style.color = "var(--accent)";
            } else {
                greetingMsg.innerHTML = `✨ Nice to meet you, ${name}! Welcome to my portfolio. ✨`;
                greetingMsg.style.color = "var(--accent)";
                sessionStorage.setItem('visitorName', name);
            }
        });
        
        const savedName = sessionStorage.getItem('visitorName');
        if (savedName && visitorNameInput) {
            visitorNameInput.value = savedName;
            greetingMsg.innerHTML = `Welcome back, ${savedName}! 👋`;
        }
    }

    // Project details toggle
    const detailButtons = document.querySelectorAll('.details-btn');
    detailButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectKey = btn.getAttribute('data-project');
            const detailsDiv = document.getElementById(`${projectKey}-details`);
            if (detailsDiv) {
                detailsDiv.classList.toggle('hidden');
                btn.textContent = detailsDiv.classList.contains('hidden') ? 'Show Details' : 'Hide Details';
            }
        });
    });

    // Contact form validation & feedback
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');
    
    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const subject = document.getElementById('subject')?.value.trim();
            const message = document.getElementById('message')?.value.trim();
            
            if (!name || !email || !subject || !message) {
                formFeedback.textContent = "❌ Please fill out all required fields.";
                formFeedback.className = "form-feedback error-feedback";
                return;
            }
            if (!email.includes('@') || !email.includes('.')) {
                formFeedback.textContent = "❌ Please enter a valid email address.";
                formFeedback.className = "form-feedback error-feedback";
                return;
            }
            if (message.length < 10) {
                formFeedback.textContent = "❌ Message must be at least 10 characters.";
                formFeedback.className = "form-feedback error-feedback";
                return;
            }
            
            formFeedback.innerHTML = `✅ Thanks ${name}! Your message has been sent. I'll reply to ${email} soon.`;
            formFeedback.className = "form-feedback success-feedback";
            contactForm.reset();
            
            setTimeout(() => {
                formFeedback.innerHTML = '';
                formFeedback.className = 'form-feedback';
            }, 5000);
        });
    }
});