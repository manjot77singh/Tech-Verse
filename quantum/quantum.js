document.addEventListener('DOMContentLoaded', () => {
    // Enhanced mouse effect for principle cards
    const cards = document.querySelectorAll('.principle-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Update CSS variables for gradient
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            // 3D rotation effect
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(10px)
                scale(1.02)
            `;
            
            // Dynamic shadow based on mouse position
            const shadowX = (x - centerX) / 10;
            const shadowY = (y - centerY) / 10;
            card.style.boxShadow = `
                ${shadowX}px ${shadowY}px 30px rgba(0, 255, 255, 0.2),
                ${-shadowX}px ${-shadowY}px 30px rgba(255, 0, 255, 0.2)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            card.style.boxShadow = 'none';
        });
    });

    // Enhanced hover effect for application items
    const appItems = document.querySelectorAll('.app-item');
    
    appItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.app-icon');
            icon.style.transform = 'scale(1.1) rotate(360deg)';
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            item.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
        
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const icon = item.querySelector('.app-icon');
            const deltaX = (x - rect.width / 2) / 20;
            const deltaY = (y - rect.height / 2) / 20;
            
            icon.style.transform = `
                scale(1.1) 
                rotate(360deg) 
                translate(${deltaX}px, ${deltaY}px)
            `;
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.app-icon');
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });

    // Quantum particles background effect
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const container = document.querySelector('.quantum-particles');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    container.appendChild(canvas);

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            hue: Math.random() * 60 + 180 // Blue to cyan range
        });
    }

    function animate() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${particle.hue}, 100%, 50%, 0.8)`;
            ctx.fill();

            // Draw connections
            particles.forEach(other => {
                const dx = other.x - particle.x;
                const dy = other.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.strokeStyle = `hsla(${particle.hue}, 100%, 50%, ${0.2 - distance / 500})`;
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});