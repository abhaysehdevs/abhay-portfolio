// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    offset: 100,
    once: false,
    mirror: true
});

// Typing Animation
const typingText = document.querySelector('.typing-text');
const words = ['Web Designer', 'Digital Marketer', 'BCA Student', 'Tech Innovator'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingSpeed = 1000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
}

// Start typing animation
type();

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Dark Mode Toggle with Animation
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Animate icon change
    icon.style.transform = 'rotate(360deg)';
    icon.style.transition = 'transform 0.5s ease';
    
    setTimeout(() => {
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
        icon.style.transform = 'rotate(0deg)';
    }, 250);
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

// Mobile Navigation with Animation
const hamburger = document.querySelector('.hamburger');
const mobileNavLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNavLinks.classList.toggle('active');
    
    // Animate hamburger to X
    if (hamburger.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (hamburger.classList.contains('active') && 
        !hamburger.contains(e.target) && 
        !mobileNavLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileNavLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Project Filtering with Animation
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');
        
        // Animate filter change
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Project Modal with Enhanced Animation
const modal = document.getElementById('projectModal');
const modalBody = modal.querySelector('.modal-body');
const closeModal = modal.querySelector('.close-modal');

const projectData = {
    'ghardazzle': {
        title: 'GharDazzle',
        description: 'A modern e-commerce platform for home decor products with advanced features like wishlist and PWA capabilities.',
        tech: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
        challenges: 'Implementing PWA features and ensuring smooth user experience across devices.',
        outcomes: 'Successfully launched with 1000+ products and positive user feedback.'
    },
    'dinanath': {
        title: 'Dinanath & Sons',
        description: 'Online store specializing in jewellery tools and equipment with inventory management.',
        tech: ['WordPress', 'WooCommerce', 'PHP', 'MySQL'],
        challenges: 'Complex product categorization and payment gateway integration.',
        outcomes: 'Increased online sales by 40% within first month.'
    },
    'artler': {
        title: 'Artler.ai',
        description: 'AI-powered NFT authentication platform in development.',
        tech: ['Python', 'TensorFlow', 'React', 'Blockchain'],
        challenges: 'Implementing accurate AI models for art authentication.',
        outcomes: 'Prototype successfully identifies common art styles with 85% accuracy.'
    },
    'sih': {
        title: 'Smart India Hackathon 2024',
        description: 'Innovative DDoS protection solution for the hackathon.',
        tech: ['Python', 'Machine Learning', 'Network Security'],
        challenges: 'Real-time threat detection and response system.',
        outcomes: 'Selected for second round of the competition.'
    }
};

document.querySelectorAll('.view-project').forEach(button => {
    button.addEventListener('click', () => {
        const projectCard = button.closest('.project-card');
        const projectName = projectCard.querySelector('h3').textContent.toLowerCase().replace(/\s+/g, '');
        const project = projectData[projectName];

        if (project) {
            // Animate button click
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
            
            // Prepare modal content with staggered animation
            modalBody.innerHTML = `
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <h3>Technologies Used</h3>
                <div class="tech-stack">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <h3>Challenges</h3>
                <p>${project.challenges}</p>
                <h3>Outcomes</h3>
                <p>${project.outcomes}</p>
            `;
            
            // Show modal with animation
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Animate tech tags with delay
            const techTags = modalBody.querySelectorAll('.tech-tag');
            techTags.forEach((tag, index) => {
                tag.style.opacity = '0';
                tag.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    tag.style.opacity = '1';
                    tag.style.transform = 'translateY(0)';
                }, 100 * index);
            });
        }
    });
});

closeModal.addEventListener('click', () => {
    closeModal.style.transform = 'rotate(90deg)';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        closeModal.style.transform = 'rotate(0deg)';
    }, 300);
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// Form Validation and Submission with Animation
const contactForm = document.getElementById('contactForm');
const formGroups = document.querySelectorAll('.form-group');

formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');
    
    // Add focus animation
    input.addEventListener('focus', () => {
        label.style.color = 'var(--primary-color)';
    });
    
    input.addEventListener('blur', () => {
        label.style.color = '';
    });
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    // Basic validation
    if (!name || !email || !message) {
        shakeForm();
        return;
    }

    if (!isValidEmail(email)) {
        shakeForm();
        return;
    }

    // Animate button during submission
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form submission)
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        submitBtn.style.backgroundColor = '#10b981';
        
        // Reset form after success
        setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = 'Send Message';
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '';
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
        }, 2000);
    }, 1500);
});

function shakeForm() {
    contactForm.classList.add('shake');
    setTimeout(() => {
        contactForm.classList.remove('shake');
    }, 500);
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Smooth Scroll for Navigation Links with Active State
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            if (mobileNavLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileNavLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Smooth scroll with easing
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let start = null;
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            // Easing function
            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
            
            requestAnimationFrame(animation);
        }
    });
});

