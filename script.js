// Smart Education Platform JavaScript

// Global variables
let currentUser = {
    name: 'Student',
    progress: 78,
    studyTime: 24,
    completedCourses: 1,
    streak: 7
};

let courses = {
    programming: { progress: 0, enrolled: false },
    ai: { progress: 0, enrolled: false },
    'data-science': { progress: 0, enrolled: false },
    'web-development': { progress: 0, enrolled: false },
    'ui-ux-design': { progress: 0, enrolled: false }
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    updateAnalytics();
    animateElements();
    initializeDarkMode();
});

// Initialize Application
function initializeApp() {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });

    // Initialize progress charts
    drawProgressChart();
    
    // Load user data from localStorage if available
    loadUserData();
    
    // Check authentication state and update UI
    checkAuthenticationState();
}

// Setup Event Listeners
function setupEventListeners() {
    // Enhanced navigation toggle for mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileNav);
    }

    // Enhanced smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            smoothScrollToSection(targetId);
            closeMobileNav(); // Close mobile menu after clicking
        });
    });

    // Feature card interactions with touch support (modal disabled)
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        // Remove click functionality - no modal will open
        
        // Keep only visual touch feedback
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Enhanced course progress simulation with touch support
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        const progressBar = card.querySelector('.progress');
        
        // Mouse events for desktop
        card.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                simulateProgress(progressBar);
            }
        });
        
        // Touch events for mobile
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            simulateProgress(progressBar);
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Initialize enhanced features
    addTouchInteractions();
    addAccessibilityFeatures();
    optimizePerformance();
    
    // Initialize mobile-specific features
    addMobileGestures();
    addMobileKeyboardSupport();
    optimizeMobilePerformance();
    
    // Handle initial resize
    handleResize();
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification container if it doesn't exist
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
        `;
        document.body.appendChild(container);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    const typeColors = {
        success: '#4CAF50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196F3'
    };
    
    notification.style.cssText = `
        background: white;
        color: #333;
        padding: 1rem;
        margin-bottom: 10px;
        border-radius: 8px;
        border-left: 4px solid ${typeColors[type] || typeColors.info};
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: space-between;
    `;
    
    // Handle multiline messages
    const messageContent = message.split('\n').map(line => `<div>${line}</div>`).join('');
    
    notification.innerHTML = `
        <div style="flex: 1; line-height: 1.5;">${messageContent}</div>
        <button style="background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #666; margin-left: 1rem;" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    container.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Hero Section Functions
function startLearning() {
    // Direct scroll to courses section without popup notification
    document.querySelector('#courses').scrollIntoView({ behavior: 'smooth' });
    
    // Simulate enrollment in first course
    setTimeout(() => {
        const firstCourse = document.querySelector('.course-card .progress');
        if (firstCourse) {
            simulateProgress(firstCourse);
        }
    }, 1000);
}

function viewProgress() {
    // Direct scroll to analytics section without popup notification
    const analyticsSection = document.querySelector('#analytics');
    if (analyticsSection) {
        analyticsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Add highlight effect to analytics section
        analyticsSection.classList.add('highlight-section');
        setTimeout(() => {
            analyticsSection.classList.remove('highlight-section');
        }, 2000);
        
        // Update progress display with latest data
        updateProgressDisplay();
    }
}

function exploreFeatures() {
    try {
        const featuresSection = document.querySelector('#features');
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Highlight features one by one without popup notifications
        const features = document.querySelectorAll('.feature-card');
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.transform = 'scale(1.05)';
                feature.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
                setTimeout(() => {
                    feature.style.transform = 'scale(1)';
                    feature.style.boxShadow = '';
                }, 500);
            }, index * 300);
        });
        
    } catch (error) {
        console.error('Error in exploreFeatures:', error);
        // Error handling without popup notification
    }
}


// Missing utility functions
function simulateProgress(progressBar) {
    if (progressBar) {
        const currentWidth = parseFloat(progressBar.style.width) || 0;
        const targetWidth = Math.min(currentWidth + Math.random() * 20, 100);
        progressBar.style.transition = 'width 0.5s ease';
        progressBar.style.width = targetWidth + '%';
    }
}

function animateElements() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100);
        }, index * 100);
    });
}

function updateAnalytics() {
    // Update analytics numbers with animation
    const analyticsNumbers = document.querySelectorAll('.stat-number');
    analyticsNumbers.forEach(number => {
        const target = parseInt(number.textContent);
        animateNumber(number, 0, target, 2000);
    });
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = element.textContent.includes('%') ? current + '%' : current + (element.textContent.includes('h') ? 'h' : '');
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

function drawProgressChart() {
    const canvas = document.getElementById('progressChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw a simple progress visualization
    const progress = 0.78; // 78%
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 30;
    
    // Background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 6;
    ctx.stroke();
    
    // Progress arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * progress);
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.stroke();
}

function loadUserData() {
    // Load user data from localStorage if available
    const savedUser = localStorage.getItem('smartEducationUser');
    const savedCourses = localStorage.getItem('smartEducationCourses');
    
    if (savedUser) {
        try {
            currentUser = { ...currentUser, ...JSON.parse(savedUser) };
        } catch (e) {
            console.warn('Could not load user data:', e);
        }
    }
    
    if (savedCourses) {
        try {
            courses = { ...courses, ...JSON.parse(savedCourses) };
        } catch (e) {
            console.warn('Could not load course data:', e);
        }
    }
}

// Check authentication state and update UI accordingly
function checkAuthenticationState() {
    const authToken = localStorage.getItem('authToken');
    const currentUserData = localStorage.getItem('currentUser');
    
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const userMenu = document.querySelector('.user-menu');
    const userName = document.querySelector('.user-name');
    
    if (authToken && currentUserData) {
        // User is logged in
        try {
            const user = JSON.parse(currentUserData);
            
            // Hide login/signup buttons
            if (loginBtn) loginBtn.style.display = 'none';
            if (signupBtn) signupBtn.style.display = 'none';
            
            // Show user menu
            if (userMenu) userMenu.style.display = 'flex';
            
            // Update user name
            if (userName) {
                const displayName = user.firstName ? `${user.firstName} ${user.lastName}` : user.email;
                userName.textContent = displayName;
            }
            
            // Update global currentUser object
            currentUser.name = user.firstName ? `${user.firstName} ${user.lastName}` : user.email;
            currentUser.email = user.email;
            
        } catch (error) {
            console.error('Error parsing user data:', error);
            // Clear invalid data
            localStorage.removeItem('authToken');
            localStorage.removeItem('currentUser');
            showLoggedOutState();
        }
    } else {
        // User is not logged in
        showLoggedOutState();
    }
}

// Show logged out state
function showLoggedOutState() {
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const userMenu = document.querySelector('.user-menu');
    
    // Show login/signup buttons
    if (loginBtn) loginBtn.style.display = 'inline-block';
    if (signupBtn) signupBtn.style.display = 'inline-block';
    
    // Hide user menu
    if (userMenu) userMenu.style.display = 'none';
}

// Global logout function (backup in case auth.js logout doesn't work)
function logoutUser() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    
    showNotification('You have been logged out successfully!', 'success');
    
    // Update UI to logged out state
    showLoggedOutState();
    
    // Redirect after showing message
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
}

// Make logout globally available
window.logout = logoutUser;

function saveUserData() {
    try {
        localStorage.setItem('smartEducationUser', JSON.stringify(currentUser));
        localStorage.setItem('smartEducationCourses', JSON.stringify(courses));
    } catch (e) {
        console.warn('Could not save user data:', e);
    }
}

function trackLearningActivity(activity, details) {
    try {
        const timestamp = new Date().toISOString();
        const activityData = {
            activity,
            details,
            timestamp,
            user: currentUser.name
        };
        
        // Save to localStorage for analytics
        const existingActivities = JSON.parse(localStorage.getItem('learningActivities') || '[]');
        existingActivities.push(activityData);
        
        // Keep only last 100 activities
        if (existingActivities.length > 100) {
            existingActivities.splice(0, existingActivities.length - 100);
        }
        
        localStorage.setItem('learningActivities', JSON.stringify(existingActivities));
        
        console.log('Activity tracked:', activity, details);
    } catch (e) {
        console.warn('Could not track activity:', e);
    }
}

// Mobile Navigation Functions
function toggleMobileNav() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.toggle('mobile-active');
        navToggle.classList.toggle('active');
        
        // Toggle body scroll
        if (navMenu.classList.contains('mobile-active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        if (navToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    }
}

function closeMobileNav() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.remove('mobile-active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset hamburger icon
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    }
}

// Course Management
function startCourse(courseId) {
    if (!courses[courseId].enrolled) {
        courses[courseId].enrolled = true;
        courses[courseId].progress = 5;
        
        // Course enrollment without popup notification
        updateCourseProgress(courseId);
        saveUserData();
        
        // Animate progress bar
        const courseCard = document.querySelector(`[onclick="startCourse('${courseId}')"]`).closest('.course-card');
        const progressBar = courseCard.querySelector('.progress');
        progressBar.style.width = '5%';
        
        // Update button text
        const button = courseCard.querySelector('.btn');
        button.textContent = 'Continue Learning';
        button.onclick = () => continueCourse(courseId);
    } else {
        continueCourse(courseId);
    }
}

function continueCourse(courseId) {
    // Continue course without popup notification
    // Simulate progress increase
    courses[courseId].progress = Math.min(courses[courseId].progress + 10, 100);
    updateCourseProgress(courseId);
    saveUserData();
}

function getCourseTitle(courseId) {
    const titles = {
        'programming': 'Programming Fundamentals',
        'ai': 'Artificial Intelligence',
        'data-science': 'Data Science',
        'web-development': 'Web Development',
        'ui-ux-design': 'UI/UX Design'
    };
    return titles[courseId] || courseId;
}

function updateCourseProgress(courseId) {
    const courseCard = document.querySelector(`[onclick*="${courseId}"]`).closest('.course-card');
    const progressBar = courseCard.querySelector('.progress');
    progressBar.style.width = courses[courseId].progress + '%';
}

// Interactive Learning Module
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab content
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Track interaction
    trackLearningActivity('tab_switch', tabName);
}

