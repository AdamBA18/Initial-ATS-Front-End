import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Job Posting Schema
const JobPostingSchema = new mongoose.Schema({
  title: String,
  department: String,
  location: String,
  description: String,
  status: String
});

const JobPosting = mongoose.model('JobPosting', JobPostingSchema);

// Routes
app.post('/api/job-postings', async (req, res) => {
  try {
    const { title, department, location, description, status } = req.body;
    const newJobPosting = new JobPosting({
      title,
      department,
      location,
      description,
      status
    });
    await newJobPosting.save();
    res.status(201).json(newJobPosting);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/job-postings', async (req, res) => {
  try {
    const jobPostings = await JobPosting.find();
    res.json(jobPostings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Serve static files from the React app
const distPath = path.join(__dirname, 'dist');
console.log('Serving static files from:', distPath);
app.use(express.static(distPath));

// Log the contents of the dist directory
fs.readdir(distPath, (err, files) => {
  if (err) {
    console.error('Error reading dist directory:', err);
  } else {
    console.log('Contents of dist directory:', files);
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  console.log('Serving index.html from:', indexPath);
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('index.html not found');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));