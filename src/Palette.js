import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';
import Nabvar from './Navbar';

class Palette extends Component {
    constructor(props){
        super(props);
        this.state = {
            level : 500,
            format : "hex"
        };
        this.changeLevel = this.changeLevel.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    changeLevel(newLevel) {
        this.setState({
            level : newLevel
        });
    }

    handleChange(value){
        this.setState({
            format : value
        });
    }

    render(){
        const { colors, paletteName, emoji, id } = this.props.palette;
        const { level, format } = this.state;
        const colorBoxes = colors[level].map(color => (
            <ColorBox background = {color[format]} name = {color.name} key = {color.id} moreUrl = {`/palette/${id}/${color.id}`} showLink = {true} />
        ));
        
        return(
            <div className = "Palette">
                <Nabvar level = {level} changeLevel = {this.changeLevel} handleChange = {this.handleChange} />
                <div className = "Palette-colors">
                    {colorBoxes}
                </div>
                <footer className = "Palette-footer">
                    {paletteName}
                    <span className = "emoji">{emoji}</span>
                </footer>
            </div>
        );
    }
}

export default Palette;