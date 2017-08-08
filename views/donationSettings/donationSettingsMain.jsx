'use babel';

import React from 'react'
import TitleBar from '../common/titleBar.jsx'

export default class DonationSettingsMain extends React.Component {
  render() {
    return (
        <div>
            <TitleBar windowName="Настройки отображение доната"/>
            <div className="up">
                <h1>Основные: </h1>
                <hr />
            </div>
            <div className="color-picker">
                <h1>Цвет фона:</h1>
                <div className="cp-house">
                    <input id="color-picker" readOnly type="text"/>
                </div>
            </div>
            <div className="range"><p className="left-p">Продолжительность оповещения: </p><input type="range" min="0" max="60" step="1" defaultValue="30" /><p id="inputHeight" className="input-height">30</p><p className="p-right"> сек.</p></div>
            <div className="image">
                <h1>Изображение: </h1>
                <input type="file"/>
            </div>
            <div className="text">
                <h1>Шаблон заголовка: </h1>
                <input type="text" placeholder="Спасибо, |username|, за |amount|"/>
                <p>Доступные теги: |username|, |amount|, |message|</p>
            </div>
            <div className="sound">
                <h1>Звук: </h1>
                <input type="file"/>
            </div>
            <div className="up plus">
                <h1>Дополнительно: </h1>
                <hr />
            </div>
            <div className="bottom">
                <h1>Cинтез речи: </h1>
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                </label>
            </div>
            <div className="btn-save">
                <p>Сохранить</p>
            </div>
        </div>
    )
  }
}