package com.dekker.spring.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.dekker.spring.repositories.CardRepository;
import com.dekker.spring.repositories.DeckRepository;
import com.dekker.spring.models.Card;
import com.dekker.spring.models.Deck;
import com.dekker.spring.models.Response;

@CrossOrigin(origins = "http://127.0.0.1:4200")
@RestController
@RequestMapping("/")
public class CardController {
    @Autowired
    private CardRepository cardRepository;
    @Autowired
    private DeckRepository deckRepository;

    @GetMapping("/cards/{deckId}")
    public Response getCardsByDeckId(@PathVariable("deckId") Long deckId) {
        Deck deck = deckRepository.findById(deckId).get();
        return new Response("success",deck.getCards());
    }

    @PostMapping("/cards/{deckId}")
    public Response createCard(
            @PathVariable("deckId") Long deckId,
            @RequestBody Card card) {
        Deck deck = deckRepository.findById(deckId).get();
        deck.addCard(card);
        cardRepository.save(card);
        deckRepository.save(deck);
        return new Response("success");
    }
}
