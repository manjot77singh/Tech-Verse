class NeuralNetwork {
    constructor() {
        this.canvas = document.getElementById('networkCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        
        this.resize();
        this.init();
        
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.init();
    }

    init() {
        this.nodes = [];
        const numberOfNodes = Math.floor((this.canvas.width * this.canvas.height) / 40000);
        
        for (let i = 0; i < numberOfNodes; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw nodes
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;

            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = '#007bff';
            this.ctx.fill();
        });

        // Draw connections
        this.nodes.forEach((node1, i) => {
            this.nodes.slice(i + 1).forEach(node2 => {
                const distance = Math.hypot(node1.x - node2.x, node1.y - node2.y);
                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(node1.x, node1.y);
                    this.ctx.lineTo(node2.x, node2.y);
                    this.ctx.strokeStyle = `rgba(0, 123, 255, ${1 - distance / 150})`;
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    const network = new NeuralNetwork();
    network.animate();

    // Initialize tilt effect
    VanillaTilt.init(document.querySelectorAll(".resource-card"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
    });

    // Enhanced scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animate all text elements
    const textElements = document.querySelectorAll('.banner-content h2, .card-inner h3, .card-inner p');
    textElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-50px)';
        revealOnScroll.observe(element);
    });

    // Add hover effect for smooth text reveal
    document.querySelectorAll('.resource-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const texts = card.querySelectorAll('h3, p');
            texts.forEach((text, index) => {
                text.style.transition = 'all 0.3s ease';
                text.style.transitionDelay = `${index * 0.1}s`;
                text.style.opacity = '1';
                text.style.transform = 'translateX(0)';
            });
        });
    });

    // Enhanced card interactions
    document.querySelectorAll('.resource-card').forEach((card, index) => {
        // Staggered entrance animation
        card.style.animationDelay = `${index * 0.2}s`;

        // Magnetic effect on hover
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            card.style.transform = `perspective(1000px) 
                rotateX(${deltaY * 10}deg) 
                rotateY(${deltaX * 10}deg) 
                translateZ(20px)`;
            
            const icon = card.querySelector('.icon-wrapper');
            icon.style.transform = `translate(${deltaX * 10}px, ${deltaY * 10}px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            const icon = card.querySelector('.icon-wrapper');
            icon.style.transform = 'translate(0, 0)';
        });

        // Click effect
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });

        // Glowing effect on hover
        const updateGlow = (e, card) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--glow-x', `${x}px`);
            card.style.setProperty('--glow-y', `${y}px`);
        };

        card.addEventListener('mousemove', (e) => updateGlow(e, card));
    });
});
