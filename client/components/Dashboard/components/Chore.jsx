import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

class Chore extends React.Component {
  constructor(props) {
    super(props);
    const {
      user,
      index,
    } = this.props;
    this.state = {
      user,
      index,
      editChoreOptions: false,
      choreName: '',
      when: '',
      who: '',
      whoArray: [],
      suppliesNeeded: '',
      suppliesNeededArray: [],
      cost: 0,
      subtasks: '',
      subtasksArray: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.addToList = this.addToList.bind(this);
    this.deleteChore = this.deleteChore.bind(this);
    this.editChore = this.editChore.bind(this);
    this.close = this.close.bind(this);
    this.edit = this.edit.bind(this);
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

  deleteChore() {
    const { user, index } = this.state;
    const { loadData } = this.props;
    $.ajax({
      url: '/deleteChore',
      type: 'delete',
      data: {
        user,
        index,
      },
      success: () => {
        loadData();
      },
    });
  }

  editChore() {
    this.setState({
      editChoreOptions: true,
    });
  }

  close() {
    this.setState({
      editChoreOptions: false,
    });
  }

  edit() {
  }

  render() {
    const {
      name,
      when,
      whoArray,
      suppliesNeededArray,
      cost,
      subtasksArray,
    } = this.props;
    const { editChoreOptions } = this.state;
    let form;
    if (editChoreOptions) {
      form = (
        <div>
          <button type="button" onClick={this.close}>Close</button>
          <br />
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
          <button type="button" onClick={this.edit}>Edit</button>
        </div>
      );
    } else {
      form = <p />;
    }
    return (
      <div>
        <h3>{name}</h3>
        <p>
          When:
          {when}
        </p>
        <h4>People this chore is assigned to:</h4>
        {whoArray.map((item) => {
          return (
            <p key={item.index}>{item.name}</p>
          );
        })}
        <h4>Supplies needed:</h4>
        {suppliesNeededArray.map((item) => {
          return (
            <p key={item.index}>{item.name}</p>
          );
        })}
        <p>
          <b>Cost for these supplies:</b>
          {cost}
        </p>
        <h4>Subtasks:</h4>
        {subtasksArray.map((item) => {
          return (
            <p key={item.index}>{item.name}</p>
          );
        })}
        <button type="button" onClick={this.editChore}>Edit Chore</button>
        <button type="button" onClick={this.deleteChore}>Delete Chore</button>
        {form}
      </div>
    );
  }
}

Chore.propTypes = {
  loadData: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  when: PropTypes.string.isRequired,
  whoArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  suppliesNeededArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  cost: PropTypes.number.isRequired,
  subtasksArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
};

export default Chore;
