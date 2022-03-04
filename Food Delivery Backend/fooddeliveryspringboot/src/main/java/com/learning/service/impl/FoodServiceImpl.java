package com.learning.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learning.dto.EFOOD;
import com.learning.dto.Food;
import com.learning.exception.FoodTypeNotFoundException;
import com.learning.exception.IdNotFoundException;
import com.learning.repository.FoodRepository;
import com.learning.service.FoodService;

@Service
public class FoodServiceImpl implements FoodService {

	@Autowired
	private FoodRepository foodRepository;
	
	
	
	@Override
	public Food addFood(Food food) {
		
		Food foodRecord = foodRepository.save(food);
		
		if(foodRecord != null) {
			return foodRecord;
		}
		else {
			return null;
		}
	}

	
	@Override
	public Food getFoodById(Integer id) throws IdNotFoundException {
		
		Optional<Food> optional = foodRepository.findById(id);
		
		if(optional.isEmpty()) {
			throw new IdNotFoundException("Sorry, Food Not Found");
		}
		else {
			return optional.get();
		}
	}

	
	@Override
	public String updateFoodDetails(Integer id, Food food) {
		// TODO Auto-generated method stub
		return null;
	}

	
	@Override
	public String deleteFoodById(Integer id) throws IdNotFoundException {
		
		Food foodRecord = null;
		
		try {
			foodRecord = this.getFoodById(id);
			
			if(foodRecord == null) {
				throw new IdNotFoundException("Sorry, Food Item Not Found");
			}
			else {
				foodRepository.deleteById(id);
				return "Food Item Deleted";
			}
		} 
		catch (IdNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new IdNotFoundException("Sorry, Food Item Not Found");
		}
	}

	
	@Override
	public Optional<List<Food>> getAllFoodDetails() {
		
		return Optional.ofNullable(foodRepository.findAll());
	}


	@Override
	public Optional<List<Food>> getFoodByType(String foodType) throws FoodTypeNotFoundException {
		
		Optional<List<Food>> foodDetailsByType = foodRepository.findByFoodType(EFOOD.valueOf(foodType));
		
		if(foodDetailsByType.get().isEmpty()) {
			throw new FoodTypeNotFoundException("Sorry, Food Type Not Found");
		}
		return foodDetailsByType;
	}

}
