import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import style from './css/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      welcome: true,
      username: '',
      newUsername: '',
      chores: [],
    };
    this.onStart = this.onStart.bind(this);
    this.onCreateNewUser = this.onCreateNewUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onCreateNewChore = this.onCreateNewChore.bind(this);
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
          const { chores } = JSON.parse(data)[0].chores;
          this.setState({
            chores,
          });
        }
        this.setState({
          welcome: false,
        });
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
        this.setState({
          username: data.username,
          welcome: false,
          chores: [],
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
    const { welcome, username, chores } = this.state;
    if (welcome) {
      return (
        <div>
          <div id={style.welcome}>
            <Welcome
              onStart={this.onStart}
              onCreateNewUser={this.onCreateNewUser}
              handleChange={this.handleChange}
            />
          </div>
        </div>
      );
    }
    return (
      <div>
        <div id={style.dashboard}>
          <Dashboard
            user={username}
            chores={chores}
            onCreateNewChore={this.onCreateNewChore}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('App'));

export default App;
