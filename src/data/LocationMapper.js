import config from '../config.js';

class LocationMapper {

    getCountries() {
        return fetch(config.restUrl + "countries")
            .then(response => response.json());
    }

    getRegions(country) {
        return fetch(config.restUrl + "regions/country/" + country)
        .then(response => response.json());
    }

    getCities(region) {
        return fetch(config.restUrl + "cities/region/" + region)
        .then(response => response.json());
    }
}

export default LocationMapper;