import React from 'react';
import Select from 'react-select';
import axios from "axios";

export default class SelectTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            colorList: [],
            selectedOption:null,
        }
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/basic/color')
            .then(response => {
                const colorList = response.data.colorList;
                this.setState({ colorList : colorList.map(color => {
                        color.value = color.no;
                        color.label = color.categoryItemName;
                        return color
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
            {selectedOption},
            () => console.log(`Option selected:`, this.state.selectedOption.categoryNo, this.state.selectedOption.no)
        );
    };

    render() {
        const { selectedOption } = this.state;
        const colorList= this.state.colorList;
        console.log(colorList);
        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={colorList}
                autoFocus={true}
                placeholder={'색상을 선택 하세요'}
            />
        );
    }
}