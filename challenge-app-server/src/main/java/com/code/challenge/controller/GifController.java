package com.code.challenge.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.code.challenge.model.*;
import com.code.challenge.payloads.*;
import com.code.challenge.security.CurrentUser;
import com.code.challenge.security.UserPrincipal;
import com.code.challenge.service.GifService;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/gif")
public class GifController {

    @Autowired
    private GifService gifService;

    private static final Logger logger = LoggerFactory.getLogger(GifController.class);

    @GetMapping
    public List<Gif> getGifs(@CurrentUser UserPrincipal currentUser) {
        return gifService.getGifs(currentUser);
    }

    @PostMapping
    public ResponseEntity<?> saveGifFavorite(@Valid @RequestBody GifRequest gifRequest, @CurrentUser UserPrincipal currentUser) {
        Gif gif = gifService.saveGif(gifRequest, currentUser);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{gifId}")
                .buildAndExpand(gif.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Gif Favorite Saved Successfully"));
    }
    
    @DeleteMapping
    public ResponseEntity<?> deleteGifFavorite(@Valid @RequestBody GifRequest gifRequest, @CurrentUser UserPrincipal currentUser) {
    	gifService.deleteGif(gifRequest, currentUser);
    	
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().build().toUri();
    	
    	return ResponseEntity.created(location).body(new ApiResponse(true, "Gif Unfavorite Saved Successfully"));
    }

    @GetMapping("/{gifId}")
    public GifResponse getGifById(@CurrentUser UserPrincipal currentUser, @PathVariable Long gifId) {
        return gifService.getGifById(gifId, currentUser);
    }
    
    @GetMapping("/giphy/{giphyId}")
    public GifResponse getGifByGiphyId(@CurrentUser UserPrincipal currentUser, @PathVariable String giphyId) {
        return gifService.getGifByUserIdAndGiphyid(giphyId, currentUser);
    }

    @PostMapping("/label/{giphyId}")
    public GifResponse updateGifLabel(@PathVariable String giphyId, @CurrentUser UserPrincipal currentUser, @Valid @RequestBody LabelRequest labelRequest) {
        return gifService.updateLabelAndGetUpdatedGif(giphyId, currentUser, labelRequest);
    }

}
