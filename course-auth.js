// Course Authentication Integration
document.addEventListener('DOMContentLoaded', function() {
    initializeCourseAuth();
    setupEnrollmentButtons();
    updateUIBasedOnAuth();
});

// Initialize course authentication
function initializeCourseAuth() {
    // Check if user is authenticated
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('currentUser');
    
    if (token && user) {
        // User is logged in
        showAuthenticatedUI();
        checkUserEnrollments();
    } else {
        // User is not logged in
        showUnauthenticatedUI();
    }
}

// Setup enrollment button listeners
function setupEnrollmentButtons() {
    const enrollButtons = document.querySelectorAll('.enroll-btn, .btn-enroll');
    enrollButtons.forEach(button => {
        button.addEventListener('click', handleEnrollClick);
    });
    
    // Notes buttons
    const notesButtons = document.querySelectorAll('.notes-btn');
    notesButtons.forEach(button => {
        button.addEventListener('click', handleNotesClick);
    });
    
    // Tests buttons
    const testButtons = document.querySelectorAll('.test-btn');
    testButtons.forEach(button => {
        button.addEventListener('click', handleTestClick);
    });
}

// Handle enrollment button click
function handleEnrollClick(event) {
    event.preventDefault();
    
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        // User not logged in - redirect to login with course URL
        const courseId = event.target.getAttribute('data-course-id');
        const courseName = event.target.getAttribute('data-course-name');
        
        // Store current page for redirect after login
        localStorage.setItem('redirectUrl', window.location.href);
        
        // Store course info for enrollment after login
        localStorage.setItem('pendingEnrollment', JSON.stringify({
            courseId: courseId,
            courseName: courseName
        }));
        
        // Redirect to login page
        window.location.href = 'login.html';
    } else {
        // User is logged in - proceed with enrollment
        const courseId = event.target.getAttribute('data-course-id');
        enrollInCourse(courseId);
    }
}

// Handle enrollment after login redirect
function handlePendingEnrollment() {
    const pendingEnrollment = localStorage.getItem('pendingEnrollment');
    
    if (pendingEnrollment) {
        const enrollmentData = JSON.parse(pendingEnrollment);
        localStorage.removeItem('pendingEnrollment');
        
        // Show enrollment confirmation
        if (confirm(`Welcome back! Would you like to enroll in ${enrollmentData.courseName}?`)) {
            enrollInCourse(enrollmentData.courseId);
        }
    }
}

// Course video URLs mapping
const courseVideoUrls = {
    'programming': 'https://www.youtube.com/watch?v=zOjov-2OZ0E&ab_channel=freeCodeCamp.org',
    'ai': 'https://www.youtube.com/watch?v=mEsleV16qdo&t=61515s&ab_channel=freeCodeCamp.org',
    'data-science': 'https://www.youtube.com/playlist?list=PLWKjhJtqVAbldqMzj8XF9RuRD2D3B3ZEy',
    'web-development': 'https://www.youtube.com/playlist?list=PLWKjhJtqVAbnSe1qUNMG7AbPmjIG54u88',
    'ui-ux-design': 'https://www.youtube.com/playlist?list=PLWKjhJtqVAblyxKduNzCqEcOKCu6ML8DC'
};

// Enroll user in course
async function enrollInCourse(courseId) {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        alert('Please login to enroll in courses');
        return;
    }
    
    try {
        showLoading('Enrolling in course...');
        
        // For now, simulate successful enrollment since backend might not be running
        // In production, this would make an actual API call
        const simulateSuccess = true;
        
        if (simulateSuccess) {
            // Simulate enrollment success
            showSuccessMessage('Successfully enrolled in course!');
            updateEnrollmentUI(courseId, true);
            
            // Show Notes and Tests buttons
            showCourseFeatures(courseId);
            
            // Store enrollment in localStorage for persistence
            const enrollments = JSON.parse(localStorage.getItem('userEnrollments') || '[]');
            if (!enrollments.includes(courseId)) {
                enrollments.push(courseId);
                localStorage.setItem('userEnrollments', JSON.stringify(enrollments));
            }
            
            // Redirect to course video after successful enrollment
            setTimeout(() => {
                redirectToCourseVideo(courseId);
            }, 1500);
        }
        
        /* Uncomment this section when backend is available
        const response = await fetch(`http://localhost:5000/api/courses/${courseId}/enroll`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            showSuccessMessage('Successfully enrolled in course!');
            updateEnrollmentUI(courseId, true);
            
            // Show Notes and Tests buttons
            showCourseFeatures(courseId);
            
            // Redirect to course video
            setTimeout(() => {
                redirectToCourseVideo(courseId);
            }, 1500);
        } else {
            showErrorMessage(data.message || 'Failed to enroll in course');
        }
        */
        
    } catch (error) {
        console.error('Enrollment error:', error);
        showErrorMessage('Failed to enroll. Please try again.');
    } finally {
        hideLoading();
    }
}