function playVideo() {
    // Direct redirect to YouTube video without popup
    window.open('https://youtube.com/shorts/s-zi-mVieUw?feature=shared', '_blank');
    
    // Update module progress
    updateModuleProgress();
    
    // Track activity without showing notification
    trackLearningActivity('video_play', 'digital_learning_benefits');
}

function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="q1"]:checked');
    if (!selectedAnswer) {
        // Answer validation without popup notification
        return;
    }
    
    const isCorrect = selectedAnswer.value === 'b';
    
    // Process answer without popup notification
    if (isCorrect) {
        updateModuleProgress();
        trackLearningActivity('quiz_correct', 'flexibility_question');
    }
}

function updateModuleProgress() {
    const progressText = document.querySelector('.progress-text');
    const progressCircle = document.querySelector('.progress-ring-fill');
    
    let currentProgress = parseInt(progressText.textContent);
    currentProgress = Math.min(currentProgress + 20, 100);
    
    progressText.textContent = currentProgress + '%';
    
    // Update circle progress
    const circumference = 2 * Math.PI * 26;
    const offset = circumference - (currentProgress / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
    
    // Update overall user progress
    currentUser.progress = Math.max(currentUser.progress, currentProgress);
    updateAnalytics();
    saveUserData();
}

// Feature Details
function showFeatureDetails(feature) {
    const features = {
        adaptive: {
            title: 'Adaptive Learning Technology',
            description: 'Our AI-powered system analyzes your learning patterns, strengths, and areas for improvement to create a personalized learning path that adapts in real-time.',
            benefits: ['Personalized pace', 'Targeted content', 'Improved retention', 'Efficient learning']
        },
        interactive: {
            title: 'Interactive Learning Experience',
            description: 'Engage with multimedia content including videos, simulations, virtual labs, and gamified exercises that make learning enjoyable and effective.',
            benefits: ['Higher engagement', 'Practical skills', 'Immediate feedback', 'Fun learning']
        },
        flexible: {
            title: 'Flexible Learning Schedule',
            description: 'Learn anytime, anywhere with our mobile-responsive platform. Download content for offline access and sync your progress across devices.',
            benefits: ['24/7 access', 'Mobile learning', 'Offline capability', 'Cross-device sync']
        },
        analytics: {
            title: 'Advanced Learning Analytics',
            description: 'Track your progress with detailed analytics, identify knowledge gaps, and receive personalized recommendations for improvement.',
            benefits: ['Progress tracking', 'Performance insights', 'Goal setting', 'Improvement suggestions']
        }
    };
    
    const featureData = features[feature];
    if (featureData) {
        showModal(featureData);
    }
}

function showModal(data) {
    // Remove any existing modals first
    closeModal();
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${data.title}</h3>
                <button class="modal-close" type="button">&times;</button>
            </div>
            <div class="modal-body">
                <p>${data.description}</p>
                <h4>Key Benefits:</h4>
                <ul>
                    ${data.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                </ul>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary modal-got-it" type="button">Got it!</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Use event delegation for all modal interactions
    modal.addEventListener('click', function(e) {
        // Close if clicking outside modal content
        if (e.target === modal) {
            closeModal();
            return;
        }
        
        // Close if clicking close button or got it button
        if (e.target.classList.contains('modal-close') || 
            e.target.classList.contains('modal-got-it') ||
            e.target.textContent === '×' ||
            e.target.textContent === 'Got it!') {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
            return;
        }
    });
    
    // Add keyboard support
    modal.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Ensure modal is focusable and focus it
    modal.setAttribute('tabindex', '-1');
    setTimeout(() => {
        modal.focus();
    }, 50);
    
    // Only add modal styles if they don't exist already
    if (!document.querySelector('#modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
            padding: 1rem;
            box-sizing: border-box;
        }
        .modal-content {
            background: white;
            border-radius: 15px;
            max-width: 500px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            animation: slideIn 0.3s ease;
            margin: auto;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 1.5rem;
            border-bottom: 1px solid #e0e0e0;
            position: sticky;
            top: 0;
            background: white;
            border-radius: 15px 15px 0 0;
        }
        .modal-header h3 {
            margin: 0;
            font-size: 1.25rem;
            line-height: 1.4;
            flex: 1;
            padding-right: 1rem;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 1.75rem;
            cursor: pointer;
            color: #666;
            padding: 0.75rem;
            min-width: 44px;
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            transition: all 0.2s ease;
            pointer-events: auto;
            flex-shrink: 0;
        }
        .modal-close:hover, .modal-close:active {
            background-color: rgba(0,0,0,0.1);
            color: #333;
            transform: scale(1.1);
        }
        .modal-body {
            padding: 1.5rem;
            line-height: 1.6;
        }
        .modal-body h4 {
            margin: 1.5rem 0 1rem 0;
            color: #333;
            font-size: 1.1rem;
        }
        .modal-body ul {
            margin: 0;
            padding-left: 1.25rem;
        }
        .modal-body li {
            margin-bottom: 0.5rem;
            color: #555;
        }
        .modal-footer {
            padding: 1rem 1.5rem;
            border-top: 1px solid #e0e0e0;
            text-align: center;
            background: #f8f9fa;
            border-radius: 0 0 15px 15px;
        }
        .modal-footer .btn {
            cursor: pointer;
            pointer-events: auto;
            z-index: 1;
            position: relative;
            padding: 0.875rem 2rem;
            font-size: 1rem;
            font-weight: 500;
            min-height: 44px;
            border-radius: 8px;
            transition: all 0.2s ease;
            width: 100%;
            max-width: 200px;
        }
        .modal-footer .btn:hover, .modal-footer .btn:active {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
        
        /* Mobile-specific styles */
        @media (max-width: 768px) {
            .modal-overlay {
                padding: 0.5rem;
                align-items: flex-start;
                padding-top: 2rem;
            }
            .modal-content {
                width: 100%;
                max-width: none;
                max-height: 95vh;
                border-radius: 12px;
                margin: 0;
            }
            .modal-header {
                padding: 1rem;
                border-radius: 12px 12px 0 0;
            }
            .modal-header h3 {
                font-size: 1.1rem;
                padding-right: 0.5rem;
            }
            .modal-close {
                font-size: 1.5rem;
                min-width: 40px;
                min-height: 40px;
                padding: 0.5rem;
            }
            .modal-body {
                padding: 1rem;
                font-size: 0.95rem;
            }
            .modal-body h4 {
                font-size: 1rem;
                margin: 1rem 0 0.75rem 0;
            }
            .modal-footer {
                padding: 1rem;
                border-radius: 0 0 12px 12px;
            }
            .modal-footer .btn {
                padding: 1rem 1.5rem;
                font-size: 1rem;
                width: 100%;
                max-width: none;
            }
        }
        
        /* Extra small screens */
        @media (max-width: 480px) {
            .modal-overlay {
                padding: 0.25rem;
                padding-top: 1rem;
            }
            .modal-content {
                border-radius: 8px;
                max-height: 98vh;
            }
            .modal-header {
                padding: 0.75rem;
                border-radius: 8px 8px 0 0;
            }
            .modal-header h3 {
                font-size: 1rem;
            }
            .modal-close {
                font-size: 1.25rem;
                min-width: 36px;
                min-height: 36px;
            }
            .modal-body {
                padding: 0.75rem;
                font-size: 0.9rem;
            }
            .modal-footer {
                padding: 0.75rem;
                border-radius: 0 0 8px 8px;
            }
        }
        
        /* Touch-friendly improvements */
        @media (hover: none) and (pointer: coarse) {
            .modal-close {
                min-width: 48px;
                min-height: 48px;
                padding: 1rem;
            }
            .modal-footer .btn {
                min-height: 48px;
                padding: 1rem 2rem;
                font-size: 1.1rem;
            }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
        document.head.appendChild(style);
    }
}

function closeModal() {
    // Remove all modal overlays to prevent multiple modals
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        modal.remove();
    });
    
    // Remove any duplicate modal styles
    const modalStyles = document.querySelectorAll('style');
    modalStyles.forEach(style => {
        if (style.textContent && style.textContent.includes('.modal-overlay')) {
            style.remove();
        }
    });
    
    // Ensure body scroll is restored
    document.body.style.overflow = 'auto';
}

// Make closeModal globally accessible
window.closeModal = closeModal;

// Analytics and Progress
function updateAnalytics() {
    // Update progress percentage
    const progressNumbers = document.querySelectorAll('.stat-number');
    if (progressNumbers[0]) {
        progressNumbers[0].textContent = currentUser.progress + '%';
    }
    
    // Update study time
    if (progressNumbers[1]) {
        progressNumbers[1].textContent = currentUser.studyTime + 'h';
    }
    
    // Update achievements
    updateAchievements();
}

function updateAchievements() {
    const achievements = document.querySelectorAll('.achievement');
    
    // First course completed
    if (currentUser.completedCourses > 0) {
        achievements[0].classList.add('earned');
    }
    
    // 7-day streak
    if (currentUser.streak >= 7) {
        achievements[1].classList.add('earned');
    }
    
    // Quiz master (if user has answered quizzes correctly)
    const quizScore = localStorage.getItem('quizScore') || 0;
    if (quizScore >= 5) {
        achievements[2].classList.add('earned');
    }
}

function drawProgressChart() {
    const canvas = document.getElementById('progressChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw progress line
    ctx.beginPath();
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    
    const points = [20, 35, 45, 60, 55, 70, 78];
    const stepX = width / (points.length - 1);
    
    points.forEach((point, index) => {
        const x = index * stepX;
        const y = height - (point / 100) * height;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw points
    points.forEach((point, index) => {
        const x = index * stepX;
        const y = height - (point / 100) * height;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = '#667eea';
        ctx.fill();
    });
}

// Utility Functions
function simulateProgress(progressBar) {
    const currentWidth = parseInt(progressBar.style.width) || 0;
    const targetWidth = Math.min(currentWidth + 15, 100);
    
    let width = currentWidth;
    const interval = setInterval(() => {
        width += 1;
        progressBar.style.width = width + '%';
        
        if (width >= targetWidth) {
            clearInterval(interval);
        }
    }, 50);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
            padding: 1rem;
            z-index: 1500;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        }
        .notification-success { border-left: 4px solid #4CAF50; }
        .notification-error { border-left: 4px solid #f44336; }
        .notification-warning { border-left: 4px solid #ff9800; }
        .notification-info { border-left: 4px solid #2196F3; }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function animateElements() {
    // Animate floating elements in hero section
    const elements = document.querySelectorAll('.element');
    elements.forEach((element, index) => {
        element.style.animationDelay = (index * 0.5) + 's';
    });
    
    // Animate on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

function trackLearningActivity(action, data) {
    const activity = {
        timestamp: new Date().toISOString(),
        action: action,
        data: data,
        userId: 'student_001'
    };
    
    // Store in localStorage for demo purposes
    let activities = JSON.parse(localStorage.getItem('learningActivities') || '[]');
    activities.push(activity);
    localStorage.setItem('learningActivities', JSON.stringify(activities));
    
    console.log('Learning activity tracked:', activity);
}

function saveUserData() {
    localStorage.setItem('smartEducationUser', JSON.stringify(currentUser));
    localStorage.setItem('smartEducationCourses', JSON.stringify(courses));
}

function loadUserData() {
    const savedUser = localStorage.getItem('smartEducationUser');
    const savedCourses = localStorage.getItem('smartEducationCourses');
    
    if (savedUser) {
        currentUser = { ...currentUser, ...JSON.parse(savedUser) };
    }
    
    if (savedCourses) {
        courses = { ...courses, ...JSON.parse(savedCourses) };
        
        // Update UI with saved progress
        Object.keys(courses).forEach(courseId => {
            if (courses[courseId].enrolled) {
                updateCourseProgress(courseId);
                const courseCard = document.querySelector(`[onclick*="${courseId}"]`).closest('.course-card');
                const button = courseCard.querySelector('.btn');
                button.textContent = 'Continue Learning';
                button.onclick = () => continueCourse(courseId);
            }
        });
    }
}

// Enhanced Mobile Navigation
function toggleMobileNav() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    navMenu.classList.toggle('mobile-active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('mobile-active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        document.body.style.overflow = 'hidden';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close mobile menu when clicking on links
function closeMobileNav() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (navMenu.classList.contains('mobile-active')) {
        navMenu.classList.remove('mobile-active');
        
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Enhanced touch interactions
function addTouchInteractions() {
    // Add touch feedback to all buttons
    const buttons = document.querySelectorAll('.btn, .feature-card, .course-card, .utility-tool');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });
        
        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }, { passive: true });
    });
    
    // Enhanced swipe gestures for course cards
    let startX, startY, distX, distY;
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach((card, index) => {
        card.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        card.addEventListener('touchmove', function(e) {
            if (!startX || !startY) return;
            
            distX = e.touches[0].clientX - startX;
            distY = e.touches[0].clientY - startY;
            
            // Only apply horizontal swipe if it's clearly horizontal and significant
            if (Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > 50) {
                // Don't prevent default to avoid scroll conflicts
                this.style.transform = `translateX(${distX * 0.2}px)`;
            }
        }, { passive: true });
        
        card.addEventListener('touchend', function() {
            if (Math.abs(distX) > 100) {
                // Swipe detected - navigate to next/previous course
                if (distX > 0) {
                    showMobileToast('⬅️ Previous course', 1500);
                    navigateCourseCard(index, -1);
                } else {
                    showMobileToast('➡️ Next course', 1500);
                    navigateCourseCard(index, 1);
                }
            }
            
            // Reset position
            this.style.transform = '';
            startX = startY = distX = distY = null;
        }, { passive: true });
    });
    
    // Add swipe gestures for closing modals
    addModalSwipeGestures();
    
    // Disabled pull-to-refresh to prevent scroll conflicts
    // addPullToRefresh();
}

// Responsive utilities
function handleResize() {
    const width = window.innerWidth;
    
    // Close mobile menu on resize to desktop
    if (width > 768) {
        closeMobileNav();
    }
    
    // Adjust modal sizes
    const modals = document.querySelectorAll('.utility-modal-content, .tool-modal-content');
    modals.forEach(modal => {
        if (width <= 480) {
            modal.style.width = '98%';
            modal.style.margin = '1% auto';
        } else if (width <= 768) {
            modal.style.width = '95%';
            modal.style.margin = '5% auto';
        } else {
            modal.style.width = '';
            modal.style.margin = '';
        }
    });
}

// Improved scroll behavior for mobile
function smoothScrollToSection(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Enhanced accessibility
function addAccessibilityFeatures() {
    // Add keyboard navigation for modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals
            const openModals = document.querySelectorAll('.utility-modal[style*="block"], .tool-modal[style*="block"]');
            openModals.forEach(modal => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
            
            // Close mobile menu
            closeMobileNav();
        }
    });
    
    // Add focus management for modals
    const modalTriggers = document.querySelectorAll('[onclick*="openTool"], [onclick*="openUtilityTools"]');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            setTimeout(() => {
                const openModal = document.querySelector('.utility-modal[style*="block"], .tool-modal[style*="block"]');
                if (openModal) {
                    const firstFocusable = openModal.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
                    if (firstFocusable) {
                        firstFocusable.focus();
                    }
                }
            }, 100);
        });
    });
}

