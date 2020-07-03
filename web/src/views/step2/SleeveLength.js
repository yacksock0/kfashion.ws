import React from 'react';
import Select from 'react-select';
import axios from "axios";
import {inject, observer} from "mobx-react";


@inject('basicLabelStore','authStore')
@observer
export default class SelectTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            sleeveList: [],
            selectedOption:null,
        }
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/basic/sleeve')
            .then(response => {
                const sleeveList = response.data.sleeveList;
                this.setState({ sleeveList : sleeveList.map(sleeve => {
                        sleeve.value = sleeve.no;
                        sleeve.label = sleeve.categoryItemName;
                        return sleeve
                    })
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleChange = (selectedOption) => {
        this.props.basicLabelStore.changeNewBasicLabelSleeveLength(selectedOption)
        this.setState(
            { selectedOption }
        );
    };

    render() {
        const { selectedOption } = this.state;
        const sleeveList= this.state.sleeveList;
        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={sleeveList}
                placeholder={'색상을 선택 하세요'}
            />
        );
    }
}