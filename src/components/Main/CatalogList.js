import React from 'react';
import Contact from './Contact';


const CatalogList = ({ contacts, selectedId, clickHandler }) => {

  return (
    <div id="list">
      <h1>Contacts</h1>
      <div className="content">
        {contacts.map(c =>
          <Contact
            key={c._id}
            firstName={c.firstName}
            lastName={c.lastName}
            selected={c._id === selectedId}
            onClick={() => clickHandler(c._id)}
          />
        )}
      </div>
    </div>
  )
};

export default CatalogList;