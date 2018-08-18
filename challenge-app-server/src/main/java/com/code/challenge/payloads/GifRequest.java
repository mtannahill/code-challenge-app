package com.code.challenge.payloads;

import javax.validation.constraints.NotBlank;

public class GifRequest {

    @NotBlank
    private String giphyid;
    
	public String getGiphyid() {
		return giphyid;
	}
	public void setGiphyid(String giphyid) {
		this.giphyid = giphyid;
	}

}
