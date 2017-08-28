'use babel';

import React from 'react'
import TitleBar from '../common/titleBar.jsx'

export default class DonationSettingsMain extends React.Component {
  render() {
    return (
        <div>
            <div className="up-layer">
                <h1>Настройки отображения донатов</h1>
                <p className="return"><span><img src="../images/bitmap.png" width="12" height="10" /></span> Назад</p>
                <div className="hr"></div>
            </div>
            <div className="main">
                <h1>Основные настройки: </h1>
                <div className="color-house">
                    <h2>Цвет фона доната</h2>
                    <input className="color" id="color"/>
                </div>
                <div className="time-house">
                    <h2>Время трансляции доната: </h2>
                    <div className="range">
                        <p>0</p>
                        <input type="range" min="0" max="60" step="1" defaultValue="30" />
                        <p className="max">30 сек.</p>
                    </div>
                </div>
                <div className="pic-house">
                    <h1>Заставка: </h1>
                    <div className="pics">
                        <img src="../images/addPic.png" draggable="false" width="116" height="116"/>
                        <img src="../images/addAudio.png" draggable="false" width="116" height="116"/>
                    </div>
                </div>
                <div className="text-house">
                    <h1>Заголовок шаблона:</h1>
                    <p>Доступные теги: |username|, |amount|, |message|</p>
                    <input className="text" type="text" placeholder="Спасибо, |username|, за |amount|"/>
                </div>
                <div className="additional">
                    <h1>Дополнительно:</h1>
                    <div className="sint">
                        <p>Синтез речи</p>
                        <label className="switch">
                            <input id="donatAuto" type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="buttons">
                <div className="button">Превью</div>
                <div className="button">Сохранить</div>
            </div>
        </div>
    )
  }
}

/*
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

            */