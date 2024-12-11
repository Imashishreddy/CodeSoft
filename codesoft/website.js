// <script> 
//     import React from 'react';
// import { Link } from 'react-router-dom';

// const Header = () => {
//   return (
//     <header>
//       <nav>
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/jobs">Jobs</Link></li>
//           <li><Link to="/employer-dashboard">Employer Dashboard</Link></li>
//           <li><Link to="/candidate-dashboard">Candidate Dashboard</Link></li>
//         </ul>
//       </nav>
//     </header>
//   );
// };

export default Header;

// </script>
// -----------------------------------------------------------------------------
// <script> 
//     import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const JobList = () => {
//   const [jobs, setJobs] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/jobs')
//       .then(response => setJobs(response.data))
//       .catch(err => console.log(err));
//   }, []);

//   return (
//     <div>
//       <h1>Job Listings</h1>
//       <ul>
//         {jobs.map(job => (
//           <li key={job._id}>
//             <a href={`/job/${job._id}`}>{job.title}</a>
//             <p>{job.company}</p>
//             <p>{job.location}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default JobList;

// </script>

--------------------------------------------------

// const Job = require('../models/Job');

// exports.getJobs = (req, res) => {
//   Job.find()
//     .then(jobs => res.json(jobs))
//     .catch(err => res.status(400).json('Error: ' + err));
// };

// exports.getJobById = (req, res) => {
//   const jobId = req.params.id;
//   Job.findById(jobId)
//     .then(job => res.json(job))
//     .catch(err => res.status(400).json('Error: ' + err));
// };

// exports.createJob = (req, res) => {
//   const { title, company, location, description, employerId } = req.body;
//   const newJob = new Job({ title, company, location, description, employerId });

//   newJob.save()
//     .then(() => res.json('Job posted!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// };

----------------------------------------------------------------------

// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // Register User
// router.post('/register', async (req, res) => {
//   const { username, email, password } = req.body;
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);

//   const newUser = new User({
//     username,
//     email,
//     password: hashedPassword
//   });

//   newUser.save()
//     .then(user => res.json(user))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// // Login User
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) return res.status(400).json('User not found');

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json('Invalid credentials');

//   const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
//   res.json({ token });
// });

// module.exports = router;

