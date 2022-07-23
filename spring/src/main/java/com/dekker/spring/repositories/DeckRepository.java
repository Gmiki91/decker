package com.dekker.spring.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dekker.spring.models.Deck;

public interface DeckRepository extends JpaRepository<Deck,Long> {
    
}
