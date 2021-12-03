import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const STYLES = ['btn-primary', 'btn-outline'];

export default class Button extends Component {
  render() {
    const { buttonStyle, children, disabled, hidden, onClick, testid, type } = this.props;

    return (
      <button
        type={ type === undefined ? 'button' : 'submit' }
        className={ `btn ${buttonStyle}` }
        data-testid={ testid }
        onClick={ onClick }
        disabled={ disabled }
        hidden={ hidden }
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  buttonStyle: PropTypes.oneOf(STYLES),
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  testid: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['submit', 'button']),
};

Button.defaultProps = {
  buttonStyle: STYLES[0],
  disabled: false,
  hidden: false,
  type: 'button',
};
