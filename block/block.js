document.addEventListener('DOMContentLoaded', () => {
    // Blockchain network animation
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const container = document.querySelector('.blockchain-network');
    
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    container.appendChild(canvas);

    const nodes = [];
    const connections = [];
    const numNodes = 20;

    // Create nodes
    for (let i = 0; i < numNodes; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: 3
        });
    }

    // Create connections
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (Math.random() < 0.3) {
                connections.push([i, j]);
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw connections
        ctx.strokeStyle = 'rgba(0, 123, 255, 0.2)';
        ctx.lineWidth = 1;

        connections.forEach(([i, j]) => {
            const nodeA = nodes[i];
            const nodeB = nodes[j];
            const distance = Math.hypot(nodeA.x - nodeB.x, nodeA.y - nodeB.y);

            if (distance < 200) {
                ctx.beginPath();
                ctx.moveTo(nodeA.x, nodeA.y);
                ctx.lineTo(nodeB.x, nodeB.y);
                ctx.stroke();

                // Animate data transfer
                const time = Date.now() / 1000;
                const pos = (Math.sin(time + i + j) + 1) / 2;
                const dataX = nodeA.x + (nodeB.x - nodeA.x) * pos;
                const dataY = nodeA.y + (nodeB.y - nodeA.y) * pos;

                ctx.fillStyle = '#007bff';
                ctx.beginPath();
                ctx.arc(dataX, dataY, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        // Update and draw nodes
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    });

    // Glitch text effect
    const glitchText = document.querySelector('.glitch-text');
    
    function createGlitchAnimation() {
        const intensity = Math.random() * 0.3;
        const offsetX = (Math.random() - 0.5) * 10;
        const offsetY = (Math.random() - 0.5) * 10;
        const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        
        glitchText.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        glitchText.style.textShadow = `${offsetX}px ${offsetY}px ${intensity}px ${color}`;
        
        setTimeout(() => {
            glitchText.style.transform = 'none';
            glitchText.style.textShadow = '0 0 10px rgba(0, 123, 255, 0.5)';
        }, 50);
    }

    setInterval(createGlitchAnimation, 2000);
});
