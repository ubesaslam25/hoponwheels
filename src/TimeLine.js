import React, { Component } from 'react';
import Home from './Home';
import Offers from './Offers';
import Details from './Details';
import Products from './HomeModule/Products';
import ProductsDetails from './HomeModule/ProductDetails';
import { BrowserRouter, /*HashRouter,*/ Route, Switch/*, Redirect*/ } from 'react-router-dom';
//const navPath = '/reactapp/';
const navPath = '/';

class TimeLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <BrowserRouter/* forceRefresh={true}*/>
                <Switch>
                    <Route exact path={navPath} component={Home} />
                    <Route exact path={navPath+"offers"} component={Offers} />
                    <Route exact path={navPath+":slug"} component={Details} />
                    <Route exact path={navPath+"products"} component={Products} />
                    <Route exact path={navPath+"products/:slug"} component={ProductsDetails} />
                    {/* <Redirect from='*' to='/404.html' /> */}
                </Switch>
            </BrowserRouter>
        );
    }
}

export default TimeLine;