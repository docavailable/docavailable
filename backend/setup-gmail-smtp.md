# 📧 Gmail SMTP Setup for Doc Available

To send the test email, you need to set up Gmail SMTP authentication:

## 🚀 Quick Setup (Choose Option 1 OR 2)

### Option 1: Use Your Personal Gmail (Recommended for Testing)

1. **Go to your Gmail account settings**
2. **Enable 2-Factor Authentication** (if not already enabled)
3. **Generate App Password:**
   - Go to Google Account Settings → Security
   - Click "App passwords" (under 2-Step Verification)
   - Select "Mail" and "Other (custom name)" → enter "Doc Available"
   - Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

4. **Update .env file:**
   ```env
   MAIL_USERNAME=your-gmail@gmail.com
   MAIL_PASSWORD=abcd-efgh-ijkl-mnop  # Use the app password
   MAIL_FROM_ADDRESS="your-gmail@gmail.com"
   ```

### Option 2: Create Dedicated Gmail Account (Recommended for Production)

1. **Create new Gmail account:** `docavailable.healthcare@gmail.com`
2. **Enable 2-Factor Authentication**
3. **Generate App Password** (same steps as above)
4. **The .env is already configured** for this option

## 🧪 After Setup

1. **Clear Laravel cache:**
   ```bash
   php artisan config:clear
   ```

2. **Run the test:**
   ```bash
   php send-test-email.php
   ```

## 🔧 Alternative: Use Different Email Service

If you prefer not to use Gmail, here are other options:

### Mailgun (Professional)
```env
MAIL_HOST=smtp.mailgun.org
MAIL_PORT=587
MAIL_USERNAME=postmaster@your-domain.mailgun.org
MAIL_PASSWORD=your-mailgun-password
```

### SendGrid
```env
MAIL_HOST=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USERNAME=apikey
MAIL_PASSWORD=your-sendgrid-api-key
```

---
**Note:** For testing purposes, using your personal Gmail with an app password is the fastest option!
