'use babel';

import React from 'react'
import Goal from './goal.jsx'

export default class GoalsMenu extends React.Component {
  render() {
        let goals = this.props.goals
        let goalsList = goals.map(function(goal, index){
            return <Goal key={index} goalInfo={goal} />
        })
    return (
        <div>
            <h1 className="header">Цели по сборам: </h1>
            <div className="goals">
                {goalsList}
            </div>
            <div className="btns">
                <p className="return"><span><img src="../images/bitmap.png" width="12" height="10" /></span> Назад</p>
                <h1 className="add">+ Добавить</h1>
            </div>
        </div>
    )
  }
}
