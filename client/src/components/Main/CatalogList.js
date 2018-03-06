import React from 'react';
import Contact from './Contact';
import { Link, withRouter } from 'react-router-dom';

const CatalogList = ({ contacts, pages,  selectedId, clickHandler }) => {

  const { prevPage, nextPage, hasPrevPage, hasNextPage } = pages;

  return (
    <div id="list">
      <h1>Contacts</h1>
      <div className="content">
        {contacts.map((c, i) =>
          <Contact
            key={i}
            firstName={c.firstName}
            lastName={c.lastName}
            image={c.image}
            selected={c._id === selectedId}
            onClick={() => clickHandler(c._id)}
          />
        )}
        {hasPrevPage && <Link className="pagination" to={{ pathname: '/catalog', query: { page: prevPage } }}>&laquo;</Link>}
        {hasNextPage && <Link className="pagination" to={{ pathname: '/catalog', query: { page: nextPage } }} >&raquo;</Link>}
      </div>
    </div>
  )
};

export default withRouter(CatalogList);