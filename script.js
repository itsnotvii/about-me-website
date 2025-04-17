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

// Implement front-page tile animation
document.addEventListener('DOMContentLoaded', function() {
    const grid = document.getElementById('tile-grid');
    const rows = 15;
    const cols = 10;
    let revealedTiles = 0;
    const totalTiles = rows * cols;
    
    for (let i = 0; i < totalTiles; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
      
        const row = Math.floor(i / cols);
        const col = i % cols;
        const delay = (row * 0.05) + (col * 0.02);
      
        tile.style.transitionDelay = `${delay}s`;
  
        tile.addEventListener('mouseover', function() {
        if (!this.classList.contains('revealed')) {
            this.classList.add('revealed');
            revealedTiles++;
          
            if (revealedTiles === totalTiles) {
                grid.classList.add('revealed');
            }
        }
        });

      grid.appendChild(tile);
    }

    setTimeout(() => {
      if (revealedTiles === 0) {
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach((tile, index) => {
            setTimeout(() => {
            tile.classList.add('revealed');
            if (index === tiles.length - 1) {
              grid.classList.add('revealed');
            }
          }, index * 20);
        });
      }
    }, 5000);
  });

  