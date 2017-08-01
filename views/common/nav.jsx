'use babel';

import React from 'react';

export default class Nav extends React.Component {
  render() {
    return (
    <div className="ul-house">
        <ul>
            <li className="active"><p>{this.props.first}</p></li><li><p>{this.props.second}</p></li>
        </ul>
    </div>)
  }
}
