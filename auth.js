// Authentication JavaScript - Local Storage Implementation
// Note: This is a demo implementation using localStorage for offline functionality
// In production, replace with actual backend API calls

// Global variables
let isAuthenticated = false;
let currentUser = null;

// Demo users for testing (in production, this would be handled by backend)
const DEMO_USERS = [
    {
        id: 1,
        email: 'demo@smartedu.com',
        password: 'demo123',
        firstName: 'Demo',
        lastName: 'User',
        institution: 'Smart Education',
        year: '2'
    }
];

// Initialize authentication
document.addEventListener('DOMContentLoaded', function() {
    initializeAuth();
    checkAuthState();
    
    // Setup form listeners
    setupLoginForm();
    setupRegisterForm();
    setupForgotPasswordForm();
    
    // Setup password visibility toggles
    setupPasswordToggles();
    
    // Setup password strength checker for register page
    if (document.getElementById('password') && window.location.pathname.includes('register')) {
        setupPasswordStrength();
    }
    
    // Initialize Google OAuth after a short delay to ensure the script is loaded
    setTimeout(initGoogleOAuth, 500);
});

// Initialize authentication state
function initializeAuth() {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('currentUser');
    
    if (token && user) {
        isAuthenticated = true;
        currentUser = JSON.parse(user);
        
        // Check if we need to redirect after login
        const redirectUrl = localStorage.getItem('redirectUrl');
        if (redirectUrl) {
            localStorage.removeItem('redirectUrl');
            window.location.href = redirectUrl;
        }
    }
}

// Check authentication state
function checkAuthState() {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('currentUser');
    
    if (token && userData) {
        try {
            isAuthenticated = true;
            currentUser = JSON.parse(userData);
        } catch (error) {
            console.error('Invalid user data in localStorage:', error);
            logout();
        }
    }
}

// Setup login form
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

// Setup register form
function setupRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

// Setup forgot password form
function setupForgotPasswordForm() {
    const forgotForm = document.getElementById('forgotPasswordForm');
    if (forgotForm) {
        forgotForm.addEventListener('submit', handleForgotPassword);
    }
}

// Setup password toggles
function setupPasswordToggles() {
    const toggleButtons = document.querySelectorAll('.password-toggle');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// Setup password strength checker
function setupPasswordStrength() {
    const passwordInput = document.getElementById('password');
    const strengthBar = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    if (passwordInput && strengthBar && strengthText) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            updatePasswordStrength(strength, strengthBar, strengthText);
        });
    }
}

// Calculate password strength
function calculatePasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 10;
    if (/[a-z]/.test(password)) score += 20;
    if (/[A-Z]/.test(password)) score += 20;
    if (/[0-9]/.test(password)) score += 20;
    if (/[^A-Za-z0-9]/.test(password)) score += 10;
    
    return Math.min(100, score);
}

// Update password strength visual
function updatePasswordStrength(strength, bar, text) {
    bar.style.width = strength + '%';
    
    if (strength < 40) {
        bar.style.background = '#f44336';
        text.textContent = 'Weak password';
        text.style.color = '#f44336';
    } else if (strength < 70) {
        bar.style.background = '#ff9800';
        text.textContent = 'Medium password';
        text.style.color = '#ff9800';
    } else {
        bar.style.background = '#4CAF50';
        text.textContent = 'Strong password';
        text.style.color = '#4CAF50';
    }
}

