import config from '../config.js';
import {get, post} from './DataMapper';

export default class ChatMapper {
    getFriends() {
        return get(config.restUrl + `chat/friends`);
    }

    getHistory(friend, pageSize, last){
        let url = config.restUrl + `chat/history/${friend}/${pageSize}`;
        if(last)
            url = url + "?last=" + last;  
        return get(url);
    }
}