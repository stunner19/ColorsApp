import React, { Component } from 'react';
import  { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import './ColorBox.css';

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
        const { name, background, moreUrl, showLink } = this.props;
        const { copied } = this.state;
        const isDarkColor = chroma(background).luminance() <= 0.07;
        const isLightColor = chroma(background).luminance() >= 0.6;
        return(
            <CopyToClipboard text = {background} onCopy = {this.changeCopyState}>
                <div style = {{ background : background }} className = "ColorBox">
                    <div style = {{background : background}} className = {`copy-overlay ${copied && 'show'}`} />
                    <div className = {`copy-msg ${copied && 'show'}`}>
                        <h1 className = {isLightColor ? 'dark-text' : undefined}>copied!</h1>
                        <p className = {isLightColor ? 'dark-text' : undefined}>{background}</p>
                    </div>
                    <div className = "copy-content">
                        <div className = "box-content">
                            <span className = {isDarkColor ? 'light-text' : undefined}>{name}</span>
                        </div>
                        <button className = {`copy-button ${isLightColor ? 'dark-text' : undefined}`}>Copy</button>
                    </div>
                    {/* See Video 8 part 3 */}
                    {showLink && <Link to = {moreUrl} onClick = {event => event.stopPropagation()}>
                        <span className = {`see-more ${isLightColor ? 'dark-text' : undefined}`}>MORE</span>
                        </Link>
                    }
                </div>
            </CopyToClipboard>
        );
    }
}

export default ColorBox;
