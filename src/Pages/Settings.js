import React, { Component } from 'react';

class Settings extends Component {
  render() {
    const styles = {
      textAlign: 'center',
      color: '#242424',
      marginTop: 48,
      fontWeight: 500,
    };

    return (
      <h1
        style={ styles }
        data-testid="settings-title"
      >
        Configurations
      </h1>
    );
  }
}

export default Settings;
