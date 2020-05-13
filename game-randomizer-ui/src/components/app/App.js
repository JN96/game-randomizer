import React from 'react';
import './App.css';
import 'bulma';
import Filters from '../filters/Filters';

class App extends React.Component{
    render() {
        return (
            <div className="App">
                {/*<header className="App-header"></header>*/}
                <Filters/>
            </div>
        );
    }
}

export default App;
