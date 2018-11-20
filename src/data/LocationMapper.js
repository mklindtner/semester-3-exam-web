import config from '../config.js';
import {get, post} from './DataMapper';

class LocationMapper {

    getCountries() {
        return get(config.restUrl + "countries");
    }

    getRegions(country) {
        return get(config.restUrl + "regions/country/" + country);
    }

    getCities(region) {
        return get(config.restUrl + "cities/region/" + region)
    }
}

export default LocationMapper;