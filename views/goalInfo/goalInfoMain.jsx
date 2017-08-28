'use babel';

import React from 'react'
import ProgressBar from './progressBar.jsx'

export default class NewGoalMain extends React.Component {
  render() {
    return (
        <div>
            <div className="header">
                <div className="header-text">
                     <p className="return"><span><img src="../images/bitmap.png" width="12" height="10" /></span> Назад</p>
                    <h1>{this.props.goalInfo.naming}</h1>
                </div>
                <hr />
            </div>
            <div className="info">
                <h1>Информация о цели: </h1>
                <h2 className="spec">Цель была создана <span className="gold">{this.props.goalInfo.date}</span> для сбора <span className="gold">{this.props.goalInfo.amount} руб.</span></h2>
                <h1>Текущее состояние цели: </h1>
                <h2>Статус цели: <span className="gold">{this.props.goalInfo.status}</span></h2>
            </div>
            <ProgressBar progress={this.props.goalInfo.progress} amount={this.props.goalInfo.amount}/>
        </div>
    )
  }
}
//<div className="button start"><p>Возобновить сбор</p></div>