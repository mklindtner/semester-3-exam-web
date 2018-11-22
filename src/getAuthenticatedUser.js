export default () => {
    return JSON.parse(localStorage.getItem('authenticationContext')).user;
}