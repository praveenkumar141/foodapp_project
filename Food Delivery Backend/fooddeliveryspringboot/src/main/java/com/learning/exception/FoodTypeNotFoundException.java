package com.learning.exception;

import lombok.ToString;

@ToString(callSuper = true)
public class FoodTypeNotFoundException extends Exception {

	public FoodTypeNotFoundException(String message) {
		super(message);
	}
}
