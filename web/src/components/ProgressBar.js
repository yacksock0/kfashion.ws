// import 'rc-progress/assets/index.css';
// import React, { Component } from 'react';
// import { Line } from 'rc-progress';
// import axios from "axios";
// import {inject, observer} from "mobx-react";
//
// @inject('authStore','userListStore')
// @observer
// export class ProgressBar extends Component {
//     constructor(props) {
//         super();
//         this.state = {
//             percent: 0,
//             total: 0,
//             rowDataId : '',
//             complete:0,
//             color: '#45ce7c',
//         };
//         this.changeState = this.changeState.bind(this);
//     }
//     componentDidMount() {
//         axios.post(`/api/v1/kfashion/work/history/progressRate?createdId=${this.props.rowDataId}&authorityNo=${this.props.authStore.loginUser.authorityNo}`)
//             .then(response => {
//                 const selectWorkProgressRate = response.data.selectWorkProgressRate;
//                 const total = selectWorkProgressRate.totalWork;
//                 const complete = selectWorkProgressRate.finishWork;
//                 this.setState({
//                     total: total,
//                     complete: complete,
//                     percent : ((complete / total) *100).toFixed(1)
//                 });
//                 if(complete ===0 && total===0 ){
//                     this.setState({
//                         percent :   100
//                     });
//                 }
//             })
//             .catch(error => {
//                 console.log(error)
//             })
//         // this.handleprogressRate();
//         // this.props.userListStore.LoadProgressRate(this.props.rowDataId,this.props.authStore.loginUser.authorityNo)
//     }
//     // handleprogressRate () {
//     //     axios.post(`/api/v1/kfashion/work/history/progressRate?createdId=${this.props.rowDataId}&authorityNo=${this.props.authStore.loginUser.authorityNo}`)
//     //         .then(response => {
//     //             const selectWorkProgressRate = response.data.selectWorkProgressRate;
//     //             const total = selectWorkProgressRate.totalWork;
//     //             const complete = selectWorkProgressRate.finishWork;
//     //             this.setState({
//     //                 total: total,
//     //                 complete: complete,
//     //                 percent : ((complete / total) *100).toFixed(1)
//     //             });
//     //             if(complete ==0 && total==0 ){
//     //                 this.setState({
//     //                     percent :   100
//     //                 });
//     //             }
//     //         })
//     //         .catch(error => {
//     //             console.log(error)
//     //         })
//     // }
//
//     changeState() {
//         const colorMap = ['#3FC7FA', '#85D262', '#FE8C6A'];
//         const value = parseInt(100, 10);
//         this.setState({
//             percent: value,
//             color: colorMap[parseInt(3, 10)],
//         });
//     }
//     componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
//         if(prevState.rowDataId !== this.props.rowDataId) {
//                 axios.post(`/api/v1/kfashion/work/history/progressRate?createdId=${this.props.rowDataId}&authorityNo=${this.props.authStore.loginUser.authorityNo}`)
//                     .then(response => {
//                         const selectWorkProgressRate = response.data.selectWorkProgressRate;
//                         const total = selectWorkProgressRate.totalWork;
//                         const complete = selectWorkProgressRate.finishWork;
//                         this.setState({
//                             total: total,
//                             complete: complete,
//                             rowDataId: this.props.rowDataId,
//                             percent : ((complete / total) *100).toFixed(1)
//                         });
//                         if(complete ===0 && total===0 ){
//                             this.setState({
//                                 percent :   100
//                             });
//                         }
//                     })
//                     .catch(error => {
//                         console.log(error)
//                     })
//         }
//
//     }
//
//     render() {
//         const {color } = this.state;
//         const containerStyle = {
//             width: '200px',
//             display:'inline-block'
//         };
//         const {total, complete, percent } = this.state;
//         return (
//             <div style={{display:'inline'}} key={this.props.rowDataId}>
//                 <div style={containerStyle}>
//                     <Line percent={percent} strokeWidth="4" strokeColor={color} />
//                 </div>
//                 <h3 style={{display:'inline'}}> {percent}%</h3>&nbsp;&nbsp;
//                 <h3 style={{display:'inline'}}> {complete} / {total}</h3>
//                 {/*<p>*/}
//                 {/*    <button type="button" onClick={this.changeState}>*/}
//                 {/*        Change State*/}
//                 {/*    </button>*/}
//                 {/*</p>*/}
//             </div>
//         );
//     }
// }