// Handle login form submission
async function handleLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    showLoading();
    
    // Simulate API delay
    setTimeout(() => {
        try {
            // Get registered users from localStorage
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const allUsers = [...DEMO_USERS, ...registeredUsers];
            
            // Find user
            const user = allUsers.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Create auth token (simple demo token)
                const token = 'demo_token_' + Date.now() + '_' + Math.random();
                
                // Store authentication data
                localStorage.setItem('authToken', token);
                localStorage.setItem('currentUser', JSON.stringify({
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    institution: user.institution,
                    year: user.year
                }));
                
                isAuthenticated = true;
                currentUser = user;
                
                showMessage('Login successful! Redirecting...', 'success', 'fas fa-check-circle');
                
                // Redirect after short delay
                setTimeout(() => {
                    const redirectUrl = localStorage.getItem('redirectUrl') || 'index.html';
                    localStorage.removeItem('redirectUrl');
                    window.location.href = redirectUrl;
                }, 1500);
                
            } else {
                showMessage('Invalid email or password. Try demo@smartedu.com with password: demo123', 'error', 'fas fa-exclamation-circle');
            }
            
        } catch (error) {
            console.error('Login error:', error);
            showMessage('Login failed. Please try again.', 'error', 'fas fa-exclamation-circle');
        } finally {
            hideLoading();
        }
    }, 1000); // Simulate network delay
}

// Handle register form submission
async function handleRegister(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const institution = formData.get('institution');
    const year = formData.get('year');
    const agreeTerms = formData.get('agreeTerms') === 'on';
    
    // Validate required fields
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        showMessage('Please fill in all required fields.', 'error', 'fas fa-exclamation-circle');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address.', 'error', 'fas fa-exclamation-circle');
        return;
    }
    
    // Validate password strength
    if (password.length < 6) {
        showMessage('Password must be at least 6 characters long.', 'error', 'fas fa-exclamation-circle');
        return;
    }
    
    // Validate password match
    if (password !== confirmPassword) {
        showMessage('Passwords do not match!', 'error', 'fas fa-exclamation-circle');
        return;
    }
    
    // Validate terms agreement
    if (!agreeTerms) {
        showMessage('Please agree to the Terms of Service and Privacy Policy.', 'error', 'fas fa-exclamation-circle');
        return;
    }
    
    showLoading();
    
    // Simulate API delay
    setTimeout(() => {
        try {
            // Get existing users
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const allUsers = [...DEMO_USERS, ...registeredUsers];
            
            // Check if user already exists
            if (allUsers.find(u => u.email === email)) {
                showMessage('An account with this email already exists.', 'error', 'fas fa-exclamation-circle');
                hideLoading();
                return;
            }
            
            // Create new user
            const newUser = {
                id: Date.now(),
                firstName,
                lastName,
                email,
                password,
                institution,
                year
            };
            
            // Add to registered users
            registeredUsers.push(newUser);
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            
            // Create auth token and log them in automatically
            const token = 'demo_token_' + Date.now() + '_' + Math.random();
            localStorage.setItem('authToken', token);
            localStorage.setItem('currentUser', JSON.stringify({
                id: newUser.id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                institution: newUser.institution,
                year: newUser.year
            }));
            
            isAuthenticated = true;
            currentUser = newUser;
            
            showMessage('Registration successful! Welcome to Smart Education!', 'success', 'fas fa-check-circle');
            
            // Redirect after short delay
            setTimeout(() => {
                const redirectUrl = localStorage.getItem('redirectUrl') || 'index.html';
                localStorage.removeItem('redirectUrl');
                window.location.href = redirectUrl;
            }, 2000);
            
        } catch (error) {
            console.error('Registration error:', error);
            showMessage('Registration failed. Please try again.', 'error', 'fas fa-exclamation-circle');
        } finally {
            hideLoading();
        }
    }, 1000); // Simulate network delay
}

// Handle forgot password form submission
async function handleForgotPassword(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const email = formData.get('resetEmail');
    
    showLoading();
    
    // Simulate API delay
    setTimeout(() => {
        try {
            // Get existing users
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const allUsers = [...DEMO_USERS, ...registeredUsers];
            
            // Check if user exists
            const userExists = allUsers.find(u => u.email === email);
            
            if (userExists) {
                showMessage('Password reset instructions would be sent to your email in a real application. For demo purposes, contact administrator.', 'info', 'fas fa-info-circle');
            } else {
                showMessage('If an account with this email exists, password reset instructions will be sent.', 'info', 'fas fa-info-circle');
            }
            
            closeForgotPassword();
            
        } catch (error) {
            console.error('Forgot password error:', error);
            showMessage('Failed to process request. Please try again.', 'error', 'fas fa-exclamation-circle');
        } finally {
            hideLoading();
        }
    }, 1000); // Simulate network delay
}

