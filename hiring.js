// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Particle System
class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particleSystem');
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        // Create particles
        for (let i = 0; i < 50; i++) {
            this.createParticle();
        }

        // Add event listeners
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Start animation
        this.animate();
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        // Random size
        const size = Math.random() * 5 + 2;
        
        // Random speed
        const speedX = Math.random() * 2 - 1;
        const speedY = Math.random() * 2 - 1;
        
        particle.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
        `;
        
        this.container.appendChild(particle);
        this.particles.push({
            element: particle,
            x,
            y,
            speedX,
            speedY,
            size
        });
    }

    animate() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Mouse interaction
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                particle.x -= dx * 0.03;
                particle.y -= dy * 0.03;
            }
            
            // Boundary check
            if (particle.x < 0 || particle.x > window.innerWidth) {
                particle.speedX *= -1;
            }
            if (particle.y < 0 || particle.y > window.innerHeight) {
                particle.speedY *= -1;
            }
            
            // Update element position
            particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Theme Toggle
class ThemeToggle {
    constructor() {
        this.button = document.getElementById('themeToggle');
        this.icon = this.button.querySelector('i');
        this.init();
    }

    init() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.setAttribute('data-theme', savedTheme);
            this.updateIcon(savedTheme);
        }

        // Add click event
        this.button.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateIcon(newTheme);
        });
    }

    updateIcon(theme) {
        this.icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Skill Charts
class SkillCharts {
    constructor() {
        this.charts = {};
        this.init();
    }

    init() {
        // Frontend Skills
        this.createChart('frontendChart', {
            labels: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js'],
            data: [95, 90, 85, 80, 75]
        });

        // Backend Skills
        this.createChart('backendChart', {
            labels: ['Node.js', 'Python', 'PHP', 'SQL', 'MongoDB'],
            data: [85, 80, 75, 90, 85]
        });

        // Marketing Skills
        this.createChart('marketingChart', {
            labels: ['SEO', 'Content', 'Social Media', 'Analytics', 'Email'],
            data: [90, 85, 80, 85, 80]
        });

        // Tools Skills
        this.createChart('toolsChart', {
            labels: ['Git', 'Docker', 'AWS', 'Figma', 'VS Code'],
            data: [90, 75, 80, 85, 95]
        });
    }

    createChart(canvasId, data) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        this.charts[canvasId] = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.data,
                    backgroundColor: [
                        '#FF6B6B',
                        '#4ECDC4',
                        '#45B7D1',
                        '#96CEB4',
                        '#FFEEAD'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
    }
}

// Contact Form
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.notification = document.getElementById('notification');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    handleSubmit() {
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            message: document.getElementById('message').value
        };

        // Show success notification
        this.showNotification('Message sent successfully!');
        
        // Reset form
        this.form.reset();
    }

    showNotification(message) {
        const messageElement = this.notification.querySelector('.notification-message');
        messageElement.textContent = message;
        
        this.notification.classList.add('show');
        
        setTimeout(() => {
            this.notification.classList.remove('show');
        }, 3000);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
    new ThemeToggle();
    new SkillCharts();
    new ContactForm();
}); 