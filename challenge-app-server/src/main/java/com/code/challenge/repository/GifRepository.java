package com.code.challenge.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.code.challenge.model.Gif;

@Repository
public interface GifRepository extends JpaRepository<Gif, Long> {
	
    List<Gif> findByUserId(Long userId);
    
    Optional<Gif> findById(Long gifId);

    @Query("SELECT COUNT(g.id) from Gif g where g.user.id = :userId")
    long countByUserId(@Param("userId") Long userId);


}
