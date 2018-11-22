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

            selectedName: "",
            selectedGender: "",
            selectedDateOfBirth: new Date().toISOString(),
            selectedCountry: 0,
            selectedRegion: 0,
            selectedCity: 0,
            selectedEmail: "",
            selectedPassword: "",

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

    onCountryChange = (event) => {
        event.persist();
        const value = event.target.value;
        this.locationMapper.getRegions(value).then(response => {
            this.setState({ selectedCountry: value, cities: [], regions: response.body });
        });
    }

    onRegionChange = (event) => {
        event.persist();
        const value = event.target.value;
        this.locationMapper.getCities(value).then(response => {
            this.setState({ selectedRegion: value, cities: response.body });
        });
    }

    onCityChange = (event) => {
        event.persist();
        const value = event.target.value;
        this.setState({ selectedCity: value });
    }

    onGenderChange = (event) => {
        this.setState({ selectedGender: event.target.value });
    }

    onChangeDateOfBirth = (value) => {
        this.setState({ selectedDateOfBirth: value });
    }

    onNameChange = (event) => {
        this.setState({ selectedName: event.target.value });
    }

    renderFirstStage = () => {

        const { genders, countries, regions, cities, selectedName, selectedCountry, selectedRegion, selectedCity, selectedGender, selectedDateOfBirth, errors } = this.state;

        return (
            <FormGroup controlId="registration-1">
                <FieldGroup
                    id="formControlsName"
                    type="text"
                    label="Name"
                    minLength={0}
                    maxLength={255}
                    placeholder="Please enter your name."
                    value={selectedName}
                    onChange={this.onNameChange}
                />
                <FormGroup controlId="formControlsCountry">
                    <ControlLabel>Gender</ControlLabel>
                    <FormControl value={selectedGender} componentClass="select" placeholder="Select your gender" onChange={this.onGenderChange}>
                        <option defaultValue={true}>Select your gender.</option>
                        {genders.map(gender =>
                            <option key={gender} value={gender}>{gender}</option>
                        )}
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Date of birth</ControlLabel>
                    <DatePicker id="example-datepicker" value={selectedDateOfBirth} onChange={this.onChangeDateOfBirth} />
                </FormGroup>
                <FormGroup controlId="formControlsCountry">
                    <ControlLabel>Country</ControlLabel>
                    <FormControl value={selectedCountry} componentClass="select" placeholder="Select your country" onChange={this.onCountryChange}>
                        <option>Select your country.</option>
                        {countries.map(country =>
                            <option key={country.id} value={country.id}>{country.name}</option>
                        )}
                    </FormControl>
                </FormGroup>
                {regions.length > 0 && <FormGroup controlId="formControlsRegion">
                    <ControlLabel>Region</ControlLabel>
                    <FormControl value={selectedRegion} componentClass="select" placeholder="Select your region" onChange={this.onRegionChange}>
                        <option>Select your region.</option>
                        {regions.map(region =>
                            <option key={region.id} value={region.id}>{region.name}</option>
                        )}
                    </FormControl>
                </FormGroup>}
                {cities.length > 0 && <FormGroup controlId="formControlsCity">
                    <ControlLabel>City</ControlLabel>
                    <FormControl value={selectedCity} componentClass="select" placeholder="Select your city" onChange={this.onCityChange}>
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

    onEmailChange = (event) => {
        this.setState({ selectedEmail: event.target.value });
    }

    onPasswordchange = (event) => {
        this.setState({ selectedPassword: event.target.value });
    }

    onSubmit = () => {
        const user = {
            name: this.state.selectedName,
            email: this.state.selectedEmail,
            password: this.state.selectedPassword,
            city: this.state.selectedCity,
            gender: this.state.selectedGender,
            dateOfBirth: new Date(this.state.selectedDateOfBirth).toISOString().substring(0, 10),
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
                    value={this.state.selectedEmail}
                    onChange={this.onEmailChange}
                />
                <FieldGroup
                    id="formControlsPassword"
                    type="password"
                    label="Password"
                    minLength={0}
                    maxLength={255}
                    placeholder="Please choose a password."
                    value={this.state.selectedPassword}
                    onChange={this.onPasswordchange}
                />
                <Button onClick={() => this.setState({ stage: this.state.stage - 1 })}>Previous</Button>
                <Button onClick={this.onSubmit}>Register account</Button>
            </FormGroup>
        )
    }
}

export default RegistrationForm;