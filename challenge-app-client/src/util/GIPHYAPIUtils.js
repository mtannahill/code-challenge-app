const GIPHY_API_BASE_URL = 'https://api.giphy.com/v1/gifs';
const GIPHY_API_KEY = 'Scc6Jv5WrveIWlyNOnZ8aWKTtNmT3K2k';

export function searchGifs(phrase){
	//Replace Space with + to search for multiple items
	const giphyPhrase = phrase.replace(/\s/g, '+');
	const url = GIPHY_API_BASE_URL + "/search?q="+giphyPhrase
				+"&api_key="+GIPHY_API_KEY+"&rating=g";
	
	//Fetch List of Gifs from Giphy
	return fetch(url, {
			method: "GET",dataType: 'json',
			headers: {
			'Accept': 'application/json'
		}  
	}).then(response => 
		response.json().then(json => {
			if(!response.ok) {
				return Promise.reject(json);
			}
			return json;
		})
	);
}
