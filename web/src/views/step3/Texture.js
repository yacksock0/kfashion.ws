import React from 'react';
import Select from 'react-select';
import axios from "axios";
import {inject, observer} from "mobx-react";


@inject('professionalLabelStore','authStore')
@observer
export default class Texture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            textureList: [],
            selectedOption:null,
        }
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/texture')
            .then(response => {
                const textureList = response.data.textureList;
                this.setState({ textureList : textureList.map(texture => {
                        texture.value = texture.no;
                        texture.label = texture.categoryItemName;
                        return texture
                    })
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleChange = (selectedOption) => {
        this.props.professionalLabelStore.changeNewProfessionalLabelTexture(selectedOption);
        this.setState(
            { selectedOption },
        );
    };

    render() {
        const { selectedOption } = this.state;
        const textureList= this.state.textureList;
        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={textureList}
                placeholder={'소재감을 선택 하세요'}
            />
        );
    }
}