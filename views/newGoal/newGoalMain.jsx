'use babel';

import React from 'react'

export default class NewGoalMain extends React.Component {
  render() {
    return (
        <div>
            <div className="header">
                <div className="header-text">
                    <p className="return"><span><img src="../images/bitmap.png" width="12" height="10" /></span> Назад</p>
                    <h1>Новая цель</h1>
                </div>
                <hr />
            </div>
            <div className="inputs">
                    <input type="text" placeholder="Название цели"/>
                    <input type="text" placeholder="Собираемая сумма"/>
            </div>
            <div className="btn">
                <p>Создать</p>
            </div>
        </div>
    )
  }
}