// Redirect to course video
function redirectToCourseVideo(courseId) {
    const videoUrl = courseVideoUrls[courseId];
    
    if (videoUrl) {
        const courseTitles = {
            'programming': 'Programming Fundamentals',
            'ai': 'Artificial Intelligence',
            'data-science': 'Data Science',
            'web-development': 'Web Development',
            'ui-ux-design': 'UI/UX Design'
        };
        
        const courseTitle = courseTitles[courseId] || 'Course';
        
        // Direct redirect without confirmation or delay
        window.open(videoUrl, '_blank');
        showSuccessMessage(`${courseTitle} course opened! Happy learning! 🎓`);
    } else {
        showErrorMessage('Course video not available yet. Check back soon!');
    }
}

// Check user enrollments
async function checkUserEnrollments() {
    const token = localStorage.getItem('authToken');
    
    if (!token) return;
    
    try {
        // Load enrollments from localStorage for now
        const enrolledCourses = JSON.parse(localStorage.getItem('userEnrollments') || '[]');
        updateEnrolledCoursesUI(enrolledCourses);
        
        /* Uncomment when backend is available
        const response = await fetch('http://localhost:5000/api/users/enrollments', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            const enrolledCourses = data.data.enrolledCourses || [];
            updateEnrolledCoursesUI(enrolledCourses);
        }
        */
        
    } catch (error) {
        console.error('Failed to fetch enrollments:', error);
        // Fallback to localStorage
        const enrolledCourses = JSON.parse(localStorage.getItem('userEnrollments') || '[]');
        updateEnrolledCoursesUI(enrolledCourses);
    }
}

// Update UI for enrolled courses
function updateEnrolledCoursesUI(enrolledCourses) {
    enrolledCourses.forEach(courseId => {
        updateEnrollmentUI(courseId, true);
        showCourseFeatures(courseId);
    });
}

// Update enrollment button UI
function updateEnrollmentUI(courseId, isEnrolled) {
    const enrollButton = document.querySelector(`[data-course-id="${courseId}"]`);
    
    if (enrollButton) {
        if (isEnrolled) {
            enrollButton.textContent = 'Continue Learning';
            enrollButton.classList.add('enrolled');
            enrollButton.onclick = (e) => {
                e.preventDefault();
                continueLearning(courseId);
            };
        } else {
            enrollButton.textContent = 'Enroll Now';
            enrollButton.classList.remove('enrolled');
            // Reset original click handler
            enrollButton.onclick = null;
        }
    }
}

// Continue learning function for enrolled courses
function continueLearning(courseId) {
    const courseTitles = {
        'programming': 'Programming Fundamentals',
        'ai': 'Artificial Intelligence',
        'data-science': 'Data Science',
        'web-development': 'Web Development',
        'ui-ux-design': 'UI/UX Design'
    };
    
    const courseTitle = courseTitles[courseId] || 'Course';
    showSuccessMessage(`Continuing ${courseTitle}...`);
    
    // Redirect to course video
    setTimeout(() => {
        redirectToCourseVideo(courseId);
    }, 1000);
}

// Show course features (Notes and Tests) for enrolled users
function showCourseFeatures(courseId) {
    // Show Notes button
    const notesBtn = document.querySelector(`.notes-btn[data-course-id="${courseId}"]`);
    if (notesBtn) {
        notesBtn.style.display = 'inline-block';
        notesBtn.classList.add('visible');
    }
    
    // Show Tests button
    const testBtn = document.querySelector(`.test-btn[data-course-id="${courseId}"]`);
    if (testBtn) {
        testBtn.style.display = 'inline-block';
        testBtn.classList.add('visible');
    }
    
    // Show course actions container if hidden
    const actionsContainer = document.querySelector(`.course-actions[data-course-id="${courseId}"]`);
    if (actionsContainer) {
        actionsContainer.classList.add('enrolled');
    }
}

// Hide course features for non-enrolled users
function hideCourseFeatures(courseId) {
    const notesBtn = document.querySelector(`.notes-btn[data-course-id="${courseId}"]`);
    if (notesBtn) {
        notesBtn.style.display = 'none';
        notesBtn.classList.remove('visible');
    }
    
    const testBtn = document.querySelector(`.test-btn[data-course-id="${courseId}"]`);
    if (testBtn) {
        testBtn.style.display = 'none';
        testBtn.classList.remove('visible');
    }
}

// Handle Notes button click
function handleNotesClick(event) {
    const courseId = event.target.getAttribute('data-course-id');
    const courseName = event.target.getAttribute('data-course-name') || 'Course';
    
    // Use the notes module to open notes modal
    if (window.notesModule) {
        window.notesModule.openNotesModal(courseId, courseName);
    } else {
        openNotesModal(courseId, courseName);
    }
}

