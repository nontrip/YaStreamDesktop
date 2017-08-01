'use babel';

import React from 'react';

export default class TitleBar extends React.Component {
  render() {
    return (
    <div className="titleBar">
        <p className="draggable">{this.props.windowName}</p>
    </div>)
  }
}
