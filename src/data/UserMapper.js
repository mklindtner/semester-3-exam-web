import config from '../config.js';
import { get, post, put, deleter } from './DataMapper';

class UserMapper {

    getGenders = () => {
        return get(config.restUrl + "users/genders");
    }

    create = (user) => {
        return post(config.restUrl + "users", user);
    }

    authenticate = (email, password) => {
        return post(config.restUrl + "authentication/user", { email, password });
    }

    getUser(id) {
        return get(config.restUrl + "users/" + id);
    }

    deleteFriendship = (user) => {
        return deleter(config.restUrl + `friendship/target/${user}` )
    }

    updateProfileImage = (user, image) => {
        return put(config.restUrl + "users/" + user + "/profile-image", image);
    }

    getFriends = (user) => {
        return get(config.restUrl + `users/${user}/friends`);
    }

    sendFriendRequest(receiver){
        return post(config.restUrl + `friendship/requests`, {
            receiver
        });
    }

    acceptFriendRequest(requestId){
        return post(config.restUrl + `friendship/requests/${requestId}/accept`);
    }

    rejectFriendRequest(requestId){
        return post(config.restUrl + `friendship/requests/${requestId}/reject`);
    }

    getFriendship(other){
        return get(config.restUrl + `friendship/receiver/${other}`);
    }

    getSentFriendRequest(receiver){
        return get(config.restUrl + `friendship/requests/receiver/${receiver}`);
    }

    getReceivedFriendRequests(){
        return get(config.restUrl + `friendship/requests/received`);
    }
}

export default UserMapper;