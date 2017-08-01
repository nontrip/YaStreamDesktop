'use babel';

import React from 'react'

export default class ParametersBar extends React.Component {
  render() {
    return (
        <div className="parametersBar">
            <ul className="ul-left-bottom">
                <li>
                    <p>Отображать заголовок?</p>
                    <select id="showHeading">
                        <option value="block">Да</option>
                        <option value="none">Нет</option>
                    </select>
                </li>
                <li>
                    <p>Отображать собранную сумму?</p>
                    <select id="showAmount">
                        <option value="block">Да</option>
                        <option value="none">Нет</option>
                    </select>
                </li>
                <li>
                    <p>Отображать границы сбора?</p>
                    <select id="showLimits">
                        <option value="flex">Да</option>
                        <option value="none">Нет</option>
                    </select>
                </li>
            </ul>
            <ul className="ul-right-bottom">
                <li>
                    <p>Стиль текста внутри индикатора:</p>
                    <a href="#">A Стилизовать шрифт</a>
                </li>
                <li>
                    <p>Стиль текста снаружи индикатора:</p>
                    <a href="#">A Стилизовать шрифт</a>
                </li>
            </ul>
        </div>
    )
  }
}
