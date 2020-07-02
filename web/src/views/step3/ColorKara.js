import React from 'react';
import Select from 'react-select';
import axios from "axios";
import {inject, observer} from "mobx-react";

@inject('professionalLabelStore','authStore')
@observer
export default class ColorKara extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            karaList: [],
            selectedOption:null,
        }
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/kara')
            .then(response => {
                const karaList = response.data.karaList;
                this.setState({ karaList : karaList.map(kara => {
                        kara.value = kara.no;
                        kara.label = kara.categoryItemName;
                        return kara
                    })
                })
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleChange = (selectedOption) => {
        this.props.professionalLabelStore.changeNewProfessionalLabelKara(selectedOption);
        this.setState(
            { selectedOption },
            () => console.log(`Option selected:`, this.state.selectedOption)
        );
    };

    render() {
        const { selectedOption } = this.state;
        const karaList= this.state.karaList;
        console.log(karaList);
        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={karaList}
                placeholder={'카라를 선택 하세요'}
            />
        );
    }
}