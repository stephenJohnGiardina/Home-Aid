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
    };
    this.deleteChore = this.deleteChore.bind(this);
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

  render() {
    const {
      name,
      when,
      whoArray,
      suppliesNeededArray,
      cost,
      subtasksArray,
    } = this.props;
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
        <button type="button" onClick={this.deleteChore}>Delete Chore</button>
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
