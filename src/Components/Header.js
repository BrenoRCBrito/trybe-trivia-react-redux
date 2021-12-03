import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';
import './Header.css';

class Header extends Component {
  componentDidMount() {
    const { gravatarEmail } = this.props;
    const url = `https://www.gravatar.com/avatar/${MD5(gravatarEmail).toString()}`;
    sessionStorage.setItem('picture', url);
  }

  render() {
    const { name, gravatarEmail, score } = this.props;
    const url = `https://www.gravatar.com/avatar/${MD5(gravatarEmail).toString()}`;
    return (
      <header className="header">
        <img
          className="profile-img"
          data-testid="header-profile-picture"
          src={ url }
          alt={ name }
        />
        <h2 data-testid="header-player-name">
          { name }
        </h2>
        <h3 data-testid="header-score">{ `Score: ${score}` }</h3>
      </header>
    );
  }
}

const mapStateToProp = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProp)(Header);
