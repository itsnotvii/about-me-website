console.log("Portfolio site loaded.");

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
        });
    });
});

// Load projects dynamically
document.addEventListener("DOMContentLoaded", () => {
    fetch('project.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const projectList = document.querySelector('.project-list');
            if (projectList) {
                data.projects.forEach(project => {
                    const projectItem = document.createElement('div');
                    projectItem.classList.add('project-item');

                    projectItem.innerHTML = `
                        <h3>
                            <div class="project-logos">
                                ${project.name} |
                                <img src="images/java.png" alt="Java Logo">
                                <img src="images/eclipse.png" alt="Eclipse Logo">
                                <img src="images/vscode.png" alt="VS Code Logo">
                                <img src="images/github.png" alt="GitHub Logo">
                            </div>
                        </h3>
                        <ul>
                            ${project.description.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    `;
                    projectList.appendChild(projectItem);
                });
            } else {
                console.error('No project list container found!');
            }
        })
        .catch(error => console.error("Error loading projects:", error));
});

// Handle contact form submission using Node.js
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector("#contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const name = document.querySelector("#name").value.trim();
            const email = document.querySelector("#email").value.trim();
            const message = document.querySelector("#message").value.trim();

            if (!name || !email || !message) {
                alert("Please fill out all fields.");
                return;
            }
            
            fetch("http://localhost:3001/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, message}),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Message sent:", data);
                alert("Thanks for reaching out!");
                contactForm.reset();
            })
            .catch((error) => {
                console.error("Error sending message:", error);
                alert("There was an issue sending your message");
            });
        });
    } else {
        console.warn("Contact form not found on this page.");
    }
});

// TILE TITLE SCRIPT
document.addEventListener('DOMContentLoaded', function() {
    const chars = "ABCDEFGGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";
    const rows = 6;
    const cols = 10;
    const grid = document.getElementById('tile-grid');
    
    // Clear any existing content
    grid.innerHTML = '';
    
    // Create tiles directly in the grid container
    for (let i = 0; i < rows * cols; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        const randomChar = chars[Math.floor(Math.random() * chars.length)];
        tile.setAttribute('data-char', randomChar);
        
        tile.addEventListener('mouseenter', function() {
            this.style.background = '#fff';
            this.style.transform = 'scale(1.2)';
            this.style.zIndex = '30';
            const newChar = chars[Math.floor(Math.random() * chars.length)];
            this.setAttribute('data-char', newChar);
        });
        
        tile.addEventListener('mouseleave', function() {
            this.style.background = '#000';
            this.style.transform = 'scale(1)';
            this.style.zIndex = '1';
        });
        
        grid.appendChild(tile);
    }
});