import React from 'react';
import './Filters.css'
import filtersRest from "./FiltersRest";

class Filters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.choosePlatformDropdown = this.handleChoosePlatformDropdown.bind(this);
        this.chooseGenreDropdown = this.handleChooseGenreDropdown.bind(this);
        this.randomizeButton = this.handleRandomizeClick.bind(this);
    }

    handleChoosePlatformDropdown(e) {
        this.setState({
            platformValue: e.target.value
        });
    }

    handleChooseGenreDropdown(e) {
        this.setState({
            genreValue: e.target.value
        });
    }

    handleRandomizeClick(e) {
        console.log('handleRandomizeClick', this.state);
    }

    /* componentDidMount() will be called immediately when the component is mounted
    * ideal for placing REST calls
    *
    * componentWillUnmount() will be called immediately when a component is destroyed
    * ideal for performing cleanups
    * */
    componentDidMount() {
        filtersRest.getPlatforms()
            .then(data => {
                console.log('platforms', data);
            });

        filtersRest.getGenres()
            .then(data => {
                console.log('genres', data);
            });

        filtersRest.getGames()
            .then(data => {
                console.log('games', data);
            });
    }

    render() {
        return (
            <div className='filters'>
                <div className='columns'>
                    <div className='column'>
                        <div className="select">
                            <div className="control">
                                <select value={this.state.platformValue} onChange={this.choosePlatformDropdown}>
                                    <option>Select Platform</option>
                                    <option>Steam</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='column'>
                        <div className="select">
                            <div className="control">
                                <select value={this.state.genreValue} onChange={this.chooseGenreDropdown}>
                                    <option>Select Genre</option>
                                    <option>Action/Adventure</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='column'>
                        <div className="control">
                            <button className='button is-light' onClick={this.randomizeButton}>RANDOMIZE</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Filters;