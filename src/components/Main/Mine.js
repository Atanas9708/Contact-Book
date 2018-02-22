import React, { Component } from 'react';
import CatalogList from './CatalogList';
import Details from './Details';
import { connect } from 'react-redux';

class Mine extends Component {
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
    const creator = localStorage.getItem('creator');
    let contacts = this.props.contacts.filter(c => c['creator'] === creator);
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
    contacts: state.contacts
  };
}

export default connect(mapStateToProps)(Mine);