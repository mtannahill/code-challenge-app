import React, { Component } from 'react';
import GifItem from '../search/GifItem';
import './GifList.css';

class GifList extends Component {

    render() {
     		
    return (
      <div className="list-container">
       
       { this.props.gifs.length > 0 && 
	     this.props.gifs.map(( { id, slug, images }, i) => (
		  
			<span className="gif-item" key={i}>
				<GifItem num={i} 
				         id = {id} 
						 desc = {slug} 
						 url={ images.preview_gif.url}
						 isFavorited = {false}
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