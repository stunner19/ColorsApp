import React, { Component } from 'react';
import  { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
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
        return(
            <CopyToClipboard text = {background} onCopy = {this.changeCopyState}>
                <div style = {{ background : background }} className = "ColorBox">
                    <div style = {{background : background}} className = {`copy-overlay ${copied && 'show'}`} />
                    <div className = {`copy-msg ${copied && 'show'}`}>
                        <h1>copied!</h1>
                        <p>{background}</p>
                    </div>
                    <div className = "copy-content">
                        <div className = "box-content">
                            {name}
                        </div>
                        <button className = "copy-button">Copy</button>
                    </div>
                    {showLink && <Link to = {moreUrl} onClick = {event => event.stopPropagation()}>
                        <span className = "see-more">More</span>
                        </Link>
                    }
                </div>
            </CopyToClipboard>
        );
    }
}

export default ColorBox;
