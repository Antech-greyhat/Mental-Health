// ============================================
// LOGIN FORM - JAVASCRIPT
// Modern form validation and interaction with Firebase Authentication
// ============================================

// Import Firebase modules from config
import { 
    auth, 
    signInWithEmailAndPassword, 
    googleProvider,
    signInWithPopup 
} from './firebase-config.js';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // ELEMENT SELECTIONS
    // ============================================
    const form = document.getElementById('loginForm');
    const submitBtn = document.getElementById('submitBtn');
    
    // Input fields
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    
    // Error message elements
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    
    // Password toggle button
    const togglePasswordButton = document.querySelector('.toggle-password');
    
    // ============================================
    // VALIDATION STATE
    // ============================================
    const validationState = {
        email: false,
        password: false
    };
    
    // ============================================
    // VALIDATION FUNCTIONS
    // ============================================
    
    /**
     * Validate Email
     * Must be a properly formatted email address
     */
    function validateEmail() {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value === '') {
            showError(emailError, 'Email is required');
            markInvalid(emailInput);
            validationState.email = false;
        } else if (!emailRegex.test(value)) {
            showError(emailError, 'Please enter a valid email address');
            markInvalid(emailInput);
            validationState.email = false;
        } else {
            hideError(emailError);
            markValid(emailInput);
            validationState.email = true;
        }
        
        updateSubmitButton();
    }
    
    /**
     * Validate Password
     * Must not be empty
     */
    function validatePassword() {
        const value = passwordInput.value;
        
        if (value === '') {
            showError(passwordError, 'Password is required');
            markInvalid(passwordInput);
            validationState.password = false;
        } else if (value.length < 6) {
            showError(passwordError, 'Password must be at least 6 characters');
            markInvalid(passwordInput);
            validationState.password = false;
        } else {
            hideError(passwordError);
            markValid(passwordInput);
            validationState.password = true;
        }
        
        updateSubmitButton();
    }
    
    // ============================================
    // UI HELPER FUNCTIONS
    // ============================================
    
    /**
     * Show error message
     */
    function showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    /**
     * Hide error message
     */
    function hideError(errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
    
    /**
     * Mark input as valid
     */
    function markValid(inputElement) {
        inputElement.classList.remove('invalid');
        inputElement.classList.add('valid');
    }
    
    /**
     * Mark input as invalid
     */
    function markInvalid(inputElement) {
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
    }
    
    /**
     * Update submit button state based on validation
     */
    function updateSubmitButton() {
        const allValid = Object.values(validationState).every(value => value === true);
        submitBtn.disabled = !allValid;
    }
    
    // ============================================
    // PASSWORD TOGGLE FUNCTIONALITY
    // ============================================
    
    togglePasswordButton.addEventListener('click', function() {
        const icon = this.querySelector('i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
            this.setAttribute('aria-label', 'Hide password');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
            this.setAttribute('aria-label', 'Show password');
        }
    });
    
    // ============================================
    // EVENT LISTENERS FOR REAL-TIME VALIDATION
    // ============================================
    
    // Email validation
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            validateEmail();
        }
    });
    
    // Password validation
    passwordInput.addEventListener('blur', validatePassword);
    passwordInput.addEventListener('input', function() {
        if (this.value !== '') {
            validatePassword();
        }
    });
    
    // ============================================
    // REMEMBER ME FUNCTIONALITY
    // ============================================
    
    // Check if there's a saved email on page load
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberMeCheckbox.checked = true;
        validateEmail(); // Validate the pre-filled email
    }
    
    // ============================================
    // FORM SUBMISSION
    // ============================================
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields
        validateEmail();
        validatePassword();
        
        // Check if all validations pass
        const allValid = Object.values(validationState).every(value => value === true);
        
        if (allValid) {
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Handle Remember Me
            if (rememberMeCheckbox.checked) {
                localStorage.setItem('rememberedEmail', emailInput.value.trim());
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            
            // Get form data
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            
            try {
                // Sign in with Firebase Authentication
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                
                console.log('Login successful!', user);
                
                // Show success message
                alert('Login successful! Welcome back.');
                
                // Remove loading state
                submitBtn.classList.remove('loading');
                
                // Redirect to a success page (update this to your actual destination)
                // For now, just stays on the page. Add redirect as needed:
                // window.location.href = 'dashboard.html';
                
            } catch (error) {
                // Remove loading state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                
                // Handle Firebase errors
                console.error('Login error:', error);
                
                let errorMessage = 'Login failed. Please try again.';
                
                // Provide user-friendly error messages
                switch (error.code) {
                    case 'auth/user-not-found':
                        errorMessage = 'No account found with this email. Please register first.';
                        showError(emailError, errorMessage);
                        markInvalid(emailInput);
                        break;
                    case 'auth/wrong-password':
                        errorMessage = 'Incorrect password. Please try again.';
                        showError(passwordError, errorMessage);
                        markInvalid(passwordInput);
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid email address.';
                        showError(emailError, errorMessage);
                        markInvalid(emailInput);
                        break;
                    case 'auth/user-disabled':
                        errorMessage = 'This account has been disabled.';
                        alert(errorMessage);
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = 'Too many failed login attempts. Please try again later.';
                        alert(errorMessage);
                        break;
                    case 'auth/network-request-failed':
                        errorMessage = 'Network error. Please check your internet connection.';
                        alert(errorMessage);
                        break;
                    case 'auth/invalid-credential':
                        errorMessage = 'Invalid email or password. Please check your credentials.';
                        showError(passwordError, errorMessage);
                        markInvalid(passwordInput);
                        break;
                    default:
                        alert(errorMessage);
                }
            }
        }
    });
    
    /**
     * Reset all validation states
     */
    function resetValidation() {
        // Reset validation state
        validationState.email = false;
        validationState.password = false;
        
        // Remove all validation classes
        [emailInput, passwordInput].forEach(input => {
            input.classList.remove('valid', 'invalid');
        });
        
        // Hide all error messages
        [emailError, passwordError].forEach(error => {
            hideError(error);
        });
        
        // Disable submit button
        updateSubmitButton();
    }
    
    // ============================================
    // GOOGLE SIGN IN
    // ============================================
    
    const googleBtn = document.querySelector('.btn-google');
    googleBtn.addEventListener('click', async function() {
        console.log('Google Sign In clicked');
        
        try {
            // Sign in with Google using popup
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            
            console.log('Google sign-in successful!', user);
            alert('Successfully signed in with Google!');
            
            // Redirect to a success page (update this to your actual destination)
            // For now, just stays on the page. Add redirect as needed:
            // window.location.href = 'dashboard.html';
            
        } catch (error) {
            console.error('Google sign-in error:', error);
            
            let errorMessage = 'Google sign-in failed. Please try again.';
            
            // Handle specific errors
            switch (error.code) {
                case 'auth/popup-closed-by-user':
                    errorMessage = 'Sign-in popup was closed.';
                    break;
                case 'auth/popup-blocked':
                    errorMessage = 'Pop-up was blocked by your browser. Please allow pop-ups for this site.';
                    break;
                case 'auth/account-exists-with-different-credential':
                    errorMessage = 'An account already exists with this email using a different sign-in method.';
                    break;
            }
            
            alert(errorMessage);
        }
    });
    
    // ============================================
    // FORGOT PASSWORD (Mock Implementation)
    // ============================================
    
    const forgotPasswordLink = document.querySelector('.forgot-password');
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Forgot Password clicked');
        alert('Password reset functionality would be implemented here.\nYou would receive an email with reset instructions.');
        // Implement password reset flow here
        // Example: window.location.href = 'forgot-password.html';
    });
    
    // ============================================
    // ACCESSIBILITY: Form submission on Enter key
    // ============================================
    
    [emailInput, passwordInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !submitBtn.disabled) {
                form.dispatchEvent(new Event('submit'));
            }
        });
    });
    
});
