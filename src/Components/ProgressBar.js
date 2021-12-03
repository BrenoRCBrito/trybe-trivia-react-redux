import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 20,
    width: '100%',
    borderRadius: 50,
    border: '1px solid #242424',
  };

  const totalTime = 30;
  const toPercent = 100;
  const fillerStyles = {
    height: '100%',
    width: `${(completed / totalTime) * toPercent}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    border: `1px solid ${bgcolor}`,
    textAlign: 'right',
    display: completed > 0 ? 'block' : 'none',
    transition: 'width 0.2s ease-in-out',
  };

  return (
    <div style={ containerStyles }>
      <div style={ fillerStyles } />
    </div>
  );
};

ProgressBar.propTypes = {
  bgcolor: PropTypes.string.isRequired,
  completed: PropTypes.number.isRequired,
};

export default ProgressBar;
