import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Nabvar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteStyles';

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
        const { classes } = this.props;
        const { colors, paletteName, emoji, id } = this.props.palette;
        const { level, format } = this.state;
        const colorBoxes = colors[level].map(color => (
            <ColorBox background = {color[format]} name = {color.name} key = {color.id} moreUrl = {`/palette/${id}/${color.id}`} showingFullPalette = {true} />
        ));
        
        return(
            <div className = {classes.Palette}>
                <Nabvar level = {level} changeLevel = {this.changeLevel} handleChange = {this.handleChange} showingAllColors = {true} />
                <div className = {classes.colors}>
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName = {paletteName} emoji = {emoji} />
            </div>
        );
    }
}

export default withStyles(styles)(Palette);