// Enhanced Skills Section with 3D Rotating Cube
const skillCharts = document.querySelectorAll('.skill-category');
skillCharts.forEach(category => {
    const skills = category.querySelectorAll('.skill-bar');
    const cubeContainer = document.createElement('div');
    cubeContainer.className = 'cube-container';
    
    // Create cube structure
    const cube = document.createElement('div');
    cube.className = 'cube';
    
    // Create faces for the cube
    const faces = [
        { class: 'front', title: 'Frontend' },
        { class: 'back', title: 'Backend' },
        { class: 'right', title: 'Tools' },
        { class: 'left', title: 'Design' },
        { class: 'top', title: 'Soft Skills' },
        { class: 'bottom', title: 'Certifications' }
    ];
    
    // Create each face with skills
    faces.forEach((face, index) => {
        const faceElement = document.createElement('div');
        faceElement.className = `cube-face ${face.class}`;
        
        // Add title to each face
        const title = document.createElement('h4');
        title.textContent = face.title;
        faceElement.appendChild(title);
        
        // Add skills to each face (distribute skills across faces)
        const skillsForFace = Array.from(skills).slice(index * 2, (index + 1) * 2);
        if (skillsForFace.length > 0) {
            const skillsList = document.createElement('div');
            skillsList.className = 'face-skills';
            
            skillsForFace.forEach(skill => {
                const skillInfo = skill.querySelector('.skill-info');
                const skillName = skillInfo.querySelector('span:first-child').textContent;
                const skillPercent = skillInfo.querySelector('span:last-child').textContent;
                
                const skillElement = document.createElement('div');
                skillElement.className = 'face-skill';
                skillElement.innerHTML = `
                    <span class="skill-name">${skillName}</span>
                    <div class="skill-indicator">
                        <div class="skill-dot" style="--percent: ${skillPercent}"></div>
                    </div>
                `;
                skillsList.appendChild(skillElement);
            });
            
            faceElement.appendChild(skillsList);
        }
        
        cube.appendChild(faceElement);
    });
    
    cubeContainer.appendChild(cube);
    category.insertBefore(cubeContainer, category.querySelector('.skill-bars'));
    
    // Add rotation controls
    let isDragging = false;
    let startX, startY;
    let rotationX = 0;
    let rotationY = 0;
    
    cubeContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - rotationY;
        startY = e.clientY - rotationX;
        cube.style.transition = 'none';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        rotationY = e.clientX - startX;
        rotationX = e.clientY - startY;
        
        cube.style.transform = `rotateX(${rotationX * 0.5}deg) rotateY(${rotationY * 0.5}deg)`;
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
        cube.style.transition = 'transform 0.3s ease';
    });
    
    // Add auto-rotation when not interacting
    let autoRotateInterval;
    
    cubeContainer.addEventListener('mouseenter', () => {
        clearInterval(autoRotateInterval);
    });
    
    cubeContainer.addEventListener('mouseleave', () => {
        let angle = 0;
        autoRotateInterval = setInterval(() => {
            angle += 1;
            cube.style.transform = `rotateX(${Math.sin(angle * 0.02) * 15}deg) rotateY(${angle}deg)`;
        }, 50);
    });
    
    // Trigger auto-rotation on load
    cubeContainer.dispatchEvent(new Event('mouseleave'));
});

// Add styles for the 3D cube
const cubeStyles = document.createElement('style');
cubeStyles.textContent = `
    .cube-container {
        width: 300px;
        height: 300px;
        margin: 2rem auto;
        perspective: 1000px;
        position: relative;
    }
    
    .cube {
        width: 100%;
        height: 100%;
        position: relative;
        transform-style: preserve-3d;
        transition: transform 0.3s ease;
    }
    
    .cube-face {
        position: absolute;
        width: 100%;
        height: 100%;
        background: var(--bg-color);
        border: 2px solid var(--primary-color);
        border-radius: var(--border-radius-md);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1.5rem;
        box-shadow: var(--shadow-md);
        backface-visibility: visible;
    }
    
    .cube-face h4 {
        color: var(--primary-color);
        margin-bottom: 1.5rem;
        font-size: 1.2rem;
    }
    
    .face-skills {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
    }
    
    .face-skill {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
        background: rgba(var(--primary-rgb), 0.1);
        border-radius: var(--border-radius-sm);
    }
    
    .skill-name {
        font-weight: 500;
        color: var(--text-color);
    }
    
    .skill-indicator {
        width: 60px;
        height: 8px;
        background: rgba(var(--primary-rgb), 0.2);
        border-radius: 4px;
        overflow: hidden;
        position: relative;
    }
    
    .skill-dot {
        position: absolute;
        width: 8px;
        height: 8px;
        background: var(--primary-color);
        border-radius: 50%;
        left: calc(var(--percent) - 4px);
        top: 0;
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.7; }
    }
    
    .front { transform: translateZ(150px); }
    .back { transform: translateZ(-150px) rotateY(180deg); }
    .right { transform: translateX(150px) rotateY(90deg); }
    .left { transform: translateX(-150px) rotateY(-90deg); }
    .top { transform: translateY(-150px) rotateX(90deg); }
    .bottom { transform: translateY(150px) rotateX(-90deg); }
    
    .dark-mode .cube-face {
        background: var(--dark-bg);
        border-color: var(--accent-color);
    }
    
    .dark-mode .cube-face h4 {
        color: var(--accent-color);
    }
    
    .dark-mode .face-skill {
        background: rgba(var(--accent-rgb), 0.1);
    }
    
    .dark-mode .skill-indicator {
        background: rgba(var(--accent-rgb), 0.2);
    }
    
    .dark-mode .skill-dot {
        background: var(--accent-color);
    }
    
    .dark-mode .skill-name {
        color: var(--dark-text);
    }
    
    @media (max-width: 768px) {
        .cube-container {
            width: 250px;
            height: 250px;
        }
        
        .front { transform: translateZ(125px); }
        .back { transform: translateZ(-125px) rotateY(180deg); }
        .right { transform: translateX(125px) rotateY(90deg); }
        .left { transform: translateX(-125px) rotateY(-90deg); }
        .top { transform: translateY(-125px) rotateX(90deg); }
        .bottom { transform: translateY(125px) rotateX(-90deg); }
    }
`;

