import React from 'react';
import style from '../css/Dashboard.css';
import $ from 'jquery';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chores: this.props.chores,
      user: this.props.user,
      makeNewChore: false,
      choreName: '',
      when: '',
      whoseTurn: '',
      who: '',
      whoArray: [],
      suppliesNeeded: '',
      suppliesNeededArray: [],
      cost: 0,
      subtasks: '',
      subtasksArray: [],
    };
    this.createNewChore = this.createNewChore.bind(this);
    this.makeNewChore = this.makeNewChore.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addToList = this.addToList.bind(this);
  }

  componentDidMount() {
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  addToList(event) {
    let newArray = this.state[event.target.id];
    if (event.target.id === 'whoArray') {
      if (this.state.who.length !== 0) {newArray.push(this.state.who)}
      this.setState({
        who: ''
      });
    }
    if (event.target.id === 'suppliesNeededArray') {
      if (this.state.suppliesNeeded.length !== 0) {newArray.push(this.state.suppliesNeeded)}
      this.setState({
        suppliesNeeded: ''
      });
    }
    if (event.target.id === 'subtasksArray') {
      if (this.state.subtasks.length !== 0) {newArray.push(this.state.subtasks)}
      this.setState({
        subtasks: ''
      });
    }
    this.setState({
      [event.target.id]: newArray
    })
  }

  makeNewChore() {
    this.setState({
      makeNewChore: !this.state.makeNewChore,
      whoArray: [],
      suppliesNeededArray: [],
      subtasksArray: [],
    });
  }

  createNewChore() {
    $.ajax({
      url: '/newChore',
      type: 'POST',
      data: {
        data: JSON.stringify(this.state),
        user: this.props.user
      },
      success: (data) => {
      console.log(data.chores);
      this.setState({
        chores: data.chores,
        makeNewChore: false,
        whoArray: [],
        suppliesNeededArray: [],
        subtasksArray: [],
      });
      }
    })
  }

  render() {
    let form;
    if (this.state.makeNewChore) {
      form = (
        <div>
          Chore Name:
          <input onChange={this.handleChange} type="text" id="choreName"></input>
          <br></br>
          When:
          <input onChange={this.handleChange} type="text" id="when"></input>
          <br></br>
          Who:
          <input onChange={this.handleChange} type="text" id="who"></input><button onClick={this.addToList} id="whoArray">ADD</button>
          {this.state.whoArray.map((item, key) => {
            return (
              <p key={key}>{item}</p>
            );
          })}
          <br></br>
          Supplies Needed:
          <input onChange={this.handleChange} type="text" id="suppliesNeeded"></input><button onClick={this.addToList} id="suppliesNeededArray">ADD</button>
          {this.state.suppliesNeededArray.map((item, key) => {
            return (
              <p key={key}>{item}</p>
            );
          })}
          <br></br>
          Cost of Supplies:
          <input onChange={this.handleChange} type="text" id="cost"></input>
          <br></br>
          Subtasks:
          <input onChange={this.handleChange} type="text" id="subtasks"></input><button onClick={this.addToList} id="subtasksArray">ADD</button>
          {this.state.subtasksArray.map((item, key) => {
            return (
              <p key={key}>{item}</p>
            );
          })}
          <br></br>
          <button onClick={this.createNewChore}>Create new chore</button>
        </div>
      )
    } else {
      form = <p></p>
    }
    return (
      <div>
        <h1>Welcome {this.props.user}!</h1>
        <h2>Create a new chore</h2>
        <button onClick={this.makeNewChore}>Make a new chore</button>
        {form}
        <h2>Your chores:</h2>
        {this.state.chores.map((item, key) => {
          return (
            <div className={style['chore']} key={key}>
              <h3>{item.choreName}</h3>
              <p>When: {item.when}</p>
              <h4>People this chore is assigned to:</h4>
              {item.whoArray.map((item, key) => {
                return (
                <p key={key}>{item}</p>
                );
              })}
              <h4>Supplies needed:</h4>
              {item.suppliesNeededArray.map((item, key) => {
                return (
                <p key={key}>{item}</p>
                );
              })}
              <p><b>Cost for these supplies:</b> {item.cost}</p>
              <h4>Subtasks:</h4>
              {item.subtasksArray.map((item, key) => {
                return (
                <p key={key}>{item}</p>
                );
              })}
              <hr></hr>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Dashboard;
