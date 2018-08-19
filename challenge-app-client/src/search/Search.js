import React, { Component } from 'react';
import GifList from '../search/GifList';
import { searchGifs } from '../util/GIPHYAPIUtils';
import { withRouter } from 'react-router-dom';
import './Search.css';
import { Form, Input, Button, notification } from 'antd';
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
	
	fetchResults(props){
		//Replace Space with + to search for multiple items
		const giphyPhrase = this.state.phrase.replace(/\s/g, '+');
		
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
			});
	}
		
	
	handleInputChange(event) {
        this.setState({phrase: event.target.value});
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
                                value={this.state.phrase} 
                                onChange={(event) => this.handleInputChange(event, this.validatePhrase)} />    
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="search-form-button"
                                onClick={() => {this.fetchResults(this.state.searchQuery)}}>Search</Button>
						</FormItem>
                    </Form>
                </div>
				<GifList gifs={this.state.gifs} />
            </div>
        );
	}
}

export default withRouter(Search);