package com.code.challenge.util;

import com.code.challenge.model.Gif;
import com.code.challenge.model.User;
import com.code.challenge.payloads.GifResponse;
import com.code.challenge.payloads.UserSummary;

public class ModelMapper {
	
	public static GifResponse mapGifToGifResponse(Gif gif, User creator) {
        GifResponse gifResponse = new GifResponse();
        
        gifResponse.setId(gif.getId());
        gifResponse.setGiphyid(gif.getGiphyid());
        gifResponse.setLabel(gif.getLabel());
        gifResponse.setCreationDateTime(gif.getCreatedAt());
        
        UserSummary creatorSummary = new UserSummary(creator.getId(), creator.getUsername(), creator.getName());
        gifResponse.setCreatedBy(creatorSummary);

        return gifResponse;
    }
	
}
