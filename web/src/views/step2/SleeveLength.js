import React from 'react';
import Select from 'react-select';
import axios from "axios";

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
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleChange = (selectedOption) => {
        this.setState(
            { selectedOption },
            () => console.log(`Option selected:`, this.state.selectedOption.no)
        );
    };

    render() {
        const { selectedOption } = this.state;
        const sleeveList= this.state.sleeveList;
        console.log(sleeveList);
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