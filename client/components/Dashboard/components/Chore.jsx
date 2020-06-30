import React from 'react';
import PropTypes from 'prop-types';

class Chore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
      </div>
    );
  }
}

Chore.propTypes = {
  name: PropTypes.string.isRequired,
  when: PropTypes.string.isRequired,
  whoArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  suppliesNeededArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  cost: PropTypes.number.isRequired,
  subtasksArray: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Chore;
