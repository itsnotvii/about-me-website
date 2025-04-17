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

// Load projects dynamically from json
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

// Implement front page tile animation
document.addEventListener('DOMContentLoaded', function() {
    const grid = document.getElementById('tile-grid');
    const rows = 6;
    const cols = 10;
    
    // Create all tiles at once
    for (let i = 0; i < rows * cols; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.style.opacity = '0'; // Start invisible
        grid.appendChild(tile);
        
        // Fade in with random delay
        setTimeout(() => {
            tile.style.opacity = '1';
        }, Math.random() * 1000);
    }
});