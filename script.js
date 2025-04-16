// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Coffee menu hover effects
const coffeeItems = document.querySelectorAll('.coffee-item');
coffeeItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.02)';
        item.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        item.style.transition = 'all 0.3s ease';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
        item.style.boxShadow = 'none';
    });
});

// Current date and time display
function updateDateTime() {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dateTimeElement = document.createElement('p');
    dateTimeElement.id = 'current-datetime';
    dateTimeElement.textContent = `Today is ${days[now.getDay()]}, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    dateTimeElement.style.fontSize = '0.9em';
    dateTimeElement.style.color = '#666';
    
    const existingDateTime = document.getElementById('current-datetime');
    if (existingDateTime) {
        existingDateTime.replaceWith(dateTimeElement);
    } else {
        document.querySelector('header').appendChild(dateTimeElement);
    }
}

// Initialize and update time every minute
updateDateTime();
setInterval(updateDateTime, 60000);

// Special offer banner
function showSpecialOffer() {
    if (localStorage.getItem('offerClosed')) return
    
    const offerBanner = document.createElement('div');
    offerBanner.id = 'special-offer';
    offerBanner.innerHTML = `
        <p>☕ Happy Hour! 2-4pm daily - 20% off all drinks!</p>
        <button id="close-offer">×</button>
    `;
    offerBanner.style.position = 'fixed';
    offerBanner.style.bottom = '0';
    offerBanner.style.left = '0';
    offerBanner.style.right = '0';
    offerBanner.style.backgroundColor = '#4a2c12';
    offerBanner.style.color = 'white';
    offerBanner.style.padding = '10px';
    offerBanner.style.textAlign = 'center';
    offerBanner.style.zIndex = '1000';
    
    document.body.appendChild(offerBanner);
    
    document.getElementById('close-offer').addEventListener('click', () => {
        offerBanner.style.display = 'none';
        localStorage.setItem('offerClosed', 'true');
    });
}

// Show offer during business hours (7am-7pm)
const currentHour = new Date().getHours();
if (currentHour >= 7 && currentHour < 19) {
    showSpecialOffer();
}

// Add to cart functionality
document.querySelectorAll('.coffee-item').forEach(item => {
    const addButton = document.createElement('button');
    addButton.textContent = 'Add to Order';
    addButton.style.cssText = `
        margin-top: 10px;
        padding: 5px 10px;
        background-color: #4a2c12;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    `;
    
    addButton.addEventListener('click', () => {
        const itemName = item.querySelector('h3').textContent;
        const itemPrice = item.querySelector('p').textContent.match(/\$\d+\.\d+/)[0];
        
        // Update cart counter
        let cartCounter = document.getElementById('cart-counter');
        if (!cartCounter) {
            cartCounter = document.createElement('span');
            cartCounter.id = 'cart-counter';
            cartCounter.style.cssText = `
                position: absolute;
                top: -5px;
                right: -5px;
                background-color: red;
                color: white;
                border-radius: 50%;
                width: 18px;
                height: 18px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 12px;
            `;
            
            const cartIcon = document.querySelector('nav a[href="#cart"]') || document.querySelector('nav a:last-child');
            if (cartIcon) {
                cartIcon.style.position = 'relative';
                cartIcon.appendChild(cartCounter);
            }
        }
        
        cartCounter.textContent = (parseInt(cartCounter.textContent) || 0) + 1;
        
        // Show confirmation
        const confirmation = document.createElement('div');
        confirmation.textContent = `Added ${itemName} to your order!`;
        confirmation.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #4a2c12;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1000;
        `;
        document.body.appendChild(confirmation);
        
        setTimeout(() => {
            confirmation.style.opacity = '0';
            setTimeout(() => document.body.removeChild(confirmation), 500);
        }, 2000);
    });
    
    item.appendChild(addButton);
});

// Dark mode toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.id = 'dark-mode-toggle';
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #4a2c12;
    color: white;
    border: none;
    cursor: pointer;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
`;

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        document.body.style.backgroundColor = '#1a1a1a';
        document.body.style.color = '#f0f0f0';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
    }
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    document.body.style.backgroundColor = '#1a1a1a';
    document.body.style.color = '#f0f0f0';
}

document.body.appendChild(darkModeToggle);