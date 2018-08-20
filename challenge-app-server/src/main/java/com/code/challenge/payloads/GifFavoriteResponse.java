package com.code.challenge.payloads;

public class GifFavoriteResponse {
	
	private Boolean favorite;

    public GifFavoriteResponse(Boolean favorite) {
        this.favorite = favorite;
    }

    public Boolean getfavorite() {
        return favorite;
    }

    public void setfavorite(Boolean favorite) {
        this.favorite = favorite;
    }

}
