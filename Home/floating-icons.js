class FloatingTechIcons {
    constructor() {
        this.container = document.querySelector('.tech-icons-container');
        this.icons = [
            {
                name: 'ai',
                path: 'M21 10.5h-6.5V4c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1v6.5H3c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h6.5V22c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-6.5H21c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1z'
            },
            {
                name: 'chip',
                path: 'M6 4h12v2H6zm0 14h12v2H6zM6 8h12v8H6z'
            },
            {
                name: 'code',
                path: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z'
            },
            {
                name: 'data',
                path: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H6v-2h6v2zm4-4H6v-2h10v2zm0-4H6V7h10v2z'
            },
            {
                name: 'network',
                path: 'M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z'
            },
            {
                name: 'security',
                path: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z'
            }
        ];
        
        this.init();
    }

    createIcon(iconData, index) {
        const icon = document.createElement('div');
        icon.className = 'tech-icon';
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        svg.setAttribute('viewBox', '0 0 24 24');
        path.setAttribute('d', iconData.path);
        
        svg.appendChild(path);
        icon.appendChild(svg);

        // Random position and animation
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 100);
        const duration = 10 + Math.random() * 20;
        const delay = -Math.random() * 20;

        icon.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            animation: floatAnimation ${duration}s infinite ${delay}s;
        `;

        return icon;
    }

    addInteractivity() {
        let activeIcon = null;
        const icons = document.querySelectorAll('.tech-icon');

        icons.forEach(icon => {
            icon.addEventListener('mouseover', () => {
                activeIcon = icon;
                icon.classList.add('highlight');
            });

            icon.addEventListener('mouseout', () => {
                icon.classList.remove('highlight');
                activeIcon = null;
            });
        });

        // Parallax effect
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            icons.forEach(icon => {
                if (icon !== activeIcon) {
                    const rect = icon.getBoundingClientRect();
                    const x = (mouseX - 0.5) * 40;
                    const y = (mouseY - 0.5) * 40;
                    
                    icon.style.transform = `translate(${x}px, ${y}px)`;
                }
            });
        });
    }

    randomHighlight() {
        const icons = document.querySelectorAll('.tech-icon');
        let lastHighlight = null;

        setInterval(() => {
            if (lastHighlight) {
                lastHighlight.classList.remove('highlight');
            }
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];
            randomIcon.classList.add('highlight');
            lastHighlight = randomIcon;
        }, 3000);
    }

    init() {
        // Create and add icons
        this.icons.forEach((icon, index) => {
            const iconElement = this.createIcon(icon, index);
            this.container.appendChild(iconElement);
        });

        this.addInteractivity();
        this.randomHighlight();
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new FloatingTechIcons();
}); 