// Performance optimizations
function optimizePerformance() {
    // Lazy load animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatableElements = document.querySelectorAll('.feature-card, .course-card, .analytics-card');
    animatableElements.forEach(el => {
        animationObserver.observe(el);
    });
    
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250);
    });
}

// Mobile-specific functions
function showMobileToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'mobile-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
    }, duration);
}

function addMobileGestures() {
    // Simplified mobile gestures without conflicting scroll behaviors
    // Removed pull-to-refresh and double-tap scroll to prevent auto scroll-to-top issues
    
    // Only keep essential mobile interactions
    addMobileFocusManagement();
}

function addMobileFocusManagement() {
    // Simple focus management for mobile without interfering with scroll
    const interactiveElements = document.querySelectorAll('button, input, select, textarea, a');
    
    interactiveElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, { passive: true });
    });
}

function addMobileKeyboardSupport() {
    // Handle virtual keyboard appearance
    let initialViewportHeight = window.innerHeight;
    
    window.addEventListener('resize', function() {
        const currentHeight = window.innerHeight;
        const heightDifference = initialViewportHeight - currentHeight;
        
        if (heightDifference > 150) {
            // Virtual keyboard is likely open
            document.body.classList.add('keyboard-open');
        } else {
            document.body.classList.remove('keyboard-open');
        }
    });
}

function optimizeMobilePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Optimize scroll performance with passive listeners
    let ticking = false;
    
    function updateScrollPosition() {
        const scrolled = window.scrollY;
        const header = document.querySelector('.header');
        
        if (scrolled > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollPosition);
            ticking = true;
        }
    }, { passive: true });
    
    // Lazy load animations for better performance
    const animatableElements = document.querySelectorAll('.feature-card, .course-card, .analytics-card');
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.willChange = 'transform';
                entry.target.classList.add('animate-in');
                // Clean up will-change after animation
                setTimeout(() => {
                    entry.target.style.willChange = 'auto';
                }, 600);
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '20px'
    });
    
    animatableElements.forEach(el => animationObserver.observe(el));
    
    // Preload critical resources
    preloadCriticalResources();
    
    // Optimize touch event handling
    optimizeTouchEvents();
    
    // Reduce animation complexity on low-end devices
    if (navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4) {
        document.body.classList.add('reduced-animations');
    }
    
    // Connection-aware loading
    if ('connection' in navigator) {
        const connection = navigator.connection;
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            document.body.classList.add('slow-connection');
        }
    }
}

// Add CSS for mobile enhancements
const mobileEnhancedStyles = document.createElement('style');
mobileEnhancedStyles.textContent = `
    /* Touch feedback */
    .btn:active, .feature-card:active, .course-card:active, .utility-tool:active {
        transform: scale(0.98);
        transition: transform 0.1s ease;
    }
    
    /* Animation classes */
    .animate-in {
        animation: slideInUp 0.6s ease-out;
    }
    
    /* Improved focus styles */
    .btn:focus, .nav-link:focus, .calc-btn:focus, .filter-btn:focus {
        outline: 2px solid #667eea;
        outline-offset: 2px;
    }
    
    /* Better hover states for touch devices */
    @media (hover: hover) {
        .btn:hover, .feature-card:hover, .course-card:hover {
            transform: translateY(-2px);
        }
    }
    
    /* Prevent zoom on input focus for iOS */
    @media screen and (-webkit-min-device-pixel-ratio: 0) {
        select, textarea, input[type="text"], input[type="password"], 
        input[type="datetime"], input[type="datetime-local"], 
        input[type="date"], input[type="month"], input[type="time"], 
        input[type="week"], input[type="number"], input[type="email"], 
        input[type="url"], input[type="search"], input[type="tel"] {
            font-size: 16px;
        }
    }
    
    /* Improved scrollbar for mobile */
    @media (max-width: 768px) {
        ::-webkit-scrollbar {
            width: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
            background: rgba(102, 126, 234, 0.3);
            border-radius: 2px;
        }
        
        /* Keyboard open adjustments */
        body.keyboard-open {
            height: 100vh;
            overflow: hidden;
        }
        
        body.keyboard-open .header {
            position: fixed;
            top: 0;
            z-index: 1001;
        }
        
        /* Header scroll effect */
        .header.scrolled {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        }
        
        /* Mobile-specific animations */
        @keyframes mobileSlideIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .mobile-slide-in {
            animation: mobileSlideIn 0.4s ease-out;
        }
        
        /* Improved touch targets */
        .nav-toggle span {
            transition: all 0.3s ease;
        }
        
        /* Mobile-optimized modals */
        .utility-modal, .tool-modal {
            padding: 0.5rem;
        }
        
        .utility-modal-content, .tool-modal-content {
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        
        /* Better mobile buttons */
        .btn {
            -webkit-tap-highlight-color: transparent;
            user-select: none;
        }
        
        /* Mobile-friendly cards */
        .feature-card, .course-card {
            -webkit-tap-highlight-color: transparent;
            cursor: pointer;
        }
    }
`;
document.head.appendChild(mobileEnhancedStyles);

// Notes System Variables
let notesData = [];
let currentNoteId = null;
let currentNoteFilter = 'all';

