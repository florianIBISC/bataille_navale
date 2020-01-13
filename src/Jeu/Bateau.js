import React, {/* Component, StyleSheet */}  from 'react';

class Bateau extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /*b4 = {className: "Bateau 4", "length": 4},
            b3 = {"nom": "Bateau 3", "length": 3},
            b2 = {"nom": "Bateau 2", "length": 2},*/
            b1: true,
            button: true,
        }
        this.handleClick = this.handleClick.bind(this);  
    }

    handleClick(){
        this.setState({
          button:!this.state.button
        })
    }
    selectBateau(){
        this.setState({
            b1:!this.state.b1
        })
    }

    render(){
        return(   
            <footer>         
                <button className={this.state.button ? "horizontal": "vertical"} onClick={this.handleClick}>changer de sens</button>
                <button className="b1" onClick={this.selectBateau.bind(this)}>Bateau 1</button>
                <button className="b2" onClick={() => this.props.onClick()}>Bateau 2</button>
                <button className="b3" onClick={() => this.props.onClick()}>Bateau 3</button>
                <button className="b4" onClick={() => this.props.onClick()}>Bateau 4</button>
            </footer>
        );
    }
}
export default Bateau;