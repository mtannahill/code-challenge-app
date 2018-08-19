import React, { Component } from 'react';

class DisplayImages extends Component {

    render() {
     		
    return (
      <div className="GifList">
         
       { this.props.gifs.length > 0 &&

          this.props.gifs.map(( { images }) => (
           <img  src={ images.preview_gif.url } width="200px" height="200px" />
                        ))          
        }
      </div>
    );
  }
}

export default DisplayImages;