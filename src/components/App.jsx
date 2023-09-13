import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { FilterContact } from './FilterContact/FilterContact';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = contact => {
    const newContact = {
      name: contact.name,
      number: contact.number,
      id: nanoid(),
    };

    const { contacts } = this.state;
    const existingContact = contacts.map(contact => {
      return contact.name;
    });

    if (existingContact.includes(contact.name)) {
      return alert(`${contact.name} is already in contacts.`);
    } else {
      this.setState(prevState => {
        return {
          contacts: [...prevState.contacts, newContact],
        };
      });
    }
  };

  filterChange = event => {
    this.setState({ filter: event.target.value });
  };

  showContact = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    return (
      <div>
        <h2 className={css.header}>Phonebook</h2>
        <ContactForm onSubmit={this.addContact} />
        <h3 className={css.header}>Contacts</h3>
        <FilterContact inputChange={this.filterChange} />
        <ContactList
          contacts={this.showContact()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
}
