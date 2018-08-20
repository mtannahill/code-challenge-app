import React, { Component } from 'react';
import { saveGifFavorite, deleteGifFavorite } from '../util/APIUtils';
import {notification } from 'antd';
import './GifItem.css';

class GifItem extends Component {
  constructor(props) {
    super(props);

    this.state = { 
	  favorited: this.props.isFavorited
	};
  }
  
  handleFavorite(){  
    const gifData = {giphyid: this.props.id};
	
	saveGifFavorite(gifData)
		.then(response => {
            this.setState({ favorited: true });     
    }).catch(error => {
        if(error.status === 401) {
            this.props.handleLogout('/login', 'error', 'You have been logged out. Please login to save favorite gifs.');    
        } else {
            notification.error({
              message: 'Giphy Search',
              description: error.message || 'Sorry! Something went wrong. Please try again!'
            });                
        }
	});	
  }
  
  handleUnfavorite(){
    const gifData = {giphyid: this.props.id};
	
	deleteGifFavorite(gifData)
		.then(response => {
            this.setState({ favorited: false });      
    }).catch(error => {
        if(error.status === 401) {
            this.props.handleLogout('/login', 'error', 'You have been logged out. Please login to un-save favorite gifs.');    
        } else {
            notification.error({
              message: 'Giphy Search',
              description: error.message || 'Sorry! Something went wrong. Please try again!'
            });                
        }
	});	
  }

  renderHeart = () => {
        if (! this.props.isAuthenticated) {
            return '';
        }
		
		if (this.state.favorited) {
            return <i className="favorite fa fa-heart" onClick={() => this.handleUnfavorite()} />;
        }

        return <i className="favorite fa fa-heart-o" onClick={() => this.handleFavorite()} />;
  };
  
  render() {
     		
    return (
	  <span className="gif-container"> 
		{ this.renderHeart() }
		<img  key={this.props.id} alt = {this.props.desc} src={this.props.url} width="200px" height="200px" />
	  </span>
    );
  }
}

export default GifItem;