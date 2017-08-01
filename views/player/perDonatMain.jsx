'use babel';

import React from 'react';
import PerDonat from './perDonat.jsx'

export default class PerDonatMain extends React.Component {
  render() {
    return (
    <div>
        <PerDonat donat={this.props.donat}/>
    </div>)
  }
}