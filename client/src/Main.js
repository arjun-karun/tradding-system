import {Component} from "react";
import React from "react";
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import AddMatch from './bet/AddMatch';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        let data = [
            {
                "id": 1,
                "name": "Foo",
                "age": "20"
            },
            {
                "id": 2,
                "name": "Bar",
                "age": "30"
            },
            {
                "id": 3,
                "name": "Baz",
                "age": "40"
            }
        ];
        setTimeout(() => {
            this.setState({
                data: data
            });
        }, 3000);
    }

    renderComponent(Component, routeProps) {
        <Component {...routeProps} />
    }

    render() {
        if (this.state.data.length <= 0) {
            return (<div>Loading....</div>);
        }

        return (
            <main>
                <Switch>
                    <Route exact path='/' render={(props) => <Home {...props} data={this.state} />} />
                    <Route path='/addmatch' component={AddMatch}/>
                </Switch>
            </main>
        )
    }
}

export default Main;