// Test System Variables
let testQuestions = [];
let currentQuestionIndex = 0;
let testAnswers = {};
let testTimer = null;
let testTimeRemaining = 900; // 15 minutes in seconds

// Notes Functions
function openNotes() {
    const modal = document.getElementById('notesModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    loadNotes();
    showMobileToast('Notes opened', 1000);
}

function closeNotes() {
    const modal = document.getElementById('notesModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    showNotesListView();
}

function createNewNote() {
    currentNoteId = null;
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
    document.getElementById('noteCategory').value = 'personal';
    document.getElementById('deleteNoteBtn').style.display = 'none';
    showNoteEditorView();
}

function showNotesListView() {
    document.getElementById('notesListView').style.display = 'block';
    document.getElementById('noteEditorView').style.display = 'none';
}

function showNoteEditorView() {
    document.getElementById('notesListView').style.display = 'none';
    document.getElementById('noteEditorView').style.display = 'flex';
}

function loadNotes() {
    const savedNotes = localStorage.getItem('smartEduNotes');
    if (savedNotes) {
        notesData = JSON.parse(savedNotes);
    }
    renderNotesList();
}

function saveNotes() {
    localStorage.setItem('smartEduNotes', JSON.stringify(notesData));
}

function renderNotesList() {
    const container = document.getElementById('notesListView');
    const filteredNotes = filterNotesByCategory(notesData);
    
    if (filteredNotes.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #666;">
                <i class="fas fa-sticky-note" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                <p>No notes yet. Create your first note!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredNotes.map(note => `
        <div class="note-item ${note.important ? 'important' : ''}" onclick="editNote('${note.id}')">
            <div class="note-item-header">
                <h4 class="note-item-title">${note.title || 'Untitled Note'}</h4>
                <div class="note-item-meta">
                    <span class="note-category-badge ${note.category}">${note.category}</span>
                    ${note.important ? '<i class="fas fa-star" style="color: #ffc107;"></i>' : ''}
                    <span>${formatDate(note.updatedAt)}</span>
                </div>
            </div>
            <div class="note-item-preview">${note.content.substring(0, 150)}${note.content.length > 150 ? '...' : ''}</div>
        </div>
    `).join('');
}

function filterNotesByCategory(notes) {
    if (currentNoteFilter === 'all') return notes;
    if (currentNoteFilter === 'important') return notes.filter(note => note.important);
    return notes.filter(note => note.category === currentNoteFilter);
}

function filterNotes(category) {
    currentNoteFilter = category;
    
    // Update active category button
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    renderNotesList();
}

function searchNotes() {
    const searchTerm = document.getElementById('notesSearch').value.toLowerCase();
    const filteredNotes = notesData.filter(note => 
        note.title.toLowerCase().includes(searchTerm) || 
        note.content.toLowerCase().includes(searchTerm)
    );
    
    const container = document.getElementById('notesListView');
    if (filteredNotes.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #666;">
                <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                <p>No notes found matching "${searchTerm}"</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredNotes.map(note => `
        <div class="note-item ${note.important ? 'important' : ''}" onclick="editNote('${note.id}')">
            <div class="note-item-header">
                <h4 class="note-item-title">${note.title || 'Untitled Note'}</h4>
                <div class="note-item-meta">
                    <span class="note-category-badge ${note.category}">${note.category}</span>
                    ${note.important ? '<i class="fas fa-star" style="color: #ffc107;"></i>' : ''}
                    <span>${formatDate(note.updatedAt)}</span>
                </div>
            </div>
            <div class="note-item-preview">${note.content.substring(0, 150)}${note.content.length > 150 ? '...' : ''}</div>
        </div>
    `).join('');
}

function editNote(noteId) {
    const note = notesData.find(n => n.id === noteId);
    if (!note) return;
    
    currentNoteId = noteId;
    document.getElementById('noteTitle').value = note.title;
    document.getElementById('noteContent').value = note.content;
    document.getElementById('noteCategory').value = note.category;
    document.getElementById('deleteNoteBtn').style.display = 'inline-block';
    
    // Update important button
    const importantBtn = document.getElementById('importantBtn');
    const icon = importantBtn.querySelector('i');
    if (note.important) {
        icon.className = 'fas fa-star';
        importantBtn.style.color = '#ffc107';
    } else {
        icon.className = 'far fa-star';
        importantBtn.style.color = '';
    }
    
    showNoteEditorView();
}

function saveCurrentNote() {
    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteContent').value.trim();
    const category = document.getElementById('noteCategory').value;
    
    if (!title && !content) {
        showMobileToast('Please add a title or content', 2000);
        return;
    }
    
    const now = new Date().toISOString();
    
    if (currentNoteId) {
        // Update existing note
        const noteIndex = notesData.findIndex(n => n.id === currentNoteId);
        if (noteIndex !== -1) {
            notesData[noteIndex] = {
                ...notesData[noteIndex],
                title: title || 'Untitled Note',
                content,
                category,
                updatedAt: now
            };
        }
    } else {
        // Create new note
        const newNote = {
            id: 'note_' + Date.now(),
            title: title || 'Untitled Note',
            content,
            category,
            important: false,
            createdAt: now,
            updatedAt: now
        };
        notesData.unshift(newNote);
    }
    
    saveNotes();
    renderNotesList();
    showNotesListView();
    showMobileToast('Note saved successfully!', 2000);
    
    // Track analytics
    trackLearningActivity('note_saved', { category, hasTitle: !!title });
}

function toggleImportant() {
    if (!currentNoteId) return;
    
    const note = notesData.find(n => n.id === currentNoteId);
    if (!note) return;
    
    note.important = !note.important;
    note.updatedAt = new Date().toISOString();
    
    // Update button appearance
    const importantBtn = document.getElementById('importantBtn');
    const icon = importantBtn.querySelector('i');
    if (note.important) {
        icon.className = 'fas fa-star';
        importantBtn.style.color = '#ffc107';
    } else {
        icon.className = 'far fa-star';
        importantBtn.style.color = '';
    }
    
    saveNotes();
    showMobileToast(note.important ? 'Marked as important' : 'Removed from important', 1500);
}

function deleteCurrentNote() {
    if (!currentNoteId) return;
    
    if (confirm('Are you sure you want to delete this note?')) {
        notesData = notesData.filter(n => n.id !== currentNoteId);
        saveNotes();
        renderNotesList();
        showNotesListView();
        showMobileToast('Note deleted', 2000);
    }
}

function cancelNoteEdit() {
    showNotesListView();
}

// Test Functions
function openTest() {
    const modal = document.getElementById('testModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    initializeTest();
    showMobileToast('Test started', 1000);
}

function closeTest() {
    const modal = document.getElementById('testModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    if (testTimer) {
        clearInterval(testTimer);
        testTimer = null;
    }
}

function initializeTest() {
    testQuestions = [
        {
            id: 1,
            question: "What is the main advantage of digital learning flexibility?",
            options: [
                "Faster completion of courses",
                "Learn at your own pace and schedule",
                "More expensive than traditional learning",
                "Requires physical presence"
            ],
            correct: 1
        },
        {
            id: 2,
            question: "Which technology is commonly used in smart education platforms?",
            options: [
                "Artificial Intelligence",
                "Virtual Reality",
                "Machine Learning",
                "All of the above"
            ],
            correct: 3
        },
        {
            id: 3,
            question: "What does AICTE stand for?",
            options: [
                "All India Council for Technical Education",
                "Advanced Institute for Computer Technology Education",
                "Association of Indian Computer Technology Engineers",
                "Academy of Information and Communication Technology"
            ],
            correct: 0
        },
        {
            id: 4,
            question: "What is a key benefit of personalized learning paths?",
            options: [
                "One-size-fits-all approach",
                "Standardized curriculum for everyone",
                "Customized content based on individual needs",
                "To make learning more difficult"
            ],
            correct: 2
        },
        {
            id: 5,
            question: "Which feature enhances student engagement in digital learning?",
            options: [
                "Interactive multimedia content",
                "Gamification elements",
                "Real-time feedback",
                "All of the above"
            ],
            correct: 3
        },
        {
            id: 6,
            question: "What is the purpose of learning analytics?",
            options: [
                "To make learning more difficult",
                "To track and improve learning outcomes",
                "To increase course duration",
                "To reduce student interaction"
            ],
            correct: 1
        },
        {
            id: 7,
            question: "Which is NOT a characteristic of effective smart education?",
            options: [
                "Accessibility",
                "Flexibility",
                "Rigidity",
                "Personalization"
            ],
            correct: 2
        },
        {
            id: 8,
            question: "What role does mobile learning play in smart education?",
            options: [
                "Limits learning to desktop computers",
                "Enables learning anytime, anywhere",
                "Reduces learning effectiveness",
                "Increases technical complexity"
            ],
            correct: 1
        },
        {
            id: 9,
            question: "How do collaborative tools benefit online learning?",
            options: [
                "They isolate students from each other",
                "They enable peer interaction and group projects",
                "They make learning more expensive",
                "They slow down the learning process"
            ],
            correct: 1
        },
        {
            id: 10,
            question: "What is the future trend in smart education?",
            options: [
                "Return to traditional classroom-only methods",
                "Integration of AI and adaptive learning technologies",
                "Elimination of teacher roles",
                "Reduced use of technology"
            ],
            correct: 1
        }
    ];
    
    currentQuestionIndex = 0;
    testAnswers = {};
    testTimeRemaining = 900; // 15 minutes
    
    document.getElementById('totalQuestions').textContent = testQuestions.length;
    document.getElementById('currentScore').textContent = '0';
    document.getElementById('maxScore').textContent = testQuestions.length * 10;
    
    startTestTimer();
    displayQuestion();
}

function startTestTimer() {
    testTimer = setInterval(() => {
        testTimeRemaining--;
        updateTimerDisplay();
        
        if (testTimeRemaining <= 0) {
            clearInterval(testTimer);
            submitTest();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(testTimeRemaining / 60);
    const seconds = testTimeRemaining % 60;
    document.getElementById('testTimer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function displayQuestion() {
    const question = testQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / testQuestions.length) * 100;
    
    document.getElementById('testProgressFill').style.width = `${progress}%`;
    document.getElementById('questionProgress').textContent = 
        `${currentQuestionIndex + 1} of ${testQuestions.length}`;
    
    document.getElementById('testContent').innerHTML = `
        <div class="test-question">
            <div class="question-number">Question ${currentQuestionIndex + 1}</div>
            <div class="question-text">${question.question}</div>
            <div class="question-options">
                ${question.options.map((option, index) => `
                    <div class="option-item ${testAnswers[question.id] === index ? 'selected' : ''}" 
                         onclick="selectAnswer(${question.id}, ${index})">
                        <input type="radio" name="q${question.id}" value="${index}" 
                               ${testAnswers[question.id] === index ? 'checked' : ''}>
                        <span class="option-text">${option}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
    document.getElementById('nextBtn').style.display = 
        currentQuestionIndex === testQuestions.length - 1 ? 'none' : 'inline-block';
    document.getElementById('submitBtn').style.display = 
        currentQuestionIndex === testQuestions.length - 1 ? 'inline-block' : 'none';
}

function selectAnswer(questionId, optionIndex) {
    testAnswers[questionId] = optionIndex;
    
    // Update visual selection
    document.querySelectorAll('.option-item').forEach(item => item.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
    
    // Update radio button
    const radio = event.currentTarget.querySelector('input[type="radio"]');
    radio.checked = true;
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < testQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
}

function submitTest() {
    if (testTimer) {
        clearInterval(testTimer);
        testTimer = null;
    }
    
    // Calculate score
    let correctAnswers = 0;
    testQuestions.forEach(question => {
        if (testAnswers[question.id] === question.correct) {
            correctAnswers++;
        }
    });
    
    const score = correctAnswers * 10;
    const percentage = (correctAnswers / testQuestions.length) * 100;
    
    // Show results
    document.getElementById('testContent').innerHTML = `
        <div class="test-results">
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 4rem; color: ${percentage >= 70 ? '#4CAF50' : percentage >= 50 ? '#FF9800' : '#F44336'}; margin-bottom: 1rem;">
                    ${percentage >= 70 ? '🎉' : percentage >= 50 ? '👍' : '📚'}
                </div>
                <h3 style="margin-bottom: 1rem; color: #333;">Test Completed!</h3>
                <div style="font-size: 2rem; font-weight: bold; color: #667eea; margin-bottom: 0.5rem;">
                    ${score}/100
                </div>
                <div style="font-size: 1.2rem; color: #666; margin-bottom: 2rem;">
                    ${correctAnswers} out of ${testQuestions.length} questions correct (${percentage.toFixed(1)}%)
                </div>
                <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
                    <h4 style="margin-bottom: 1rem; color: #333;">Performance Analysis:</h4>
                    <div style="text-align: left;">
                        ${percentage >= 90 ? '🌟 Excellent! You have mastered the concepts.' : 
                          percentage >= 70 ? '✅ Good job! You understand most concepts well.' :
                          percentage >= 50 ? '⚠️ Fair performance. Consider reviewing the material.' :
                          '❌ Needs improvement. Please review the course content.'}
                    </div>
                </div>
                <button class="btn btn-primary" onclick="closeTest()" style="margin-right: 1rem;">
                    <i class="fas fa-check"></i> Complete
                </button>
                <button class="btn btn-secondary" onclick="initializeTest()">
                    <i class="fas fa-redo"></i> Retake Test
                </button>
            </div>
        </div>
    `;
    
    // Hide navigation buttons
    document.getElementById('prevBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('submitBtn').style.display = 'none';
    
    // Track analytics
    trackLearningActivity('test_completed', { 
        score, 
        percentage, 
        correctAnswers, 
        totalQuestions: testQuestions.length 
    });
    
    showMobileToast(`Test completed! Score: ${score}/100`, 3000);
}

// Learning Module Notes Functions
function addNote() {
    const editor = document.getElementById('noteEditor');
    const notesList = document.getElementById('notesList');
    
    if (editor.style.display === 'none' || !editor.style.display) {
        editor.style.display = 'block';
        document.getElementById('noteText').focus();
    } else {
        editor.style.display = 'none';
    }
}

function saveNote() {
    const noteText = document.getElementById('noteText').value.trim();
    if (!noteText) {
        showMobileToast('Please enter some text for the note', 2000);
        return;
    }
    
    const notesList = document.getElementById('notesList');
    const noteItem = document.createElement('div');
    noteItem.className = 'note-item-small';
    noteItem.innerHTML = `
        <div class="note-text">${noteText}</div>
        <div class="note-date">${new Date().toLocaleDateString()}</div>
    `;
    
    notesList.appendChild(noteItem);
    
    // Save to localStorage
    const moduleNotes = JSON.parse(localStorage.getItem('moduleNotes') || '[]');
    moduleNotes.push({
        id: Date.now(),
        text: noteText,
        date: new Date().toISOString(),
        module: 'Digital Learning Benefits'
    });
    localStorage.setItem('moduleNotes', JSON.stringify(moduleNotes));
    
    // Clear and hide editor
    document.getElementById('noteText').value = '';
    document.getElementById('noteEditor').style.display = 'none';
    
    showMobileToast('Note saved successfully!', 2000);
    trackLearningActivity('module_note_added', { module: 'Digital Learning Benefits' });
}

function cancelNote() {
    document.getElementById('noteText').value = '';
    document.getElementById('noteEditor').style.display = 'none';
}

// Quiz Functions
function startQuiz() {
    showNotification('Redirecting to Data Science MCQ Quiz...', 'info');
    
    // Show mobile toast for feedback
    showMobileToast('Opening Sanfoundry Data Science Quiz', 2000);
    
    // Track analytics
    trackLearningActivity('external_quiz_started', { 
        platform: 'Sanfoundry',
        subject: 'Data Science MCQ'
    });
    
    // Redirect to Sanfoundry Data Science MCQ
    setTimeout(() => {
        window.open('https://www.sanfoundry.com/data-science-questions-answers/', '_blank');
        showNotification('Quiz opened in new tab. Good luck!', 'success');
    }, 500);
}

// Utility function for date formatting
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString();
}

// Utility Tools Variables
let timetableData = [];
let todoItems = [];
let todoIdCounter = 1;
let currentTodoFilter = 'all';

// Utility Tools Functions
function openUtilityTools() {
    try {
        showNotification('Opening Study Tools...', 'info');
        const modal = document.getElementById('utilityToolsModal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Add entrance animation
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.9)';
            setTimeout(() => {
                modal.style.transition = 'all 0.3s ease';
                modal.style.opacity = '1';
                modal.style.transform = 'scale(1)';
            }, 10);
        } else {
            console.error('Utility Tools modal not found');
            showNotification('Study Tools not available. Please refresh the page.', 'error');
        }
    } catch (error) {
        console.error('Error opening utility tools:', error);
        showNotification('Error opening Study Tools. Please try again.', 'error');
    }
}

function closeUtilityTools() {
    const modal = document.getElementById('utilityToolsModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openTool(toolName) {
    closeUtilityTools();
    const toolModal = document.getElementById(toolName + 'Tool');
    toolModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Initialize tool-specific data
    if (toolName === 'timetable') {
        loadTimetableData();
        renderTimetable();
    } else if (toolName === 'todo') {
        loadTodoData();
        renderTodoList();
    }
}

function closeTool(toolName) {
    const toolModal = document.getElementById(toolName + 'Tool');
    toolModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Calculator Functions
function appendToDisplay(value) {
    const display = document.getElementById('calcDisplay');
    if (display.value === '0' && value !== '.') {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearCalculator() {
    document.getElementById('calcDisplay').value = '';
}

function deleteLast() {
    const display = document.getElementById('calcDisplay');
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    const display = document.getElementById('calcDisplay');
    try {
        // Replace display symbols with JavaScript operators
        let expression = display.value.replace(/×/g, '*').replace(/÷/g, '/');
        let result = eval(expression);
        display.value = result;
        
        // Track calculator usage
        trackLearningActivity('calculator_used', expression + ' = ' + result);
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => {
            display.value = '';
        }, 1500);
    }
}

// Timetable Functions
function addTimeSlot() {
    const form = document.getElementById('addSlotForm');
    form.style.display = 'block';
}

function cancelAddSlot() {
    const form = document.getElementById('addSlotForm');
    form.style.display = 'none';
    clearSlotForm();
}

function saveTimeSlot() {
    const time = document.getElementById('slotTime').value;
    const subject = document.getElementById('slotSubject').value;
    const day = document.getElementById('slotDay').value;
    
    if (!time || !subject) {
        showNotification('Please fill in all fields', 'warning');
        return;
    }
    
    const slot = {
        id: Date.now(),
        time: time,
        subject: subject,
        day: day
    };
    
    timetableData.push(slot);
    saveTimetableData();
    renderTimetable();
    cancelAddSlot();
    showNotification('Time slot added successfully!', 'success');
}

function clearSlotForm() {
    document.getElementById('slotTime').value = '';
    document.getElementById('slotSubject').value = '';
    document.getElementById('slotDay').value = 'monday';
}

function clearTimetable() {
    if (confirm('Are you sure you want to clear all time slots?')) {
        timetableData = [];
        saveTimetableData();
        renderTimetable();
        showNotification('Timetable cleared', 'info');
    }
}

function renderTimetable() {
    const grid = document.querySelector('.timetable-grid');
    
    // Clear existing time slots (keep headers)
    const existingSlots = grid.querySelectorAll('.time-slot');
    existingSlots.forEach(slot => slot.remove());
    
    // Get unique times and sort them
    const times = [...new Set(timetableData.map(slot => slot.time))].sort();
    
    times.forEach(time => {
        // Add time header
        const timeHeader = document.createElement('div');
        timeHeader.className = 'time-slot';
        timeHeader.textContent = formatTime(time);
        timeHeader.style.background = '#f0f0f0';
        timeHeader.style.fontWeight = '600';
        grid.appendChild(timeHeader);
        
        // Add slots for each day
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        days.forEach(day => {
            const daySlot = timetableData.find(slot => slot.time === time && slot.day === day);
            const slotElement = document.createElement('div');
            slotElement.className = 'time-slot';
            
            if (daySlot) {
                slotElement.textContent = daySlot.subject;
                slotElement.classList.add('filled');
                slotElement.onclick = () => removeTimeSlot(daySlot.id);
                slotElement.style.cursor = 'pointer';
                slotElement.title = 'Click to remove';
            }
            
            grid.appendChild(slotElement);
        });
    });
}

function removeTimeSlot(id) {
    if (confirm('Remove this time slot?')) {
        timetableData = timetableData.filter(slot => slot.id !== id);
        saveTimetableData();
        renderTimetable();
        showNotification('Time slot removed', 'info');
    }
}

function formatTime(time) {
    const [hours, minutes] = time.split(':');
    const hour12 = hours % 12 || 12;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${ampm}`;
}

function saveTimetableData() {
    localStorage.setItem('smartEducationTimetable', JSON.stringify(timetableData));
}

function loadTimetableData() {
    const saved = localStorage.getItem('smartEducationTimetable');
    if (saved) {
        timetableData = JSON.parse(saved);
    }
}

// To-Do List Functions
function addTodoItem() {
    const input = document.getElementById('todoInput');
    const priority = document.getElementById('todoPriority').value;
    const text = input.value.trim();
    
    if (!text) {
        showNotification('Please enter a task', 'warning');
        return;
    }
    
    const todo = {
        id: todoIdCounter++,
        text: text,
        priority: priority,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    todoItems.push(todo);
    saveTodoData();
    renderTodoList();
    input.value = '';
    showNotification('Task added successfully!', 'success');
    
    trackLearningActivity('todo_added', text);
}

function handleTodoEnter(event) {
    if (event.key === 'Enter') {
        addTodoItem();
    }
}

function toggleTodoComplete(id) {
    const todo = todoItems.find(item => item.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodoData();
        renderTodoList();
        
        const status = todo.completed ? 'completed' : 'uncompleted';
        trackLearningActivity('todo_' + status, todo.text);
    }
}

function deleteTodoItem(id) {
    const todo = todoItems.find(item => item.id === id);
    if (todo && confirm('Delete this task?')) {
        todoItems = todoItems.filter(item => item.id !== id);
        saveTodoData();
        renderTodoList();
        showNotification('Task deleted', 'info');
        
        trackLearningActivity('todo_deleted', todo.text);
    }
}

function filterTodos(filter) {
    currentTodoFilter = filter;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderTodoList();
}

function renderTodoList() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    
    let filteredTodos = todoItems;
    if (currentTodoFilter === 'pending') {
        filteredTodos = todoItems.filter(todo => !todo.completed);
    } else if (currentTodoFilter === 'completed') {
        filteredTodos = todoItems.filter(todo => todo.completed);
    }
    
    // Sort by priority and creation date
    filteredTodos.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
    
    filteredTodos.forEach(todo => {
        const todoElement = document.createElement('div');
        todoElement.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        todoElement.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} 
                   onchange="toggleTodoComplete(${todo.id})">
            <span class="todo-text">${todo.text}</span>
            <span class="todo-priority priority-${todo.priority}">${todo.priority.toUpperCase()}</span>
            <button class="todo-delete" onclick="deleteTodoItem(${todo.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        todoList.appendChild(todoElement);
    });
    
    updateTodoStats();
}

function updateTodoStats() {
    const totalTasks = todoItems.length;
    const completedTasks = todoItems.filter(todo => todo.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    
    const statsElement = document.getElementById('todoStats');
    statsElement.textContent = `${pendingTasks} tasks remaining • ${completedTasks} completed • ${totalTasks} total`;
}

function saveTodoData() {
    localStorage.setItem('smartEducationTodos', JSON.stringify(todoItems));
    localStorage.setItem('smartEducationTodoCounter', todoIdCounter.toString());
}

function loadTodoData() {
    const savedTodos = localStorage.getItem('smartEducationTodos');
    const savedCounter = localStorage.getItem('smartEducationTodoCounter');
    
    if (savedTodos) {
        todoItems = JSON.parse(savedTodos);
    }
    if (savedCounter) {
        todoIdCounter = parseInt(savedCounter);
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    const utilityModal = document.getElementById('utilityToolsModal');
    const calculatorModal = document.getElementById('calculatorTool');
    const timetableModal = document.getElementById('timetableTool');
    const todoModal = document.getElementById('todoTool');
    
    if (event.target === utilityModal) {
        closeUtilityTools();
    } else if (event.target === calculatorModal) {
        closeTool('calculator');
    } else if (event.target === timetableModal) {
        closeTool('timetable');
    } else if (event.target === todoModal) {
        closeTool('todo');
    }
};

// Keyboard shortcuts for calculator
document.addEventListener('keydown', function(event) {
    const calculatorModal = document.getElementById('calculatorTool');
    if (calculatorModal.style.display === 'block') {
        const key = event.key;
        
        if ('0123456789+-*/.'.includes(key)) {
            event.preventDefault();
            if (key === '*') {
                appendToDisplay('×');
            } else if (key === '/') {
                appendToDisplay('÷');
            } else {
                appendToDisplay(key);
            }
        } else if (key === 'Enter' || key === '=') {
            event.preventDefault();
            calculateResult();
        } else if (key === 'Escape' || key === 'c' || key === 'C') {
            event.preventDefault();
            clearCalculator();
        } else if (key === 'Backspace') {
            event.preventDefault();
            deleteLast();
        }
    }
});

// Performance optimization functions
function preloadCriticalResources() {
    // Preload font files
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    fontLink.as = 'style';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);
    
    // Preload critical icons
    const iconLink = document.createElement('link');
    iconLink.rel = 'preload';
    iconLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    iconLink.as = 'style';
    iconLink.crossOrigin = 'anonymous';
    document.head.appendChild(iconLink);
}

function optimizeTouchEvents() {
    // Use passive touch event listeners for better performance
    const touchElements = document.querySelectorAll('.btn, .nav-link, .feature-card, .course-card');
    
    touchElements.forEach(element => {
        // Remove existing listeners and add passive ones
        element.addEventListener('touchstart', function() {
            this.style.willChange = 'transform';
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.willChange = 'auto';
            }, 300);
        }, { passive: true });
    });
}

// Additional mobile functions for swipe gestures
function navigateCourseCard(currentIndex, direction) {
    const courseCards = document.querySelectorAll('.course-card');
    const nextIndex = currentIndex + direction;
    
    if (nextIndex >= 0 && nextIndex < courseCards.length) {
        courseCards[nextIndex].scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'center'
        });
        
        // Add highlight effect
        courseCards[nextIndex].style.transform = 'scale(1.02)';
        setTimeout(() => {
            courseCards[nextIndex].style.transform = '';
        }, 300);
    }
}

function addModalSwipeGestures() {
    const modals = document.querySelectorAll('.utility-modal-content, .tool-modal-content');
    
    modals.forEach(modal => {
        let startY = 0;
        let currentY = 0;
        
        modal.addEventListener('touchstart', function(e) {
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        modal.addEventListener('touchmove', function(e) {
            currentY = e.touches[0].clientY;
            const diffY = currentY - startY;
            
            // Only allow swipe down to close
            if (diffY > 0 && diffY < 200) {
                this.style.transform = `translateY(${diffY}px)`;
            }
        });
        
        modal.addEventListener('touchend', function() {
            const diffY = currentY - startY;
            
            if (diffY > 100) {
                // Close modal
                const modalParent = this.closest('.utility-modal, .tool-modal');
                modalParent.style.display = 'none';
                document.body.style.overflow = 'auto';
                showMobileToast('Modal closed', 1000);
            }
            
            this.style.transform = '';
        }, { passive: true });
    });
}

// DISABLED: This function was causing auto scroll-to-top issues on mobile
// function addPullToRefresh() {
//     let startY = 0;
//     let isPulling = false;
//     
//     document.addEventListener('touchstart', function(e) {
//         if (window.scrollY === 0) {
//             startY = e.touches[0].clientY;
//             isPulling = true;
//         }
//     }, { passive: true });
//     
//     document.addEventListener('touchmove', function(e) {
//         if (!isPulling || window.scrollY > 0) return;
//         
//         const currentY = e.touches[0].clientY;
//         const pullDistance = currentY - startY;
//         
//         if (pullDistance > 50) {
//             document.body.style.transform = `translateY(${Math.min(pullDistance * 0.5, 50)}px)`;
//         }
//     }, { passive: true });
//     
//     document.addEventListener('touchend', function(e) {
//         if (!isPulling) return;
//         
//         const currentY = e.changedTouches[0].clientY;
//         const pullDistance = currentY - startY;
//         
//         document.body.style.transform = '';
//         
//         if (pullDistance > 100) {
//             showMobileToast('🔄 Refreshing content...', 2000);
//             // Simulate content refresh
//             setTimeout(() => {
//                 showMobileToast('✅ Content updated!', 1500);
//                 updateAnalytics();
//             }, 1000);
//         }
//         
//         isPulling = false;
//     }, { passive: true });
// }

// Dark Mode Functionality
function initializeDarkMode() {
    // Check for saved dark mode preference or default to false
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        updateDarkModeButton(true);
    }
    
    // Add event listener to dark mode toggle button
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
}

function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        // Switch to light mode
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
        updateDarkModeButton(false);
        showNotification('Switched to light mode', 'info');
    } else {
        // Switch to dark mode
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
        updateDarkModeButton(true);
        showNotification('Switched to dark mode', 'info');
    }
}

function updateDarkModeButton(isDarkMode) {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;
    
    const icon = darkModeToggle.querySelector('i');
    
    if (isDarkMode) {
        // Dark mode is active, show sun icon
        icon.className = 'fas fa-sun';
        darkModeToggle.classList.add('active');
        darkModeToggle.title = 'Switch to light mode';
    } else {
        // Light mode is active, show moon icon
        icon.className = 'fas fa-moon';
        darkModeToggle.classList.remove('active');
        darkModeToggle.title = 'Switch to dark mode';
    }
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Ensure logout function is available globally (backup)
if (!window.logout) {
    window.logout = function() {
        console.log('Using backup logout function');
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        
        if (typeof showNotification === 'function') {
            showNotification('You have been logged out successfully!', 'success');
        }
        
        // Update UI to logged out state
        if (typeof showLoggedOutState === 'function') {
            showLoggedOutState();
        }
        
        // Redirect after showing message
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    };
}
