# Newsletter Subscription System Setup Guide

## Overview
A complete backend system to collect and manage newsletter subscribers.

## Features
✅ Subscribe new emails
✅ Prevent duplicate subscriptions
✅ Store subscribers in JSON database
✅ Export subscribers to CSV for email campaigns
✅ Unsubscribe functionality
✅ Track subscription dates and status

## Installation

### 1. Install Server Dependencies
```bash
cd server
npm install
```

### 2. Start the Backend Server
```bash
npm start
```
Or for development (auto-restart on changes):
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### 3. Start the Frontend
In a new terminal:
```bash
cd ..
npm start
```

## API Endpoints

### Subscribe
```
POST http://localhost:5000/api/subscribe
Body: { "email": "user@example.com" }
```

### Get All Subscribers
```
GET http://localhost:5000/api/subscribers
```

### Export Subscribers (CSV)
```
GET http://localhost:5000/api/subscribers/export
```

### Unsubscribe
```
POST http://localhost:5000/api/unsubscribe
Body: { "email": "user@example.com" }
```

### Health Check
```
GET http://localhost:5000/api/health
```

## Database

The subscriber data is stored in `server/subscribers.json`:

```json
{
  "subscribers": [
    {
      "id": 1234567890,
      "email": "user@example.com",
      "subscribedAt": "2025-11-24T10:30:00.000Z",
      "status": "active"
    }
  ]
}
```

## Viewing Subscribers

### Option 1: Direct API Call
Open your browser and go to:
```
http://localhost:5000/api/subscribers
```

### Option 2: Export to CSV
Go to:
```
http://localhost:5000/api/subscribers/export
```
This will download a CSV file you can open in Excel.

### Option 3: View JSON File
Open: `server/subscribers.json`

## Sending Email Campaigns

1. **Export subscribers:**
   ```
   http://localhost:5000/api/subscribers/export
   ```

2. **Use the CSV with email services:**
   - Mailchimp
   - SendGrid
   - Brevo (Sendinblue)
   - Gmail (up to 500 recipients)
   - Any other email marketing service

3. **Import the CSV** into your email service and create your campaign.

## Production Deployment

### Deploy Backend to Heroku/Railway/Render:

1. Create account on hosting platform
2. Connect your GitHub repository
3. Set environment variables (if needed)
4. Deploy from `server` folder

### Update Frontend API URL:
In `Footer.js`, change:
```javascript
const response = await fetch('http://localhost:5000/api/subscribe', {
```
To:
```javascript
const response = await fetch('https://your-server-url.com/api/subscribe', {
```

## Security Notes

- The `/api/subscribers` endpoint should be protected with authentication in production
- Consider adding rate limiting to prevent spam
- Add CAPTCHA to the subscribe form if needed
- Keep `subscribers.json` in `.gitignore` (already configured)

## Backup

Regularly backup `server/subscribers.json` to prevent data loss.

## Troubleshooting

**Server won't start:**
- Make sure port 5000 is available
- Check if dependencies are installed: `cd server && npm install`

**Subscribe not working:**
- Check if backend server is running
- Check browser console for errors
- Verify CORS is enabled (already configured)

**Can't see subscribers:**
- Check if `subscribers.json` exists in server folder
- Try accessing `http://localhost:5000/api/health`

## Need Help?

Check the server logs in the terminal where you ran `npm start` for detailed error messages.
