import React from 'react';
import './Filters.css'
import filtersRest from "./FiltersRest";
import errorHandler from '../ErrorHandler';
import Loader from '../loader/Loader';
import Modal from '../modal/Modal';
import Dictionary from '../../locales/dictionary'

class Filters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            platforms: [],
            genres: [],
            platformSelectedValue: null,
            genreSelectedValue: null,
            queryResult: null,
            randomizedGame: {},
            loaderState: false,
            errors: []
        };

        this.choosePlatformDropdown = this.handleChoosePlatformDropdown.bind(this);
        this.chooseGenreDropdown = this.handleChooseGenreDropdown.bind(this);
        this.randomizeButton = this.handleRandomizeClick.bind(this);
    }

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
        //TODO: cache games if list is the same? local/session storage?
        this.setState({
            loaderState: true
        });
        filtersRest.queryGames(this.state.platformSelectedValue, this.state.genreSelectedValue)
            .then(data => {
                if (data) {
                    this.setState({
                        queryResult: data
                    });
                    return this.state.queryResult;
                }
            }).then(queryResultData => {
                this.randomizeGame(queryResultData);
                this.setState({
                    loaderState: false
                });
        }).catch(error => {
            this.state.errors.push(errorHandler.handleError(error));
        });
    }

    randomizeGame() {
        let getRandomGame = this.state.queryResult[Math.floor(Math.random() * this.state.queryResult.length)];
        this.setState({
            randomizedGame: getRandomGame
        });
    }

    render() {
        return (
            <div className='_filters'>
                <div className='section'>
                    <div className='container'>
                        <div className='content'>
                            <div className='columns'>
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
                                    <div className='select'>
                                        <div className='control'>
                                            <select onChange={this.chooseGenreDropdown}>
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
                            <div className='card'>
                                <div className='card-header'>
                                    <p className="card-header-title is-centered">
                                        {this.state.randomizedGame.name ? this.state.randomizedGame.name : 'Randomized game will appear here.'}
                                    </p>
                                </div>
                                <div className='card-content'>
                                    <div className='content'>
                                        <p>
                                            {this.state.randomizedGame.summary}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {this.state.errors.length > 0 ?
                            //TODO: error handling for no response/500 response from server
                            //TODO: error handler for if no filters are selected and the randomize button is clicked
                            //TODO: error handling for if response object/this.state.randomizedGame is empty
                            //TODO: debug error modal and see why multiple modals won't show if more than error exists
                            <Modal
                                header={Dictionary.error.header}
                                message={Dictionary.error.message}
                                description={Dictionary.error.description}
                            /> : null
                        }
                    </div>
                </div>
                <Loader showLoader={this.state.loaderState}/>
            </div>
        )
    }
}

export default Filters;