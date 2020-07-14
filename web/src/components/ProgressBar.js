import 'rc-progress/assets/index.css';
import React, { Component } from 'react';
import { Line } from 'rc-progress';
import axios from "axios";
import {inject, observer} from "mobx-react";


@inject('authStore')
@observer
export class ProgressBar extends Component {
    constructor(props) {
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
        const totalWork = 0;
        const finishWork = 0;

        axios.post(`/api/v1/kfashion/work/history/progressRate?createdId=${this.props.rowDataId}&authorityNo=${this.props.authStore.loginUser.authorityNo}`)
            .then(response => {
                const selectWorkProgressRate = response.data.selectWorkProgressRate;
                const total = selectWorkProgressRate.totalWork;
                const complete = selectWorkProgressRate.finishWork;

                this.setState({
                    total: total,
                    complete: complete,
                    percent : (complete / total) *100
                });
                if(complete ==0 && total==0 ){
                    this.setState({
                        percent :   100
                    });
                }
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