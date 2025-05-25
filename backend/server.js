const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();

const User = require("./models/user");

const port = process.env.PORT || 5000;

// Connexion à la base de données
connectDB();

const app = express();

// Middleware pour JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session doit venir ici AVANT les routes
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    }),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 heures
        sameSite: "lax", // ou "none" si tu es en HTTPS
        secure: false // mettre à true si tu es en HTTPS
    }
}));

// Ensuite le CORS
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true 
}));

// Puis les routes
app.use("/catway", require("./routes/catway.route"));
app.use("/catway/reservation", require("./routes/reservation.route"));
app.use("/", require("./routes/user.route"));


// Route d'inscription
app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Utilisateur déjà existant" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// Route de connexion
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = {
                id: user._id,
                username: user.username,
                email: user.email
            };
            res.status(200).json(req.session.user); // Retourne l'utilisateur
        } else {
            res.status(401).json({ message: "Identifiants invalides" });
        }
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// Récupération de l'utilisateur connecté
app.get("/user", (req, res) => {
    if (req.session.user) {
        res.status(200).json(req.session.user);
    } else {
        res.status(401).json({ message: "Utilisateur non connecté" });
    }
});

// Lancement du serveur
app.listen(port, () => console.log(`Le serveur a démarré au port ${port}`));
