// ============================================
// REGISTRATION FORM - JAVASCRIPT
// Modern form validation and interaction
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // ELEMENT SELECTIONS
    // ============================================
    const form = document.getElementById('registerForm');
    const submitBtn = document.getElementById('submitBtn');
    
    // Input fields
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    // Error message elements
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    
    // Password toggle buttons
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    // ============================================
    // VALIDATION STATE
    // ============================================
    const validationState = {
        email: false,
        password: false,
        confirmPassword: false
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
     * Must be at least 8 characters long
     */
    function validatePassword() {
        const value = passwordInput.value;
        
        if (value === '') {
            showError(passwordError, 'Password is required');
            markInvalid(passwordInput);
            validationState.password = false;
        } else if (value.length < 8) {
            showError(passwordError, 'Password must be at least 8 characters');
            markInvalid(passwordInput);
            validationState.password = false;
        } else {
            hideError(passwordError);
            markValid(passwordInput);
            validationState.password = true;
        }
        
        // Re-validate confirm password if it has a value
        if (confirmPasswordInput.value !== '') {
            validateConfirmPassword();
        }
        
        updateSubmitButton();
    }
    
    /**
     * Validate Confirm Password
     * Must match the password field
     */
    function validateConfirmPassword() {
        const value = confirmPasswordInput.value;
        const passwordValue = passwordInput.value;
        
        if (value === '') {
            showError(confirmPasswordError, 'Please confirm your password');
            markInvalid(confirmPasswordInput);
            validationState.confirmPassword = false;
        } else if (value !== passwordValue) {
            showError(confirmPasswordError, 'Passwords do not match');
            markInvalid(confirmPasswordInput);
            validationState.confirmPassword = false;
        } else {
            hideError(confirmPasswordError);
            markValid(confirmPasswordInput);
            validationState.confirmPassword = true;
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
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const targetInput = document.getElementById(targetId);
            const icon = this.querySelector('i');
            
            if (targetInput.type === 'password') {
                targetInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
                this.setAttribute('aria-label', 'Hide password');
            } else {
                targetInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
                this.setAttribute('aria-label', 'Show password');
            }
        });
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
    
    // Confirm Password validation
    confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
    confirmPasswordInput.addEventListener('input', function() {
        if (this.value !== '') {
            validateConfirmPassword();
        }
    });
    
    // ============================================
    // FORM SUBMISSION
    // ============================================
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        validateEmail();
        validatePassword();
        validateConfirmPassword();
        
        // Check if all validations pass
        const allValid = Object.values(validationState).every(value => value === true);
        
        if (allValid) {
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Get form data
                const formData = {
                    email: emailInput.value.trim(),
                    password: passwordInput.value
                };
                
                console.log('Form submitted successfully!', formData);
                
                // Show success message (you can customize this)
                alert('Registration successful! Welcome to Mental Health Research.');
                
                // Remove loading state
                submitBtn.classList.remove('loading');
                
                // Reset form (optional)
                // form.reset();
                // resetValidation();
                
                // Redirect to login or dashboard (uncomment when ready)
                // window.location.href = 'Login.html';
            }, 2000);
        }
    });
    
    /**
     * Reset all validation states
     */
    function resetValidation() {
        // Reset validation state
        validationState.email = false;
        validationState.password = false;
        validationState.confirmPassword = false;
        
        // Remove all validation classes
        [emailInput, passwordInput, confirmPasswordInput].forEach(input => {
            input.classList.remove('valid', 'invalid');
        });
        
        // Hide all error messages
        [emailError, passwordError, confirmPasswordError].forEach(error => {
            hideError(error);
        });
        
        // Disable submit button
        updateSubmitButton();
    }
    
    // ============================================
    // GOOGLE SIGN IN (Mock Implementation)
    // ============================================
    
    const googleBtn = document.querySelector('.btn-google');
    googleBtn.addEventListener('click', function() {
        console.log('Google Sign In clicked');
        alert('Google Sign In functionality would be implemented here using Google OAuth.');
        // Implement Google OAuth here
        // Example: window.location.href = 'your-google-oauth-url';
    });
    
    // ============================================
    // ACCESSIBILITY: Form submission on Enter key
    // ============================================
    
    [emailInput, passwordInput, confirmPasswordInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !submitBtn.disabled) {
                form.dispatchEvent(new Event('submit'));
            }
        });
    });
    
});
