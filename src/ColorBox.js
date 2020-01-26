import React, { Component } from 'react';
import  { CopyToClipboard } from 'react-copy-to-clipboard';
import { withStyles } from '@material-ui/styles';
import { Link, withRouter } from 'react-router-dom';
import chroma from 'chroma-js';
import './ColorBox.css';

// For implementing the copy feature, we will use the react-copy-to-clipboard package.

const styles = {
    ColorBox : {
        width: "20%",
        height: (props) => (props.showingFullPalette ? "25%" : "50%"),
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-4.4px",
        "&:hover button" : {
            opacity : 1
        }
    },
    copyText : {
        color : (props) => chroma(props.background).luminance() >= 0.6 ? "black" : "white"
    },
    colorName : {
        color : (props) => chroma(props.background).luminance() <= 0.07 ? "white" : "black"
    },
    seeMore : {
        color : (props) => chroma(props.background).luminance() >= 0.6 ? "black" : "white",
        background: "rgba(255, 255, 255, 0.3)",
        position: "absolute",
        border: "none",
        right: "0px",
        bottom: "0px",
        width: "60px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
        textTransform: "uppercase"
    
    },
    copyButton : {
        color : (props) => chroma(props.background).luminance() >= 0.6 ? "black" : "white",
        width: "100px",
        height: "30px",   
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        background: "rgba(255, 255, 255, 0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        textTransform: "uppercase",
        border: "none",
        textDecoration: "none",
        opacity : 0
    }
};

class ColorBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            copied : false
        };
        this.changeCopyState = this.changeCopyState.bind(this);
    }

    changeCopyState(){
        this.setState({
            copied : true
        },() => {
            setTimeout(() => {
                this.setState({
                    copied : false
                })
            },1500);    
        });
    }

    render(){
        const { name, background, moreUrl, showingFullPalette, classes } = this.props;
        const { copied } = this.state;
        return(
            <CopyToClipboard text = {background} onCopy = {this.changeCopyState}>
                <div style = {{ background : background }} className = {classes.ColorBox}>
                    <div style = {{background : background}} className = {`copy-overlay ${copied && 'show'}`} />
                    <div className = {`copy-msg ${copied && 'show'}`}>
                        <h1 className = {classes.copyText}>copied!</h1>
                        <p className = {classes.copyText}>{background}</p>
                    </div>
                    <div className = "copy-content">
                        <div className = "box-content">
                            <span className = {classes.colorName}>{name}</span>
                        </div>
                        <button className = {classes.copyButton}>Copy</button>
                    </div>
                    {/* See Video 8 & 9 part 3 */}
                    {showingFullPalette && <Link to = {moreUrl} onClick = {event => event.stopPropagation()}>
                        <span className = {classes.seeMore}>MORE</span>
                        </Link>
                    }
                </div>
            </CopyToClipboard>
        );
    }
}

export default withStyles(styles)(ColorBox);
