import React, { Component } from 'react';
import GifList from '../search/GifList';
import { searchGifs } from '../util/GIPHYAPIUtils';
import { withRouter } from 'react-router-dom';
import './Search.css';
import { Form, Input, Button} from 'antd';
const FormItem = Form.Item;

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
		let promise;
		
		promise = searchGifs(this.state.phrase);
		promise.then(response => {
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
				<GifList gifs={this.state.gifs} 
				         isAuthenticated={this.props.isAuthenticated} 
						 handleLogout={this.props.handleLogout}/>
            </div>
        );
	}
}

export default withRouter(Search);