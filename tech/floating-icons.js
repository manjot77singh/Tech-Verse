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
}); 