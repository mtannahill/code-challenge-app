import React, { Component } from 'react';
import { saveGifFavorite } from '../util/APIUtils';
import {notification } from 'antd';
import './GifItem.css';

class GifItem extends Component {
  constructor(props) {
    super(props);

    this.state = { 
	  isFavorited: this.props.isFavorited
	};
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange() {
	
	const gifData = {giphyid: this.props.id};

    saveGifFavorite(gifData)
		.then(response => {
            this.setState({
				isFavorited: !this.state.isFavorited
			})       
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

  renderHeart = () => {
        if (! this.props.isAuthenticated) {
            return '';
        }
		
		var classes = this.state.isFavorited ? "favorite fa fa-heart" : "favorite fa fa-heart-o"

        return <i className={classes} onClick={() => this.handleChange()} />;
  };
  
  render() {
     		
    return (
	  <span className="gif-container"> 
		{ this.renderHeart() }
		<img  key={this.props.num} alt = {this.props.desc} src={this.props.url} width="200px" height="200px" />
	  </span>
    );
  }
}

export default GifItem;