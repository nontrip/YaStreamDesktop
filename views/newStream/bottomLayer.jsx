'use babel';

import React from 'react';

export default class BottomLayer extends React.Component {
  render() {
    return (
    <div className="bottomLayer">
        <h1>Настройка донатов:</h1>
        <h1>Максимальная длина сообщения:</h1>
        <div className="range"><p className="left-p">0</p><input type="range" min="0" max="60" step="1" defaultValue="30" /><p className="right-p">300 cимв.</p></div>
        <div className="range2"><p className="left-p">0</p><input type="range" min="0" max="60" step="1" defaultValue="30" /><p className="right-p">300 cимв.</p></div>
        
        <h1>Минимальная сумма доната:</h1>
        <div className="range"><p className="left-p">0</p><input type="range" min="0" max="60" step="1" defaultValue="30" /><p className="right-p">300 cимв.</p></div>
        <h2>Автоматический режим воспроизведения доната: </h2>
        <label className="switch">
            <input id="donatAuto" type="checkbox" />
            <span className="slider round"></span>
        </label>
        <h2 className="goal_left">Отображение цели: </h2>
        <select id="goal">
            <option>Без цели</option>
        </select>
        <div className="start">
            <p>Поехали!!!</p>
        </div>
    </div>)
  }
}