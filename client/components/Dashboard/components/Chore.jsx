import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

const deepEquals = (apple, orange) => {
  if (typeof apple !== 'object' && !Array.isArray(apple)) {
    return apple === orange;
  }
  if (Array.isArray(apple)) {
    if (!Array.isArray(orange)) {
      return false;
    }
    if (apple.length !== orange.length) {
      return false;
    }
    for (let i = 0; i < apple.length; i += 1) {
      if (!deepEquals(apple[i], orange[i])) {
        return false;
      }
    }
    return true;
  }
  const appleKeys = Object.keys(apple);
  for (let i = 0; i < appleKeys.length; i += 1) {
    if (!deepEquals(apple[appleKeys[i]], orange[appleKeys[i]])) {
      return false;
    }
  }
  if (Object.keys(apple).length !== Object.keys(orange).length) {
    return false;
  }
  return true;
};

class Chore extends React.Component {
  constructor(props) {
    super(props);
    const {
      user,
      index,
      name,
      when,
      whoArray,
      suppliesNeededArray,
      cost,
      subtasksArray,
    } = this.props;
    this.state = {
      user,
      index,
      editChoreOptions: false,
      choreName: name,
      when,
      who: '',
      whoArray,
      suppliesNeeded: '',
      suppliesNeededArray,
      cost,
      subtasks: '',
      subtasksArray,
      choreNameEdit: name,
      whenEdit: when,
      whoEdit: '',
      whoArrayEdit: whoArray,
      suppliesNeededEdit: '',
      suppliesNeededArrayEdit: suppliesNeededArray,
      costEdit: cost,
      subtasksEdit: '',
      subtasksArrayEdit: subtasksArray,
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
      whoEdit,
      suppliesNeededEdit,
      subtasksEdit,
      whoArrayEdit,
      suppliesNeededArrayEdit,
      subtasksArrayEdit,
    } = state;
    const newArray = state[id];
    if (id === 'whoArrayEdit') {
      if (whoEdit.length !== 0) {
        const whoItem = {
          name: whoEdit,
          index: whoArrayEdit.length,
        };
        newArray.push(whoItem);
      }
      this.setState({
        whoEdit: '',
      });
    }
    if (id === 'suppliesNeededArrayEdit') {
      if (suppliesNeededEdit.length !== 0) {
        const suppliesNeededItem = {
          name: suppliesNeededEdit,
          index: suppliesNeededArrayEdit.length,
        };
        newArray.push(suppliesNeededItem);
      }
      this.setState({
        suppliesNeededEdit: '',
      });
    }
    if (id === 'subtasksArrayEdit') {
      if (subtasksEdit.length !== 0) {
        const subtasksItem = {
          name: subtasksEdit,
          index: subtasksArrayEdit.length,
        };
        newArray.push(subtasksItem);
      }
      this.setState({
        subtasksEdit: '',
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
    const {
      user,
      choreName,
      when,
      whoArray,
      suppliesNeededArray,
      cost,
      subtasksArray,
      choreNameEdit,
      whenEdit,
      whoArrayEdit,
      suppliesNeededArrayEdit,
      costEdit,
      subtasksArrayEdit,
      index,
    } = this.state;
    /**
     * These variables (suppliesNeededArraySend & subtasksArraySend) and
     * if else blocks are here to shorten the length of the lines
     * where suppliesNeededArray and subtasksArray are set in choreData in editData
     */
    let suppliesNeededArraySend;
    if (deepEquals(suppliesNeededArrayEdit, suppliesNeededArray)) {
      suppliesNeededArraySend = suppliesNeededArray;
    } else {
      suppliesNeededArraySend = suppliesNeededArrayEdit;
    }
    let subtasksArraySend;
    if (deepEquals(subtasksArrayEdit, subtasksArray)) {
      subtasksArraySend = subtasksArray;
    } else {
      subtasksArraySend = subtasksArrayEdit;
    }
    const editData = JSON.stringify({
      username: user,
      choreData: {
        choreName: choreNameEdit === choreName ? choreName : choreNameEdit,
        when: whenEdit === when ? when : whenEdit,
        whoArray: deepEquals(whoArrayEdit, whoArray) ? whoArray : whoArrayEdit,
        suppliesNeededArray: suppliesNeededArraySend,
        cost: costEdit === cost ? cost : costEdit,
        subtasksArray: subtasksArraySend,
        index,
      },
    });
    $.ajax({
      url: 'editChore',
      type: 'put',
      data: { editData },
      success: (data) => {
        this.setState({
          choreName: data.choreName,
          cost: data.cost,
          subtasksArray: data.subtasksArray,
          whoArray: data.whoArray,
          when: data.when,
          suppliesNeededArray: data.suppliesNeededArray,
          whoArrayEdit: [],
          suppliesNeededArrayEdit: [],
          subtasksArrayEdit: [],
        });
      },
    });
  }

  render() {
    const {
      choreName,
      when,
      whoArray,
      suppliesNeededArray,
      cost,
      subtasksArray,
      choreNameEdit,
      whenEdit,
      costEdit,
      whoArrayEdit,
      suppliesNeededArrayEdit,
      subtasksArrayEdit,
    } = this.state;
    const { editChoreOptions } = this.state;
    let form;
    if (editChoreOptions) {
      form = (
        <div>
          <button type="button" onClick={this.close}>Close</button>
          <br />
          Chore Name:
          <input onChange={this.handleChange} type="text" id="choreNameEdit" value={choreNameEdit} />
          <br />
          When:
          <input onChange={this.handleChange} type="text" id="whenEdit" value={whenEdit} />
          <br />
          Who:
          <input onChange={this.handleChange} type="text" id="whoEdit" />
          <button type="button" onClick={this.addToList} id="whoArrayEdit">ADD</button>
          {whoArrayEdit.map((item) => {
            return (
              <p key={item.index}>{item.name}</p>
            );
          })}
          <br />
          Supplies Needed:
          <input onChange={this.handleChange} type="text" id="suppliesNeededEdit" />
          <button type="button" onClick={this.addToList} id="suppliesNeededArrayEdit">ADD</button>
          {suppliesNeededArrayEdit.map((item) => {
            return (
              <p key={item.index}>{item.name}</p>
            );
          })}
          <br />
          Cost of Supplies:
          <input onChange={this.handleChange} value={costEdit} type="number" id="costEdit" />
          <br />
          Subtasks:
          <input onChange={this.handleChange} type="text" id="subtasksEdit" />
          <button type="button" onClick={this.addToList} id="subtasksArrayEdit">ADD</button>
          {subtasksArrayEdit.map((item) => {
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
        <h3>{choreName}</h3>
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
