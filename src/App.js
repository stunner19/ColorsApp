import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import Page from './Page';
import { generatePalette } from './colorHelpers';

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
                    <CSSTransition classNames = "page" timeout = {500} key = {location.key}>
                        <Switch location = {location}>
                            <Route exact path  = '/palette/new' render = {(routeProps) => (
                                <Page>                                
                                    <NewPaletteForm 
                                        {...routeProps}  
                                        palettes = {palettes}
                                        savePalette = {this.savePalette} 
                                    />
                                </Page>
                            )} />
                            <Route exact path = '/' render = {(routeProps) => (
                                <Page>
                                    <PaletteList 
                                        {...routeProps} 
                                        palettes = { palettes } 
                                        deletePalette = {this.deletePalette} 
                                    /> 
                                </Page>
                            )} />
                            <Route exact path = '/palette/:id' 
                                render = {(routeProps) => (
                                    <Page>
                                        <Palette
                                            palette = { generatePalette(this.findPalette(routeProps.match.params.id)) }
                                        />
                                    </Page>
                            )} />
                            <Route exact path = '/palette/:paletteId/:colorId' 
                                render = {(routeProps) => (
                                    <Page>
                                        <SingleColorPalette 
                                            colorId = {routeProps.match.params.colorId}
                                            palette = { generatePalette(this.findPalette(routeProps.match.params.paletteId)) } 
                                        /> 
                                    </Page>
                            )}/>
                            <Route render = {(routeProps) => (
                                <Page>
                                    <PaletteList 
                                        {...routeProps} 
                                        palettes = { palettes } 
                                        deletePalette = {this.deletePalette} 
                                    /> 
                                </Page>
                            )} />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            )} />
        );
    }
}

export default App;