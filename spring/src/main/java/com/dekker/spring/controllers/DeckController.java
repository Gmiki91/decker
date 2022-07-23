package com.dekker.spring.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.dekker.spring.repositories.DeckRepository;
import com.dekker.spring.models.Deck;
import com.dekker.spring.models.Response;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/")
public class DeckController {
    @Autowired
	private DeckRepository deckRepository;
	
    //get all decks
	@GetMapping("/decks")
	public Response getAllDecks(){
        List<Deck> decks = deckRepository.findAll();
		return new Response("success",decks);
	}	
    
    // create deck
	@PostMapping("/decks")
	public Response createDeck(@RequestBody Deck deck) {
		deckRepository.save(deck);
        return new Response("success");
	}
}
