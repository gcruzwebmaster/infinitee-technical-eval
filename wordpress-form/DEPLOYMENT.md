# WordPress Onboarding Form Deployment Guide

## Overview

This project is a custom multi-step onboarding form built for WordPress using a lightweight custom theme.

The implementation demonstrates:

- Secure AJAX form submission
- Server-side validation and sanitization
- WordPress Nonce protection
- Simulated webhook integration
- Responsive multi-step UI
- Modular theme architecture
- No third-party form plugins

---

# Live Demo

Sandbox URL

https://client.gracecruz.net/onboarding/

---

# Theme Structure

```
wp-content/
└── themes/
    └── infinitee-eval/
        ├── style.css
        ├── functions.php
        ├── header.php
        ├── footer.php
        ├── index.php
        ├── page-onboarding.php
        ├── css/
        │   └── onboarding.css
        ├── js/
        │   └── onboarding-form.js
        └── inc/
            └── ajax-handler.php
```

---

# Architecture Overview

The project follows separation of concerns.

## page-onboarding.php

Responsible only for rendering the onboarding interface.

Contains:

- HTML markup
- WordPress nonce field
- Multi-step form
- Success message container

No business logic is stored in the template.

---

## Request Flow

Browser
    ↓
onboarding-form.js
    ↓
admin-ajax.php
    ↓
ajax-handler.php
    ↓
Validation
    ↓
Webhook Log
    ↓
JSON Response
    ↓
Success Screen

## functions.php

Responsible for bootstrapping the component.

Responsibilities include:

- Loading CSS
- Loading JavaScript
- Registering localized AJAX variables
- Loading AJAX handlers

Assets are only loaded when the onboarding template is being viewed.

---

## ajax-handler.php

Handles all server-side processing.

Responsibilities:

- Verify WordPress Nonce
- Sanitize all submitted values
- Validate required fields
- Simulate webhook logging
- Return JSON success/error responses

Keeping this logic isolated makes it reusable and easier to maintain.

---

## onboarding-form.js

Handles the client-side experience.

Features include:

- Multi-step navigation
- Progress indicator
- Client-side validation
- Fetch API submission
- AJAX success/error handling
- Dynamic success screen

---
# Request Flow

The following diagram illustrates how data flows through the application.

```text
User
   │
   ▼
page-onboarding.php
(Render Form)
   │
   ▼
onboarding-form.js
(Client-side Validation)
   │
   ▼
Fetch API
   │
   ▼
WordPress admin-ajax.php
   │
   ▼
inc/ajax-handler.php
   ├── Verify Nonce
   ├── Sanitize Input
   ├── Validate Fields
   ├── Simulate Webhook
   └── Return JSON Response
   │
   ▼
Success Screen / Error Messages

---

# Security

The implementation follows WordPress security best practices.

## Nonce Verification

Every AJAX request is verified using

```

check_ajax_referer()

```

to protect against CSRF attacks.

---

## Input Sanitization

All incoming values are sanitized before processing.

Examples:

- sanitize_text_field()
- sanitize_email()

---

## Server-side Validation

Validation is performed again on the server regardless of client-side checks.

This prevents malicious requests from bypassing browser validation.

---

## Safe JSON Responses

Responses are returned using

```

wp_send_json_success()

wp_send_json_error()

```

instead of manually echoing JSON.

---

# Webhook Simulation

Instead of calling a live CRM endpoint, the submission is logged into

```

wp-content/webhook-log.txt

```

This simulates the payload that would normally be sent to an external CRM.

Replacing this with

```

wp_remote_post()

```

would integrate directly with platforms such as HubSpot, ActiveCampaign or GoHighLevel.

---

# Deployment Steps

## 1. Upload Theme

Copy the theme folder

```

infinitee-eval

```

to

```

/wp-content/themes/

```

---

## 2. Activate Theme

WordPress Admin

Appearance

Themes

Activate

```

Infinitee Eval

```

---

## 3. Create Page

Create a page called

```

Onboarding

```

Select the page template

```

Multi-Step Onboarding Form

```

Publish.

---

## 4. Verify Assets

Confirm the browser loads

```

css/onboarding.css

js/onboarding-form.js

```

---

## 5. Test Form

Submit a test entry.

Verify:

- validation works
- success message appears
- no page reload
- webhook-log.txt receives a new payload

---

# Troubleshooting

## CSS not loading

Check:

- Theme is active
- Asset paths are correct
- Browser cache has been cleared

---

## AJAX not working

Verify:

- functions.php loads ajax-handler.php
- admin-ajax.php returns JSON
- Nonce matches
- Browser console contains no JavaScript errors

---

## Webhook log missing

Ensure

```

wp-content/

```

is writable.

---

# Performance

The solution was designed with performance in mind.

Features include:

- Lightweight custom theme
- Vanilla JavaScript
- Fetch API
- No jQuery dependency
- No external UI libraries
- Conditional asset loading
- Minimal DOM manipulation

---

# Future Improvements

This implementation can easily be extended by adding:

- Database storage
- Email notifications
- HubSpot integration
- Salesforce integration
- GoHighLevel integration
- Spam protection
- reCAPTCHA
- Multi-language support

---

# Author

Grace Cruz

Senior Web Developer

https://gracecruz.net

https://codewisestudio.com
