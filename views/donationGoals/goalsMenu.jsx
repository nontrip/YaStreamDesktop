'use babel';

import React from 'react'
import Goal from './goal.jsx'

export default class GoalsMenu extends React.Component {
  render() {
        let goals = this.props.goals
        let goalsList = goals.map(function(goal, index){
            return <Goal goalInfo={goal} />
        })
    return (
        <div>
            <h1 className="header">Цели по сборам: </h1>
            <div className="goals">
                {goalsList}
            </div>
            <div className="btns">
                <h1 className="add">+ Добавить</h1>
            </div>
        </div>
    )
  }
}
