<?php
/**
 * AJAX handler for onboarding form
 */

add_action('wp_ajax_onboarding_submit', 'handle_onboarding_submission');
add_action('wp_ajax_nopriv_onboarding_submit', 'handle_onboarding_submission');

function handle_onboarding_submission() {

    check_ajax_referer('onboarding_nonce', 'nonce');

    $name     = isset($_POST['name']) ? sanitize_text_field($_POST['name']) : '';
    $email    = isset($_POST['email']) ? sanitize_email($_POST['email']) : '';
    $location = isset($_POST['location']) ? sanitize_text_field($_POST['location']) : '';

    $errors = array();

    if (empty($name)) {
        $errors[] = 'Name is required.';
    }

    if (empty($email) || !is_email($email)) {
        $errors[] = 'Please enter a valid email.';
    }

    if (empty($location)) {
        $errors[] = 'Please select your location.';
    }

    if (!empty($errors)) {
        wp_send_json_error(array(
            'errors' => $errors
        ));
    }

    $data = array(
        'name'      => esc_html($name),
        'email'     => esc_html($email),
        'location'  => esc_html($location),
        'timestamp' => current_time('mysql'),
    );

    // Simulate webhook logging
    error_log(
        wp_json_encode($data) . PHP_EOL,
        3,
        WP_CONTENT_DIR . '/webhook-log.txt'
    );

    wp_send_json_success($data);
}
