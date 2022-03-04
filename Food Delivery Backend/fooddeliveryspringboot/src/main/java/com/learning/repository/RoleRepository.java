package com.learning.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learning.dto.EROLE;
import com.learning.dto.Role;


public interface RoleRepository extends JpaRepository<Role, Integer> {
	
	Optional<Role> findByRoleName(EROLE roleName);
}