document.head.appendChild(cubeStyles);

// Enhanced Hero Section with 3D Parallax
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 20;
    const yPos = (clientY / window.innerHeight - 0.5) * 20;
    
    if (heroContent) {
        heroContent.style.transform = `perspective(1000px) rotateX(${-yPos}deg) rotateY(${xPos}deg)`;
    }
});

// Enhanced Project Cards with Hover Effects
const projectCardElements = document.querySelectorAll('.project-card');
projectCardElements.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Enhanced Skill Bars with Particle Effects
const skillBarElements = document.querySelectorAll('.skill-bar');
skillBarElements.forEach(bar => {
    const progress = bar.querySelector('.progress');
    const width = progress.style.width;
    
    progress.addEventListener('mouseenter', () => {
        const particles = 10;
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.className = 'skill-particle';
            progress.appendChild(particle);
            
            const angle = (i / particles) * 360;
            const velocity = 2 + Math.random() * 2;
            
            particle.style.transform = `rotate(${angle}deg) translateY(-10px)`;
            particle.style.animation = `particleFloat 1s ease-out forwards`;
        }
    });
    
    progress.addEventListener('mouseleave', () => {
        const particles = progress.querySelectorAll('.skill-particle');
        particles.forEach(particle => particle.remove());
    });
});

// Add floating particles to the background
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${3 + Math.random() * 4}s`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        particlesContainer.appendChild(particle);
    }
}

// Enhanced Scroll Progress Indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
});

// Add new styles for enhanced interactivity
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    .particles-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    }
    
    .floating-particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        opacity: 0.3;
        animation: float 3s infinite ease-in-out;
    }
    
    .skill-particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        opacity: 0.6;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); }
        50% { transform: translateY(-20px) translateX(10px); }
    }
    
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: var(--gradient-primary);
        z-index: 1000;
        transition: width 0.1s ease;
    }
    
    .project-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .project-card:hover {
        box-shadow: var(--shadow-lg);
    }
    
    .hero-content {
        transition: transform 0.3s ease;
    }
    
    .skill-bar .progress {
        position: relative;
        overflow: visible;
    }
    
    .skill-bar .progress::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        animation: shimmer 2s infinite;
    }
    
    @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
`;

document.head.appendChild(enhancedStyles);

