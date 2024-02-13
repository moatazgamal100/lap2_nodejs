const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

// Render the registration form
app.get('/', (req, res) => {
    res.render('registration', { error: null });
});

// Handle form submission
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if (password.length < 8) {
        res.render('registration', { error: 'Error: password is less than 8 characters' });
    } else {
        res.send('Registration success');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


