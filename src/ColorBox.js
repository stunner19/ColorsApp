import React, { Component } from 'react';
import  { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import styles from './styles/ColorBoxStyles';

// For implementing the copy feature, we will use the react-copy-to-clipboard package.

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
                    <div style = {{background : background}} className = {classNames(classes.copyOverlay, {
                        [classes.showOverlay] : copied 
                        })} 
                    />
                    <div className = {classNames(classes.copyMessage, {
                        [classes.showMessage] : copied
                    })}>
                        <h1 className = {classes.copyText}>copied!</h1>
                        <p className = {classes.copyText}>{background}</p>
                    </div>
                    <div>
                        <div className = {classes.boxContent}>
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
