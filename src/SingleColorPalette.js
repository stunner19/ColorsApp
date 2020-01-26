import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Nabvar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteStyles';

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
        const { classes } = this.props;
        const { paletteName, emoji, id } = this.props.palette;
        const { format } = this.state;
        const colorBoxes = this._shades.map(color => (
            <ColorBox key = {color.name} name = {color.name} background = {color[format]} showingFullPalette = {false} />
        ))
        return(
            <div className = {classes.Palette}>
                <Nabvar handleChange = {this.handleChange} showingAllCOlors = {false} />
                <div className = {classes.colors}>
                    {colorBoxes}
                    {/* See video 7 part 3 */}
                    <div className = {classes.goBack}>
                        <Link to = {`/palette/${id}`}>Go Back</Link>
                    </div>
                </div>
                <PaletteFooter paletteName = {paletteName} emoji = {emoji}/>
            </div>
        );
    }
}

export default withStyles(styles)(SingleColorPalette);