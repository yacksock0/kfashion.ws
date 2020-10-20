import React, { Component } from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
import { withStyles  } from '@material-ui/core/styles';

const style = theme => ({   
    root: {
    width: '100%',
    marginBottom:40,
    "& .MuiDropzoneArea-root": {
        borderColor:'rgba(226,226,226,1)',
        minHeight:'613px',
        outline:'none',   
    },
    "& .MuiTypography-h5" : {
        position :  "absolute",
        width : "100%",
        textAlign :"center",
        top : "48%",
        fontFamily: "NotoSansCJKkr",
        fontSize: "14px",
        fontWeight: "bold",
        color:'#a4a4a4',
    },
    "& .MuiDropzoneArea-icon": {
        position :  "absolute",
        top: "40%",
        width:'73px',
        height:'73px',
        marginLeft:-30,
        color:'#e2e2e2',
    },

  },

});

class DropZoneMatch extends Component {
  constructor(props){
    super(props);
    this.state = {
      files: []
    };
  }
  handleChange(files){
    this.setState({
      files: files
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <DropzoneArea
            onChange={this.handleChange.bind(this)}
            acceptedFiles={['image/*']}
            showPreviewsInDropzone={false}
            // 드롭존 최대 이미지수
            filesLimit={1}
            dropzoneText="업로드할 이미지를 드래그해주세요!"
        />
      </div>
    )
  }
}

export default withStyles(style)(DropZoneMatch);
