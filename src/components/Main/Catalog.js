import React, { Component } from 'react';
import CatalogList from './CatalogList';
import { connect } from 'react-redux';
import Details from './Details';

class Catalog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedId: 0
    };

    this.onContactClick = this.onContactClick.bind(this);
  }

  onContactClick(selectedId) {
    this.setState({ selectedId });
  }

  render() {
    const { contacts } = this.props;

    return (
      <div id="book" className="box-large">
        <CatalogList
          contacts={contacts}
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
    contacts: state.contacts,
    loading: state.contacts.loading
  };
}

export default connect(mapStateToProps)(Catalog);