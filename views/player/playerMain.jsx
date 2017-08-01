'use babel';

import React from 'react';
import FullPlayer from './fullPlayer.jsx'
import PerDonatMain from './perDonatMain.jsx'

export default class playerMain extends React.Component {
  render() {
      let toRender = this.props.full ? <FullPlayer donats={this.props.donats}/> : <PerDonatMain donat={this.props.donat}/>
      if (!this.props.donats){
        toRender = <div className="noDon">
          <h1>Нет пожертвований</h1>
        </div>
      }
    return (
    <div>
        {toRender}
    </div>)
  }
}