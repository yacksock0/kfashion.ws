import React from 'react';
import Select from 'react-select';
import axios from "axios";

export default class GroupList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            userGroupAuthorityList: [],
            selectedOption:null,
        }
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/userGroupAuthority/userGroupAuthorityList')
            .then(response => {
                const userGroupAuthorityList = response.data.userGroupAuthorityList;
                this.setState({
                    userGroupAuthorityList: userGroupAuthorityList.map(userGroupList => {
                        userGroupList.value = userGroupList.no;
                        userGroupList.label = userGroupList.groupName;
                        return userGroupList
                    })
                })
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleChange = (selectedOption) => {
        this.setState(
            { selectedOption },
            () => console.log(`Option selected:`, this.state.selectedOption)
        );
    };

    render() {
        const { selectedOption } = this.state;
        const userGroupAuthorityList= this.state.userGroupAuthorityList;
        console.log(userGroupAuthorityList);
        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={userGroupAuthorityList}
                placeholder={'그룹 선택'}
            />
        );
    }
}