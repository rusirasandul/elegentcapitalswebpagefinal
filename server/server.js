const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database file path
const dbPath = path.join(__dirname, 'subscribers.json');

// Initialize database file if it doesn't exist
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify({ subscribers: [] }, null, 2));
}

// Helper function to read database
const readDatabase = () => {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
};

// Helper function to write database
const writeDatabase = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Subscribe endpoint
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide a valid email address' 
    });
  }

  try {
    const db = readDatabase();

    // Check if email already exists
    const existingSubscriber = db.subscribers.find(
      sub => sub.email.toLowerCase() === email.toLowerCase()
    );

    if (existingSubscriber) {
      return res.status(409).json({ 
        success: false, 
        message: 'This email is already subscribed' 
      });
    }

    // Add new subscriber
    const newSubscriber = {
      id: Date.now(),
      email: email.toLowerCase(),
      subscribedAt: new Date().toISOString(),
      status: 'active'
    };

    db.subscribers.push(newSubscriber);
    writeDatabase(db);

    res.status(201).json({ 
      success: true, 
      message: 'Successfully subscribed!',
      subscriber: newSubscriber
    });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred. Please try again later.' 
    });
  }
});

// Get all subscribers (for admin use)
app.get('/api/subscribers', (req, res) => {
  try {
    const db = readDatabase();
    res.json({ 
      success: true, 
      count: db.subscribers.length,
      subscribers: db.subscribers 
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching subscribers' 
    });
  }
});

// Export subscribers to CSV (for email campaigns)
app.get('/api/subscribers/export', (req, res) => {
  try {
    const db = readDatabase();
    
    // Create CSV content
    let csv = 'Email,Subscribed Date,Status\n';
    db.subscribers.forEach(sub => {
      csv += `${sub.email},${sub.subscribedAt},${sub.status}\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=subscribers.csv');
    res.send(csv);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error exporting subscribers' 
    });
  }
});

// Unsubscribe endpoint
app.post('/api/unsubscribe', (req, res) => {
  const { email } = req.body;

  try {
    const db = readDatabase();
    const subscriberIndex = db.subscribers.findIndex(
      sub => sub.email.toLowerCase() === email.toLowerCase()
    );

    if (subscriberIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Email not found in subscribers list' 
      });
    }

    // Mark as unsubscribed instead of deleting
    db.subscribers[subscriberIndex].status = 'unsubscribed';
    db.subscribers[subscriberIndex].unsubscribedAt = new Date().toISOString();
    
    writeDatabase(db);

    res.json({ 
      success: true, 
      message: 'Successfully unsubscribed' 
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error processing unsubscribe request' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`📧 Subscriber database: ${dbPath}`);
});
