import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import './Phonebook.css';
import PropTypes from 'prop-types';

class Phonebook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
    showAlert: false,
    alertText: '',
  };

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  handleNumberChange = event => {
    this.setState({ number: event.target.value });
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value.toLowerCase() });
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleAddContact = (name, number) => {
    const { contacts } = this.state;

    if (name.trim() === '' || number.trim() === '') {
      return;
    }

    const isContactExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isContactExists) {
      this.setState({
        showAlert: true,
        alertText: `Contact "${name}" is already in contacts.`,
      });
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      name: '',
      number: '',
    }));
  };

  handleAlertClose = () => {
    this.setState({ showAlert: false });
  };

  render() {
    const { name, number, contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );

    return (
      <div>
        <h1>Phonebook</h1>

        <h2>Add New Contact</h2>
        <ContactForm
          name={name}
          number={number}
          onAddContact={this.handleAddContact}
          onNameChange={this.handleNameChange}
          onNumberChange={this.handleNumberChange}
          onAlert={this.handleAlert}
        />

        <h2>Contacts</h2>

        <Filter filter={filter} onFilterChange={this.handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />

        {this.state.showAlert && (
          <div className="alert">
            <p>{this.state.alertText}</p>
            <button onClick={this.handleAlertClose}>OK</button>
          </div>
        )}
      </div>
    );
  }
}

Phonebook.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  filter: PropTypes.string.isRequired,
  showAlert: PropTypes.bool.isRequired,
  alertText: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onNumberChange: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
  onAddContact: PropTypes.func.isRequired,
  onAlertClose: PropTypes.func.isRequired,
};

export default Phonebook;
