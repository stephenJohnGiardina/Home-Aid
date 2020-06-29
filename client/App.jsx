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
      chores: [],
      success: false,
      failure: false,
      accountDeleted: false,
    };
    this.onStart = this.onStart.bind(this);
    this.onCreateNewUser = this.onCreateNewUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onCreateNewChore = this.onCreateNewChore.bind(this);
    this.onDeleteAccount = this.onDeleteAccount.bind(this);
  }

  onStart() {
    const { username } = this.state;
    $.ajax({
      url: '/login',
      type: 'GET',
      data: {
        username,
      },
      success: (data) => {
        if (JSON.parse(data).length !== 0) {
          const { chores } = JSON.parse(data)[0];
          this.setState({
            chores,
          });
        }
      },
    });
  }

  onCreateNewUser() {
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

  onCreateNewChore() {
    const { username, choreName } = this.state;
    $.ajax({
      url: '/newChore',
      type: 'POST',
      data: {
        username,
        choreName,
      },
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  render() {
    const {
      username, chores, success, failure, accountDeleted,
    } = this.state;
    return (
      <div id={style.app}>
        <Banner />
        <Router>
          <Route
            exact
            path="/"
            render={() => {
              return (
                <div>
                  <Welcome
                    onStart={this.onStart}
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
                    chores={chores}
                    onCreateNewChore={this.onCreateNewChore}
                  />
                </div>
              );
            }}
          />
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('App'));

export default App;
