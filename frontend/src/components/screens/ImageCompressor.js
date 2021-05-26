import React from "react";

import imageCompression from "browser-image-compression";

import Card from "react-bootstrap/Card";

let downloadLink;

class ImageCompressor extends React.Component {
  constructor() {
    super();
    this.state = {
      compressedLink:
        "",
      originalImage: "",
      originalLink: "",
      uploadImage: false
    };
  }

  selectImage = e => {
    const imageFile = e.target.files[0];
    if(imageFile.size/1024/1024 <= 5){
      this.setState({
        originalLink: URL.createObjectURL(imageFile),
        originalImage: imageFile,
        outputFileName: imageFile.name,
        uploadImage: true
      });
    }else{
      alert('Select Image upto 5 Mb');
      return 0;
    }
    
  };


  compressUpload = e => {
    e.preventDefault();

    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 800,
      useWebWorker: true
    };

    if (options.maxSizeMB >= this.state.originalImage.size / 1024 / 1024) {
      alert("Bring a bigger image");
      return 0;
    }

    let output;
    imageCompression(this.state.originalImage, options).then(x => {
      output = x;
      console.log(output);
      downloadLink = URL.createObjectURL(output);
      console.log(downloadLink);
      this.setState({
        compressedLink: downloadLink
      });
    });

    this.setState({ clicked: true });
    return 1;
  };



  

  render() {
    return (
      <>
        <div className="d-flex">
          <div>
              <input
                type="file"
                accept="image/*"
                className="btn btn-secondary"
                onChange={e => this.selectImage(e)}
              />
          </div>
          
            <br />
            {this.state.outputFileName ? (
              <button
                type="button"
                className="btn btn-dark"
                onClick={e => this.compressUpload(e)}
                style={{marginLeft:'100px'}}
              >
                Preview
              </button>
            ) : (
              <></>
            )}
        </div>
        {
          this.state.compressedLink ? (
            <div className="col-md-4 offset-3 my-4">
              <Card.Img variant="top" src={this.state.compressedLink} style={{width:'300px',height:'300px', borderRadius:'150px'}}></Card.Img>
            </div>) : 
            (
              <></>
            )
        }
       </>
    );
  }
}

export default ImageCompressor;