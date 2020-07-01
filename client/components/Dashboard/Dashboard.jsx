import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import Chore from './components/Chore';
import style from '../../css/components/Dashboard/Dashboard.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      chores: [],
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
    this.loadData = this.loadData.bind(this);
    this.createNewChore = this.createNewChore.bind(this);
    this.makeNewChore = this.makeNewChore.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addToList = this.addToList.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const { user } = this.state;
    $.ajax({
      url: '/login',
      type: 'GET',
      data: {
        user,
      },
      dataType: 'json',
      success: (data) => {
        if (data.length !== 0) {
          const { chores } = data[0];
          this.setState({
            chores,
          });
        }
      },
    });
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
    const newArray = state[id];
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
      choreName: '',
      when: '',
      whoArray: [],
      suppliesNeededArray: [],
      cost: 0,
      subtasksArray: [],
    });
  }

  createNewChore() {
    const {
      chores,
      user,
      choreName,
      when,
      whoArray,
      suppliesNeededArray,
      cost,
      subtasksArray,
    } = this.state;
    const choreData = {
      choreName,
      when,
      whoArray,
      suppliesNeededArray,
      cost,
      subtasksArray,
      index: chores.length,
    };
    const post = JSON.stringify({
      chores,
      choreData,
      user,
    });
    $.ajax({
      url: '/newChore',
      type: 'POST',
      data: {
        post,
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
      cost,
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
          <input onChange={this.handleChange} value={cost} type="number" id="cost" />
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
    let choreCount = 0;
    return (
      <div id={style.dashboard}>
        <h1>
          {`Welcome ${user}!`}
        </h1>
        <h2>Create a new chore</h2>
        <button type="button" onClick={this.makeNewChore}>Make a new chore</button>
        {form}
        <h2>Your chores:</h2>
        {chores.map((chore) => {
          let hr = <hr />;
          if (choreCount === chores.length - 1) {
            hr = <p />;
          }
          const result = (
            <div className={style.choreItem} key={chore.index}>
              <Chore
                name={chore.choreName}
                when={chore.when}
                whoArray={chore.whoArray}
                suppliesNeededArray={chore.suppliesNeededArray}
                cost={chore.cost}
                subtasksArray={chore.subtasksArray}
              />
              {hr}
            </div>
          );
          choreCount += 1;
          return result;
        })}
      </div>
    );
  }
}

Dashboard.propTypes = {
  user: PropTypes.string.isRequired,
};

export default Dashboard;
