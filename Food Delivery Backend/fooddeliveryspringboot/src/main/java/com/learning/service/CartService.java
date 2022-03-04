package com.learning.service;

import java.util.List;
import java.util.Optional;

import com.learning.dto.Food;
import com.learning.dto.Register;

public interface CartService {

	public List<Food> addFoodToCart(Register register, int id);
	public Optional<List<Food>> getCart(Register register);
	public void deleteFoodFromCart(Register register, int id);
	public void deleteCart(Register register);
}
