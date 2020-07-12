import 'rc-progress/assets/index.css';
import React, { Component } from 'react';
import { Line, Circle } from 'rc-progress';

export class ProgressBar extends Component {
    constructor() {
        super();
        this.state = {
            percent: 30,
            color: '#3FC7FA',
        };
        this.changeState = this.changeState.bind(this);
    }

    changeState() {
        const colorMap = ['#3FC7FA', '#85D262', '#FE8C6A'];
        const value = parseInt(100, 10);
        this.setState({
            percent: value,
            color: colorMap[parseInt(3, 10)],
        });
    }

    render() {
        const { percent, color } = this.state;
        const containerStyle = {
            width: '250px',
            display:'inline-block'
        };
        return (
            <div style={{display:'inline'}}>
                <div style={containerStyle}>
                    <Line percent={percent} strokeWidth="4" strokeColor={color} />
                </div>
                <h3 style={{display:'inline'}}>{percent}%</h3>&nbsp;&nbsp;
                <h3 style={{display:'inline'}}>(30 / 100)</h3>
                {/*<p>*/}
                {/*    <button type="button" onClick={this.changeState}>*/}
                {/*        Change State*/}
                {/*    </button>*/}
                {/*</p>*/}
            </div>
        );
    }
}
