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
                    return response.status;
                }
                return response.data;
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
                    return response.status;
                }
                return response.data;
            });
    }

    queryGames(platform, genre) {
        return axios({
            url: url + 'api/games/query',
            params: {
                platform: platform,
                genre: genre
            },
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return response.status;
                }
                return response.data;
            })
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
                    return response.status;
                }
                return response.data;
            });
    }
}

const filtersRest = new FiltersRest();
export default filtersRest;
