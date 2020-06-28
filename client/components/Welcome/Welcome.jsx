import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from '../../css/components/Welcome/Welcome.css';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { username } = this.state;
    const {
      handleChange, onStart, onCreateNewUser, success, failure,
    } = this.props;
    let successMessage;
    let failureMessage;
    if (success) {
      successMessage = (<p>Account Creation Successful Please Log In</p>);
    } else if (!success) {
      successMessage = <p />;
    }
    if (failure) {
      failureMessage = (<p>Account Already Exists Pick a New Username</p>);
      successMessage = <p />;
    } else if (!failure) {
      failureMessage = <p />;
    }
    return (
      <div id={style.welcome}>
        <h4>Please enter your username and press start to get started.</h4>
        <input
          type="text"
          id="username"
          value={username}
          placeholder="Your Username Here"
          onChange={handleChange}
        />
        <Link to="/dashboard">
          <button type="button" onClick={onStart}>Start</button>
        </Link>
        <h4>Don&apos;t have a username? Create one by entering in a new username here.</h4>
        <input
          type="text"
          id="newUsername"
          value={username}
          placeholder="New Username"
          onChange={handleChange}
        />
        <button type="button" onClick={onCreateNewUser}>Create New Account</button>
        {successMessage}
        {failureMessage}
      </div>
    );
  }
}

Welcome.propTypes = {
  handleChange: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
  onCreateNewUser: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
  failure: PropTypes.bool.isRequired,
};

export default Welcome;
