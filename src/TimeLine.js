import React, { Component } from 'react';
import Home from './Home';
import Offers from './Offers';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class TimeLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <BrowserRouter forceRefresh={true}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/offers" component={Offers} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default TimeLine;