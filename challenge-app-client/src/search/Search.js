import React, { Component } from 'react';
import GifList from '../search/GifList';
import GiphyImage from '../search/GiphyImage';
import { searchGifs } from '../util/GIPHYAPIUtils';
import { withRouter } from 'react-router-dom';
import './Search.css';
import { Form, Input, Button, notification } from 'antd';
import request from 'superagent';
const FormItem = Form.Item;
const GIPHY_API_BASE_URL = 'https://api.giphy.com/v1/gifs';
const GIPHY_API_KEY = 'Scc6Jv5WrveIWlyNOnZ8aWKTtNmT3K2k';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phrase: '',
			isLoading: false,
			gifs: []
		};	
		this.handleInputChange = this.handleInputChange.bind(this);
    }
	
    handleInputChange(event) {
        const target = event.target;       
        const phraseValue = target.value;
		
		//Replace Space with + to search for multiple items
		const giphyPhrase = phraseValue.replace(/\s/g, '+');
		
        const url = GIPHY_API_BASE_URL + "/search?q="+giphyPhrase+"&api_key="+GIPHY_API_KEY;
		
		fetch(url, {
        method: "GET",dataType: 'json',
    headers: {
        'Accept': 'application/json'
    }  

}).then(response => response.json())
      .then(response => {
        if (response.data.length > 0) {
          this.setState({gifs: response.data});
        } 
        this.setState({isLoading: false, phrase: target.value});
      });

    
    }
	

    render() {

        return (
			<div className="search-container">
                <div className="search-content">
                    <Form onSubmit={this.handleSubmit} className="search-form">
                        <FormItem 
                            label=""
                            validateStatus={this.state.phrase.validateStatus}
                            help={this.state.phrase.errorMsg}>
                            <Input 
                                size="large"
                                name="phrase"
                                autoComplete="off"
                                placeholder="Search for gifs!"
                                value={this.state.phrase.value} 
                                onChange={(event) => this.handleInputChange(event, this.validatePhrase)} />    
						</FormItem>
                    </Form>
                </div>
				<GifList gifs={this.state.gifs} />
            </div>
        );
	}
}

export default withRouter(Search);