// Initialize particles
createParticles();

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .shake {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }
    
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: white;
        color: #333;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .notification.success {
        background: #10b981;
        color: white;
    }
    
    .notification i {
        font-size: 1.2rem;
    }
    
    .nav-links a.active {
        color: var(--primary-color);
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
    
    .dark-mode .notification {
        background: #1f2937;
        color: #f3f4f6;
    }
    
    .dark-mode .notification.success {
        background: #059669;
    }
`;
document.head.appendChild(style);

// Add cursor effect
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

const cursorInner = document.createElement('div');
cursorInner.className = 'cursor-inner';
document.body.appendChild(cursorInner);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorInner.style.left = e.clientX + 'px';
        cursorInner.style.top = e.clientY + 'px';
    }, 100);
});

document.addEventListener('mousedown', () => {
    cursor.classList.add('cursor-click');
    cursorInner.classList.add('cursor-inner-click');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('cursor-click');
    cursorInner.classList.remove('cursor-inner-click');
});

// Add cursor styles
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .cursor {
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        transform: translate(-50%, -50%);
    }
    
    .cursor-inner {
        width: 8px;
        height: 8px;
        background: var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        transform: translate(-50%, -50%);
    }
    
    .cursor-click {
        transform: translate(-50%, -50%) scale(0.8);
    }
    
    .cursor-inner-click {
        transform: translate(-50%, -50%) scale(1.5);
    }
    
    a, button, .hamburger, .theme-toggle, .view-project {
        cursor: none;
    }
    
    @media (max-width: 768px) {
        .cursor, .cursor-inner {
            display: none;
        }
        
        a, button, .hamburger, .theme-toggle, .view-project {
            cursor: pointer;
        }
    }
`;
document.head.appendChild(cursorStyle);

// Completely Redesigned About Section with Interactive 3D Cards
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    // Create new structure for About section
    const aboutContent = document.createElement('div');
    aboutContent.className = 'about-content';
    
    // Create profile card
    const profileCard = document.createElement('div');
    profileCard.className = 'profile-card';
    profileCard.innerHTML = `
        <div class="profile-front">
            <div class="profile-image">
                <div class="profile-placeholder">AS</div>
            </div>
            <h3>Abhay Sehdev</h3>
            <p class="profile-title">Creative Technologist & Digital Marketer</p>
            <div class="profile-stats">
                <div class="stat">
                    <span class="stat-value">3+</span>
                    <span class="stat-label">Years Experience</span>
                </div>
                <div class="stat">
                    <span class="stat-value">15+</span>
                    <span class="stat-label">Projects</span>
                </div>
                <div class="stat">
                    <span class="stat-value">5+</span>
                    <span class="stat-label">Certifications</span>
                </div>
            </div>
            <button class="flip-btn">Learn More</button>
        </div>
        <div class="profile-back">
            <h4>About Me</h4>
            <p>I'm a BCA student passionate about web development and digital marketing. I combine technical skills with creative thinking to build engaging digital experiences.</p>
            <div class="profile-details">
                <div class="detail">
                    <i class="fas fa-graduation-cap"></i>
                    <span>BCA Student at JIMS Vasant Kunj</span>
                </div>
                <div class="detail">
                    <i class="fas fa-briefcase"></i>
                    <span>Design Manager at Digitek Club</span>
                </div>
                <div class="detail">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>Based in Delhi, India</span>
                </div>
            </div>
            <button class="flip-btn">Back</button>
        </div>
    `;
    
    // Create experience timeline with 3D cards
    const experienceTimeline = document.createElement('div');
    experienceTimeline.className = 'experience-timeline';
    experienceTimeline.innerHTML = `
        <h3>My Journey</h3>
        <div class="timeline-container">
            <div class="timeline-card" data-year="2024">
                <div class="timeline-content">
                    <div class="timeline-year">2024</div>
                    <h4>Smart India Hackathon</h4>
                    <p>Selected for second round with innovative DDoS protection solution</p>
                </div>
            </div>
            <div class="timeline-card" data-year="2023">
                <div class="timeline-content">
                    <div class="timeline-year">2023</div>
                    <h4>Design Manager</h4>
                    <p>Leading design team at Digitek Club, managing creative projects</p>
                </div>
            </div>
            <div class="timeline-card" data-year="2022">
                <div class="timeline-content">
                    <div class="timeline-year">2022</div>
                    <h4>Digital Marketing Certification</h4>
                    <p>Completed IIMB certification with runner-up achievement</p>
                </div>
            </div>
            <div class="timeline-card" data-year="2021">
                <div class="timeline-content">
                    <div class="timeline-year">2021</div>
                    <h4>Started BCA</h4>
                    <p>Began Bachelor of Computer Applications at JIMS Vasant Kunj</p>
                </div>
            </div>
        </div>
    `;
    
    // Create skills showcase
    const skillsShowcase = document.createElement('div');
    skillsShowcase.className = 'skills-showcase';
    skillsShowcase.innerHTML = `
        <h3>What I Do</h3>
        <div class="skills-grid">
            <div class="skill-card">
                <div class="skill-icon"><i class="fas fa-code"></i></div>
                <h4>Web Development</h4>
                <p>Creating responsive and interactive websites with modern technologies</p>
            </div>
            <div class="skill-card">
                <div class="skill-icon"><i class="fas fa-paint-brush"></i></div>
                <h4>UI/UX Design</h4>
                <p>Designing intuitive user interfaces and engaging user experiences</p>
            </div>
            <div class="skill-card">
                <div class="skill-icon"><i class="fas fa-bullhorn"></i></div>
                <h4>Digital Marketing</h4>
                <p>Implementing effective marketing strategies to grow online presence</p>
            </div>
            <div class="skill-card">
                <div class="skill-icon"><i class="fas fa-mobile-alt"></i></div>
                <h4>Mobile Development</h4>
                <p>Building cross-platform mobile applications with responsive design</p>
            </div>
        </div>
    `;
    
    // Create certifications showcase
    const certificationsShowcase = document.createElement('div');
    certificationsShowcase.className = 'certifications-showcase';
    certificationsShowcase.innerHTML = `
        <h3>Certifications</h3>
        <div class="certifications-slider">
            <div class="certification-card">
                <div class="certification-icon"><i class="fas fa-certificate"></i></div>
                <h4>Digital Marketing - IIMB</h4>
                <p>Runner-up in final project competition</p>
                <button class="view-cert-btn">View Details</button>
            </div>
            <div class="certification-card">
                <div class="certification-icon"><i class="fas fa-award"></i></div>
                <h4>SWAYAM E-Commerce</h4>
                <p>Grade: A+ (95%)</p>
                <button class="view-cert-btn">View Details</button>
            </div>
        </div>
        <div class="slider-controls">
            <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
            <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
        </div>
    `;
    
    // Create quote section
    const quoteSection = document.createElement('div');
    quoteSection.className = 'quote-section';
    quoteSection.innerHTML = `
        <div class="quote-container">
            <i class="fas fa-quote-left quote-icon"></i>
            <blockquote>I love creating digital experiences that make a difference.</blockquote>
            <div class="quote-author">- Abhay Sehdev</div>
        </div>
    `;
    
    // Assemble the new About section
    aboutContent.appendChild(profileCard);
    aboutContent.appendChild(experienceTimeline);
    aboutContent.appendChild(skillsShowcase);
    aboutContent.appendChild(certificationsShowcase);
    aboutContent.appendChild(quoteSection);
    
    // Replace old content with new content
    const oldContent = aboutSection.querySelector('.timeline, .certificates, .quote');
    if (oldContent) {
        oldContent.remove();
    }
    
    aboutSection.appendChild(aboutContent);
    
    // Add 3D card flip functionality
    const flipBtns = profileCard.querySelectorAll('.flip-btn');
    flipBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            profileCard.classList.toggle('flipped');
        });
    });
    
    // Add timeline card animations
    const timelineCards = experienceTimeline.querySelectorAll('.timeline-card');
    timelineCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.animationDelay = `${index * 0.2}s`;
        
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
            card.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'var(--shadow-md)';
        });
    });
    
    // Add skill card animations
    const skillCards = skillsShowcase.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.animationDelay = `${index * 0.15}s`;
        
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'var(--shadow-md)';
        });
    });
    
    // Add certification slider functionality
    const certSlider = certificationsShowcase.querySelector('.certifications-slider');
    const prevBtn = certificationsShowcase.querySelector('.prev-btn');
    const nextBtn = certificationsShowcase.querySelector('.next-btn');
    const certCards = certificationsShowcase.querySelectorAll('.certification-card');
    
    let currentIndex = 0;
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % certCards.length;
        updateSlider();
    });
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + certCards.length) % certCards.length;
        updateSlider();
    });
    
    function updateSlider() {
        const offset = currentIndex * -100;
        certSlider.style.transform = `translateX(${offset}%)`;
    }
    
    // Add certification detail modal functionality
    const viewCertBtns = certificationsShowcase.querySelectorAll('.view-cert-btn');
    viewCertBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Create modal for certificate details
            const modal = document.createElement('div');
            modal.className = 'certificate-modal';
            
            // Add content based on the certificate
            if (index === 0) {
                modal.innerHTML = `
                    <div class="certificate-modal-content">
                        <span class="close-certificate">&times;</span>
                        <h3>Digital Marketing - IIMB</h3>
                        <div class="certificate-details">
                            <p><strong>Issued:</strong> January 2023</p>
                            <p><strong>Duration:</strong> 12 weeks</p>
                            <p><strong>Key Topics:</strong> SEO, Content Marketing, Social Media Strategy, Analytics</p>
                            <p><strong>Achievement:</strong> Runner-up in the final project competition</p>
                        </div>
                        <div class="certificate-actions">
                            <a href="#" class="btn primary">View Certificate</a>
                        </div>
                    </div>
                `;
            } else if (index === 1) {
                modal.innerHTML = `
                    <div class="certificate-modal-content">
                        <span class="close-certificate">&times;</span>
                        <h3>SWAYAM E-Commerce</h3>
                        <div class="certificate-details">
                            <p><strong>Issued:</strong> March 2023</p>
                            <p><strong>Duration:</strong> 8 weeks</p>
                            <p><strong>Key Topics:</strong> E-Commerce Fundamentals, Online Store Setup, Payment Gateways, Digital Marketing</p>
                            <p><strong>Grade:</strong> A+ (95%)</p>
                        </div>
                        <div class="certificate-actions">
                            <a href="#" class="btn primary">View Certificate</a>
                        </div>
                    </div>
                `;
            }
            
            document.body.appendChild(modal);
            
            // Add close functionality
            const closeBtn = modal.querySelector('.close-certificate');
            closeBtn.addEventListener('click', () => {
                modal.remove();
            });
            
            // Close on outside click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });
    
    // Add typing animation to quote
    const blockquote = quoteSection.querySelector('blockquote');
    if (blockquote) {
        const text = blockquote.textContent;
        blockquote.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                blockquote.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing animation when quote is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(quoteSection);
    }
}

