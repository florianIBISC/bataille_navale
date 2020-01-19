# Bataille_navale
## Introduction
Dans le cadre de nos études et plus particulièrement du module AOS pour Architecture Orientée Service,
nous avons décidé de réaliser une solution de bataille navale uniquement sous l'architecture REST.
Bataille navale avec Node et React Js

- [Sommaire](#Introduction)
    - [Choix des technologies](#Choix des technologies)
    - [Installation en locale](#Installation en locale)
    - [Déploiement](#Déploiement)
    - [Routes de l'api](#Routes de l'api)
    - [Utilisation de l'api](#Utilisation de l'api)

# Choix des technologies
La réalisation de ce projet nous a demandé de nous interroger sur le choix des technologies à utiliser.
Côté back notre choix s'est naturellement porté sur Node JS en excluant l'utilisation de la librairie socket.io
afin de garantir l'utilisation des standards REST.
Côté front nos délibérations se sont portés sur REACT JS. 

# Installation en locale
Positionnez-vous à la racine du projet et lancez la comande npm i

Il est possible que certains modules posent problèmes. Les plus récurrents sont : 
react-router-dom / @material-ui/core / @material-ui/icons / clsx / axios / bcrypt.
N'hésitez pas à les installer un à un.

Rendez-vous à la racine du projet back et lancez : node index.js
Rendez-vous à la racine du projet front et lancez : npm start

Les adresses locales sont : 
+ http://localhost:3000 pour le front
+ http://localhost:8080 pour le back 

# Déploiement
Les deux projets ont été déployés sur un serveur privé. 
L'adresse du front : http://dev01.freeboxos.fr:3000
L'adresse du back : http://dev01.freeboxos.fr:8080

* A noter : * le front n'offrant pas toutes les fonctionnalités du back nous vous recommandons d'utiliser postman
pour tester le back. 


# Routes de l'api

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

# Utilisation de l'api

