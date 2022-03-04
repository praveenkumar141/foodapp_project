package com.learning.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.learning.dto.EFOOD;
import com.learning.dto.Food;

@Repository
public interface FoodRepository extends JpaRepository<Food, Integer> {
	
	Optional<List<Food>> findByFoodType(EFOOD foodType);
}
