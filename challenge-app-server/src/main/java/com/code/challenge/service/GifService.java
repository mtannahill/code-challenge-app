package com.code.challenge.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.code.challenge.exception.BadRequestException;
import com.code.challenge.exception.ResourceNotFoundException;
import com.code.challenge.model.*;
import com.code.challenge.payloads.GifRequest;
import com.code.challenge.payloads.GifResponse;
import com.code.challenge.payloads.LabelRequest;
import com.code.challenge.repository.GifRepository;
import com.code.challenge.repository.UserRepository;
import com.code.challenge.security.UserPrincipal;
import com.code.challenge.util.ModelMapper;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

@Service
public class GifService {

    @Autowired
    private GifRepository gifRepository;

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(GifService.class);

    /** Fetch a list of gifs that were saved by the user
     * @param currentUser  The Current User who is logged in/authorized
     * @return             A List of gifs that the user has saved
     */
    public List<Gif> getGifs(UserPrincipal currentUser) {

        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", currentUser.getUsername()));

        // Retrieve all gifs saved by the given username
        List<Gif> gifs = gifRepository.findByUserId(user.getId());

        if (gifs.isEmpty()) {return new ArrayList<Gif>();}

        return gifs;
    }

	/** Save a gif to the user's profile who is currently logged in/authorized
	 * @param gifRequest   The gif passed through the request
	 * @param currentUser  The Current User who is logged in/authorized
	 * @return             The Gif that was saved
	 */
	public Gif saveGif(@Valid GifRequest gifRequest, UserPrincipal currentUser) {
		
		User user = userRepository.getOne(currentUser.getId());
		
		Gif gif = new Gif();
        gif.setGiphyid(gifRequest.getGiphyid());
        gif.setTitle(gifRequest.getTitle());
        gif.setUrl(gifRequest.getUrl());
        gif.setUser(user);
        
        try {
            gif = gifRepository.save(gif);
        } catch (DataIntegrityViolationException ex) {
            logger.info("User {} has already favorited Gif {}", currentUser.getId(), gifRequest.getGiphyid());
            throw new BadRequestException("Sorry! You have already saved this gif");
        }

        return gif;
	}
	
	/** Delete a gif from the user's profile who is currently logged in/authorized
	 * @param gifRequest   The gif passed through the request
	 * @param currentUser  The Current User who is logged in/authorized
	 */
	public void deleteGif(GifRequest gifRequest, UserPrincipal currentUser) {
		
		User user = userRepository.getOne(currentUser.getId());
		
		Gif gif = gifRepository.findByUserIdAndGiphyid(user.getId(), gifRequest.getGiphyid()).orElseThrow(
				() -> new ResourceNotFoundException("Gif", "giphyid", gifRequest.getGiphyid()));
        
        try {
            gifRepository.delete(gif);
        } catch (DataIntegrityViolationException ex) {
            logger.info("User {} has already Unfavorited Gif {}", currentUser.getId(), gifRequest.getGiphyid());
            throw new BadRequestException("Sorry! You have already unfavorited this gif");
        }
	}

	/** Fetch a Gif saved by the current user by the gif's id
	 * @param gifId        The id value of the gif to be retrieved
	 * @param currentUser  The Current User who is logged in/authorized
	 * @return             The Gif Information to be passed into the response
	 */
	public GifResponse getGifById(Long gifId, UserPrincipal currentUser) {
		
		User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", currentUser.getUsername()));
		
		Gif gif = gifRepository.findById(gifId).orElseThrow(
				() -> new ResourceNotFoundException("Gif", "id", gifId));
		
		return ModelMapper.mapGifToGifResponse(gif, user);
	}
	
	/** Fetch a Gif saved by the current user by the gif's giphy id
	 * @param giphyId     The id value of the gif that is used by GIPHY
	 * @param currentUser The Current User who is logged in/authorized
	 * @return            The Gif Information to be passed into the response
	 */
	public GifResponse getGifByUserIdAndGiphyid(String giphyId, UserPrincipal currentUser) {
		
		User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", currentUser.getUsername()));
		
		Gif gif = gifRepository.findByUserIdAndGiphyid(user.getId(), giphyId).orElse(new Gif());
		
		return ModelMapper.mapGifToGifResponse(gif, user);
	}

	/** Update the Label value of a gif saved by the current user by its giphy id 
	 * @param giphyId       The id value of the gif that is used by GIPHY
	 * @param currentUser   The Current User who is logged in/authorized
	 * @param labelRequest  The label value passed through the request
	 * @return              The Gif Information to be passed into the response
	 */
	public GifResponse updateLabelAndGetUpdatedGif(String giphyId, UserPrincipal currentUser, @Valid LabelRequest labelRequest) {
		
		Gif gif = gifRepository.findByUserIdAndGiphyid(currentUser.getId(), giphyId)
                .orElseThrow(() -> new ResourceNotFoundException("Gif", "id", giphyId));
		
		gif.setLabel(labelRequest.getLabel());
		
		gif = gifRepository.save(gif);

		return ModelMapper.mapGifToGifResponse(gif, gif.getUser());
	}
}