// Add styles for the redesigned About section
const aboutRedesignStyles = document.createElement('style');
aboutRedesignStyles.textContent = `
    .about-content {
        display: grid;
        grid-template-columns: 1fr;
        gap: 3rem;
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }
    
    /* Profile Card Styles */
    .profile-card {
        width: 100%;
        max-width: 400px;
        height: 500px;
        margin: 0 auto;
        perspective: 1000px;
        position: relative;
    }
    
    .profile-front, .profile-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        border-radius: var(--border-radius-lg);
        background: var(--bg-color);
        box-shadow: var(--shadow-md);
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
    
    .profile-back {
        transform: rotateY(180deg);
    }
    
    .profile-card.flipped .profile-front {
        transform: rotateY(180deg);
    }
    
    .profile-card.flipped .profile-back {
        transform: rotateY(0);
    }
    
    .profile-image {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background: var(--gradient-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;
        box-shadow: var(--shadow-md);
    }
    
    .profile-placeholder {
        font-size: 3rem;
        font-weight: bold;
        color: white;
    }
    
    .profile-card h3 {
        font-size: 1.8rem;
        margin-bottom: 0.5rem;
        color: var(--primary-color);
    }
    
    .profile-title {
        font-size: 1.1rem;
        color: var(--text-color);
        margin-bottom: 1.5rem;
    }
    
    .profile-stats {
        display: flex;
        justify-content: space-around;
        width: 100%;
        margin: 1.5rem 0;
    }
    
    .stat {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .stat-value {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--primary-color);
    }
    
    .stat-label {
        font-size: 0.9rem;
        color: var(--text-color);
    }
    
    .flip-btn {
        margin-top: 1.5rem;
        padding: 0.8rem 1.5rem;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;
    }
    
    .flip-btn:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow-md);
    }
    
    .profile-details {
        margin: 1.5rem 0;
        width: 100%;
    }
    
    .detail {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        padding: 0.8rem;
        background: rgba(var(--primary-rgb), 0.1);
        border-radius: var(--border-radius-sm);
    }
    
    .detail i {
        color: var(--primary-color);
        margin-right: 1rem;
        font-size: 1.2rem;
    }
    
    /* Experience Timeline Styles */
    .experience-timeline {
        margin: 2rem 0;
    }
    
    .experience-timeline h3 {
        text-align: center;
        margin-bottom: 2rem;
        color: var(--primary-color);
        font-size: 1.8rem;
    }
    
    .timeline-container {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        position: relative;
    }
    
    .timeline-container::before {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: 100%;
        background: var(--gradient-primary);
    }
    
    .timeline-card {
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
        background: var(--bg-color);
        border-radius: var(--border-radius-md);
        box-shadow: var(--shadow-md);
        padding: 1.5rem;
        position: relative;
        transition: all 0.3s ease;
        animation: fadeInUp 0.5s ease forwards;
        opacity: 0;
    }
    
    .timeline-card::before {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        background: var(--gradient-primary);
        border-radius: 50%;
        top: 50%;
        transform: translateY(-50%);
    }
    
    .timeline-card:nth-child(odd)::before {
        left: -10px;
    }
    
    .timeline-card:nth-child(even)::before {
        right: -10px;
    }
    
    .timeline-year {
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--gradient-primary);
        color: white;
        padding: 0.3rem 1rem;
        border-radius: 50px;
        font-weight: bold;
        font-size: 0.9rem;
    }
    
    .timeline-content {
        padding-top: 1.5rem;
    }
    
    .timeline-content h4 {
        color: var(--primary-color);
        margin-bottom: 0.5rem;
    }
    
    /* Skills Showcase Styles */
    .skills-showcase {
        margin: 2rem 0;
    }
    
    .skills-showcase h3 {
        text-align: center;
        margin-bottom: 2rem;
        color: var(--primary-color);
        font-size: 1.8rem;
    }
    
    .skills-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
    }
    
    .skill-card {
        background: var(--bg-color);
        border-radius: var(--border-radius-md);
        box-shadow: var(--shadow-md);
        padding: 2rem;
        text-align: center;
        transition: all 0.3s ease;
        animation: fadeInUp 0.5s ease forwards;
        opacity: 0;
    }
    
    .skill-icon {
        width: 70px;
        height: 70px;
        background: var(--gradient-primary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.5rem;
    }
    
    .skill-icon i {
        font-size: 1.8rem;
        color: white;
    }
    
    .skill-card h4 {
        color: var(--primary-color);
        margin-bottom: 1rem;
    }
    
    /* Certifications Showcase Styles */
    .certifications-showcase {
        margin: 2rem 0;
        position: relative;
        overflow: hidden;
    }
    
    .certifications-showcase h3 {
        text-align: center;
        margin-bottom: 2rem;
        color: var(--primary-color);
        font-size: 1.8rem;
    }
    
    .certifications-slider {
        display: flex;
        transition: transform 0.5s ease;
    }
    
    .certification-card {
        min-width: 100%;
        background: var(--bg-color);
        border-radius: var(--border-radius-md);
        box-shadow: var(--shadow-md);
        padding: 2rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    
    .certification-icon {
        width: 80px;
        height: 80px;
        background: var(--gradient-primary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;
    }
    
    .certification-icon i {
        font-size: 2rem;
        color: white;
    }
    
    .certification-card h4 {
        color: var(--primary-color);
        margin-bottom: 1rem;
    }
    
    .view-cert-btn {
        margin-top: 1.5rem;
        padding: 0.8rem 1.5rem;
        background: transparent;
        color: var(--primary-color);
        border: 2px solid var(--primary-color);
        border-radius: 50px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;
    }
    
    .view-cert-btn:hover {
        background: var(--gradient-primary);
        color: white;
        transform: translateY(-3px);
        box-shadow: var(--shadow-md);
    }
    
    .slider-controls {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 1.5rem;
    }
    
    .prev-btn, .next-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--bg-color);
        border: 2px solid var(--primary-color);
        color: var(--primary-color);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .prev-btn:hover, .next-btn:hover {
        background: var(--gradient-primary);
        color: white;
        transform: translateY(-3px);
        box-shadow: var(--shadow-md);
    }
    
    /* Quote Section Styles */
    .quote-section {
        margin: 3rem 0;
    }
    
    .quote-container {
        background: var(--bg-color);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-md);
        padding: 3rem;
        text-align: center;
        position: relative;
    }
    
    .quote-icon {
        font-size: 3rem;
        color: var(--primary-color);
        opacity: 0.2;
        position: absolute;
        top: 1rem;
        left: 1rem;
    }
    
    .quote-container blockquote {
        font-size: 1.8rem;
        font-style: italic;
        color: var(--text-color);
        margin-bottom: 1.5rem;
        min-height: 3rem;
    }
    
    .quote-author {
        font-weight: bold;
        color: var(--primary-color);
    }
    
    /* Animations */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Dark Mode Styles */
    .dark-mode .profile-front, 
    .dark-mode .profile-back,
    .dark-mode .timeline-card,
    .dark-mode .skill-card,
    .dark-mode .certification-card,
    .dark-mode .quote-container {
        background: var(--dark-bg);
    }
    
    .dark-mode .profile-card h3,
    .dark-mode .timeline-content h4,
    .dark-mode .skill-card h4,
    .dark-mode .certification-card h4,
    .dark-mode .experience-timeline h3,
    .dark-mode .skills-showcase h3,
    .dark-mode .certifications-showcase h3 {
        color: var(--accent-color);
    }
    
    .dark-mode .profile-title,
    .dark-mode .stat-label,
    .dark-mode .detail span,
    .dark-mode .timeline-content p,
    .dark-mode .skill-card p,
    .dark-mode .certification-card p,
    .dark-mode .quote-container blockquote {
        color: var(--dark-text);
    }
    
    .dark-mode .detail {
        background: rgba(var(--accent-rgb), 0.1);
    }
    
    .dark-mode .detail i {
        color: var(--accent-color);
    }
    
    .dark-mode .prev-btn, 
    .dark-mode .next-btn {
        background: var(--dark-bg);
        border-color: var(--accent-color);
        color: var(--accent-color);
    }
    
    .dark-mode .prev-btn:hover, 
    .dark-mode .next-btn:hover {
        background: var(--gradient-secondary);
    }
    
    .dark-mode .view-cert-btn {
        color: var(--accent-color);
        border-color: var(--accent-color);
    }
    
    .dark-mode .view-cert-btn:hover {
        background: var(--gradient-secondary);
    }
    
    .dark-mode .quote-author {
        color: var(--accent-color);
    }
    
    /* Responsive Styles */
    @media (max-width: 768px) {
        .about-content {
            padding: 1rem;
        }
        
        .profile-card {
            height: 450px;
        }
        
        .timeline-container::before {
            left: 20px;
        }
        
        .timeline-card {
            margin-left: 40px;
        }
        
        .timeline-card::before {
            left: -30px !important;
            right: auto !important;
        }
        
        .timeline-year {
            left: 20px;
            transform: translateX(-50%);
        }
        
        .skills-grid {
            grid-template-columns: 1fr;
        }
    }
`;

