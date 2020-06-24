import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import style from '../css/Dashboard.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    const { chores, user } = this.props;
    this.state = {
      chores,
      user,
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
    const { id } = event.target;
    const { state } = this;
    const {
      who,
      suppliesNeeded,
      subtasks,
      whoArray,
      suppliesNeededArray,
      subtasksArray,
    } = state;
    const { newArray } = state[id];
    if (event.target.id === 'whoArray') {
      if (who.length !== 0) {
        const whoItem = {
          name: who,
          index: whoArray.length,
        };
        newArray.push(whoItem);
      }
      this.setState({
        who: '',
      });
    }
    if (event.target.id === 'suppliesNeededArray') {
      if (suppliesNeeded.length !== 0) {
        const suppliesNeededItem = {
          name: suppliesNeeded,
          index: suppliesNeededArray.length,
        };
        newArray.push(suppliesNeededItem);
      }
      this.setState({
        suppliesNeeded: '',
      });
    }
    if (event.target.id === 'subtasksArray') {
      if (subtasks.length !== 0) {
        const subtasksItem = {
          name: subtasks,
          index: subtasksArray.length,
        };
        newArray.push(subtasksItem);
      }
      this.setState({
        subtasks: '',
      });
    }
    this.setState({
      [event.target.id]: newArray,
    });
  }

  makeNewChore() {
    const { makeNewChore } = this.state;
    this.setState({
      makeNewChore: !makeNewChore,
      whoArray: [],
      suppliesNeededArray: [],
      subtasksArray: [],
    });
  }

  createNewChore() {
    const { user } = this.state;
    $.ajax({
      url: '/newChore',
      type: 'POST',
      data: {
        data: JSON.stringify(this.state),
        user,
      },
      success: (data) => {
        this.setState({
          chores: data.chores,
          makeNewChore: false,
          whoArray: [],
          suppliesNeededArray: [],
          subtasksArray: [],
        });
      },
    });
  }

  render() {
    const { user } = this.props;
    let form;
    const {
      chores,
      makeNewChore,
      whoArray,
      suppliesNeededArray,
      subtasksArray,
    } = this.state;
    if (makeNewChore) {
      form = (
        <div>
          Chore Name:
          <input onChange={this.handleChange} type="text" id="choreName" />
          <br />
          When:
          <input onChange={this.handleChange} type="text" id="when" />
          <br />
          Who:
          <input onChange={this.handleChange} type="text" id="who" />
          <button type="button" onClick={this.addToList} id="whoArray">ADD</button>
          {whoArray.map((item) => {
            return (
              <p key={item.index}>{item.name}</p>
            );
          })}
          <br />
          Supplies Needed:
          <input onChange={this.handleChange} type="text" id="suppliesNeeded" />
          <button type="button" onClick={this.addToList} id="suppliesNeededArray">ADD</button>
          {suppliesNeededArray.map((item) => {
            return (
              <p key={item.index}>{item.name}</p>
            );
          })}
          <br />
          Cost of Supplies:
          <input onChange={this.handleChange} type="text" id="cost" />
          <br />
          Subtasks:
          <input onChange={this.handleChange} type="text" id="subtasks" />
          <button type="button" onClick={this.addToList} id="subtasksArray">ADD</button>
          {subtasksArray.map((item) => {
            return (
              <p key={item.index}>{item.name}</p>
            );
          })}
          <br />
          <button type="button" onClick={this.createNewChore}>Create new chore</button>
        </div>
      );
    } else {
      form = <p />;
    }
    return (
      <div>
        <h1>
          Welcome
          {user}
          !
        </h1>
        <h2>Create a new chore</h2>
        <button type="button" onClick={this.makeNewChore}>Make a new chore</button>
        {form}
        <h2>Your chores:</h2>
        {chores.map((chore) => {
          return (
            <div className={style.choreItem} key={chore.index}>
              <h3>{chore.choreName}</h3>
              <p>
                When:
                {chore.when}
              </p>
              <h4>People this chore is assigned to:</h4>
              {chore.whoArray.map((item) => {
                return (
                  <p key={item.index}>{item.name}</p>
                );
              })}
              <h4>Supplies needed:</h4>
              {chore.suppliesNeededArray.map((item) => {
                return (
                  <p key={item.index}>{item.name}</p>
                );
              })}
              <p>
                <b>Cost for these supplies:</b>
                {chore.cost}
              </p>
              <h4>Subtasks:</h4>
              {chore.subtasksArray.map((item) => {
                return (
                  <p key={item.index}>{item.name}</p>
                );
              })}
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}

Dashboard.propTypes = {
  chores: PropTypes.arrayOf(PropTypes.any).isRequired,
  user: PropTypes.string.isRequired,
};

export default Dashboard;
