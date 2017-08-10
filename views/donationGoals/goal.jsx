'use babel';

import React from 'react'

export default class Goal extends React.Component {
  render() {
    let classes = this.props.goalInfo.status + ' ' + this.props.goalInfo.start_date.split('T')[0]
    classes = classes.replace('-', '.').replace('-', '.')
    return (
        <div className="goal">
          <div className={classes}>
            <h2>{this.props.goalInfo.name}</h2>
            <p>{this.props.goalInfo.progress/100} руб./ {this.props.goalInfo.amount/100} руб. <i><img src="../images/closeActive.png" width="15" height="15"/></i></p>
          </div>  
        </div>
    )
  }
}
