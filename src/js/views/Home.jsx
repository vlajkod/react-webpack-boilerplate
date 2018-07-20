import React, { Component } from 'react';

import ReactIconSvg from 'svg/react-icon.svg';

export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <div>
                    <h1>React, Redux, Redux Saga</h1>
                </div>
                <div>
                    <ReactIconSvg />
                </div>
            </div>
        );
    }
}