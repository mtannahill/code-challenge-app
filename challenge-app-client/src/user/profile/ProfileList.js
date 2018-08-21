import React, { Component } from 'react';
import GifItem from '../../search/GifItem';
import './ProfileList.css';

class ProfileList extends Component {
	
    render() {
     		
    return (
      <div className="list-container">
       
       { this.props.gifs.length > 0 && 
	     this.props.gifs.map(( { giphyid, title, url}, i) => (
         
		  
			<span className="gif-item" key={i}>
				<GifItem id = {giphyid} 
						 desc = {title} 
						 url={ url}
						 isAuthenticated = {this.props.isAuthenticated} 
						 handleLogout={this.props.handleLogout} 
                         isChangeFav = {false}/>
		   </span>
           ))          
        }
      </div>
    );
  }
}

export default ProfileList;