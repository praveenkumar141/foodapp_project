package com.learning.payload.response;

import java.util.List;

import com.learning.dto.Food;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartResponse {
	List<Food> cart;
}
