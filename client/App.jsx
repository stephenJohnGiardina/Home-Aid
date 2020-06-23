import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Welcome from './components/Welcome.jsx';
import Dashboard from './components/Dashboard.jsx';
import style from './css/App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      welcome: true,
      username: '',
      newUsername: '',
      newChoreName: '',
      chores: [],
    };
    this.onStart = this.onStart.bind(this);
    this.onCreateNewUser = this.onCreateNewUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onCreateNewChore = this.onCreateNewChore.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  onStart() {
    $.ajax({
      url: '/login',
      type: 'GET',
      data: {
        username: this.state.username
      },
      success: (data) => {
        if (JSON.parse(data).length !== 0) {
          let chores = JSON.parse(data)[0].chores
          this.setState({
            chores: chores
          })
        }
        this.setState({
          welcome: false,
        })
      }
    })
  }

  onCreateNewUser() {
    $.ajax({
      url: '/newUser',
      type: 'POST',
      data: {
        newUsername: this.state.newUsername
      },
      success: (data) => {
        console.log(data)
        this.setState({
          username: data.username,
          welcome: false,
          chores: []
        });
      }
    })
  }

  onCreateNewChore() {
    $.ajax({
      url: '/newChore',
      type: 'POST',
      data: {
        username: this.state.username,
        choreName: this.state.choreName
      },
      success: (data) => {
      }
    })
  }

  render() {
    if (this.state.welcome) {
      return (
        <div>
          <div id={style['welcome']}>
            <Welcome
              onStart={this.onStart}
              onCreateNewUser={this.onCreateNewUser}
              handleChange={this.handleChange}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div id={style['dashboard']}>
            <Dashboard
              user={this.state.username}
              chores={this.state.chores}
              onCreateNewChore={this.onCreateNewChore}
            />
          </div>
        </div>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('App'));

export default App;
