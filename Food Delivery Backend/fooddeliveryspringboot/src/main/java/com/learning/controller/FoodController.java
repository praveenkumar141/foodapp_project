package com.learning.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning.dto.Food;
import com.learning.exception.FoodTypeNotFoundException;
import com.learning.exception.IdNotFoundException;
import com.learning.repository.FoodRepository;
import com.learning.service.FoodService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/food")
public class FoodController {

	@Autowired
	FoodService foodService = null;
	
	@Autowired
	FoodRepository foodRepository = null;
	
	
	// Adding new food details
	@PostMapping("/addFood")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> addFood(@Valid @RequestBody Food food) {

		Food result = foodService.addFood(food);
		System.out.println(result);

		return ResponseEntity.status(201).body(result);
	}
	
	
	// Retrieving food details based on their ID
	@GetMapping("/foodId/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> getFoodById(@PathVariable("id") Integer id) throws IdNotFoundException {

		Food foodDetails = foodService.getFoodById(id);
		return ResponseEntity.ok(foodDetails);
	}
	
	
	// Updating food details based on the ID
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> updateFoodDetails(@PathVariable("id") Integer id, @Valid @RequestBody Food updateFoodDetails) throws IdNotFoundException {
		
		Food foodDetails = foodService.getFoodById(id);
		
		foodDetails.setId(id);
		foodDetails.setFoodName(updateFoodDetails.getFoodName());
		foodDetails.setFoodCost(updateFoodDetails.getFoodCost());
		foodDetails.setFoodType(updateFoodDetails.getFoodType());
		foodDetails.setDescription(updateFoodDetails.getDescription());
		foodDetails.setFoodPic(updateFoodDetails.getFoodPic());
		
		Food updatedFoodDetails = foodRepository.save(foodDetails);
		
		return ResponseEntity.ok(updatedFoodDetails);
	}
	
	
	// Retrieving all food details
	@GetMapping("/allFood")
	//@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> getAllFoodDetails() {
		
		Optional<List<Food>> allFoodDetails = foodService.getAllFoodDetails();
		return ResponseEntity.ok(allFoodDetails.get());
	}
	
	
	// Retrieving food details based on their type
	@GetMapping("/foodType/{foodType}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> getFoodDetailsByType(@PathVariable("foodType") String foodType) throws FoodTypeNotFoundException {
		
		Optional<List<Food>> foodDetailsByType = foodService.getFoodByType(foodType);
		return ResponseEntity.ok(foodDetailsByType.get());
	}
	
	
	// Deleting food details
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deleteFoodByID(@PathVariable("id") Integer id) throws IdNotFoundException {

		String result = foodService.deleteFoodById(id);
		Map<String, String> map = new HashMap<String, String>();

		map.put("Message", result);
		return ResponseEntity.ok(map);
	}
	
}
