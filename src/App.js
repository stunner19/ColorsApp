import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import { Route, Switch } from 'react-router-dom';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';

class App extends Component{

    constructor(props){
        super(props);
        const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
        this.state = {
            palettes : savedPalettes || seedColors 
        };
        this.savePalette = this.savePalette.bind(this);
        this.findPalette = this.findPalette.bind(this);
        this.deletePalette = this.deletePalette.bind(this);
        // Even if we are using an arrow function, if we use the keyword this inside the arrow function, we need to bind it in the constructor.
    }

    findPalette = (id) => {
        return this.state.palettes.find((palette) => {
            return palette.id === id;
        });
    }

    savePalette(newPalette){
        this.setState({
            palettes : [...this.state.palettes, newPalette]
        }, this.syncLocalStorage);
    }

    deletePalette(id){
        this.setState((oldState) => ({
            palettes : oldState.palettes.filter(palette => id !== palette.id),
        }), this.syncLocalStorage);
    }

    syncLocalStorage() {
        window.localStorage.setItem("palettes",JSON.stringify(this.state.palettes));
    }

    render(){
        const { palettes } = this.state;
        return(
            // Watch video 6 part 7 for Route Animations
            <Route render = {({ location }) => (
                <TransitionGroup>
                    <CSSTransition classNames = "fade" timeout = {500} key = {location.key}>
                        <Switch location = {location}>
                            <Route exact path  = '/palette/new' render = {(routeProps) => (
                                <div className = "page">                                
                                    <NewPaletteForm 
                                        {...routeProps}  
                                        palettes = {palettes}
                                        savePalette = {this.savePalette} 
                                    />
                                </div>
                            )} />
                            <Route exact path = '/' render = {(routeProps) => (
                                <div>
                                    <PaletteList 
                                        {...routeProps} 
                                        palettes = { palettes } 
                                        deletePalette = {this.deletePalette} 
                                    /> 
                                </div>
                            )} />
                            <Route exact path = '/palette/:id' 
                                render = {(routeProps) => (
                                    <div>
                                        <Palette
                                            palette = { generatePalette(this.findPalette(routeProps.match.params.id)) }
                                        />
                                    </div>
                            )} />
                            <Route exact path = '/palette/:paletteId/:colorId' 
                                render = {(routeProps) => (
                                    <div>
                                        <SingleColorPalette 
                                            colorId = {routeProps.match.params.colorId}
                                            palette = { generatePalette(this.findPalette(routeProps.match.params.paletteId)) } 
                                        /> 
                                    </div>
                            )}/>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            )} />
        );
    }
}

export default App;