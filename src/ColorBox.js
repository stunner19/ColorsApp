import React, { Component } from 'react';
import  { CopyToClipboard } from 'react-copy-to-clipboard';
import './ColorBox.css';

// For implementing the copy feature, we will use the react-copy-to-clipboard package.

class ColorBox extends Component {
    render(){
        const { name, background } = this.props;
        return(
            <CopyToClipboard text = {background}>
                <div style = {{ background : background }} className = "ColorBox">
                    <div className = "copy-content">
                        <div className = "box-content">
                            {name}
                        </div>
                        <button className = "copy-button">Copy</button>
                    </div>
                    <span className = "see-more">More</span>
                </div>
            </CopyToClipboard>
        );
    }
}

export default ColorBox;
