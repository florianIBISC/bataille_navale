import React from 'react';
import './CSS/Initialisation.css'

class Initialisation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            r_max: 4, //nbr de bateau rouge max a pose
            b_max: 3, //nbr de bateau bleu max a pose
            v_max: 2, //nbr de bateau vert max a pose
            j_max: 1, //nbr de bateau jaune max a pose

            r_nb: 0, //nbr de bateau rouge pose
            b_nb: 0, //nbr de bateau bleu pose
            v_nb: 0, //nbr de bateau vert pose
            j_nb: 0, //nbr de bateau jaune pose

            r: false, //couleur rouge
            b: false, //couleur bleu
            v: false, //couleur vert
            j: false, //couleur jaune
            h: true,  //sens horizontal
        };
        this.bateau1 = this.bateau1.bind(this)
        this.bateau2 = this.bateau2.bind(this)
        this.bateau3 = this.bateau3.bind(this)
        this.bateau4 = this.bateau4.bind(this)
        this.horizontal = this.horizontal.bind(this)
        this.changeCouleur = this.changeCouleur.bind(this)
        this.transformTab = this.transformTab.bind(this)
    }

    changeCouleur(event) {
        var x = event.target //cible la case selectionnée + faire une limite pour eviter les erreurs
        if(this.state.r === true){
            this.changeRouge(x)
        }else if(this.state.b === true){
            this.changeBleu(x)
        }else if(this.state.v === true){
            this.changeVert(x)
        }else if(this.state.j === true){
            this.changeJaune(x)
        }
    }
    changeRouge(e){
        if(this.state.r_nb < this.state.r_max && e.className === "caseBataille"){
            e.className = (e.className === "caseBataille") ? "caseBataille2" : "caseBataille"; //changement de couleur quand je suis blanc
            this.setState({r_nb: this.state.r_nb+1})
        }
        else if(this.state.r_nb <= this.state.r_max && e.className === "caseBataille2"){
            e.className = (e.className === "caseBataille2") ? "caseBataille" : "caseBataille2"; //changement de couleur quand je suis rouge
            this.setState({r_nb: this.state.r_nb-1})
        }
        else if(this.state.r_nb >= this.state.r_max && e.className === "caseBataille")
            alert('nbr max rouge')
    }
    changeBleu(e){
        var v = parseInt(e.id.substr(1)) //affiche index de l'element en vertical
        var h = e.cellIndex  // affiche index de l'element en horizontal
        var temoin = document.getElementById("plateau1").rows[v].cells[h].className
        var verif = true

        if(this.state.h === false){ 
            for(let n=0; n<2; n++){ //boucle qui verifie si toutes les cases sont de la meme couleur
                var elem = document.getElementById("plateau1").rows[v+n].cells[h].className
                if(e.id.substr(1) === '10'){ //condition de limite du terrain en vertical
                    break
                }else if(temoin === elem){
                    verif = true 
                }else if(temoin !== elem){
                    verif = false
                    break
                }
            }
            for(let n=0; n<2; n++){ //boucle qui selectionne 2 cases 
                var t = document.getElementById("plateau1").rows[v+n].cells[h]
                if(verif === true){
                    if(e.id.substr(1) === '10'){ //condition de limite du terrain en vertical
                        alert("mouvement impossible")
                        break
                    }else if(this.state.b_nb < this.state.b_max && t.className === "caseBataille"){
                        t.className = (t.className === "caseBataille") ? "caseBataille3" : "caseBataille"; //changement de couleur quand je suis blanc
                        this.setState({b_nb: this.state.b_nb+1})
                    }
                    else if(this.state.b_nb <= this.state.b_max && t.className === "caseBataille3"){
                        t.className = (t.className === "caseBataille3") ? "caseBataille" : "caseBataille3"; //changement de couleur quand je suis bleu
                        this.setState({b_nb: this.state.b_nb-1})
                    }
                    else if(this.state.b_nb >= this.state.b_max && t.className === "caseBataille"){
                        alert('nbr max bleu')
                        break
                    }
                }else {
                    alert("erreur")
                    break
                }
            }
        }else {
            for(let n=0; n<2; n++){ //boucle qui verifie si toutes les cases sont de la meme couleur
                var elem2 = document.getElementById("plateau1").rows[v].cells[h+n].className
                if(e.id.substr(0, 1) === "J"){ //condition de limite du terrain en horizontal
                    break
                }else if(temoin === elem2){
                    verif = true 
                }else if(temoin !== elem2){
                    verif = false
                    break
                }
            }
            for(let n=0; n<2; n++){
                var t2 = document.getElementById("plateau1").rows[v].cells[h+n]
                if(verif === true){
                    if(e.id.substr(0, 1) === "J"){ //condition de limite du terrain en horizontal
                        alert("mouvement impossible")
                        break
                    }else if(this.state.b_nb < this.state.b_max && t2.className === "caseBataille"){
                        t2.className = (t2.className === "caseBataille") ? "caseBataille3" : "caseBataille"; //changement de couleur quand je suis blanc
                        this.setState({b_nb: this.state.b_nb+1})
                    }
                    else if(this.state.b_nb <= this.state.b_max && t2.className === "caseBataille3"){
                        t2.className = (t2.className === "caseBataille3") ? "caseBataille" : "caseBataille3"; //changement de couleur quand je suis bleu
                        this.setState({b_nb: this.state.b_nb-1})
                    }
                    else if(this.state.b_nb >= this.state.b_max && t2.className === "caseBataille"){
                        alert('nbr max bleu')
                        break
                    }
                }else {
                    alert("erreur")
                    break
                }
            }
        }
    }
    changeVert(e){
        var v = parseInt(e.id.substr(1)) //affiche index de l'element en vertical
        var h = e.cellIndex  // affiche index de l'element en horizontal
        var temoin = document.getElementById("plateau1").rows[v].cells[h].className
        var verif = true

        if(this.state.h === false){
            for(let n=0; n<3; n++){ //boucle qui verifie si toutes les cases sont de la meme couleur
                var elem = document.getElementById("plateau1").rows[v+n].cells[h].className
                if(e.id.substr(1) === '10' || e.id.substr(1) === '9'){ //condition de limite du terrain en vertical
                    break
                }else if(temoin === elem){
                    verif = true 
                }else if(temoin !== elem){
                    verif = false
                    break
                }
            }
            for(let n=0; n<3; n++){ //boucle qui selectionne 3 cases 
                var t = document.getElementById("plateau1").rows[v+n].cells[h]
                if(verif === true){
                    if(e.id.substr(1) === '10' || e.id.substr(1) === '9'){ //condition de limite du terrain en vertical
                        alert("mouvement impossible")
                        break
                    }else if(this.state.v_nb < this.state.v_max && t.className === "caseBataille"){
                        t.className = (t.className === "caseBataille") ? "caseBataille4" : "caseBataille"; //changement de couleur quand je suis blanc
                        this.setState({v_nb: this.state.v_nb+1})
                    }
                    else if(this.state.v_nb <= this.state.v_max && t.className === "caseBataille4"){
                        t.className = (t.className === "caseBataille4") ? "caseBataille" : "caseBataille4"; //changement de couleur quand je suis vert
                        this.setState({v_nb: this.state.v_nb-1})
                    }
                    else if(this.state.v_nb >= this.state.v_max && t.className === "caseBataille"){
                        alert('nbr max vert')
                        break
                    }
                }else{
                    alert("erreur")
                    break
                }
            }
        }else {
            for(let n=0; n<3; n++){ //boucle qui verifie si toutes les cases sont de la meme couleur
                var elem2 = document.getElementById("plateau1").rows[v].cells[h+n].className
                if(e.id.substr(0, 1) === "J" || e.id.substr(0, 1) === "I"){ //condition de limite du terrain en horizontal
                    break
                }else if(temoin === elem2){
                    verif = true 
                }else if(temoin !== elem2){
                    verif = false
                    break
                }
            }
            for(let n=0; n<3; n++){
                var t2 = document.getElementById("plateau1").rows[v].cells[h+n]
                if(verif === true){
                    if(e.id.substr(0, 1) === "J" || e.id.substr(0, 1) === "I"){ //condition de limite du terrain en horizontal
                        alert("mouvement impossible")
                        break
                    }else if(this.state.v_nb < this.state.v_max && t2.className === "caseBataille"){
                        t2.className = (t2.className === "caseBataille") ? "caseBataille4" : "caseBataille"; //changement de couleur quand je suis blanc
                        this.setState({v_nb: this.state.v_nb+1})
                    }
                    else if(this.state.v_nb <= this.state.v_max && t2.className === "caseBataille4"){
                        t2.className = (t2.className === "caseBataille4") ? "caseBataille" : "caseBataille4"; //changement de couleur quand je suis vert
                        this.setState({v_nb: this.state.v_nb-1})
                    }
                    else if(this.state.v_nb >= this.state.v_max && t2.className === "caseBataille"){
                        alert('nbr max vert')
                        break
                    }
                }else{
                    alert("erreur")
                    break
                }
            }
        }
    }
    changeJaune(e){
        var v = parseInt(e.id.substr(1)) //affiche index de l'element en vertical
        var h = e.cellIndex  // affiche index de l'element en horizontal
        var temoin = document.getElementById("plateau1").rows[v].cells[h].className
        var verif = true

        if(this.state.h === false){
            for(let n=0; n<4; n++){ //boucle qui verifie si toutes les cases sont de la meme couleur
                var elem = document.getElementById("plateau1").rows[v+n].cells[h].className
                if(e.id.substr(1) === '10' || e.id.substr(1) === '9' || e.id.substr(1) === '8'){ //condition de limite du terrain en vertical
                    break
                }else if(temoin === elem){
                    verif = true 
                }else if(temoin !== elem){
                    verif = false
                    break
                }
            }
            for(let n=0; n<4; n++){ //boucle qui selectionne 4 cases 
                var t = document.getElementById("plateau1").rows[v+n].cells[h]
                if(verif === true){
                    if(e.id.substr(1) === '10' || e.id.substr(1) === '9' || e.id.substr(1) === '8'){ //condition de limite du terrain en vertical
                        alert("mouvement impossible")
                        break
                    }else if(this.state.j_nb < this.state.j_max && t.className === "caseBataille"){
                        t.className = (t.className === "caseBataille") ? "caseBataille5" : "caseBataille"; //changement de couleur quand je suis blanc
                        this.setState({j_nb: this.state.j_nb+1})
                    }
                    else if(this.state.j_nb <= this.state.j_max && t.className === "caseBataille5"){
                        t.className = (t.className === "caseBataille5") ? "caseBataille" : "caseBataille5"; //changement de couleur quand je suis jaune
                        this.setState({j_nb: this.state.j_nb-1})
                    }
                    else if(this.state.j_nb >= this.state.j_max && t.className === "caseBataille"){
                        alert('nbr max jaune')
                        break
                    }
                }else{
                    alert("erreur")
                    break
                }
            }
        }else {
            for(let n=0; n<4; n++){ //boucle qui verifie si toutes les cases sont de la meme couleur
                var elem2 = document.getElementById("plateau1").rows[v].cells[h+n].className
                if(e.id.substr(0, 1) === "J" || e.id.substr(0, 1) === "I" || e.id.substr(0, 1) === "H"){ //condition de limite du terrain en horizontal
                    break
                }else if(temoin === elem2){
                    verif = true 
                }else if(temoin !== elem2){
                    verif = false
                    break
                }
            }
            for(let n=0; n<4; n++){
                var t2 = document.getElementById("plateau1").rows[v].cells[h+n]
                if(verif === true){
                    if(e.id.substr(0, 1) === "J" || e.id.substr(0, 1) === "I" || e.id.substr(0, 1) === "H"){ //condition de limite du terrain en horizontal
                        alert("mouvement impossible")
                        break
                    }else if(this.state.j_nb < this.state.j_max && t2.className === "caseBataille"){
                        t2.className = (t2.className === "caseBataille") ? "caseBataille5" : "caseBataille"; //changement de couleur quand je suis blanc
                        this.setState({j_nb: this.state.j_nb+1})
                    }
                    else if(this.state.j_nb <= this.state.j_max && t2.className === "caseBataille5"){
                        t2.className = (t2.className === "caseBataille5") ? "caseBataille" : "caseBataille5"; //changement de couleur quand je suis jaune
                        this.setState({j_nb: this.state.j_nb-1})
                    }
                    else if(this.state.j_nb >= this.state.j_max && t2.className === "caseBataille"){
                        alert('nbr max jaune')
                        break
                    }
                }else{
                    alert("erreur")
                    break
                }
            }
        }
    }

    bateau1(){
        this.setState({r: !this.state.r, b: false, v: false, j: false})
    }
    bateau2(){
        this.setState({b: !this.state.b, r: false, v: false, j: false})
    }
    bateau3(){
        this.setState({v: !this.state.v, r: false, b: false, j: false})
    }
    bateau4(){
        this.setState({j: !this.state.j, r: false, b: false, v: false})
    }
    horizontal(){
        this.setState({h: !this.state.h})
    }

    transformTab(){ //parse la grille en matrice + validation de tous les bateaux poses
        var x = []
        var y = []
        //valeur d une case en fonction de la couleur
        var blanc = 0;
        var rouge = 1;
        var bleu = 2;
        var vert = 3;
        var jaune = 4;
        
        if(this.state.r_nb === this.state.r_max && this.state.b_nb === this.state.b_max && 
            this.state.v_nb === this.state.v_max && this.state.j_nb === this.state.j_max){ //verifie que tous les bateaux sont poses
            for(let i=1; i<11; i++){
                for(let j=1; j<11; j++){
                    var z = document.getElementById("plateau1").rows[i].cells[j].className
                    if(z === 'caseBataille2'){
                        y.push(rouge)
                    }else if(z === 'caseBataille3'){
                        y.push(bleu)
                    }else if(z === 'caseBataille4'){
                    y.push(vert)
                    }else if(z === 'caseBataille5'){
                        y.push(jaune)
                    }else{
                        y.push(blanc)
                    }
                }
                x.push(y)
                y = [] //vide le tableau à chaque boucle
            }
        }else {
            alert("Tous les bateaux ne sont pas posés")
        }
        console.log(x)
    }
    render(){
        return(
            <div id="jeu">
                <table id="plateau1" border="1">
                    <tr>
                        <td></td>
                        <td className="caseBataille">A</td>
                        <td className="caseBataille">B</td> 
                        <td className="caseBataille">C</td>
                        <td className="caseBataille">D</td>
                        <td className="caseBataille">E</td>
                        <td className="caseBataille">F</td>
                        <td className="caseBataille">G</td>
                        <td className="caseBataille">H</td>
                        <td className="caseBataille">I</td>
                        <td className="caseBataille">J</td>
                    </tr>
                    <tr> 
                        <td className="caseBataille">1</td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="A1"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="B1"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="C1"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="D1"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="E1"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="F1"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="G1"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="H1"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="I1"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="J1"></td>
                    </tr>
                    <tr>
                        <td className="caseBataille">2</td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="A2"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="B2"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="C2"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="D2"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="E2"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="F2"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="G2"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="H2"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="I2"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="J2"></td>
                    </tr>
                    <tr>
                        <td className="caseBataille">3</td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="A3"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="B3"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="C3"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="D3"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="E3"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="F3"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="G3"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="H3"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="I3"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="J3"></td>
                    </tr>
                    <tr>
                        <td className="caseBataille">4</td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="A4"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="B4"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="C4"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="D4"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="E4"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="F4"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="G4"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="H4"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="I4"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="J4"></td>
                    </tr>
                    <tr>
                        <td className="caseBataille">5</td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="A5"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="B5"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="C5"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="D5"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="E5"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="F5"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="G5"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="H5"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="I5"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="J5"></td>
                    </tr>
                    <tr>
                        <td className="caseBataille">6</td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="A6"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="B6"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="C6"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="D6"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="E6"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="F6"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="G6"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="H6"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="I6"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="J6"></td>
                    </tr>
                    <tr>
                        <td className="caseBataille">7</td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="A7"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="B7"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="C7"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="D7"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="E7"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="F7"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="G7"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="H7"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="I7"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="J7"></td>
                    </tr>
                    <tr>
                        <td className="caseBataille">8</td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="A8"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="B8"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="C8"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="D8"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="E8"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="F8"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="G8"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="H8"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="I8"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="J8"></td>
                    </tr>
                    <tr>
                        <td className="caseBataille">9</td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="A9"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="B9"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="C9"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="D9"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="E9"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="F9"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="G9"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="H9"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="I9"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="J9"></td>
                    </tr>
                    <tr>
                        <td className="caseBataille">10</td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="A10"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="B10"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="C10"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="D10"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="E10"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="F10"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="G10"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="H10"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="I10"></td>
                        <td className="caseBataille" onClick={(e) => this.changeCouleur(e)} id="J10"></td>
                    </tr>
                </table>
                <br/>
                <input type="button" id="jouer" value="Bateau1" onClick={this.bateau1}/>
                <input type="button" id="jouer" value="Bateau2" onClick={this.bateau2}/>
                <input type="button" id="jouer" value="Bateau3" onClick={this.bateau3}/>
                <input type="button" id="jouer" value="Bateau4" onClick={this.bateau4}/>
                <input type="button" id="jouer" value="Sens" onClick={this.horizontal}/>
                <input type="button" id="jouer" value="Valider" onClick={this.transformTab}/>
            </div>
        );
    }
}
export default Initialisation;