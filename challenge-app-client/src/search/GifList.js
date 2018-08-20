import React, { Component } from 'react';
import { checkGifFavorite } from '../util/APIUtils';
import GifItem from '../search/GifItem';
import './GifList.css';

class GifList extends Component {
	
	isFavorited(id){
	    checkGifFavorite(id)
        .then(response => {
            if(response.available) {return true;}
            else {return false;}
        }).catch(error => {
            return true;
        });
	}

    render() {
     		
    return (
      <div className="list-container">
       
       { this.props.gifs.length > 0 && 
	     this.props.gifs.map(( { id, slug, images }, i) => (
		  
			<span className="gif-item" key={i}>
				<GifItem id = {id} 
						 desc = {slug} 
						 url={ images.preview_gif.url}
						 isFavorited = {this.isFavorited(id)}
						 isAuthenticated = {this.props.isAuthenticated} 
						 handleLogout={this.props.handleLogout} />
		   </span>
           ))          
        }
      </div>
    );
  }
}

export default GifList;