document.head.appendChild(aboutRedesignStyles);

// Enhanced Home Page with Essential Interactive Elements
const homeSection = document.querySelector('.home');
if (homeSection) {
    // Create dynamic particle system
    const particleSystem = document.createElement('div');
    particleSystem.className = 'particle-system';
    homeSection.insertBefore(particleSystem, homeSection.firstChild);

    // Create interactive text effect
    const interactiveText = document.createElement('div');
    interactiveText.className = 'interactive-text';
    interactiveText.innerHTML = `
        <div class="text-container">
            <span class="text-line">Creative</span>
            <span class="text-line">Innovative</span>
            <span class="text-line">Passionate</span>
        </div>
    `;
    homeSection.appendChild(interactiveText);

    // Create scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = `
        <div class="scroll-text">Scroll to explore</div>
        <div class="scroll-arrow"></div>
    `;
    homeSection.appendChild(scrollIndicator);

    // Add particle animation
    function createParticles() {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${3 + Math.random() * 4}s`;
            particle.style.animationDelay = `${Math.random() * 2}s`;
            particleSystem.appendChild(particle);
        }
    }

    // Add scroll indicator animation
    function animateScrollIndicator() {
        const arrow = scrollIndicator.querySelector('.scroll-arrow');
        arrow.style.animation = 'bounce 2s infinite';
    }

    // Add animated text effect
    function animateText() {
        const textLines = interactiveText.querySelectorAll('.text-line');
        let currentLine = 0;

        function showNextLine() {
            textLines.forEach(line => line.classList.remove('active'));
            textLines[currentLine].classList.add('active');
            currentLine = (currentLine + 1) % textLines.length;
        }

        showNextLine();
        setInterval(showNextLine, 2000);
    }

    // Initialize animations
    createParticles();
    animateScrollIndicator();
    animateText();
}

