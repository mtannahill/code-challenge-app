import React, { Component } from 'react';
import { saveGifFavorite, deleteGifFavorite, checkGifFavorite } from '../util/APIUtils';
import {notification } from 'antd';
import './GifItem.css';

class GifItem extends Component {
  constructor(props) {
    super(props);

    this.state = { 
	  favorited: false
	};
    
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.loadFavorites = this.loadFavorites.bind(this);
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
  
  componentDidMount() {
    this.loadFavorites();
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
        this.loadFavorites();
    }
  }
  
  loadFavorites(){
    checkGifFavorite(this.props.id).then(response => {
            if(response.favorite) {
                this.setState({ favorited: true });
            }
            else {
                this.setState({ favorited: false });
            }
        }).catch(error => {
            this.setState({ favorited: true });
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