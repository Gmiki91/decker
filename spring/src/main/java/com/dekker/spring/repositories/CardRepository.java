package com.dekker.spring.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dekker.spring.models.Card;

public interface CardRepository extends JpaRepository<Card,Long> {
    
}
