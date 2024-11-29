const User = require('../models/User');
const jwt = require('jsonwebtoken');
const BlacklistToken = require('../models/blacklistToken');

// Fonction de validation des champs de l'utilisateur
const validateUserInput = (nom, prenom, email, motDePasse, codeSecret, telephone, sexe) => {
  const errors = [];

  // Validation du nom et prénom
  if (!nom || nom.trim() === '') {
    errors.push("Le nom est requis.");
  }
  if (!prenom || prenom.trim() === '') {
    errors.push("Le prénom est requis.");
  }

  // Validation de l'email
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!email || !emailRegex.test(email)) {
    errors.push("L'email est invalide.");
  }

  // Validation du mot de passe
  if (!motDePasse || motDePasse.length < 8) {
    errors.push("Le mot de passe doit contenir au moins 8 caractères.");
  }

  // Validation du code secret (doit être composé de 4 chiffres)
  const codeSecretRegex = /^\d{4}$/;
  if (!codeSecret || !codeSecretRegex.test(codeSecret)) {
    errors.push("Le code secret doit être composé de 4 chiffres.");
  }

  // Validation du téléphone : exactement 9 chiffres, aucun espace ni lettre
  const telephoneRegex = /^\d{9}$/;
  if (!telephone || !telephoneRegex.test(telephone)) {
    errors.push("Le numéro de téléphone doit contenir exactement 9 chiffres.");
  }

  // Validation du sexe
  if (!['Homme', 'Femme'].includes(sexe)) errors.push("Le sexe doit être 'Homme' ou 'Femme'.");

  return errors;
};

exports.inscrireUser = async (req, res) => {
  try {
    const { nom, prenom, email, motDePasse, codeSecret, role, photo, telephone, sexe } = req.body;

    // Validation des champs de saisie
    const validationErrors = validateUserInput(nom, prenom, email, motDePasse, codeSecret, telephone, sexe);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    // Créer un nouvel utilisateur avec les informations reçues
    const newUser = new User({
      nom,
      prenom,
      email,
      motDePasse,
      codeSecret,
      role,
      photo,
      telephone,
      sexe
    });

    // Sauvegarder l'utilisateur dans la base de données
    await newUser.save();

    // Retourner une réponse avec un message de succès
    res.status(201).json({
      message: 'Utilisateur inscrit avec succès',
      user: {
        nom: newUser.nom,
        prenom: newUser.prenom,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Erreur dans inscrireUser:', error); // Log de l'erreur
    res.status(400).json({ error: 'Erreur lors de l\'inscription de l\'utilisateur' });
  }
};