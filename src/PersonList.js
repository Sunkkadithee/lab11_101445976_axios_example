import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class PersonList extends Component {
  state = {
    persons: [],
    isLoading: true,
    error: null
  };

  componentDidMount() {
    axios.get('https://randomuser.me/api/?results=10')
      .then(res => {
        const persons = res.data.results;
        this.setState({ persons, isLoading: false });
      })
      .catch(error => {
        this.setState({ error: 'Error fetching data', isLoading: false });
      });
  }

  render() {
    const { persons, isLoading, error } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return (
        <div className="App">
        <div className="App-header">
          User List
        </div>
        <div className="App-list">
          <ul>
            {persons.map(person => (
              <li key={person.login.uuid} className="person-card">
                <div className="person-top-info">
                  {`${person.name.title} ${person.name.first} ${person.name.last} - ${person.location.coordinates.latitude} - ${person.location.coordinates.longitude}`}
                </div>
      
                {/* Photo, Button, and User Details */}
                <div className="person-photo-details">
                  <div className="person-photo">
                    <img
                      src={person.picture.medium}
                      alt={`${person.name.first} ${person.name.last}`}
                    />
                    <p>User Name: {person.login.username}</p>
                    <button className="details-btn">Details</button>
                  </div>
      
                  <div className="person-details">
                    <p>User Name: {person.login.username}</p>
                    <p>Gender: {person.gender.toUpperCase()}</p>
                    <p>Time Zone Description: {person.location.timezone.description}</p>
                    <p>Address: {`${person.location.street.name}, ${person.location.city}, ${person.location.state}, ${person.location.country} - ${person.location.postcode}`}</p>
                    <p>Email: {person.email}</p>
                    <p>Birth Date and Age: {`${person.dob.date.split('T')[0]} (${new Date().getFullYear() - new Date(person.dob.date).getFullYear()})`}</p>
                    <p>Register Date: {person.registered.date.split('T')[0]}</p>
                    <p>Phone: {person.phone}</p>
                    <p>Cell: {person.cell}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
    );
  }
}

export default PersonList;
