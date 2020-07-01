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
    const {
      handleChange, onCreateNewUser, onDeleteAccount, success, failure, accountDeleted,
    } = this.props;
    let successMessage;
    let failureMessage;
    let accountDeletedMessage;
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
    if (accountDeleted) {
      accountDeletedMessage = <p>Your account no longer exists.</p>;
    } else if (!accountDeleted) {
      accountDeletedMessage = <p />;
    }
    return (
      <div id={style.welcome}>
        <h4>Please enter your username and press start to get started.</h4>
        <input
          type="text"
          id="username"
          placeholder="Your Username Here"
          onChange={handleChange}
        />
        <Link to="/dashboard">
          <button type="button">Log In</button>
        </Link>
        <br />
        <br />
        <h4>Don&apos;t have a username? Create one by entering in a new username here.</h4>
        <input
          type="text"
          id="newUsername"
          placeholder="New Username"
          onChange={handleChange}
        />
        <button type="button" onClick={onCreateNewUser}>Create New Account</button>
        {successMessage}
        {failureMessage}
        <br />
        <h4>Want to delete your account? Type in your username here and press enter.</h4>
        <h3>
          WARNING: DOING THIS WILL PERMANENTLY DELETE YOUR ACCOUNT AND
          ALL DATA ASSOCIATED WITH YOUR ACCOUNT
        </h3>
        <input
          type="text"
          id="deleteAccountName"
          placeholder="ACCOUNT NAME"
          onChange={handleChange}
        />
        <button type="button" onClick={onDeleteAccount}>DELETE</button>
        {accountDeletedMessage}
      </div>
    );
  }
}

Welcome.propTypes = {
  handleChange: PropTypes.func.isRequired,
  onCreateNewUser: PropTypes.func.isRequired,
  onDeleteAccount: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
  failure: PropTypes.bool.isRequired,
  accountDeleted: PropTypes.bool.isRequired,
};

export default Welcome;
