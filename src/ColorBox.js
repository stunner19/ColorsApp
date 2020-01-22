import React, { Component } from 'react';
import './ColorBox.css';

class ColorBox extends Component {
    render(){
        const { name, background } = this.props;
        return(
            <div style = {{ background : background }} className = "ColorBox">
                <div className = "copy-content">
                    <div className = "box-content">
                        {name}
                    </div>
                    <button className = "copy-button">Copy</button>
                </div>
                <span className = "see-more">More</span>
            </div>
        );
    }
}

export default ColorBox;
