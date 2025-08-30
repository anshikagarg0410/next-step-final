const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate'); // EJS layout engine
const app = express();

const PORT = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.engine('ejs', ejsMate); // Use ejsMate for EJS layout support
app.use(express.static('public'));


// Route for the home page
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// Routes for the user onboarding process
app.get('/profile/user', (req, res) => {
    res.render('profile/personal', { title: 'Your Profile' });
});
app.get('/profile/interests', (req, res) => {
    res.render('profile/interests', { title: 'Your Profile' });
});

app.get('/profile/strengths', (req, res) => {
    res.render('profile/strength', { title: 'Your Profile' });
});
app.get('/profile/personality', (req, res) => {
    res.render('profile/personality', { title: 'Your Profile' });
});


app.get('/skills', (req, res) => {
    res.render('skills', { title: 'Skill Roadmap' });
});

// Career page route
app.get('/career', (req, res) => {
    res.render('career', { title: 'Career Opportunities' });
});

app.get('/internships', (req, res) => {
    res.render('internship', { title: 'Internships' });
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard', { title: 'Dashboard' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});