import React from 'react';
import Select from 'react-select';
import axios from "axios";

export default class SelectTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            styleList: [],
            selectedOption:null,
        }
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/style')
            .then(response => {
                const styleList = response.data.styleList;
                this.setState({ styleList : styleList.map(style => {
                        style.value = style.no;
                        style.label = style.categoryItemName;
                        return style
                    })
                })
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleChange = (selectedOption) => {
        if(selectedOption.length <= 2) {
            this.setState(
                {selectedOption},
                () => console.log(`Option selected:`, this.state.selectedOption)
            );
        }
    };
    render() {
        const { selectedOption } = this.state;
        const styleList= this.state.styleList;
        console.log(styleList);
        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={styleList}
                autoFocus={true}
                isMulti
            />
        );
    }
}