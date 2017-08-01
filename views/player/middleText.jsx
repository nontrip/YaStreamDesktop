'use babel';

import React from 'react';

export default class MiddleText extends React.Component {
  render() {
    return (
        <div className="message">
            <p>{this.props.text}</p>
        </div>
    )
  }
}