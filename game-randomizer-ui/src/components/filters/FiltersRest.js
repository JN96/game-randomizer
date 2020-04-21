import axios from 'axios';
const url = process.env.REACT_APP_LOCALHOST;

class FiltersRest {

    getPlatforms() {
        return axios({
            url: url + 'api/platforms',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }
                return response.data;
            })
            .catch(err => {
                console.error(err);
            });
    }

    getGenres() {
        return axios({
            url: url + 'api/genres',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }
                return response.data;
            })
            .catch(err => {
                console.error(err);
            });
    }

    queryGames() {
        //TODO: get games based on query data
    }

    getGames() {
       return axios({
            url: url + 'api/games',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
           .then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }
                return response.data;
            })
            .catch(err => {
                console.error(err);
            });
    }
}

const filtersRest = new FiltersRest();
export default filtersRest;
