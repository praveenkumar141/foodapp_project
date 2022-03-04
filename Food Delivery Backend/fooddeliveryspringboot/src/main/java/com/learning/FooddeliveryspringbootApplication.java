package com.learning;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import com.learning.repository.FoodRepository;
import com.learning.repository.UserRepository;
import com.learning.service.FoodService;
import com.learning.service.UserService;

@SpringBootApplication
public class FooddeliveryspringbootApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext applicationContext = SpringApplication.run(FooddeliveryspringbootApplication.class, args);
		
//		UserService userService = applicationContext.getBean(UserService.class);
//		FoodService foodService = applicationContext.getBean(FoodService.class);
//		
//		UserRepository userRepository = applicationContext.getBean(UserRepository.class);
//		FoodRepository foodRepository = applicationContext.getBean(FoodRepository.class);
//		
//		applicationContext.close();
	}

}
