import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';
import Nabvar from './Navbar';
import PaletteFooter from './PaletteFooter';

class SingleColorPalette extends Component {
    constructor(props){
        super(props);
        this._shades = this.gatherShades(this.props.palette,this.props.colorId);
        this.state = {
            format : "hex"
        };
        this.handleChange = this.handleChange.bind(this);
    }

    gatherShades(palette, colorToFilterBy){
        let shades = [];
        let allColors = palette.colors;
        for(let key in allColors){
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            )
        }
        // remove the 50 version and start from 100.
        return shades.slice(1);
    }

    handleChange(value){
        this.setState({
            format : value
        });
    }

    render(){
        const { paletteName, emoji } = this.props.palette;
        const { format } = this.state;
        const colorBoxes = this._shades.map(color => (
            <ColorBox key = {color.id} name = {color.name} background = {color[format]} showLink = {false} />
        ))
        return(
            <div className = "Palette">
                <Nabvar handleChange = {this.handleChange} showingAllCOlors = {false} />
                <div className = "Palette-colors">
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName = {paletteName} emoji = {emoji}/>
            </div>
        );
    }
}

export default SingleColorPalette;