// Add styles for enhanced home page
const enhancedHomeStyles = document.createElement('style');
enhancedHomeStyles.textContent = `
    /* Particle System */
    .particle-system {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 0;
    }

    .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        opacity: 0.3;
        animation: float 3s infinite ease-in-out;
    }

    /* Scroll Indicator */
    .scroll-indicator {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        z-index: 2;
    }

    .scroll-text {
        font-size: 0.9rem;
        color: var(--text-color);
        opacity: 0.8;
    }

    .scroll-arrow {
        width: 20px;
        height: 20px;
        border-right: 2px solid var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
        transform: rotate(45deg);
    }

    /* Interactive Text */
    .interactive-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        text-align: center;
    }

    .text-container {
        position: relative;
        height: 3rem;
    }

    .text-line {
        position: absolute;
        width: 100%;
        font-size: 2.5rem;
        font-weight: bold;
        color: var(--primary-color);
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease;
    }

    .text-line.active {
        opacity: 1;
        transform: translateY(0);
    }

    /* Animations */
    @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); }
        50% { transform: translateY(-20px) translateX(10px); }
    }

    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0) rotate(45deg); }
        40% { transform: translateY(-10px) rotate(45deg); }
        60% { transform: translateY(-5px) rotate(45deg); }
    }

    /* Dark Mode Styles */
    .dark-mode .particle {
        background: var(--accent-color);
    }

    .dark-mode .scroll-arrow {
        border-color: var(--accent-color);
    }

    .dark-mode .text-line {
        color: var(--accent-color);
    }

    /* Responsive Styles */
    @media (max-width: 768px) {
        .interactive-text {
            top: auto;
            bottom: 8rem;
        }

        .text-container {
            height: 2.5rem;
        }

        .text-line {
            font-size: 2rem;
        }
    }
`;

