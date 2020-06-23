import React from 'react';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }



  render() {
    return (
      <div>
        <h1>WELCOME TO DOMESTIC MANAGER</h1>
        <h4>Please enter your username and press start to get started.</h4>
        <input
          type="text"
          id="username"
          value={this.state.username}
          placeholder="Your Username Here"
          onChange={this.props.handleChange}
        />
        <button onClick={this.props.onStart}>Start</button>
        <h4>Don't have a username? Create one by entering in a new username here.</h4>
        <input
          type="text"
          id="newUsername"
          value={this.state.username}
          placeholder="New Username"
          onChange={this.props.handleChange}
        />
        <button onClick={this.props.onCreateNewUser}>Create New Username</button>
      </div>
    );
  }
}

export default Welcome;