// Show/hide forgot password modal
function showForgotPassword() {
    document.getElementById('forgotPasswordModal').style.display = 'block';
}

function closeForgotPassword() {
    document.getElementById('forgotPasswordModal').style.display = 'none';
    document.getElementById('forgotPasswordForm').reset();
}

// Google OAuth Configuration
// Note: The provided key appears to be an API key, not a client ID
// For demo purposes, we'll simulate Google OAuth
const GOOGLE_API_KEY = 'AIzaSyBDOWIY0pTvFWjYZiugiF4-OoHzH0laidU';
const GOOGLE_CLIENT_ID = 'your-google-client-id.apps.googleusercontent.com'; // Placeholder

// Initialize Google OAuth when page loads
function initGoogleOAuth() {
    // For demo purposes, we'll use a simulated approach since we have an API key, not client ID
    console.log('Google OAuth initialized (demo mode)');
}

// Handle Google Sign In response
function handleGoogleSignIn(response) {
    try {
        // Decode the JWT token to get user info
        const payload = JSON.parse(atob(response.credential.split('.')[1]));
        
        const googleUser = {
            id: 'google_' + payload.sub,
            email: payload.email,
            firstName: payload.given_name || '',
            lastName: payload.family_name || '',
            picture: payload.picture || '',
            institution: '',
            year: ''
        };
        
        // Check if user already exists
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        let existingUser = registeredUsers.find(u => u.email === googleUser.email);
        
        if (!existingUser) {
            // Register new user
            registeredUsers.push(googleUser);
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            showMessage('Google account linked successfully! Welcome to Smart Education!', 'success', 'fas fa-check-circle');
        } else {
            showMessage('Welcome back! Signing you in...', 'success', 'fas fa-check-circle');
            googleUser.id = existingUser.id;
            googleUser.institution = existingUser.institution;
            googleUser.year = existingUser.year;
        }
        
        // Create auth token and log them in
        const token = 'google_token_' + Date.now() + '_' + Math.random();
        localStorage.setItem('authToken', token);
        localStorage.setItem('currentUser', JSON.stringify({
            id: googleUser.id,
            email: googleUser.email,
            firstName: googleUser.firstName,
            lastName: googleUser.lastName,
            institution: googleUser.institution,
            year: googleUser.year,
            picture: googleUser.picture
        }));
        
        isAuthenticated = true;
        currentUser = googleUser;
        
        // Redirect after short delay
        setTimeout(() => {
            const redirectUrl = localStorage.getItem('redirectUrl') || 'index.html';
            localStorage.removeItem('redirectUrl');
            window.location.href = redirectUrl;
        }, 1500);
        
    } catch (error) {
        console.error('Google Sign-In error:', error);
        showMessage('Google sign-in failed. Please try again.', 'error', 'fas fa-exclamation-circle');
    }
}

