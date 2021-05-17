import React, {Component} from 'react';



class DisplayImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
    this.onImageChange = this.onImageChange.bind(this);
  }

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(img)
      });
      
      
    }
  };

  render() {
    return (
      <div>
        <div>
          <div>
            <h4 className='m-2 mb-3'>Select Image</h4>
            <input type="file" name="myImage" onChange={this.onImageChange} />
          </div>
        </div>
      </div>
    );
  }
}


export default DisplayImage;