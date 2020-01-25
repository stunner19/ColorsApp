import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import { Route, Switch } from 'react-router-dom';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';

class App extends Component{

    findPalette = (id) => {
        return seedColors.find((palette) => {
            return palette.id === id;
        });
    }

    render(){
        return(
            <Switch>
                <Route exact path = '/' render = {(routeProps) => <PaletteList {...routeProps} palettes = {seedColors} /> } />
                <Route exact path = '/palette/:id' 
                    render = {(routeProps) => (
                        <Palette
                            palette = { generatePalette(this.findPalette(routeProps.match.params.id)) }
                        />
                    )}
                />
                <Route exact path = '/palette/:paletteId/:colorId' render = {() => <SingleColorPalette /> }/>
            </Switch>
        );
    }
}

export default App;
