import React, {/* Component, StyleSheet */}  from 'react';
import './GrilleTest.css'
import Bateau from './Bateau'

class GrilleTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            button: true,
        }
        this.handleClick = this.handleClick.bind(this); 
    }
    
    handleClick(){
        this.setState({
            button:!this.state.button
        })
    }
    render(){
        return( 
            <div id="play" style={play}>           
                <div id="Myboard" style={board}>
                    <div id="A" style={colonne}>
                        <div id="A0" style={ligne} className={this.state.button ? "buttonOn": "buttonOff"} onClick={this.handleClick}>A0</div>
                        <div id="A1" style={ligne} className={this.state.button ? "buttonOn": "buttonOff"}>A1</div>
                        <div id="A2" style={ligne} className={this.state.button ? "buttonOn": "buttonOff"}>A2</div>
                        <div id="A3" style={ligne} className={this.state.button ? "buttonOn": "buttonOff"}>A3</div>
                        <div id="A4" style={ligne} className={this.state.button ? "buttonOn": "buttonOff"}>A4</div>
                        <div id="A5" style={ligne} className={this.state.button ? "buttonOn": "buttonOff"}>A5</div>
                        <div id="A6" style={ligne} className={this.state.button ? "buttonOn": "buttonOff"}>A6</div>
                        <div id="A7" style={ligne} className={this.state.button ? "buttonOn": "buttonOff"}>A7</div>
                        <div id="A8" style={ligne} className={this.state.button ? "buttonOn": "buttonOff"}>A8</div>
                        <div id="A9" style={ligne} className={this.state.button ? "buttonOn": "buttonOff"}>A9</div>
                    </div>
                    <div id="B" style={colonne}>
                        <div id="0" style={ligne} onClick={()=>alert('B0')}>B0</div>
                        <div id="1" style={ligne}>B1</div>
                        <div id="2" style={ligne}>B2</div>
                        <div id="3" style={ligne}>B3</div>
                        <div id="4" style={ligne}>B4</div>
                        <div id="5" style={ligne}>B5</div>
                        <div id="6" style={ligne}>B6</div>
                        <div id="7" style={ligne}>B7</div>
                        <div id="8" style={ligne}>B8</div>
                        <div id="9" style={ligne}>B9</div>
                    </div>
                    <div id="C" style={colonne}>
                        <div id="0" style={ligne} onClick={()=>alert('C0')}>C0</div>
                        <div id="1" style={ligne}>C1</div>
                        <div id="2" style={ligne}>C2</div>
                        <div id="3" style={ligne}>C3</div>
                        <div id="4" style={ligne}>C4</div>
                        <div id="5" style={ligne}>C5</div>
                        <div id="6" style={ligne}>C6</div>
                        <div id="7" style={ligne}>C7</div>
                        <div id="8" style={ligne}>C8</div>
                        <div id="9" style={ligne}>C9</div>
                    </div>
                    <div id="D" style={colonne}>
                        <div id="0" style={ligne} onClick={()=>alert('D0')}>D0</div>
                        <div id="1" style={ligne}>D1</div>
                        <div id="2" style={ligne}>D2</div>
                        <div id="3" style={ligne}>D3</div>
                        <div id="4" style={ligne}>D4</div>
                        <div id="5" style={ligne}>D5</div>
                        <div id="6" style={ligne}>D6</div>
                        <div id="7" style={ligne}>D7</div>
                        <div id="8" style={ligne}>D8</div>
                        <div id="9" style={ligne}>D9</div>
                    </div>
                    <div id="E" style={colonne}>
                        <div id="0" style={ligne} onClick={()=>alert('E0')}>E0</div>
                        <div id="1" style={ligne}>E1</div>
                        <div id="2" style={ligne}>E2</div>
                        <div id="3" style={ligne}>E3</div>
                        <div id="4" style={ligne}>E4</div>
                        <div id="5" style={ligne}>E5</div>
                        <div id="6" style={ligne}>E6</div>
                        <div id="7" style={ligne}>E7</div>
                        <div id="8" style={ligne}>E8</div>
                        <div id="9" style={ligne}>E9</div>
                    </div>
                    <div id="F" style={colonne}>
                        <div id="0" style={ligne} onClick={()=>alert('F0')}>F0</div>
                        <div id="1" style={ligne}>F1</div>
                        <div id="2" style={ligne}>F2</div>
                        <div id="3" style={ligne}>F3</div>
                        <div id="4" style={ligne}>F4</div>
                        <div id="5" style={ligne}>F5</div>
                        <div id="6" style={ligne}>F6</div>
                        <div id="7" style={ligne}>F7</div>
                        <div id="8" style={ligne}>F8</div>
                        <div id="9" style={ligne}>F9</div>
                    </div>
                    <div id="G" style={colonne}>
                        <div id="0" style={ligne} onClick={()=>alert('G0')}>G0</div>
                        <div id="1" style={ligne}>G1</div>
                        <div id="2" style={ligne}>G2</div>
                        <div id="3" style={ligne}>G3</div>
                        <div id="4" style={ligne}>G4</div>
                        <div id="5" style={ligne}>G5</div>
                        <div id="6" style={ligne}>G6</div>
                        <div id="7" style={ligne}>G7</div>
                        <div id="8" style={ligne}>G8</div>
                        <div id="9" style={ligne}>G9</div>
                    </div>
                    <div id="H" style={colonne}>
                        <div id="0" style={ligne} onClick={()=>alert('H0')}>H0</div>
                        <div id="1" style={ligne}>H1</div>
                        <div id="2" style={ligne}>H2</div>
                        <div id="3" style={ligne}>H3</div>
                        <div id="4" style={ligne}>H4</div>
                        <div id="5" style={ligne}>H5</div>
                        <div id="6" style={ligne}>H6</div>
                        <div id="7" style={ligne}>H7</div>
                        <div id="8" style={ligne}>H8</div>
                        <div id="9" style={ligne}>H9</div>
                    </div>
                    <div id="I" style={colonne}>
                        <div id="0" style={ligne} onClick={()=>alert('I0')}>I0</div>
                        <div id="1" style={ligne}>I1</div>
                        <div id="2" style={ligne}>I2</div>
                        <div id="3" style={ligne}>I3</div>
                        <div id="4" style={ligne}>I4</div>
                        <div id="5" style={ligne}>I5</div>
                        <div id="6" style={ligne}>I6</div>
                        <div id="7" style={ligne}>I7</div>
                        <div id="8" style={ligne}>I8</div>
                        <div id="9" style={ligne}>I9</div>
                    </div>
                    <div id="J" style={colonne}>
                        <div id="0" style={ligne} onClick={()=>alert('J0')}>J0</div>
                        <div id="1" style={ligne}>J1</div>
                        <div id="2" style={ligne}>J2</div>
                        <div id="3" style={ligne}>J3</div>
                        <div id="4" style={ligne}>J4</div>
                        <div id="5" style={ligne}>J5</div>
                        <div id="6" style={ligne}>J6</div>
                        <div id="7" style={ligne}>J7</div>
                        <div id="8" style={ligne}>J8</div>
                        <div id="9" style={ligne}>J9</div>
                    </div>
                </div>
                <div id="Yourboard" style={board}>
                    <div id="A" style={colonne}>
                        <div id="0" style={ligne} className={this.state.button ? "buttonOn": "buttonOff"} onClick={this.handleClick}>A0</div>
                        <div id="1" style={ligne}>A1</div>
                        <div id="2" style={ligne}>A2</div>
                        <div id="3" style={ligne}>A3</div>
                        <div id="4" style={ligne}>A4</div>
                        <div id="5" style={ligne}>A5</div>
                        <div id="6" style={ligne}>A6</div>
                        <div id="7" style={ligne}>A7</div>
                        <div id="8" style={ligne}>A8</div>
                        <div id="9" style={ligne}>A9</div>
                    </div>
                    <div id="B" style={colonne}>
                        <div id="0" style={ligne} onClick={()=>alert('B0')}>B0</div>
                        <div id="1" style={ligne}>B1</div>
                        <div id="2" style={ligne}>B2</div>
                        <div id="3" style={ligne}>B3</div>
                        <div id="4" style={ligne}>B4</div>
                        <div id="5" style={ligne}>B5</div>
                        <div id="6" style={ligne}>B6</div>
                        <div id="7" style={ligne}>B7</div>
                        <div id="8" style={ligne}>B8</div>
                        <div id="9" style={ligne}>B9</div>
                    </div>
                    <div id="C" style={colonne}>
                        <div id="0" style={ligne} onClick={()=>alert('C0')}>C0</div>
                        <div id="1" style={ligne}>C1</div>
                        <div id="2" style={ligne}>C2</div>
                        <div id="3" style={ligne}>C3</div>
                        <div id="4" style={ligne}>C4</div>
                        <div id="5" style={ligne}>C5</div>
                        <div id="6" style={ligne}>C6</div>
                        <div id="7" style={ligne}>C7</div>
                        <div id="8" style={ligne}>C8</div>
                        <div id="9" style={ligne}>C9</div>
                    </div>
                    <div id="D" style={colonne}>
                        <div id="0" style={ligne} onClick={()=>alert('D0')}>D0</div>
                        <div id="1" style={ligne}>D1</div>
                        <div id="2" style={ligne}>D2</div>
                        <div id="3" style={ligne}>D3</div>
                        <div id="4" style={ligne}>D4</div>
                        <div id="5" style={ligne}>D5</div>
                        <div id="6" style={ligne}>D6</div>
                        <div id="7" style={ligne}>D7</div>
                        <div id="8" style={ligne}>D8</div>
                        <div id="9" style={ligne}>D9</div>
                    </div>
                    <div id="E" style={colonne}>
                        <div id="0" style={ligne} onClick={()=>alert('E0')}>E0</div>
                        <div id="1" style={ligne}>E1</div>
                        <div id="2" style={ligne}>E2</div>
                        <div id="3" style={ligne}>E3</div>
                        <div id="4" style={ligne}>E4</div>
                        <div id="5" style={ligne}>E5</div>
                        <div id="6" style={ligne}>E6</div>
                        <div id="7" style={ligne}>E7</div>
                        <div id="8" style={ligne}>E8</div>
                        <div id="9" style={ligne}>E9</div>
                    </div>
                    <div id="F" style={colonne}>
                        <div id="0" style={ligne} onClick={()=>alert('F0')}>F0</div>
                        <div id="1" style={ligne}>F1</div>
                        <div id="2" style={ligne}>F2</div>
                        <div id="3" style={ligne}>F3</div>
                        <div id="4" style={ligne}>F4</div>
                        <div id="5" style={ligne}>F5</div>
                        <div id="6" style={ligne}>F6</div>
                        <div id="7" style={ligne}>F7</div>
                        <div id="8" style={ligne}>F8</div>
                        <div id="9" style={ligne}>F9</div>
                    </div>
                    <div id="G" style={colonne}>
                        <div id="0" style={ligne} onClick={()=>alert('G0')}>G0</div>
                        <div id="1" style={ligne}>G1</div>
                        <div id="2" style={ligne}>G2</div>
                        <div id="3" style={ligne}>G3</div>
                        <div id="4" style={ligne}>G4</div>
                        <div id="5" style={ligne}>G5</div>
                        <div id="6" style={ligne}>G6</div>
                        <div id="7" style={ligne}>G7</div>
                        <div id="8" style={ligne}>G8</div>
                        <div id="9" style={ligne}>G9</div>
                    </div>
                    <div id="H" style={colonne}>
                        <div id="0" style={ligne} onClick={()=>alert('H0')}>H0</div>
                        <div id="1" style={ligne}>H1</div>
                        <div id="2" style={ligne}>H2</div>
                        <div id="3" style={ligne}>H3</div>
                        <div id="4" style={ligne}>H4</div>
                        <div id="5" style={ligne}>H5</div>
                        <div id="6" style={ligne}>H6</div>
                        <div id="7" style={ligne}>H7</div>
                        <div id="8" style={ligne}>H8</div>
                        <div id="9" style={ligne}>H9</div>
                    </div>
                    <div id="I" style={colonne}>
                        <div id="0" style={ligne} onClick={()=>alert('I0')}>I0</div>
                        <div id="1" style={ligne}>I1</div>
                        <div id="2" style={ligne}>I2</div>
                        <div id="3" style={ligne}>I3</div>
                        <div id="4" style={ligne}>I4</div>
                        <div id="5" style={ligne}>I5</div>
                        <div id="6" style={ligne}>I6</div>
                        <div id="7" style={ligne}>I7</div>
                        <div id="8" style={ligne}>I8</div>
                        <div id="9" style={ligne}>I9</div>
                    </div>
                    <div id="J" style={colonne}>
                        <div id="0" style={ligne} onClick={()=>alert('J0')}>J0</div>
                        <div id="1" style={ligne}>J1</div>
                        <div id="2" style={ligne}>J2</div>
                        <div id="3" style={ligne}>J3</div>
                        <div id="4" style={ligne}>J4</div>
                        <div id="5" style={ligne}>J5</div>
                        <div id="6" style={ligne}>J6</div>
                        <div id="7" style={ligne}>J7</div>
                        <div id="8" style={ligne}>J8</div>
                        <div id="9" style={ligne}>J9</div>
                    </div>
                </div>  
                {/*<Bateau/>*/}
            </div>  
        );
    }
}
export default GrilleTest;

const ligne = {
    /*border: 'solid',
    borderColor: 'red',
    row:1*/
    }

const colonne = {
    //border: 'solid',
    /*borderColor: 'blue',
    columns: 3,*/
}
const board = {
    border: 'solid',
    borderColor: 'red',
    columns: 10,
}
const play = {
    columns: 2,
    marginTop: 50,
}