import React, { Component } from 'react';
import { saveGifFavorite, deleteGifFavorite, getGifByGiphyId, updateGifLabel } from '../util/APIUtils';
import {notification } from 'antd';
import './GifItem.css';
import {Input} from 'antd';

class GifItem extends Component {
  constructor(props) {
    super(props);

    this.state = { 
	  favorited: false,
      label: ''
	};
    this.inputRef = React.createRef();
    
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.loadFavorites = this.loadFavorites.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  handleFavorite(){  
    if(this.props.isChangeFav){
      const gifData = {
        giphyid: this.props.id,
        title:   this.props.desc,
        url:     this.props.url
      };
	
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
      
    {/* fetch GIFS from Client Server API */} 
    getGifByGiphyId(this.props.id).then(response => {
            if(response.id !=null) {
                this.setState({ favorited: true, label: response.label });
            }
            else {
                this.setState({ favorited: false, label: "" });
            }
        }).catch(error => {
            this.setState({ favorited: false, label: "" });
        });
  }
  
  handleInputChange(event) {
    var label = event.target.value;
    const gifData = {label: label};
        
    updateGifLabel(this.props.id, gifData)
		.then(response => {
            this.setState({label: label});      
    }).catch(error => {
        if(error.status === 401) {
            this.props.handleLogout('/login', 'error', 'You have been logged out. Please login to label favorite gifs.');    
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
    
    if(!this.props.isChangeFav){
        return  <i className="favorite fa fa-heart" />;  
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
        
        { (this.props.isAuthenticated && this.state.favorited) &&

                <Input name="label"
                    autoComplete="off"
                    placeholder=""
                    value={this.state.label} 
                    onChange={(event) => this.handleInputChange(event)} 
                    onPressEnter={(event) => this.inputRef.current.blur()} ref={this.inputRef}/>    

        }
		
        <img  key={this.props.id} alt = {this.props.desc} src={this.props.url} width="200px" height="200px" />
	  </span>
    );
  }
}

export default GifItem;