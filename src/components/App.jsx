import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Form from './Form/Form';
import Title from './Form/Title';

import ContactList from './Form/ContacsList';
import Filter from './Form/FilterSearch';

export const App = () => {
  const [values, setValues] = useState(() => ({
    contacts: JSON.parse(localStorage.getItem('contacts')) || [],
    
    filter: '',
  }));

  const { contacts, filter } = values;

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
 

  const onChangeInput = event => {
    const { name, value } = event.currentTarget;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onClickSubmit = event => {
  
    event.preventDefault();

    const { name } = values;
    const isExist = values.contacts.findIndex(
      el =>
        el.name.toLocaleLowerCase().trim() === name.toLocaleLowerCase().trim()
    );
  

    if (isExist >= 0) {
      alert(`Contact ${name} already exists!`);
      return;
    }

    setValues({
      contacts: [
        ...contacts,
        {
          number: values.number,
          name: values.name,
          id: nanoid(),
        },
      ],
      name: '',
      number: '',
      filter: '',
    });
    event.currentTarget.reset();
  };

  const onClickDelete = event => {
    const selectContact = event.currentTarget.id;
   
    const updateContactAfterDelete = contacts.filter(
      item => item.id !== selectContact
    );
   
    setValues(prevValues => ({
      ...prevValues,
      contacts: updateContactAfterDelete,
    }));
  };

  const contactsArr = Object.values(contacts);
  const filterContacts = contactsArr.filter(item =>
    item.name?.toLocaleLowerCase().includes(filter?.toLocaleLowerCase())
  );
 
  return (
    <div className="App">
      <Title title="Phonebook">
        <Form onChangeInput={onChangeInput} onClickSubmit={onClickSubmit} />
      </Title>
      {contacts.length !== 0 ? <Filter onChangeInput={onChangeInput} /> : ''}
      {contacts.length !== 0 ? (
        <ContactList
          filterContacts={filterContacts}
          onChangeInput={onChangeInput}
          onClickDelete={onClickDelete}
        />
      ) : (
        ''
      )}
    </div>
  );
};
