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
const careersDbPath = path.join(__dirname, 'careers.json');
const applicationsDbPath = path.join(__dirname, 'applications.json');

// Initialize database file if it doesn't exist
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify({ subscribers: [] }, null, 2));
}

if (!fs.existsSync(careersDbPath)) {
  fs.writeFileSync(careersDbPath, JSON.stringify({ jobs: [] }, null, 2));
}

if (!fs.existsSync(applicationsDbPath)) {
  fs.writeFileSync(applicationsDbPath, JSON.stringify({ applications: [] }, null, 2));
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

// ============ CAREERS ENDPOINTS ============

// Get all active jobs
app.get('/api/careers', (req, res) => {
  try {
    const data = fs.readFileSync(careersDbPath, 'utf8');
    const db = JSON.parse(data);
    res.json({ 
      success: true, 
      count: db.jobs.length,
      jobs: db.jobs 
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching jobs' 
    });
  }
});

// Add new job (admin)
app.post('/api/careers/add', (req, res) => {
  const { title, description, location, type, salary } = req.body;

  if (!title || !description || !location || !type) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide all required fields' 
    });
  }

  try {
    const data = fs.readFileSync(careersDbPath, 'utf8');
    const db = JSON.parse(data);

    const newJob = {
      id: Date.now(),
      title,
      description,
      location,
      type,
      salary: salary || 'Competitive',
      status: 'active',
      createdAt: new Date().toISOString()
    };

    db.jobs.push(newJob);
    fs.writeFileSync(careersDbPath, JSON.stringify(db, null, 2));

    res.status(201).json({ 
      success: true, 
      message: 'Job posted successfully!',
      job: newJob
    });
  } catch (error) {
    console.error('Error adding job:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error adding job' 
    });
  }
});

// Update job status (admin)
app.put('/api/careers/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const data = fs.readFileSync(careersDbPath, 'utf8');
    const db = JSON.parse(data);
    
    const jobIndex = db.jobs.findIndex(job => job.id === parseInt(id));
    
    if (jobIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found' 
      });
    }

    db.jobs[jobIndex].status = status;
    db.jobs[jobIndex].updatedAt = new Date().toISOString();
    
    fs.writeFileSync(careersDbPath, JSON.stringify(db, null, 2));

    res.json({ 
      success: true, 
      message: 'Job updated successfully',
      job: db.jobs[jobIndex]
    });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating job' 
    });
  }
});

// Delete job (admin)
app.delete('/api/careers/:id', (req, res) => {
  const { id } = req.params;

  try {
    const data = fs.readFileSync(careersDbPath, 'utf8');
    const db = JSON.parse(data);
    
    const jobIndex = db.jobs.findIndex(job => job.id === parseInt(id));
    
    if (jobIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found' 
      });
    }

    db.jobs.splice(jobIndex, 1);
    fs.writeFileSync(careersDbPath, JSON.stringify(db, null, 2));

    res.json({ 
      success: true, 
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting job' 
    });
  }
});

// Submit job application
app.post('/api/careers/apply', (req, res) => {
  const { jobId, jobTitle, name, email, phone, coverLetter, resumeName } = req.body;

  if (!jobId || !name || !email || !phone || !coverLetter) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide all required fields' 
    });
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide a valid email address' 
    });
  }

  try {
    const data = fs.readFileSync(applicationsDbPath, 'utf8');
    const db = JSON.parse(data);

    const newApplication = {
      id: Date.now(),
      jobId,
      jobTitle,
      name,
      email: email.toLowerCase(),
      phone,
      coverLetter,
      resumeName,
      status: 'pending',
      appliedAt: new Date().toISOString()
    };

    db.applications.push(newApplication);
    fs.writeFileSync(applicationsDbPath, JSON.stringify(db, null, 2));

    res.status(201).json({ 
      success: true, 
      message: 'Application submitted successfully!',
      application: newApplication
    });
  } catch (error) {
    console.error('Application error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error submitting application' 
    });
  }
});

// Get all applications (admin)
app.get('/api/careers/applications', (req, res) => {
  try {
    const data = fs.readFileSync(applicationsDbPath, 'utf8');
    const db = JSON.parse(data);
    res.json({ 
      success: true, 
      count: db.applications.length,
      applications: db.applications 
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching applications' 
    });
  }
});

// Export applications to CSV
app.get('/api/careers/applications/export', (req, res) => {
  try {
    const data = fs.readFileSync(applicationsDbPath, 'utf8');
    const db = JSON.parse(data);
    
    // Create CSV content
    let csv = 'Job Title,Name,Email,Phone,Status,Applied Date,Resume\n';
    db.applications.forEach(app => {
      csv += `"${app.jobTitle}","${app.name}","${app.email}","${app.phone}","${app.status}","${app.appliedAt}","${app.resumeName}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=job_applications.csv');
    res.send(csv);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error exporting applications' 
    });
  }
});

// Update application status (admin)
app.put('/api/careers/applications/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const data = fs.readFileSync(applicationsDbPath, 'utf8');
    const db = JSON.parse(data);
    
    const appIndex = db.applications.findIndex(app => app.id === parseInt(id));
    
    if (appIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Application not found' 
      });
    }

    db.applications[appIndex].status = status;
    db.applications[appIndex].updatedAt = new Date().toISOString();
    
    fs.writeFileSync(applicationsDbPath, JSON.stringify(db, null, 2));

    res.json({ 
      success: true, 
      message: 'Application status updated',
      application: db.applications[appIndex]
    });
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating application' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`📧 Subscriber database: ${dbPath}`);
  console.log(`💼 Careers database: ${careersDbPath}`);
  console.log(`📝 Applications database: ${applicationsDbPath}`);
});
