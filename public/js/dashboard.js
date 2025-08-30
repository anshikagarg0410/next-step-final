// Navigation Functions
function exploreAllMatches() {
    alert('Exploring all career matches... This would navigate to a detailed careers page.');
}

function viewAllInternships() {
    alert('Viewing all internships... This would navigate to the internships page.');
}

function signout() {
    if (confirm("Are you sure you want to sign out?")) {
        // Clear session data (in a real environment)
        // sessionStorage.clear();
        // localStorage.clear();

        // Navigate to login page using correct relative path
        window.location.href = "/";
    }
}

// Tab Switching Function
function switchTab(tabName) {
    const allTabs = document.querySelectorAll('.tab-btn');
    const allPanels = document.querySelectorAll('.tab-panel');
    
    allTabs.forEach(tab => tab.classList.remove('active'));
    allPanels.forEach(panel => panel.classList.remove('active'));
    
    const activeTab = document.querySelector(`[onclick="switchTab('${tabName}')"]`);
    const activePanel = document.getElementById(tabName);
    
    if (activeTab && activePanel) {
        activeTab.classList.add('active');
        activePanel.classList.add('active');
    }
}

// Animation Functions
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill, .skill-fill, .level-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width || getComputedStyle(bar).width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString() + ' XP';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function animateStatNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach((element, index) => {
        const text = element.textContent;
        const isPercentage = text.includes('%');
        const value = parseInt(text.replace('%', ''));
        
        if (!isNaN(value)) {
            let counter = 0;
            const increment = value / 50;
            const timer = setInterval(() => {
                counter += increment;
                if (counter >= value) {
                    counter = value;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(counter) + (isPercentage ? '%' : '');
            }, 30);
        }
    });
}

// Smooth scroll function
function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize animations on page load
window.addEventListener('load', function() {
    setTimeout(() => {
        animateProgressBars();
    }, 500);
    
    setTimeout(() => {
        const xpElement = document.querySelector('.xp-amount');
        if (xpElement) {
            animateCounter(xpElement, 0, 3500, 2000);
        }
    }, 1000);
    
    setTimeout(() => {
        animateStatNumbers();
    }, 1500);
});

// Intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.card, .achievement-card, .goal-item');
    animateElements.forEach(element => {
        observer.observe(element);
    });
});

// Hover effects
document.addEventListener('DOMContentLoaded', function() {
    const jobItems = document.querySelectorAll('.job-item');
    jobItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    const courseItems = document.querySelectorAll('.course-item');
    courseItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.3s ease';
            this.style.boxShadow = '0 4px 20px rgba(106, 13, 173, 0.15)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Responsive navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');
    
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.display = 'none';
    mobileMenuBtn.style.background = 'transparent';
    mobileMenuBtn.style.border = 'none';
    mobileMenuBtn.style.fontSize = '20px';
    mobileMenuBtn.style.color = 'var(--primary)';
    mobileMenuBtn.style.cursor = 'pointer';
    
    header.insertBefore(mobileMenuBtn, document.querySelector('.sign-out'));
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'var(--light-bg)';
        navLinks.style.flexDirection = 'column';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    });
    
    function handleResize() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
            navLinks.style.display = 'none';
        } else {
            mobileMenuBtn.style.display = 'none';
            navLinks.style.display = 'flex';
            navLinks.style.position = 'static';
            navLinks.style.flexDirection = 'row';
            navLinks.style.background = 'transparent';
            navLinks.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
});

// Loading state for buttons
function addLoadingState(button, duration = 2000) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;
    button.style.opacity = '0.7';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.opacity = '1';
    }, duration);
}

document.addEventListener('DOMContentLoaded', function() {
    const exploreBtn = document.querySelector('.explore-btn');
    const viewAllBtn = document.querySelector('.view-all-btn');
    
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            addLoadingState(this);
        });
    }
    
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            addLoadingState(this);
        });
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});
document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach((bar, index) => {
        const percentage = bar.style.width;
        bar.setAttribute('role', 'progressbar');
        bar.setAttribute('aria-valuenow', parseInt(percentage));
        bar.setAttribute('aria-valuemin', '0');
        bar.setAttribute('aria-valuemax', '100');
    });
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.setAttribute('role', 'tab');
        if (button.classList.contains('active')) {
            button.setAttribute('aria-selected', 'true');
        } else {
            button.setAttribute('aria-selected', 'false');
        }
    });
    
    const tabPanels = document.querySelectorAll('.tab-panel');
    tabPanels.forEach((panel, index) => {
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', `tab-${index}`);
    });
});

// ✅ Signout event listener
document.addEventListener('DOMContentLoaded', function() {
    const signoutBtn = document.querySelector('.signout'); // <-- yaha change
    if (signoutBtn) {
        signoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            signout();
        });
    }
});
