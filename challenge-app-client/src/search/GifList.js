import React, { Component } from 'react';
import './GifList.css';

class GifList extends Component {

    render() {
     		
    return (
      <div className="list-container">
         
       { this.props.gifs.length > 0 &&

         this.props.gifs.map(( { id, images }, i) => (
		  
			// <GifItem  images = {images} />
			<span className="gif-item" key={i}>
				<img  key={i} alt = {id} src={ images.preview_gif.url } width="200px" height="200px" />
		   </span>
           ))          
        }
      </div>
    );
  }
}

export default GifList;