// Social login functions
function loginWithGoogle() {
    // Simulate Google OAuth flow
    showMessage('Simulating Google OAuth...', 'warning', 'fas fa-info-circle');
    
    // For demo purposes, create a mock Google user
    setTimeout(() => {
        const demoGoogleUser = {
            id: 'google_' + Date.now(),
            email: 'demo.google@gmail.com',
            firstName: 'Google',
            lastName: 'User',
            picture: '',
            institution: '',
            year: ''
        };
        
        // Check if user already exists
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        let existingUser = registeredUsers.find(u => u.email === demoGoogleUser.email);
        
        if (!existingUser) {
            // Register new user
            registeredUsers.push(demoGoogleUser);
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            showMessage('Demo Google account created successfully! Welcome to Smart Education!', 'success', 'fas fa-check-circle');
        } else {
            showMessage('Welcome back! Signing you in...', 'success', 'fas fa-check-circle');
            demoGoogleUser.id = existingUser.id;
            demoGoogleUser.institution = existingUser.institution;
            demoGoogleUser.year = existingUser.year;
        }
        
        // Create auth token and log them in
        const token = 'google_demo_token_' + Date.now() + '_' + Math.random();
        localStorage.setItem('authToken', token);
        localStorage.setItem('currentUser', JSON.stringify({
            id: demoGoogleUser.id,
            email: demoGoogleUser.email,
            firstName: demoGoogleUser.firstName,
            lastName: demoGoogleUser.lastName,
            institution: demoGoogleUser.institution,
            year: demoGoogleUser.year,
            picture: demoGoogleUser.picture
        }));
        
        isAuthenticated = true;
        currentUser = demoGoogleUser;
        
        // Redirect after short delay
        setTimeout(() => {
            const redirectUrl = localStorage.getItem('redirectUrl') || 'index.html';
            localStorage.removeItem('redirectUrl');
            window.location.href = redirectUrl;
        }, 1500);
        
    }, 1000);
}

function registerWithGoogle() {
    loginWithGoogle(); // Same process for registration
}

function loginWithGitHub() {
    // GitHub OAuth implementation
    const clientId = 'YOUR_GITHUB_CLIENT_ID'; // You'll need to register a GitHub OAuth app
    const redirectUri = encodeURIComponent(window.location.origin + '/auth/github/callback');
    const scope = 'user:email';
    
    showMessage('GitHub OAuth requires additional setup. Using demo mode.', 'warning', 'fas fa-info-circle');
    
    // For demo purposes, simulate GitHub login
    const demoGitHubUser = {
        id: 'github_demo_' + Date.now(),
        email: 'demo.github@example.com',
        firstName: 'GitHub',
        lastName: 'User',
        institution: '',
        year: ''
    };
    
    // Register demo user
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    if (!registeredUsers.find(u => u.email === demoGitHubUser.email)) {
        registeredUsers.push(demoGitHubUser);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    }
    
    // Create auth token and log them in
    const token = 'github_demo_token_' + Date.now();
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify(demoGitHubUser));
    
    isAuthenticated = true;
    currentUser = demoGitHubUser;
    
    showMessage('Demo GitHub login successful!', 'success', 'fas fa-check-circle');
    
    setTimeout(() => {
        const redirectUrl = localStorage.getItem('redirectUrl') || 'index.html';
        localStorage.removeItem('redirectUrl');
        window.location.href = redirectUrl;
    }, 1500);
}

function registerWithGitHub() {
    loginWithGitHub(); // Same process for registration
}

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('passwordToggleIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Utility functions
function showLoading() {
    document.getElementById('loadingOverlay').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingOverlay').style.display = 'none';
}

function showMessage(text, type, icon) {
    const messageElement = document.getElementById('authMessage');
    const messageContent = messageElement.querySelector('.message-content');
    const messageIcon = messageElement.querySelector('.message-icon');
    const messageText = messageElement.querySelector('.message-text');
    
    messageIcon.className = `message-icon ${icon}`;
    messageText.textContent = text;
    messageContent.className = `message-content ${type}`;
    
    messageElement.classList.add('show');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        messageElement.classList.remove('show');
    }, 5000);
}

// Logout function
function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    isAuthenticated = false;
    currentUser = null;
    
    // Show confirmation message
    if (typeof showNotification === 'function') {
        showNotification('You have been logged out successfully!', 'success');
    }
    
    // Small delay before redirect to show message
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

// Make logout function globally available
window.logout = logout;

// Check authentication for protected pages
function requireAuth() {
    if (!isAuthenticated) {
        // Store current URL for redirect after login
        localStorage.setItem('redirectUrl', window.location.href);
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('forgotPasswordModal');
    if (event.target === modal) {
        closeForgotPassword();
    }
}

// Export functions for global use
window.authModule = {
    isAuthenticated: () => isAuthenticated,
    getCurrentUser: () => currentUser,
    requireAuth,
    logout,
    showMessage,
    showLoading,
    hideLoading
};
