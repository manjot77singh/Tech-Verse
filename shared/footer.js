document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input').value;
            const button = newsletterForm.querySelector('button');
            const originalButtonText = button.textContent;
            
            // Create message element if it doesn't exist
            let messageEl = newsletterForm.querySelector('.newsletter-message');
            if (!messageEl) {
                messageEl = document.createElement('div');
                messageEl.className = 'newsletter-message';
                newsletterForm.appendChild(messageEl);
            }
            
            try {
                button.textContent = 'Subscribing...';
                button.disabled = true;
                
                // Simulate API call (replace with your actual API endpoint)
                const response = await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });
                
                if (response.ok) {
                    messageEl.textContent = 'Successfully subscribed!';
                    messageEl.className = 'newsletter-message success';
                    newsletterForm.reset();
                } else {
                    throw new Error('Failed to subscribe');
                }
            } catch (error) {
                messageEl.textContent = 'Failed to subscribe. Please try again.';
                messageEl.className = 'newsletter-message error';
            } finally {
                button.textContent = originalButtonText;
                button.disabled = false;
                
                // Clear message after 3 seconds
                setTimeout(() => {
                    messageEl.style.opacity = '0';
                }, 3000);
            }
        });
    }
    
    // Social links hover effect
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-5px) rotate(360deg)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) rotate(0)';
        });
    });
    
    // Quick links animation
    const quickLinks = document.querySelectorAll('.footer-links a');
    quickLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const icon = link.querySelector('svg');
            icon.style.transform = 'scale(1.2) rotate(360deg)';
        });
        
        link.addEventListener('mouseleave', () => {
            const icon = link.querySelector('svg');
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });
}); 