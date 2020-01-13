import React from 'react';
import './CSS/Grille.css'

class Jeu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            max: 10, //nbr de case max a selectionner
            i: 0, //nbr de case selectionner
        };
        this.changeCouleur = this.changeCouleur.bind(this)
    }

    changeCouleur(event) {
        var x = event.target //cible la case selectionnée
        if(this.state.i < this.state.max && x.className === "caseBataille"){
            x.className = (x.className === "caseBataille") ? "caseBataille2" : "caseBataille"; //changement de couleur quand je suis blanc
            this.setState({i: this.state.i+1})
        }
        else if(this.state.i <= this.state.max && x.className === "caseBataille2"){
            x.className = (x.className === "caseBataille2") ? "caseBataille" : "caseBataille2"; //changement de couleur quand je suis rouge
            this.setState({i: this.state.i-1})
        }
        else if(this.state.i >= this.state.max && x.className === "caseBataille")
            alert('nbr max')
    }

    transformTab(){ //a faire parser la grille en matrice
        var x = []
        var y = []
        //valeur d une case en fonction de la couleur
        var blanc = 0;
        var rouge = 1;
        for(let i=1; i<11; i++){
            for(let j=1; j<11; j++){
                //var z = document.getElementById("plateau1").rows[i].cells[j]
                var z = document.getElementById("plateau1").rows[i].cells[j].className
                if(z === 'caseBataille2'){
                    y.push(rouge)
                } else{
                    y.push(blanc)
                }
            }
            x.push(y)
            y = [] //vide le tableau à chaque boucle
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
                <table id="plateau2" border="1">
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
                        <td className="caseBataille"  id="A1"></td>
                        <td className="caseBataille"  id="B1"></td>
                        <td className="caseBataille"  id="C1"></td>
                        <td className="caseBataille"  id="D1"></td>
                        <td className="caseBataille"  id="E1"></td>
                        <td className="caseBataille"  id="F1"></td>
                        <td className="caseBataille"  id="G1"></td>
                        <td className="caseBataille"  id="H1"></td>
                        <td className="caseBataille"  id="I1"></td>
                        <td className="caseBataille"  id="J1"></td>
                    </tr>
                    <tr>
                        <td className="caseBataille">2</td>
                        <td className="caseBataille"  id="A2"></td>
                        <td className="caseBataille"  id="B2"></td>
                        <td className="caseBataille"  id="C2"></td>
                        <td className="caseBataille"  id="D2"></td>
                        <td className="caseBataille"  id="E2"></td>
                        <td className="caseBataille"  id="F2"></td>
                        <td className="caseBataille"  id="G2"></td>
                        <td className="caseBataille"  id="H2"></td>
                        <td className="caseBataille"  id="I2"></td>
                        <td className="caseBataille"  id="J2"></td>
                    </tr>
                    <tr>
                        <td className="caseBataille">3</td>
                        <td className="caseBataille"  id="A3"></td>
                        <td className="caseBataille"  id="B3"></td>
                        <td className="caseBataille"  id="C3"></td>
                        <td className="caseBataille"  id="D3"></td>
                        <td className="caseBataille"  id="E3"></td>
                        <td className="caseBataille"  id="F3"></td>
                        <td className="caseBataille"  id="G3"></td>
                        <td className="caseBataille"  id="H3"></td>
                        <td className="caseBataille"  id="I3"></td>
                        <td className="caseBataille"  id="J3"></td>
                    </tr>
                    <tr>
                        <td className="caseBataille">4</td>
                        <td className="caseBataille"  id="A4"></td>
                        <td className="caseBataille"  id="B4"></td>
                        <td className="caseBataille"  id="C4"></td>
                        <td className="caseBataille"  id="D4"></td>
                        <td className="caseBataille"  id="E4"></td>
                        <td className="caseBataille"  id="F4"></td>
                        <td className="caseBataille"  id="G4"></td>
                        <td className="caseBataille"  id="H4"></td>
                        <td className="caseBataille"  id="I4"></td>
                        <td className="caseBataille"  id="J4"></td>
                    </tr>
                    <tr>
                        <td className="caseBataille">5</td>
                        <td className="caseBataille"  id="A5"></td>
                        <td className="caseBataille"  id="B5"></td>
                        <td className="caseBataille"  id="C5"></td>
                        <td className="caseBataille"  id="D5"></td>
                        <td className="caseBataille"  id="E5"></td>
                        <td className="caseBataille"  id="F5"></td>
                        <td className="caseBataille"  id="G5"></td>
                        <td className="caseBataille"  id="H5"></td>
                        <td className="caseBataille"  id="I5"></td>
                        <td className="caseBataille"  id="J5"></td>
                    </tr>
                    <tr>
                        <td className="caseBataille">6</td>
                        <td className="caseBataille"  id="A6"></td>
                        <td className="caseBataille"  id="B6"></td>
                        <td className="caseBataille"  id="C6"></td>
                        <td className="caseBataille"  id="D6"></td>
                        <td className="caseBataille"  id="E6"></td>
                        <td className="caseBataille"  id="F6"></td>
                        <td className="caseBataille"  id="G6"></td>
                        <td className="caseBataille"  id="H6"></td>
                        <td className="caseBataille"  id="I6"></td>
                        <td className="caseBataille"  id="J6"></td>
                    </tr>
                    <tr>
                        <td className="caseBataille">7</td>
                        <td className="caseBataille"  id="A7"></td>
                        <td className="caseBataille"  id="B7"></td>
                        <td className="caseBataille"  id="C7"></td>
                        <td className="caseBataille"  id="D7"></td>
                        <td className="caseBataille"  id="E7"></td>
                        <td className="caseBataille"  id="F7"></td>
                        <td className="caseBataille"  id="G7"></td>
                        <td className="caseBataille"  id="H7"></td>
                        <td className="caseBataille"  id="I7"></td>
                        <td className="caseBataille"  id="J7"></td>
                    </tr>
                    <tr>
                        <td className="caseBataille">8</td>
                        <td className="caseBataille"  id="A8"></td>
                        <td className="caseBataille"  id="B8"></td>
                        <td className="caseBataille"  id="C8"></td>
                        <td className="caseBataille"  id="D8"></td>
                        <td className="caseBataille"  id="E8"></td>
                        <td className="caseBataille"  id="F8"></td>
                        <td className="caseBataille"  id="G8"></td>
                        <td className="caseBataille"  id="H8"></td>
                        <td className="caseBataille"  id="I8"></td>
                        <td className="caseBataille"  id="J8"></td>
                    </tr>
                    <tr>
                        <td className="caseBataille">9</td>
                        <td className="caseBataille"  id="A9"></td>
                        <td className="caseBataille"  id="B9"></td>
                        <td className="caseBataille"  id="C9"></td>
                        <td className="caseBataille"  id="D9"></td>
                        <td className="caseBataille"  id="E9"></td>
                        <td className="caseBataille"  id="F9"></td>
                        <td className="caseBataille"  id="G9"></td>
                        <td className="caseBataille"  id="H9"></td>
                        <td className="caseBataille"  id="I9"></td>
                        <td className="caseBataille"  id="J9"></td>
                    </tr>
                    <tr>
                        <td className="caseBataille">10</td>
                        <td className="caseBataille"  id="A10"></td>
                        <td className="caseBataille"  id="B10"></td>
                        <td className="caseBataille"  id="C10"></td>
                        <td className="caseBataille"  id="D10"></td>
                        <td className="caseBataille"  id="E10"></td>
                        <td className="caseBataille"  id="F10"></td>
                        <td className="caseBataille"  id="G10"></td>
                        <td className="caseBataille"  id="H10"></td>
                        <td className="caseBataille"  id="I10"></td>
                        <td className="caseBataille"  id="J10"></td>
                    </tr>
                </table>
                <br/>
                <input type="text" id="coup" /><input type="button" id="jouer" value="Valider" onClick={this.transformTab}/>
            </div>
        );
    }
}
export default Jeu;