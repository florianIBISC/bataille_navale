import React  from 'react';
//import {Link} from 'react-router-dom' //Navigation
//import Case2 from './Case2';

class Grille2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x:3,
            case:[],
            button: true,
        };
        this.handleClick = this.handleClick.bind(this);  
    }

    handleClick(i,j){
        this.setState({
          button:!this.state.button,
          //case:[i,j,this.state.button]
        })
    }

    /*nbrCase(){
        for(let i=0; i<5; i++){
            var div = document.createElement("div")
            var text = document.createTextNode("Element "+i);
            div.appendChild(text);
            document.getElementsByTagName("body")[0].appendChild(div);

            div.onclick = function() {
                console.log("Clic sur "+i);
            }
        }
    }*/
    changeValue(i,j){
        this.setState({
            case: [i,1],
        })
        alert("colonne "+i+" ligne "+j+" valeur: "+this.state.case)
    }
    transformTab(){

    }
    render(){
        return(       
            <div>     
                <div id="MyBoard" style={{columns:this.state.x}}>
                    {Array.from({length: this.state.x}, (_,i) => Array.from({ length: this.state.x }, (_,j) => <div style={styles} onClick={() => this.handleClick()}>Element{j} valeur:{this.state.button ? "0": "1"}</div>))}
                </div>
                <button>Valider</button>
            </div>           
        );
    }
}
export default Grille2;

const board = {
    columns: 2,
}

const styles = {
    border: 'solid',
    borderColor: 'red',
}