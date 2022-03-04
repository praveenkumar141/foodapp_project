package com.learning.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learning.dto.Food;
import com.learning.dto.Register;
import com.learning.repository.FoodRepository;
import com.learning.repository.UserRepository;
import com.learning.service.CartService;

@Service
public class CartServiceImpl implements CartService{
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	FoodRepository foodRepository;
	
	@Override
	public List<Food> addFoodToCart(Register register, int id) {
		// TODO Auto-generated method stub
		List<Food> cart = register.getCart();
		Food food = foodRepository.getById(id);
		cart.add(food);
		register.setCart(cart);
		userRepository.save(register);
		return register.getCart();
	}

	@Override
	public Optional<List<Food>> getCart(Register register) {
		// TODO Auto-generated method stub
		List<Food> cart = register.getCart();
		return Optional.ofNullable(cart);
	}

	@Override
	public void deleteFoodFromCart(Register register, int id) {
		// TODO Auto-generated method stub
		List<Food> cart = register.getCart();
		Food food = foodRepository.getById(id);
		cart.remove(food);
		register.setCart(cart);
		userRepository.save(register);
	}

	@Override
	public void deleteCart(Register register) {
		// TODO Auto-generated method stub
		register.setCart(new ArrayList<Food>());
		userRepository.save(register);
	}
}
