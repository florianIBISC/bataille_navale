# Bataille_navale
## Introduction
Dans le cadre de nos études et plus particulièrement du module AOS pour Architecture Orientée Service,
nous avons décidé de réaliser une solution de bataille navale uniquement sous l'architecture REST.
Bataille navale avec Node et React Js

- [Sommaire](#crossref-rest-api)
    - [Choix des technologies](#preamble)
    - [Installation](#meta)

| /ressource | méthode | description | paramètres (query param si la méthode est un GET) |
| ---------- | ------- | ----------- | ---------------- |
| /users/register | POST | Inscription d'un utilisateur | email, pseudo, password, nom, prenom, age |
| /users/login | POST | Connexion d'un utilisateur | pseudo, password |
| /users/suppressionUtilisateur | DELETE | Suppression d'un utilisateur | le token suffit |
| ---- | ---- | ---- | ---- |
| /salon/creersalon | POST | Création d'un salon | title |
| /salon/rejoindresalon | PUT | Un deuxième utilisateur rejoins le salon | title |
| /salon/affichersalons | GET | Afficher les salons disponible | le token suffit |
| /salon/salonplein | GET | Le joueur 1 demande au back si un deuxième utilisateur a rejoins | title |
| ---- | ---- | ---- | ---- |
| /option/classement | GET | Affiche le classement des utilisateurs par score | le token suffit |
| ---- | ---- | ---- | ---- |
| /motdepasseoublie | PUT | L'utilisateur a oublié sont mot de passe et le change. Il y aura un mail de rappel | email, password, confirmation |
| ---- | ---- | ---- | ---- |
| /jeu/initialiser | PUT | Le joueur envoie la position de ses bateaux | bateau (une matrice de taille 10 x 10 correspondant au plateau) |
| /jeu/attaquer | PUT | Tir du jeu | coordonne (au format Ax où x ets un chiffre de 1 à 10) |
| /jeu/attendre | GET | L'utilisateur demande s'il peut jouer | titre du salon |
| ---- | ---- | ---- | ---- |
| /imateapot | GET | Implémentation du célèbre code Http 418 |  |



