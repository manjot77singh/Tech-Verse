class NeuralNetwork {
    constructor() {
        this.canvas = document.getElementById('networkCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.animationFrame = null;
        
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
        // Create nodes
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

    drawNode(node) {
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = '#007bff';
        this.ctx.fill();
    }

    drawConnection(node1, node2, distance) {
        const opacity = 1 - (distance / 150);
        if (opacity > 0) {
            this.ctx.beginPath();
            this.ctx.moveTo(node1.x, node1.y);
            this.ctx.lineTo(node2.x, node2.y);
            this.ctx.strokeStyle = `rgba(0, 123, 255, ${opacity})`;
            this.ctx.stroke();
        }
    }

    updateNodes() {
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            // Bounce off edges
            if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections
        this.ctx.lineWidth = 0.3;
        this.nodes.forEach((node1, i) => {
            this.nodes.slice(i + 1).forEach(node2 => {
                const distance = Math.hypot(node1.x - node2.x, node1.y - node2.y);
                if (distance < 150) {
                    this.drawConnection(node1, node2, distance);
                }
            });
        });

        // Draw nodes
        this.nodes.forEach(node => this.drawNode(node));
    }

    animate() {
        this.updateNodes();
        this.draw();
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }

    start() {
        if (!this.animationFrame) {
            this.animate();
        }
    }

    stop() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }
}

// Create floating particles effect
class ParticleEffect {
    constructor() {
        this.particles = document.querySelector('.particles');
        this.createParticles();
    }

    createParticles() {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(0, 123, 255, ${Math.random() * 0.5 + 0.25});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 5}s linear infinite;
                box-shadow: 0 0 ${Math.random() * 10 + 5}px rgba(0, 123, 255, 0.5);
            `;
            this.particles.appendChild(particle);
        }
    }
}

// Initialize both effects when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const network = new NeuralNetwork();
    network.start();
    
    const particles = new ParticleEffect();
});
class FloatingIcons {
    constructor() {
        this.container = document.querySelector('.floating-icons');
        this.icons = [
            {
                name: 'ai-brain',
                path: 'M12 2a9 9 0 0 0-9 9c0 4.97 4.03 9 9 9s9-4.03 9-9A9 9 0 0 0 12 2zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3V7z'
            },
            {
                name: 'data-analytics',
                path: 'M3 3v18h18v-2H5V3H3zm14 14l-4-4-2 2-4-4-2 2v4h12v-4z'
            },
            {
                name: 'cloud-computing',
                path: 'M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z'
            },
            {
                name: 'blockchain',
                path: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v5.7c0 4.83-3.4 9.16-7 10.42-3.6-1.26-7-5.59-7-10.42V6.3l7-3.12z'
            },
            {
                name: 'quantum',
                path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'
            },
            {
                name: 'machine-learning',
                path: 'M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z'
            }
        ];
        
        this.init();
    }

    createSVGIcon(pathData) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        svg.setAttribute('viewBox', '0 0 24 24');
        path.setAttribute('d', pathData);
        svg.appendChild(path);
        
        return svg;
    }

    createIcon(icon, index) {
        const div = document.createElement('div');
        div.className = 'tech-icon';
        div.appendChild(this.createSVGIcon(icon.path));

        // Random position
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 100);
        
        // Set initial position and animation
        div.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            animation: floatIcon ${5 + Math.random() * 5}s ease-in-out infinite;
            animation-delay: ${index * 0.2}s;
        `;

        return div;
    }

    addHighlightEffect() {
        const icons = document.querySelectorAll('.tech-icon');
        let lastHighlight = null;

        setInterval(() => {
            if (lastHighlight) {
                lastHighlight.classList.remove('highlight');
            }
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];
            randomIcon.classList.add('highlight');
            lastHighlight = randomIcon;
        }, 2000);
    }

    init() {
        // Create and add icons
        this.icons.forEach((icon, index) => {
            const iconElement = this.createIcon(icon, index);
            this.container.appendChild(iconElement);
        });

        // Add mouse interaction
        this.container.addEventListener('mousemove', (e) => {
            const icons = document.querySelectorAll('.tech-icon');
            icons.forEach(icon => {
                const rect = icon.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                const distance = Math.hypot(e.clientX - x, e.clientY - y);
                
                if (distance < 100) {
                    const angle = Math.atan2(e.clientY - y, e.clientX - x);
                    const force = (100 - distance) / 10;
                    icon.style.transform = `translate(${-Math.cos(angle) * force}px, ${-Math.sin(angle) * force}px) scale(${1 + force/50})`;
                } else {
                    icon.style.transform = '';
                }
            });
        });

        // Start highlight effect
        this.addHighlightEffect();
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new FloatingIcons();
})
class TechIcons {
    constructor() {
        this.container = document.querySelector('.floating-icons');
        this.icons = [
            // AI & Machine Learning Icons
            {
                name: 'neural-network',
                path: 'M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 4h6v2H9V4zm11 16H4V8h16v12z'
            },
            {
                name: 'robot',
                path: 'M12 2a9 9 0 0 0-9 9c0 4.97 4.03 9 9 9s9-4.03 9-9A9 9 0 0 0 12 2zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z'
            },
            // Data & Analytics
            {
                name: 'data',
                path: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z'
            },
            {
                name: 'algorithm',
                path: 'M15 7v4h1v2h-3V7h2zm-4 4h1v6h-1v-6zm-3 2h1v4H8v-4zm-3 0h1v4H5v-4z'
            },
            // Cybersecurity
            {
                name: 'security',
                path: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z'
            },
            // Cloud & Infrastructure
            {
                name: 'cloud',
                path: 'M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z'
            }
        ];
        
        this.init();
    }

    createIcon(iconData) {
        const icon = document.createElement('div');
        icon.className = 'floating-tech-icon';
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        svg.setAttribute('viewBox', '0 0 24 24');
        path.setAttribute('d', iconData.path);
        
        svg.appendChild(path);
        icon.appendChild(svg);

        // Random position and animation properties
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const scale = 0.5 + Math.random() * 1;
        const duration = 15 + Math.random() * 15;
        const delay = Math.random() * -20;

        icon.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            transform: scale(${scale});
            animation: floatAnimation ${duration}s infinite ${delay}s;
        `;

        return icon;
    }

    addInteractivity(icon) {
        icon.addEventListener('mouseover', () => {
            icon.style.transform = 'scale(1.5)';
            icon.style.filter = 'brightness(1.5) drop-shadow(0 0 10px rgba(0, 123, 255, 0.8))';
        });

        icon.addEventListener('mouseout', () => {
            icon.style.transform = '';
            icon.style.filter = '';
        });
    }

    animateIcons() {
        const icons = document.querySelectorAll('.floating-tech-icon');
        icons.forEach(icon => {
            const x = Math.random() * 100 - 50;
            const y = Math.random() * 100 - 50;
            const rotation = Math.random() * 360;
            
            icon.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
        });
    }

    init() {
        // Create and add icons
        this.icons.forEach(iconData => {
            const icon = this.createIcon(iconData);
            this.container.appendChild(icon);
            this.addInteractivity(icon);
        });

        // Add mouse parallax effect
        document.addEventListener('mousemove', (e) => {
            const icons = document.querySelectorAll('.floating-tech-icon');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            icons.forEach(icon => {
                const rect = icon.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const distanceX = (e.clientX - centerX) * 0.01;
                const distanceY = (e.clientY - centerY) * 0.01;
                
                icon.style.transform = `translate(${-distanceX}px, ${-distanceY}px)`;
            });
        });
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TechIcons();
}); 