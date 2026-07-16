/**
 * Onboarding Form Handler
 * Manages multi-step form navigation, validation, and AJAX submission
 */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('onboarding-form');
    const steps = document.querySelectorAll('.form-step');
    const stepButtons = document.querySelectorAll('.step');
    const progressBar = document.getElementById('progressBar');
    let currentStep = 1;

    // Initialize event listeners
    if (form) {
        initializeFormHandlers();
    }

    /**
     * Initialize all form event handlers
     */
    function initializeFormHandlers() {
        // Next/Previous buttons
        document.querySelectorAll('.btn-next').forEach(btn => {
            btn.addEventListener('click', handleNextStep);
        });

        document.querySelectorAll('.btn-prev').forEach(btn => {
            btn.addEventListener('click', handlePrevStep);
        });

        // Form submission
        form.addEventListener('submit', handleFormSubmit);

        // Real-time validation on input
        document.getElementById('name').addEventListener('blur', validateName);
        document.getElementById('email').addEventListener('blur', validateEmail);
    }

    /**
     * Handle next step button click
     */
    function handleNextStep(e) {
        const nextStep = parseInt(e.target.dataset.next);
        
        if (validateStep(currentStep)) {
            goToStep(nextStep);
        }
    }

    /**
     * Handle previous step button click
     */
    function handlePrevStep(e) {
        const prevStep = parseInt(e.target.dataset.prev);
        goToStep(prevStep);
    }

    /**
     * Navigate to specific step
     */
    function goToStep(step) {
        if (step < 1 || step > 3) return;

        // Hide current step
        steps.forEach(s => s.classList.remove('active'));
        stepButtons.forEach(b => b.classList.remove('active'));

        // Mark completed steps
        for (let i = 1; i < step; i++) {
            document.getElementById(`step-${i}`).classList.add('completed');
        }

        // Show new step
        document.querySelector(`[data-step="${step}"]`).classList.add('active');
        document.getElementById(`step-${step}`).classList.add('active');

        currentStep = step;
        updateProgressBar();
    }

    /**
     * Update progress bar width
     */
    function updateProgressBar() {
        const progress = (currentStep / 3) * 100;
        progressBar.style.width = progress + '%';
    }

    /**
     * Validate current step
     */
    function validateStep(step) {
        switch(step) {
            case 1:
                return validateName();
            case 2:
                return validateEmail();
            case 3:
                return validateLocation();
            default:
                return true;
        }
    }

    /**
     * Validate name field
     */
    function validateName() {
        const nameInput = document.getElementById('name');
        const errorSpan = document.getElementById('error-name');
        const nameGroup = nameInput.closest('.form-group');

        if (nameInput.value.trim() === '') {
            showError(nameGroup, errorSpan, 'Name is required.');
            return false;
        }

        if (nameInput.value.trim().length < 2) {
            showError(nameGroup, errorSpan, 'Name must be at least 2 characters.');
            return false;
        }

        hideError(nameGroup, errorSpan);
        return true;
    }

    /**
     * Validate email field
     */
    function validateEmail() {
        const emailInput = document.getElementById('email');
        const errorSpan = document.getElementById('error-email');
        const emailGroup = emailInput.closest('.form-group');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailInput.value.trim() === '') {
            showError(emailGroup, errorSpan, 'Email is required.');
            return false;
        }

        if (!emailRegex.test(emailInput.value)) {
            showError(emailGroup, errorSpan, 'Please enter a valid email address.');
            return false;
        }

        hideError(emailGroup, errorSpan);
        return true;
    }

    /**
     * Validate location selection
     */
    function validateLocation() {
        const locationInput = document.querySelector('input[name="location"]:checked');
        const errorSpan = document.getElementById('error-location');
        const locationGroup = document.querySelector('input[name="location"]').closest('.form-group');

        if (!locationInput) {
            showError(locationGroup, errorSpan, 'Please select a location.');
            return false;
        }

        hideError(locationGroup, errorSpan);
        return true;
    }

    /**
     * Show error message
     */
    function showError(group, errorSpan, message) {
        group.classList.add('error');
        errorSpan.textContent = message;
        errorSpan.classList.add('show');
    }

    /**
     * Hide error message
     */
    function hideError(group, errorSpan) {
        group.classList.remove('error');
        errorSpan.textContent = '';
        errorSpan.classList.remove('show');
    }

    /**
     * Handle form submission with AJAX
     */
    async function handleFormSubmit(e) {
        e.preventDefault();

        // Validate all fields one last time
        if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
            goToStep(1); // Return to step 1 to show errors
            return;
        }

        const submitBtn = document.getElementById('submitBtn');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const location = document.querySelector('input[name="location"]:checked').value;
        const nonce = document.querySelector('input[name="nonce"]').value;

        try {
            // Use Fetch API for modern AJAX request
            const response = await fetch(onboardingAjax.ajaxurl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    action: 'onboarding_submit',
                    nonce: nonce,
                    name: name,
                    email: email,
                    location: location,
                }),
            });


const text = await response.text();

console.log(text);

const result = JSON.parse(text);


            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;

            if (result.success) {
                showSuccessMessage(result.data);
            } else {
                showErrorAlert(result.data.errors);
            }
        } catch (error) {
            console.error('Submission error:', error);
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            showErrorAlert(['An unexpected error occurred. Please try again.']);
        }
    }

    /**
     * Display success message
     */
    function showSuccessMessage(data) {
        const successMsg = document.getElementById('successMessage');
        const successText = document.getElementById('successText');

        steps.forEach(s => s.classList.remove('active'));
        successMsg.classList.add('active');

        successText.textContent = `Welcome, ${escapeHtml(data.name)}! We've received your application at ${escapeHtml(data.email)}.`;

        // Scroll to success message
        successMsg.scrollIntoView({ behavior: 'smooth' });
    }

    /**
     * Display error alert
     */
    function showErrorAlert(errors) {
        const errorMessage = errors.join(' ');
        alert('Form submission failed:\n\n' + errorMessage);
    }

    /**
     * Escape HTML to prevent XSS
     */
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
});