document.head.appendChild(enhancedHomeStyles);

// Magnetic Cursor Effect
class MagneticCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursorInner = document.createElement('div');
        this.cursor.className = 'magnetic-cursor';
        this.cursorInner.className = 'magnetic-cursor-inner';
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorInner);
        
        this.magneticElements = document.querySelectorAll('.magnetic');
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
            this.cursorInner.style.left = e.clientX + 'px';
            this.cursorInner.style.top = e.clientY + 'px';
            
            this.magneticElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const distanceX = e.clientX - centerX;
                const distanceY = e.clientY - centerY;
                
                const strength = 20;
                const moveX = (distanceX / strength) * -1;
                const moveY = (distanceY / strength) * -1;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
        
        document.addEventListener('mousedown', () => {
            this.cursor.classList.add('clicking');
            this.cursorInner.classList.add('clicking');
        });
        
        document.addEventListener('mouseup', () => {
            this.cursor.classList.remove('clicking');
            this.cursorInner.classList.remove('clicking');
        });
    }
}

// Parallax Effect
class ParallaxEffect {
    constructor() {
        this.parallaxElements = document.querySelectorAll('.parallax');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            this.parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// Skill Badge Effect
class SkillBadgeEffect {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-bar');
        this.init();
    }
    
    init() {
        this.skillBars.forEach(bar => {
            const percent = bar.dataset.percent;
            const skillName = bar.dataset.skill;
            
            const badge = document.createElement('div');
            badge.className = 'skill-badge';
            badge.innerHTML = `
                <div class="badge-icon">
                    <i class="fas fa-star"></i>
                </div>
                <div class="badge-content">
                    <span class="badge-name">${skillName}</span>
                    <span class="badge-percent">${percent}%</span>
                </div>
            `;
            
            bar.appendChild(badge);
            
            bar.addEventListener('mouseenter', () => {
                badge.classList.add('active');
                this.createParticles(badge);
            });
            
            bar.addEventListener('mouseleave', () => {
                badge.classList.remove('active');
            });
        });
    }
    
    createParticles(badge) {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'badge-particle';
            
            const x = (Math.random() - 0.5) * 40;
            const y = (Math.random() - 0.5) * 40;
            
            particle.style.setProperty('--x', `${x}px`);
            particle.style.setProperty('--y', `${y}px`);
            
            badge.appendChild(particle);
            
            particle.style.animation = `particleFloat ${Math.random() * 0.5 + 0.5}s ease-out forwards`;
            
            particle.addEventListener('animationend', () => {
                particle.remove();
            });
        }
    }
}

// Text Split Effect
class TextSplitEffect {
    constructor() {
        this.splitTexts = document.querySelectorAll('.split-text');
        this.init();
    }
    
    init() {
        this.splitTexts.forEach(text => {
            const content = text.textContent;
            text.textContent = '';
            
            content.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.animationDelay = `${index * 0.05}s`;
                text.appendChild(span);
            });
        });
    }
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    new MagneticCursor();
    new ParallaxEffect();
    new SkillBadgeEffect();
    new TextSplitEffect();
    
    // Add magnetic class to buttons and interactive elements
    document.querySelectorAll('button, .btn, .project-card, .skill-card').forEach(element => {
        element.classList.add('magnetic');
    });
    
    // Add parallax class to background elements
    document.querySelectorAll('.shape').forEach((shape, index) => {
        shape.classList.add('parallax');
        shape.setAttribute('data-speed', 0.1 + (index * 0.05));
    });
    
    // Add split-text class to headings
    document.querySelectorAll('h1, h2').forEach(heading => {
        heading.classList.add('split-text');
    });
    
    // Add skill badges to skill bars
    document.querySelectorAll('.skill-bar').forEach(skillBar => {
        const skillInfo = skillBar.querySelector('.skill-info');
        const skillName = skillInfo.querySelector('span:first-child').textContent;
        const skillPercent = skillInfo.querySelector('span:last-child').textContent;
        
        const badge = document.createElement('div');
        badge.className = 'skill-badge';
        badge.innerHTML = `
            <div class="badge-icon"><i class="fas fa-check"></i></div>
            <div class="badge-content">
                <div class="badge-name">${skillName}</div>
                <div class="badge-percent">${skillPercent}</div>
            </div>
        `;
        
        skillBar.appendChild(badge);
    });
}); 