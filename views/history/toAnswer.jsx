'use babel';

import React from 'react';

export default class toAnswer extends React.Component {
  render() {
    return (
        <div>
            <h1 className="toAnswer-h1">Ваш ответ: </h1>
            <textarea defaultValue=""></textarea>
            <div className="btns">
                <div className="submitAnswer"><p>Отправить</p></div>
                <div className="closeAnswer"><p>Отменить</p></div>
            </div>
            <hr />
    </div>)
  }
}
