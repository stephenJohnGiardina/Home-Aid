import React from 'react';
import PropTypes from 'prop-types';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { username } = this.state;
    const { handleChange, onStart, onCreateNewUser } = this.props;
    return (
      <div>
        <h1>WELCOME TO DOMESTIC MANAGER</h1>
        <h4>Please enter your username and press start to get started.</h4>
        <input
          type="text"
          id="username"
          value={username}
          placeholder="Your Username Here"
          onChange={handleChange}
        />
        <button type="button" onClick={onStart}>Start</button>
        <h4>Don&apost have a username? Create one by entering in a new username here.</h4>
        <input
          type="text"
          id="newUsername"
          value={username}
          placeholder="New Username"
          onChange={handleChange}
        />
        <button type="button" onClick={onCreateNewUser}>Create New Username</button>
      </div>
    );
  }
}

Welcome.propTypes = {
  handleChange: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
  onCreateNewUser: PropTypes.func.isRequired,
};

export default Welcome;
