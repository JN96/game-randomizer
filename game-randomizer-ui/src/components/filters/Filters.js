import React from 'react';
import './Filters.css'
import filtersRest from "./FiltersRest";

class Filters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            platforms: [],
            genres: [],
            games: []
        };

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
                this.setState({
                    platforms: data
                });
            }).catch(error => {
                console.log('Get platforms returned error: ', error);
        });

        filtersRest.getGenres()
            .then(data => {
                this.setState({
                   genres: data
                });
            }).catch(error => {
                console.log('Get genres returned error: ', error)
        });

        filtersRest.getGames()
            .then(data => {
                this.setState({
                   games: data
                });
            }).catch(error => {
                console.log('Get games returned error:', error);
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
                                    {this.state.platforms.map(platform => (
                                        <option key={platform.name} value={platform.name}>
                                            {platform.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='column'>
                        <div className="select">
                            <div className="control">
                                <select value={this.state.genreValue} onChange={this.chooseGenreDropdown}>
                                    <option>Select Platform</option>
                                    {this.state.genres.map(genre => (
                                        <option key={genre.name} value={genre.name}>
                                            {genre.name}
                                        </option>
                                    ))}
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