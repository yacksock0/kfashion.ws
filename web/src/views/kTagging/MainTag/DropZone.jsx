import React, { Component } from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
import { withStyles  } from '@material-ui/core/styles';

const style = theme => ({   
    root: {
    width: '100%',
    marginBottom:40,
    "& .MuiDropzoneArea-root": {
        borderColor:'rgba(82,106,242,0.21)',
        minHeight:'450px',
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
    },
    "& .MuiDropzoneArea-icon": {
        position :  "absolute",
        top: "40%",
        marginLeft:-20,
        color:'#A8B4F5',
    },
  },

});

class DropFile extends Component {
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
            // showPreviews={true}
            // 드롭존 최대 이미지수
            filesLimit = {1200000}
            onChange={this.test}

            maxFileSize={50000000000}
            dropzoneText="업로드할 이미지 또는 폴더를 드래그해주세요!"
        />
      </div>
    )
  }
}

export default withStyles(style)(DropFile);
