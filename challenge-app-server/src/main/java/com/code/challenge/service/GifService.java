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

    public List<Gif> getGifs(UserPrincipal currentUser) {

        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", currentUser.getUsername()));

        // Retrieve all gifs saved by the given username
        List<Gif> gifs = gifRepository.findByUserId(user.getId());

        if (gifs.isEmpty()) {return new ArrayList<Gif>();}

        return gifs;
    }

	public Gif saveGif(@Valid GifRequest gifRequest, UserPrincipal currentUser) {
		
		User user = userRepository.getOne(currentUser.getId());
		
		Gif gif = new Gif();
        gif.setGiphyid(gifRequest.getGiphyid());
        gif.setUser(user);
        
        try {
            gif = gifRepository.save(gif);
        } catch (DataIntegrityViolationException ex) {
            logger.info("User {} has already favorited Gif {}", currentUser.getId(), gifRequest.getGiphyid());
            throw new BadRequestException("Sorry! You have already saved this gif");
        }

        return gif;
	}

	public GifResponse getGifById(Long gifId, UserPrincipal currentUser) {
		
		User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", currentUser.getUsername()));
		
		Gif gif = gifRepository.findById(gifId).orElseThrow(
				() -> new ResourceNotFoundException("Gif", "id", gifId));
		
		return ModelMapper.mapGifToGifResponse(gif, user);
	}

	public GifResponse updateLabelAndGetUpdatedGif(Long gifId, @Valid LabelRequest labelRequest) {
		
		Gif gif = gifRepository.findById(gifId)
                .orElseThrow(() -> new ResourceNotFoundException("Gif", "id", gifId));
		
		gif.setLabel(labelRequest.getLabel());
		
		gif = gifRepository.save(gif);

		return ModelMapper.mapGifToGifResponse(gif, gif.getUser());
	}
}
