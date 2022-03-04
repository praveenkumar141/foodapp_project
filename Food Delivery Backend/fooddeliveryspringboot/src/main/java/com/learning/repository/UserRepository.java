package com.learning.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.learning.dto.Register;

@Repository
public interface UserRepository extends JpaRepository<Register, Long> {

	// Used for duplication check
	Boolean existsByEmail(String email);
	
	Boolean existsByEmailAndPassword(String email, String password);
	
	Optional<Register> findByUsername(String username);
	
	Optional<Register> findByEmail(String email);
	
	Boolean existsByUsername(String username);
}
