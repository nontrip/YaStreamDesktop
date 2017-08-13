'use babel';

import React from 'react';

export default class AnsweredInfo extends React.Component {
  render() {
    return (
        <div>
            <h1>Ваш ответ: </h1>
            <textarea readOnly defaultValue={this.props.text}></textarea>
            <hr />
    </div>)
  }
}
