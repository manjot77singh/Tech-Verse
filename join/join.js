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
    VanillaTilt.init(document.querySelectorAll(".pricing-card"), {
        max: 5,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });

    // Add hover effects for cards
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});