// Handle Tests button click
function handleTestClick(event) {
    const courseId = event.target.getAttribute('data-course-id');
    const courseName = event.target.getAttribute('data-course-name') || 'Course';
    
    // Use the tests module to open test modal
    if (window.testsModule) {
        window.testsModule.openTestModal(courseId, courseName);
    } else {
        openTestModal(courseId, courseName);
    }
}

// Open notes modal/page
function openNotesModal(courseId, courseName) {
    // Create and show notes modal
    const modal = createModal('notes', courseId, courseName);
    document.body.appendChild(modal);
    modal.style.display = 'block';
}

// Open test modal/page
function openTestModal(courseId, courseName) {
    // Create and show test modal
    const modal = createModal('test', courseId, courseName);
    document.body.appendChild(modal);
    modal.style.display = 'block';
}

// Create modal for notes or tests
function createModal(type, courseId, courseName) {
    const modal = document.createElement('div');
    modal.className = `${type}-modal modal`;
    modal.id = `${type}Modal${courseId}`;
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${type === 'notes' ? 'Course Notes' : 'Course Tests'}</h3>
                <span class="close" onclick="closeModal('${modal.id}')">&times;</span>
            </div>
            <div class="modal-body">
                <h4>${courseName}</h4>
                <p>${type === 'notes' ? 
                    'Here you can view and manage your course notes. This feature is coming soon!' : 
                    'Take tests and quizzes for this course. This feature is coming soon!'
                }</p>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="closeModal('${modal.id}')">
                        ${type === 'notes' ? 'View Notes' : 'Start Test'}
                    </button>
                    <button class="btn btn-secondary" onclick="closeModal('${modal.id}')">Close</button>
                </div>
            </div>
        </div>
    `;
    
    return modal;
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.remove();
    }
}

// Go to course page
function goToCourse(courseId) {
    window.location.href = `course.html?id=${courseId}`;
}

// Show/hide UI based on authentication
function showAuthenticatedUI() {
    // Show user menu, hide login buttons
    const userMenu = document.querySelector('.user-menu');
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    
    if (userMenu) userMenu.style.display = 'block';
    if (loginBtn) loginBtn.style.display = 'none';
    if (signupBtn) signupBtn.style.display = 'none';
    
    // Update user info if available
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userNameElement = document.querySelector('.user-name');
    if (userNameElement && user.firstName) {
        userNameElement.textContent = `${user.firstName} ${user.lastName || ''}`;
    }
    
    // Check and load existing enrollments
    setTimeout(() => {
        checkUserEnrollments();
        handlePendingEnrollment();
    }, 500);
}

function showUnauthenticatedUI() {
    // Hide user menu, show login buttons
    const userMenu = document.querySelector('.user-menu');
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    
    if (userMenu) userMenu.style.display = 'none';
    if (loginBtn) loginBtn.style.display = 'inline-block';
    if (signupBtn) signupBtn.style.display = 'inline-block';
    
    // Hide all Notes and Tests buttons
    const notesButtons = document.querySelectorAll('.notes-btn');
    const testButtons = document.querySelectorAll('.test-btn');
    
    notesButtons.forEach(btn => btn.style.display = 'none');
    testButtons.forEach(btn => btn.style.display = 'none');
}

// Update UI based on authentication status
function updateUIBasedOnAuth() {
    const token = localStorage.getItem('authToken');
    
    if (token) {
        showAuthenticatedUI();
    } else {
        showUnauthenticatedUI();
    }
}

// Utility functions
function showLoading(message = 'Loading...') {
    const loading = document.getElementById('loadingOverlay') || createLoadingOverlay();
    loading.querySelector('.loading-text').textContent = message;
    loading.style.display = 'flex';
}

function hideLoading() {
    const loading = document.getElementById('loadingOverlay');
    if (loading) {
        loading.style.display = 'none';
    }
}

function createLoadingOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'loadingOverlay';
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <div class="loading-text">Loading...</div>
        </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
}

function showSuccessMessage(message) {
    showMessage(message, 'success');
}

function showErrorMessage(message) {
    showMessage(message, 'error');
}

function showMessage(message, type) {
    // Create or get message container
    let messageContainer = document.getElementById('messageContainer');
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.id = 'messageContainer';
        messageContainer.className = 'message-container';
        document.body.appendChild(messageContainer);
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `message message-${type}`;
    messageElement.innerHTML = `
        <span class="message-text">${message}</span>
        <button class="message-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add to container
    messageContainer.appendChild(messageElement);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.remove();
        }
    }, 5000);
}

// Listen for auth state changes
window.addEventListener('storage', function(e) {
    if (e.key === 'authToken') {
        updateUIBasedOnAuth();
        if (e.newValue) {
            checkUserEnrollments();
        }
    }
});

// Export functions for global use
window.courseAuth = {
    enrollInCourse,
    checkUserEnrollments,
    handleEnrollClick,
    handleNotesClick,
    handleTestClick,
    updateUIBasedOnAuth,
    showCourseFeatures,
    hideCourseFeatures
};
