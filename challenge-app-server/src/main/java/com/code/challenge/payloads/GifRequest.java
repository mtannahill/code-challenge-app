package com.code.challenge.payloads;

import javax.validation.constraints.NotBlank;

public class GifRequest {

    @NotBlank
    private String giphyid;
    private String title;
    private String url;
    
	public String getGiphyid() {
		return giphyid;
	}
	public void setGiphyid(String giphyid) {
		this.giphyid = giphyid;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}

}
