const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');

require("./db/conn");
const Register = require("./models/registers");
const Contact = require('./models/contacts');
const Demo = require('./models/demo');


const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");

app.use(express.static(static_path));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.sendFile(path.join(static_path, "index.html"));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(static_path, "register.html"));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(static_path, "login.html"));
});

app.post('/register', async (req, res) => {
    try {
        const registerEmployee = new Register({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            gender: req.body.gender,
            city: req.body.city,
            subject: req.body.subject,
        });
        const registered = await registerEmployee.save();

        res.cookie('username', req.body.name);

        res.redirect("/");
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userEmail = await Register.findOne({ email: email });
        if (userEmail && userEmail.password === password) {
            res.cookie('username', userEmail.name);

            res.redirect("/");
        } else {
            res.status(400).send("Invalid Credentials");
        }
    } catch (error) {
        res.status(400).send("Invalid");
    }
});

app.post('/contact', async (req, res) => {
    try {
        const { fullName, email, message } = req.body;

        const contact = new Contact({
            name: fullName,
            email,
            message,
        });

        await contact.save();

        res.redirect(req.headers.referer || "/");
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post('/demo', async (req, res) => {
    try {
      const { name, phone, subject, message } = req.body;

      if (!name || !phone || !subject || !message) {
        return res.status(400).send("All fields are required.");
      }
      const demo = new Demo({
        name,
        phone,
        subject,
        message,
      });
  
      await demo.save();
      res.redirect(req.headers.referer || "/");
    } catch (error) {
      console.log("Error saving demo data:", error);
      res.status(500).send("An error occurred while saving the demo data.");
    }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
