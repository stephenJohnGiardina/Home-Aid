import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Banner from './components/Banner';
import Welcome from './components/Welcome/Welcome';
import Dashboard from './components/Dashboard/Dashboard';
import style from './css/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      newUsername: '',
      deleteAccountName: '',
      success: false,
      failure: false,
      accountDeleted: false,
    };
    this.onCreateNewUser = this.onCreateNewUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDeleteAccount = this.onDeleteAccount.bind(this);
  }

  onCreateNewUser() {
    /**
     * This methos is passed into and used by the Welcome component.
     * This method takes the username in the state and send a request to the server.
     * The server will then uses that username to create an account. If the server
     * successfully creates the account then this method will display a message saying
     * the account was created. If the server cannot make an account becauase an account
     * with that name already exists for example, a message will be displayed saying the
     * account could not be created because an account with that username already exists.
     */
    const { newUsername } = this.state;
    $.ajax({
      url: '/newUser',
      type: 'POST',
      data: {
        newUsername,
      },
      success: (data) => {
        if (data === true) {
          this.setState({
            failure: true,
          });
        } else if (typeof data === 'object') {
          this.setState({
            success: true,
          });
        }
        this.setState({
          username: data.username,
          chores: [],
        });
      },
    });
  }

  onDeleteAccount() {
    /**
     * This method is passed into and used by the Welcome component.
     * This method takes the username in the state and sends a request to the server.
     * The server checks a database to see if an account exists under that username.
     * If an account exists, that account is deleted and a message saying that the
     * account was deleted is displayed to the user.
     */
    const { deleteAccountName } = this.state;
    $.ajax({
      url: '/deleteAccount',
      type: 'DELETE',
      data: {
        deleteAccountName,
      },
      success: () => {
        this.setState({
          accountDeleted: true,
        });
      },
    });
  }

  handleChange(event) {
    /**
     * This is a simple method used by the input tags of the app. This method ensures
     * that the state is updated on the change event of the input tags.
     */
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  render() {
    const {
      username, success, failure, accountDeleted,
    } = this.state;
    return (
      <Router>
        <div id={style.app}>
          <Banner />
          <Route
            exact
            path="/"
            render={() => {
              return (
                <div>
                  <Welcome
                    onCreateNewUser={this.onCreateNewUser}
                    onDeleteAccount={this.onDeleteAccount}
                    handleChange={this.handleChange}
                    success={success}
                    failure={failure}
                    accountDeleted={accountDeleted}
                  />
                </div>
              );
            }}
          />
          <Route
            exact
            path="/dashboard"
            render={() => {
              return (
                <div>
                  <Dashboard
                    user={username}
                  />
                </div>
              );
            }}
          />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('App'));

export default App;
