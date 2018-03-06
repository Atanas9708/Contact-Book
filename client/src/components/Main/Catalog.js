import React, { Component } from 'react';
import CatalogList from './CatalogList';
import { connect } from 'react-redux';
import { fetchContactsAction } from './../../actions/contactAction';
import Details from './Details';

class Catalog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedId: 0,
      page: 1,
      pages: false
    };

    this.onContactClick = this.onContactClick.bind(this);
  }

  componentWillMount() {
    if (this.props.location.query) {
      this.setState({ page: this.props.location.query.page });
    }
    this.props.fetchContacts(this.state.page);
  }

  onContactClick(selectedId) {
    this.setState({ selectedId });
  }

  componentWillReceiveProps(nextProps) {
    let { page } = this.state;
    this.setState({ pages: nextProps.pages });
    if (nextProps.location.query && nextProps.location.query.page !== page) {
      this.setState({ page: nextProps.location.query.page });
      nextProps.fetchContacts(nextProps.location.query.page);
    }
  }

  render() {
    const { contacts, pages } = this.props;

    return (
      <div id="book" className="box-large">
        <CatalogList
          contacts={contacts}
          pages={pages}
          clickHandler={this.onContactClick}
          selectedId={this.state.selectedId}
        />

        <Details user={contacts.filter(u => u._id === this.state.selectedId)[0] || contacts[0]} />

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    contacts: state.contacts.contacts,
    success: state.contacts.success,
    pages: state.contacts.pages,
    loading: state.contacts.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchContacts: (page) => dispatch(fetchContactsAction(page))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);