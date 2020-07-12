import 'rc-progress/assets/index.css';
import React, { Component } from 'react';
import { Line } from 'rc-progress';
import axios from "axios";

export class ProgressBar extends Component {
    constructor() {
        super();
        this.state = {
            percent: 0,
            total: 0,
            complete:0,
            color: '#3FC7FA',
        };
        this.changeState = this.changeState.bind(this);
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/createId/userGroupAuthorityList')
            .then(response => {
                const workLoadList = response.data.workLoadList;
                this.setState({
                    workLoadList: workLoadList.map(workLoad => {
                        workLoad.value = workLoad.groupNo;
                        workLoad.label = workLoad.groupName;
                        return workLoad
                    })
                })
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
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
            width: '200px',
            display:'inline-block'
        };
        const {total, complete} = this.state;

        return (
            <div style={{display:'inline'}}>
                <div style={containerStyle}>
                    <Line percent={percent} strokeWidth="4" strokeColor={color} />
                </div>
                <h3 style={{display:'inline'}}>{percent}%</h3>&nbsp;&nbsp;
                <h3 style={{display:'inline'}}>{complete} / {total}</h3>
                {/*<p>*/}
                {/*    <button type="button" onClick={this.changeState}>*/}
                {/*        Change State*/}
                {/*    </button>*/}
                {/*</p>*/}
            </div>
        );
    }
}
