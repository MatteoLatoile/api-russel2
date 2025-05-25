const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/user"); // ← Ajout important

const port = process.env.PORT || 5000;

// Connexion à la base de données
connectDB();

const app = express();

// Middleware pour traiter les données JSON et URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/catway", require("./routes/catway.route"));
app.use("/catway/reservation", require("./routes/reservation.route"));
app.use("/user", require("./routes/user.route"));
app.use("/login", require("./routes/user.route"));
app.use("/logout", require("./routes/user.route"));

// Route d'inscription
app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(username, email, password);

        // Vérifie si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        console.log(existingUser);

        if (existingUser) {
            return res.status(400).json({ message: "Utilisateur déjà existant" });
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création d'un nouvel utilisateur
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);

    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        res.status(500).json({ message: "Erreur serveur" }); // ← Fermeture manquante corrigée ici
    }
});

// Lancement du serveur
app.listen(port, () => console.log("Le serveur a démarré au port " + port));
