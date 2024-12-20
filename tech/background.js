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