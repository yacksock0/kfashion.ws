import React from 'react';
import Select from 'react-select';
import axios from "axios";
export default class SelectTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            categoryList: [],
            selectedOption:null,
        }
    }
    componentDidMount() {
        this.setState({ open : false })
        axios.get('/api/v1/kfashion/category/item/professional/category')
            .then(response => {
                const categoryList = response.data.categoryList;
                this.setState({ categoryList : categoryList.map(category => {
                    category.value = category.no;
                    category.label = category.categoryItemName;
                    return category
                    })
                })
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleChange = selectedOption => {
        this.setState(
            { selectedOption },
            () => console.log(`Option selected:`, this.state.selectedOption)
        );
    };

    // handleOptions  () {
    //     const categoryList=this.state.categoryList;
    //     categoryList.map((category) => (
    //         <option value={category.no}>
    //             {category.categoryItemName}
    //         </option>
    //         )
    //     )};

    render() {
        const { selectedOption } = this.state;
        const categoryList= this.state.categoryList;
        console.log(categoryList);
        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={categoryList}

            />
        );
    }
}