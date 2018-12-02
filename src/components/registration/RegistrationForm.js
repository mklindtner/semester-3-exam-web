import React, { Component } from "react";
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import FieldGroup from '../FieldGroup';
import LocationMapper from '../../data/LocationMapper';
import UserMapper from '../../data/UserMapper';

var DatePicker = require("react-16-bootstrap-date-picker");

class RegistrationForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stage: 1,
            genders: [],
            countries: [],
            regions: [],
            cities: [],
            name: "",
            gender: "",
            dateOfBirth: new Date().toISOString(),
            country: 0,
            region: 0,
            city: 0,
            email: "",
            password: "",
            passwordRepeat: "",
            errors: []
        }

        this.locationMapper = new LocationMapper();
        this.userMapper = new UserMapper();
    }

    componentDidMount = async () => {
        Promise.all([this.locationMapper.getCountries(), this.userMapper.getGenders()]).then(results => {
            this.setState({ countries: results[0].body, genders: results[1].body });
        });
    }

    render() {

        const { stage, errors } = this.state;

        return (
            <form>
                {stage === 1 && this.renderFirstStage()}
                {stage === 2 && this.renderSecondStage()}
                {errors.length > 0 && <div className="form-errors">
                    {errors.map((error, index) =>
                        <div key={index} className="alert alert-danger">
                            <p>{error}</p>
                        </div>
                    )}
                </div>}
            </form>
        );
    }

    onDefaultChange = (event) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        this.setState({ [name]: value });
    }

    onGenderChange = (event) => {
        event.persist();
        const value = event.target.value;
        this.setState({gender: value});
    }

    onCountryChange = (event) => {
        event.persist();
        const value = event.target.value;
        this.locationMapper.getRegions(value).then(response => {
            this.setState({ country: value, cities: [], regions: response.body });
        });
    }

    onRegionChange = (event) => {
        event.persist();
        const value = event.target.value;
        this.locationMapper.getCities(value).then(response => {
            this.setState({ region: value, cities: response.body });
        });
    }

    onCityChange = (event) => {
        event.persist();
        const value = event.target.value;
        this.setState({ city: value });
    }

    onDateOfBirthChange = (value) => {
        this.setState({dateOfBirth: value});
    }

    renderFirstStage = () => {

        const { genders, countries, regions, cities, errors } = this.state;

        return (
            <FormGroup controlId="registration-1">
                <FieldGroup
                    id="formControlsName"
                    type="text"
                    label="Name"
                    name="name"
                    minLength={0}
                    maxLength={255}
                    placeholder="Please enter your name."
                    value={this.state.name}
                    onChange={this.onDefaultChange}
                />
                <FormGroup controlId="formControlsCountry">
                    <ControlLabel>Gender</ControlLabel>
                    <FormControl value={this.state.gender} componentClass="select" placeholder="Select your gender" onChange={this.onGenderChange}>
                        <option defaultValue={true}>Select your gender.</option>
                        {genders.map(gender =>
                            <option key={gender} value={gender}>{gender}</option>
                        )}
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Date of birth</ControlLabel>
                    <DatePicker id="example-datepicker" value={this.state.dateOfBirth} onChange={this.onDateOfBirthChange} />
                </FormGroup>
                <FormGroup controlId="formControlsCountry">
                    <ControlLabel>Country</ControlLabel>
                    <FormControl value={this.state.country} componentClass="select" placeholder="Select your country" onChange={this.onCountryChange}>
                        <option>Select your country.</option>
                        {countries.map(country =>
                            <option key={country.id} value={country.id}>{country.name}</option>
                        )}
                    </FormControl>
                </FormGroup>
                {regions.length > 0 && <FormGroup controlId="formControlsRegion">
                    <ControlLabel>Region</ControlLabel>
                    <FormControl value={this.state.region} componentClass="select" placeholder="Select your region" onChange={this.onRegionChange}>
                        <option>Select your region.</option>
                        {regions.map(region =>
                            <option key={region.id} value={region.id}>{region.name}</option>
                        )}
                    </FormControl>
                </FormGroup>}
                {cities.length > 0 && <FormGroup controlId="formControlsCity">
                    <ControlLabel>City</ControlLabel>
                    <FormControl value={this.state.city} componentClass="select" placeholder="Select your city" onChange={this.onCityChange}>
                        <option>Select your city.</option>
                        {cities.map(city =>
                            <option key={city.id} value={city.id}>{city.name}</option>
                        )}
                    </FormControl>
                </FormGroup>}
                <Button onClick={() => this.setState({ stage: this.state.stage + 1 })}>Next</Button>
            </FormGroup>
        );
    }

    onSubmit = () => {
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            passwordRepeat: this.state.passwordRepeat,
            city: this.state.city,
            gender: this.state.gender,
            dateOfBirth: new Date(this.state.dateOfBirth).toISOString().substring(0, 10),
        }

        
        if(user.password.length < 4){
            this.setState({errors: ["The password must be longer than 3 characters."]});
            return;
        }

        if(user.password !== user.passwordRepeat){
            this.setState({errors: ["The two passwords must match."]});
            return;
        }

        this.userMapper.create(user).then(response => {

            // Success
            if (response.status === 201) {
                this.props.onRegistration(response.body);
                this.setState({ errors: [] });
                return;
            }

            // Validation error
            if (response.status === 422) {
                const messages = response.body.violations.map(violation => violation.message);
                this.setState({ errors: messages });
                return;
            }

            if (response.status === 409) {
                this.setState({ errors: ["That email is already in use."] })
                return;
            }

            this.setState({ errors: ["An error occurred."] });
        });
    }

    renderSecondStage = () => {
        return (
            <FormGroup controlId="registration-2">
                <FieldGroup
                    id="formControlsEmail"
                    type="email"
                    label="Email"
                    minLength={0}
                    maxLength={255}
                    placeholder="Please enter your email address."
                    name="email"
                    value={this.state.email}
                    onChange={this.onDefaultChange}
                />
                <FieldGroup
                    id="formControlsPassword"
                    type="password"
                    label="Password"
                    minLength={0}
                    maxLength={255}
                    name="password"
                    placeholder="Please choose a password."
                    value={this.state.password}
                    onChange={this.onDefaultChange}
                />
                <FieldGroup
                    id="formControlsPasswordRepeat"
                    type="password"
                    label="Repeat Password"
                    name="passwordRepeat"
                    minLength={0}
                    maxLength={255}
                    placeholder="Please choose a password."
                    value={this.state.passwordRepeat}
                    onChange={this.onDefaultChange}
                />
                <Button onClick={() => this.setState({ stage: this.state.stage - 1 })}>Previous</Button>
                <Button style={{marginLeft: '20px'}} onClick={this.onSubmit}>Register account</Button>
            </FormGroup>
        )
    }
}

export default RegistrationForm;