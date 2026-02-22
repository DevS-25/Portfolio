// Cyberpunk Portfolio JavaScript
class CyberPortfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupMatrixBackground();
        this.setupTypingEffect();
        this.setupScrollAnimations();
        this.setupNavigation();
        this.setupSkillBars();
        this.setupContactForm();
        this.setupMobileMenu();
        this.setupGallery();
    }

    // Matrix Rain Background
    setupMatrixBackground() {
        const canvas = document.getElementById('matrix-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Matrix characters
        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");

        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        const draw = () => {
            // Semi-transparent background to create trailing effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00ff00';
            ctx.font = `${fontSize}px 'Fira Code', monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        // Start the matrix animation
        setInterval(draw, 35);
    }

    // Typing Effect
    setupTypingEffect() {
        const typedElement = document.getElementById('typed-text');
        if (!typedElement) return;

        const texts = [
            'Full Stack Developer',
            'AI-ML Enthusiast',
            'Community Builder',
            'Tech Entrepreneur',
            'Photographer',
            'Innovation Leader'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;

        const type = () => {
            const currentText = texts[textIndex];
            
            if (isPaused) {
                isPaused = false;
                setTimeout(type, 1000);
                return;
            }

            if (isDeleting) {
                typedElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isPaused = true;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            setTimeout(type, typeSpeed);
        };

        // Start typing animation
        type();
    }

    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Add animation classes to elements
        document.querySelectorAll('.terminal-window, .project-card, .gallery-item, .skill-category').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    // Navigation
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Active nav link on scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');

                if (scrollPos >= top && scrollPos < top + height) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    // Skill Bars Animation
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const animateSkillBars = () => {
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.setProperty('--target-width', width + '%');
                
                // Animate with delay
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, Math.random() * 500);
            });
        };

        // Observe skills section
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateSkillBars();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(skillsSection);
        }
    }

    // Contact Form
    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            // Simulate form submission
            this.showTerminalMessage('> Sending message...');
            
            setTimeout(() => {
                this.showTerminalMessage('> Message sent successfully!');
                form.reset();
            }, 2000);
        });
    }

    // Mobile Menu
    setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenuBtn.classList.toggle('active');
            });

            // Close menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                });
            });
        }
    }

    // Gallery Lightbox
    setupGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    this.openLightbox(img.src, img.alt);
                }
            });
        });
    }

    // Utility Functions
    showTerminalMessage(message) {
        const terminal = document.querySelector('.contact-form');
        const messageEl = document.createElement('div');
        messageEl.className = 'terminal-message';
        messageEl.style.cssText = `
            color: var(--cyber-green);
            font-family: 'Fira Code', monospace;
            margin-top: 1rem;
            padding: 0.5rem;
            border: 1px solid var(--cyber-border);
            border-radius: 4px;
            background: rgba(0, 255, 0, 0.05);
        `;
        messageEl.textContent = message;
        
        terminal.appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.remove();
        }, 3000);
    }

    openLightbox(src, alt) {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            cursor: pointer;
        `;

        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border: 2px solid var(--cyber-green);
            border-radius: 8px;
            box-shadow: 0 0 30px var(--cyber-green);
        `;

        lightbox.appendChild(img);
        document.body.appendChild(lightbox);

        // Close on click
        lightbox.addEventListener('click', () => {
            lightbox.remove();
        });

        // Close on escape key
        const handleKeyPress = (e) => {
            if (e.key === 'Escape') {
                lightbox.remove();
                document.removeEventListener('keydown', handleKeyPress);
            }
        };
        document.addEventListener('keydown', handleKeyPress);
    }

    // Project Card Interactions
    setupProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.playHoverSound();
            });

            card.addEventListener('click', () => {
                const title = card.querySelector('.project-title').textContent;
                this.showProjectDetails(title);
            });
        });
    }

    playHoverSound() {
        // Create a subtle beep sound effect
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    showProjectDetails(title) {
        // Could be expanded to show more project details
        console.log(`> Opening project: ${title}`);
    }

    // Terminal Command Simulator
    setupTerminalCommands() {
        const terminalInputs = document.querySelectorAll('.form-input, .form-textarea');
        
        terminalInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.borderColor = 'var(--cyber-green)';
                input.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.3)';
            });

            input.addEventListener('blur', () => {
                input.style.borderColor = 'var(--cyber-border)';
                input.style.boxShadow = 'none';
            });

            input.addEventListener('input', () => {
                // Add typing sound effect or visual feedback
                this.addTypingEffect(input);
            });
        });
    }

    addTypingEffect(element) {
        element.style.textShadow = '0 0 5px var(--cyber-green)';
        setTimeout(() => {
            element.style.textShadow = 'none';
        }, 100);
    }

    // Performance Monitoring
    monitorPerformance() {
        // Monitor scroll performance
        let ticking = false;
        
        const updateScrollElements = () => {
            // Update any scroll-based animations
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollElements);
                ticking = true;
            }
        });
    }

    // Easter Eggs
    setupEasterEggs() {
        let konamiCode = [];
        const expectedSequence = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];

        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.code);
            
            if (konamiCode.length > expectedSequence.length) {
                konamiCode.shift();
            }

            if (konamiCode.join(',') === expectedSequence.join(',')) {
                this.activateMatrixMode();
                konamiCode = [];
            }
        });
    }

    activateMatrixMode() {
        document.body.style.filter = 'hue-rotate(120deg)';
        this.showTerminalMessage('> MATRIX MODE ACTIVATED');
        
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 5000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new CyberPortfolio();
    
    // Add loading animation
    const loader = document.createElement('div');
    loader.id = 'cyber-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--cyber-bg);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const loaderText = document.createElement('div');
    loaderText.style.cssText = `
        font-family: 'Fira Code', monospace;
        color: var(--cyber-green);
        font-size: 1.5rem;
        text-shadow: var(--text-shadow-neon);
    `;
    loaderText.textContent = '> Initializing Portfolio...';
    
    loader.appendChild(loaderText);
    document.body.appendChild(loader);

    // Remove loader after initialization
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1500);
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add CSS for mobile menu
const mobileMenuCSS = `
@media (max-width: 768px) {
    .nav-links {
        position: fixed;
        top: 80px;
        right: -100%;
        width: 100%;
        height: calc(100vh - 80px);
        background: var(--terminal-bg);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: right 0.3s ease;
        border-left: 1px solid var(--cyber-border);
    }
    
    .nav-links.active {
        right: 0;
    }
    
    .nav-link {
        font-size: 1.2rem;
        margin: 1rem 0;
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
}
`;

// Inject mobile menu CSS
const style = document.createElement('style');
style.textContent = mobileMenuCSS;
document.head.appendChild(style);

// Add some utility functions for the cyberpunk theme
window.CyberUtils = {
    glitchText: function(element, duration = 2000) {
        const originalText = element.textContent;
        const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
        
        let iteration = 0;
        const interval = setInterval(() => {
            element.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                })
                .join('');
            
            if (iteration >= originalText.length) {
                clearInterval(interval);
            }
            
            iteration += 1 / 3;
        }, 30);
    },
    
    createTerminalWindow: function(title, content) {
        const window = document.createElement('div');
        window.className = 'terminal-window';
        window.innerHTML = `
            <div class="terminal-header">
                <div class="terminal-buttons">
                    <span class="btn-close"></span>
                    <span class="btn-minimize"></span>
                    <span class="btn-maximize"></span>
                </div>
                <div class="terminal-title">${title}</div>
            </div>
            <div class="terminal-body">${content}</div>
        `;
        return window;
    }
};
