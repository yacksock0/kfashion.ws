import React from 'react';
import Select from 'react-select';
import axios from "axios";
import {inject, observer} from "mobx-react";

@inject('professionalLabelStore','authStore')
@observer
export default class ClothLength extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            lengthList: [],
            selectedOption:null,
        }
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/length')
            .then(response => {
                const lengthList = response.data.lengthList;
                this.setState({ lengthList : lengthList.map(length => {
                        length.value = length.no;
                        length.label = length.categoryItemName;
                        return length
                    })
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleChange = (selectedOption) => {
        this.props.professionalLabelStore.changeNewProfessionalLabelClothLength(selectedOption);
            this.setState(
                { selectedOption },
            );
    };
    render() {
        const { selectedOption } = this.state;
        const lengthList= this.state.lengthList;
        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={lengthList}
                placeholder={'기장을 선택 하세요'}
            />
        );
    }
}