require('dotenv').config(); // Load environment variables
const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // Require connect-mongo
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require('connect-flash');
const User = require('./models/user');
const { defineCareerPaths, predictCareer } = require('./utils/careerPredictor');

const app = express();
const PORT = 3000;

// Connect to MongoDB
const dbUrl = process.env.ATLASDB_URL; // Use the Atlas URL from .env
mongoose.connect(dbUrl)
    .then(() => {
        console.log("ATLAS DATABASE CONNECTED!");
    })
    .catch(err => {
        console.log("OH NO, ATLAS CONNECTION ERROR!!!!");
        console.log(err);
    });

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.use(express.static('public'));

// Configure MongoStore for session storage
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SESSION_SECRET,
    },
    touchAfter: 24 * 3600, // Time period in seconds
});

store.on("error", (e) => {
    console.log("SESSION STORE ERROR", e);
});

// Configure Express Session
const sessionConfig = {
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};
app.use(session(sessionConfig));
app.use(flash());

// Configure Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({ usernameField: 'email' }, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to pass variables to all templates
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Middleware to check if user is logged in
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
};

// ===== AUTHENTICATION ROUTES =====

// GET route to render the signup form
app.get('/signup', (req, res) => {
    res.render('login/signup', { title: 'Sign Up' });
});

// POST route to handle user signup
app.post('/signup', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ email, name });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            // Updated flash message and redirect path
            req.flash('success', 'Welcome! Please tell us a bit about yourself.');
            res.redirect('/profile/user'); 
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
});

// GET route to render the login form
app.get('/login', (req, res) => {
    res.render('login/login', { title: 'Login' });
});

// POST route to handle user login with Passport
app.post('/login', passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
    successRedirect: '/dashboard'
}), (req, res) => {});

// GET route for logout
app.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', "Goodbye!");
        res.redirect('/');
    });
});

// ===== APPLICATION ROUTES =====

// Route for the home page
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// ... (in APPLICATION ROUTES)

app.get('/dashboard', isLoggedIn, async (req, res) => {
    // Re-fetch the full user object from the database
    const user = await User.findById(req.user._id);

    let careerMatches = [];
    // Check if the user has a profile with interests
    if (user.profile && user.profile.interests && user.profile.interests.length > 0) {
        const careerPaths = defineCareerPaths();
        careerMatches = predictCareer(user.profile, careerPaths);
    }
    
    // ADD THIS LOG to see the final result before rendering
    console.log("DATA BEING SENT TO DASHBOARD:", {
        userProfile: user.profile,
        careerMatches: careerMatches
    });

    res.render('dashboard', { title: 'Dashboard', careerMatches });
});

// ===== ONBOARDING ROUTES (WITH DEBUGGING) =====

// Step 1: Personal Info
app.get('/profile/user', isLoggedIn, (req, res) => {
    res.render('profile/personal', { title: 'Your Profile' });
});

app.post('/profile/user', isLoggedIn, (req, res) => {
    console.log("STEP 1 (PERSONAL): Form submitted. Redirecting to interests...");
    res.redirect('/profile/interests');
});


// Step 2: Interests
app.get('/profile/interests', isLoggedIn, (req, res) => {
    res.render('profile/interests', { title: 'Your Interests' });
});

app.post('/profile/interests', isLoggedIn, (req, res) => {
    console.log("STEP 2 (INTERESTS): Received data from form:", req.body);
    const interests = Array.isArray(req.body.interests) ? req.body.interests : (req.body.interests ? [req.body.interests] : []);
    req.session.profileData = { interests: interests };
    console.log("STEP 2 (INTERESTS): Saved to session:", req.session.profileData);
    res.redirect('/profile/strengths');
});

// Step 3: Strengths
app.get('/profile/strengths', isLoggedIn, (req, res) => {
    res.render('profile/strength', { title: 'Your Strengths' });
});
    
app.post('/profile/strengths', isLoggedIn, (req, res) => {
    console.log("STEP 3 (STRENGTHS): Received data from form:", req.body);
    const strengths = Array.isArray(req.body.strengths) ? req.body.strengths : (req.body.strengths ? [req.body.strengths] : []);
    if (req.session.profileData) {
        req.session.profileData.strengths = strengths;
        console.log("STEP 3 (STRENGTHS): Updated session data:", req.session.profileData);
    } else {
        console.log("STEP 3 (STRENGTHS): ERROR - Session data was lost!");
        req.session.profileData = { strengths: strengths };
    }
    res.redirect('/profile/personality');
});

// Step 4: Personality & Saving
app.get('/profile/personality', isLoggedIn, (req, res) => {
    res.render('profile/personality', { title: 'Your Personality' });
});

app.post('/profile/personality', isLoggedIn, async (req, res) => {
    console.log("STEP 4 (PERSONALITY): Received data from form:", req.body);
    const personality = Array.isArray(req.body.personality) ? req.body.personality : (req.body.personality ? [req.body.personality] : []);
    if (req.session.profileData) {
        req.session.profileData.personality = personality;
        console.log("STEP 4 (PERSONALITY): Final profile data to be saved:", req.session.profileData);
        
        const user = await User.findById(req.user._id);
        user.profile = req.session.profileData;
        await user.save();
        console.log("STEP 4 (PERSONALITY): Profile successfully saved to the database for user:", user.email);
        
        delete req.session.profileData;
        req.flash('success', 'Your profile has been created!');
        res.redirect('/dashboard');
    } else {
        console.log("STEP 4 (PERSONALITY): ERROR - Session data was lost before the final step!");
        req.flash('error', 'Something went wrong, please start again.');
        res.redirect('/profile/user');
    }
});


// ... (rest of your routes)

app.get('/skills', isLoggedIn, (req, res) => {
    res.render('skills', { title: 'Skill Roadmap' });
});

app.get('/career', isLoggedIn, (req, res) => {
    res.render('career', { title: 'Career Opportunities' });
});

app.get('/internships', isLoggedIn, (req, res) => {
    res.render('internship', { title: 'Internships' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});