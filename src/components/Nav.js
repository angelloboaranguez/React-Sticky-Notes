import React, { Component } from 'react';

class Nav extends Component {
  render() {
    const { toggleNote, showNote } = this.props;
    
    return (
      <div className="nav-container">
        <div className="nav-logo">Sticky Notes</div>
        <div className="nav-button" onClick={() => toggleNote()} >
          { showNote ? 'Cancel' :  '+ Add Note' }
        </div> 
      </div>
    );
  }
}

export default Nav;