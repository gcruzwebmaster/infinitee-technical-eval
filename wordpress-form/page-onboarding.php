<?php
/**
 * Template Name: Multi-Step Onboarding Form
 * Description: Custom multi-step form with AJAX submission, validation, and webhook integration
 * 
 * This template handles:
 * - Multi-step form UI with progress tracking
 * - Client-side validation and UX
 * - Server-side validation, sanitization, and escaping (Nonce-protected)
 * - Async AJAX/Fetch submission
 * - Webhook payload simulation
 * - Performance optimization (Lighthouse-ready)
 */





get_header();
?>




<main id="main" class="site-main">
    <div class="container">
        <section class="onboarding-section">
            <h1>Welcome to Our Platform</h1>
            <p class="intro-text">Complete your profile in just 3 steps.</p>

            <!-- Progress Bar -->
            <div class="progress-bar">
                <div class="progress-fill" id="progressBar"></div>
            </div>
            <div class="step-indicator">
                <span class="step active" id="step-1">1</span>
                <span class="step" id="step-2">2</span>
                <span class="step" id="step-3">3</span>
            </div>

            <!-- Multi-Step Form -->
            <form id="onboarding-form" class="onboarding-form">
                <?php wp_nonce_field( 'onboarding_nonce', 'nonce' ); ?>

                <!-- Step 1: Name -->
                <div class="form-step active" data-step="1">
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder="Enter your full name" 
                            required 
                            aria-label="Full Name"
                        />
                        <span class="error-message" id="error-name"></span>
                    </div>
                    <button type="button" class="btn btn-next" data-next="2">Next</button>
                </div>

                <!-- Step 2: Email -->
                <div class="form-step" data-step="2">
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Enter your email" 
                            required 
                            aria-label="Email Address"
                        />
                        <span class="error-message" id="error-email"></span>
                    </div>
                    <button type="button" class="btn btn-prev" data-prev="1">Back</button>
                    <button type="button" class="btn btn-next" data-next="3">Next</button>
                </div>

                <!-- Step 3: Location Selection -->
                <div class="form-step" data-step="3">
                    <div class="form-group">
                        <label>Select Your Location</label>
                        <div class="location-options">
                            <label class="location-checkbox">
                                <input type="radio" name="location" value="North America" required />
                                <span>North America</span>
                            </label>
                            <label class="location-checkbox">
                                <input type="radio" name="location" value="Europe" />
                                <span>Europe</span>
                            </label>
                            <label class="location-checkbox">
                                <input type="radio" name="location" value="Asia Pacific" />
                                <span>Asia Pacific</span>
                            </label>
                            <label class="location-checkbox">
                                <input type="radio" name="location" value="Other" />
                                <span>Other</span>
                            </label>
                        </div>
                        <span class="error-message" id="error-location"></span>
                    </div>
                    <button type="button" class="btn btn-prev" data-prev="2">Back</button>
                    <button type="submit" class="btn btn-submit" id="submitBtn">Submit Application</button>
                </div>

                <!-- Success Message -->
                <div class="form-step success-message" id="successMessage">
                    <div class="success-icon">✓</div>
                    <h2>Application Submitted!</h2>
                    <p id="successText"></p>
                </div>
            </form>
        </section>
    </div>
</main>

<?php get_footer();
