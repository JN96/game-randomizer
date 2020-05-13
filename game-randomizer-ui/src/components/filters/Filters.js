import React from 'react';
import './Filters.css'
import filtersRest from "./FiltersRest";
import errorHandler from '../ErrorHandler';
import Modal from '../modal/Modal';

class Filters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            platforms: [],
            genres: [],
            games: [],
            platformSelectedValue: null,
            genreSelectedValue: null,
            result: null,
            errors: []
        };

        this.choosePlatformDropdown = this.handleChoosePlatformDropdown.bind(this);
        this.chooseGenreDropdown = this.handleChooseGenreDropdown.bind(this);
        this.randomizeButton = this.handleRandomizeClick.bind(this);
    }

    handleChoosePlatformDropdown(e) {
        this.setState({
            platformSelectedValue: e.target.value
        });
    }

    handleChooseGenreDropdown(e) {
        this.setState({
            genreSelectedValue: e.target.value
        });
    }

    handleRandomizeClick() {
        filtersRest.queryGames(this.state.platformSelectedValue, this.state.genreSelectedValue)
            .then(data => {
                if (data) {
                    this.setState({
                        result: data
                    });
                    //TODO: send data to be randomized and return item to a view
                }
            }).catch(error => {
            this.state.errors.push(errorHandler.handleError(error));
        });
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
                if (data) {
                    this.setState({
                        platforms: data
                    });
                }
            }).catch(error => {
            this.state.errors.push(errorHandler.handleError(error));
        });

        filtersRest.getGenres()
            .then(data => {
                if (data) {
                    this.setState({
                        genres: data
                    });
                }
            }).catch(error => {
            this.state.errors.push(errorHandler.handleError(error));
        });
    }

    render() {
        return (
            <div>
                <div className='section _filters'>
                    <div className='container'>
                        <div className='columns is-centered'>
                            <div className='column'>
                                <div className="select">
                                    <div className="control">
                                        <select onChange={this.choosePlatformDropdown}>
                                            <option>Select Platform</option>
                                            {this.state.platforms ? this.state.platforms.map(platform => (
                                                <option key={platform.name} value={platform.id}>
                                                    {platform.name}
                                                </option>
                                            )) : null}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='column'>
                                <div className="select">
                                    <div className="control">
                                        <select value={this.state.genreValue} onChange={this.chooseGenreDropdown}>
                                            <option>Select Genre</option>
                                            {this.state.genres.map(genre => (
                                                <option key={genre.name} value={genre.id}>
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
                </div>
                {this.state.errors.length > 0 ?
                    //TODO: error handling for no response/500 response from server
                    <Modal data={this.state.errors}/> : null
                }
            </div>
        )
    }
}

export default Filters;