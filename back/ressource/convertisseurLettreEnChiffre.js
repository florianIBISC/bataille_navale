
module.exports = {
    convertisseurLettreChiffre: (lettre) => {
        console.log('convertisseurLettreChiffre - début de la méthode');
        let res = "Erreur dans la coordonnées de l'abscisse."+
        "Saisissez une lettre entre A et J";
        switch(lettre.toUpperCase()){
            case 'A':
                console.log('convertisseurLettreChiffre - lettre : '+lettre);
                res = 0;
                break;
            case 'B':
                console.log('convertisseurLettreChiffre - lettre : '+lettre);
                res = 1;
                break;
            case 'C':
                console.log('convertisseurLettreChiffre - lettre : '+lettre);
                res = 2;
                break;
            case 'D':
                console.log('convertisseurLettreChiffre - lettre : '+lettre);
                res = 3;
                break;
            case 'E':
                console.log('convertisseurLettreChiffre - lettre : '+lettre);
                res = 4;
                break;
            case 'F':
                console.log('convertisseurLettreChiffre - lettre : '+lettre);
                res = 5;
                break;
            case 'G':
                console.log('convertisseurLettreChiffre - lettre : '+lettre);
                res = 6;
                break;
            case 'H':
                console.log('convertisseurLettreChiffre - lettre : '+lettre);
                res = 7;
                break;
            case 'I':
                console.log('convertisseurLettreChiffre - lettre : '+lettre);
                res = 8;
                break;
            case 'J':
                console.log('convertisseurLettreChiffre - lettre : '+lettre);
                res = 9;
                break;
            default:
                console.log('convertisseurLettreChiffre - default case ');
        }
        console.log('convertisseurLettreChiffre - res : '+res+' isntanceof '+ typeof res);
        return res;
    }
}