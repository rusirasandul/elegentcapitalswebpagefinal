# Careers Management Guide

## Overview
Complete system for managing job postings and applications with a Node.js backend.

## Features
✅ Add/edit/delete job postings
✅ Users can apply for jobs
✅ Store applications in database
✅ Export applications to CSV
✅ Track application status

## Managing Jobs

### Add a New Job
```bash
curl -X POST http://localhost:5000/api/careers/add \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior Financial Consultant",
    "description": "We are looking for an experienced financial consultant to join our team...",
    "location": "Nugegoda, Sri Lanka",
    "type": "Full-time",
    "salary": "LKR 100,000 - 150,000"
  }'
```

Or use this HTML tool:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Add Job</title>
    <style>
        body { font-family: Arial; max-width: 600px; margin: 50px auto; padding: 20px; }
        input, textarea, select { width: 100%; margin: 10px 0; padding: 10px; }
        button { background: #f59e0b; color: white; padding: 10px 20px; border: none; cursor: pointer; }
    </style>
</head>
<body>
    <h1>Add New Job</h1>
    <form id="jobForm">
        <input type="text" id="title" placeholder="Job Title" required>
        <textarea id="description" placeholder="Job Description" rows="4" required></textarea>
        <input type="text" id="location" placeholder="Location" required>
        <select id="type" required>
            <option value="">Select Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
        </select>
        <input type="text" id="salary" placeholder="Salary Range">
        <button type="submit">Add Job</button>
    </form>
    <div id="result"></div>

    <script>
        document.getElementById('jobForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const job = {
                title: document.getElementById('title').value,
                description: document.getElementById('description').value,
                location: document.getElementById('location').value,
                type: document.getElementById('type').value,
                salary: document.getElementById('salary').value || 'Competitive'
            };

            try {
                const response = await fetch('http://localhost:5000/api/careers/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(job)
                });
                const data = await response.json();
                document.getElementById('result').innerHTML = 
                    `<p style="color: green;">✓ Job added! ID: ${data.job.id}</p>`;
                document.getElementById('jobForm').reset();
            } catch (error) {
                document.getElementById('result').innerHTML = 
                    `<p style="color: red;">✗ Error: ${error.message}</p>`;
            }
        });
    </script>
</body>
</html>
```

Save this as `add_job.html` and open in your browser.

### View All Jobs
```
http://localhost:5000/api/careers
```

### Update Job Status
```bash
# Deactivate a job (job ID = 1234567890)
curl -X PUT http://localhost:5000/api/careers/1234567890 \
  -H "Content-Type: application/json" \
  -d '{"status": "inactive"}'

# Activate a job
curl -X PUT http://localhost:5000/api/careers/1234567890 \
  -H "Content-Type: application/json" \
  -d '{"status": "active"}'
```

### Delete a Job
```bash
curl -X DELETE http://localhost:5000/api/careers/1234567890
```

## Managing Applications

### View All Applications
```
http://localhost:5000/api/careers/applications
```

### Export Applications to CSV
```
http://localhost:5000/api/careers/applications/export
```

This downloads a CSV file with all applications that you can open in Excel.

### Update Application Status
```bash
# Mark as reviewed (application ID = 1234567890)
curl -X PUT http://localhost:5000/api/careers/applications/1234567890 \
  -H "Content-Type: application/json" \
  -d '{"status": "reviewed"}'

# Other statuses: pending, shortlisted, rejected, hired
```

## Database Files

### careers.json
```json
{
  "jobs": [
    {
      "id": 1234567890,
      "title": "Senior Financial Consultant",
      "description": "Job description here...",
      "location": "Nugegoda, Sri Lanka",
      "type": "Full-time",
      "salary": "LKR 100,000 - 150,000",
      "status": "active",
      "createdAt": "2025-11-24T10:00:00.000Z"
    }
  ]
}
```

### applications.json
```json
{
  "applications": [
    {
      "id": 1234567890,
      "jobId": 1234567890,
      "jobTitle": "Senior Financial Consultant",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+94 XX XXX XXXX",
      "coverLetter": "I am interested...",
      "resumeName": "resume.pdf",
      "status": "pending",
      "appliedAt": "2025-11-24T11:00:00.000Z"
    }
  ]
}
```

## Example: Adding Sample Jobs

```javascript
// Add these jobs via the API or directly in careers.json

const sampleJobs = [
  {
    id: Date.now(),
    title: "Senior Financial Analyst",
    description: "Seeking an experienced financial analyst to provide strategic insights and financial planning support to our clients.",
    location: "Nugegoda, Sri Lanka",
    type: "Full-time",
    salary: "LKR 120,000 - 180,000",
    status: "active",
    createdAt: new Date().toISOString()
  },
  {
    id: Date.now() + 1,
    title: "Business Development Executive",
    description: "Looking for a dynamic professional to drive business growth and client relationships.",
    location: "Colombo, Sri Lanka",
    type: "Full-time",
    salary: "LKR 80,000 - 120,000 + Commission",
    status: "active",
    createdAt: new Date().toISOString()
  },
  {
    id: Date.now() + 2,
    title: "Marketing Intern",
    description: "Great opportunity for students/fresh graduates to learn digital marketing and brand management.",
    location: "Nugegoda, Sri Lanka (Hybrid)",
    type: "Internship",
    salary: "LKR 30,000 - 40,000",
    status: "active",
    createdAt: new Date().toISOString()
  }
];
```

## Workflow

1. **Post a job** → Add via API or HTML tool
2. **Job appears** → Shows on website Careers section
3. **User applies** → Fills form and submits
4. **Application saved** → Stored in applications.json
5. **Review applications** → Export CSV or view via API
6. **Update status** → Track hiring progress
7. **Close job** → Set status to "inactive"

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/careers` | Get all jobs |
| POST | `/api/careers/add` | Add new job |
| PUT | `/api/careers/:id` | Update job status |
| DELETE | `/api/careers/:id` | Delete job |
| POST | `/api/careers/apply` | Submit application |
| GET | `/api/careers/applications` | Get all applications |
| GET | `/api/careers/applications/export` | Export applications CSV |
| PUT | `/api/careers/applications/:id` | Update application status |

## Security Notes

- Add authentication for admin endpoints in production
- Implement rate limiting for application submissions
- Consider file upload for resumes (requires additional setup)
- Add email notifications for new applications

## Need Help?

Check the server logs for detailed error messages when something goes wrong.
