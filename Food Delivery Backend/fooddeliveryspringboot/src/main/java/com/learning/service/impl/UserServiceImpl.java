package com.learning.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learning.dto.Login;
import com.learning.dto.Register;
import com.learning.exception.AlreadyExistsException;
import com.learning.exception.IdNotFoundException;
import com.learning.repository.UserRepository;
import com.learning.service.LoginService;
import com.learning.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private LoginService loginService;
	
	
	
	@Override
	@org.springframework.transaction.annotation.Transactional(rollbackFor = AlreadyExistsException.class)
	public Register addUser(Register register) throws AlreadyExistsException {
		
		// Duplication check
		if(userRepository.existsByEmail(register.getEmail())) {
			throw new AlreadyExistsException("This User Already Exists");
		}
		
		
		Register addRegister = userRepository.save(register);
		
		if(addRegister != null) {
			
//			Login login = new Login(register.getEmail(), register.getPassword());
//			String result = loginService.addCredentials(login);
//			System.out.println(login);
//			
//			if(result.equals("Success"))
//			{
//				return addRegister;
//			}
//			else {
//				return null;
//			}
			return register;
		}
		else {
			return null;
		}
		
	}

	
	@Override
	public Register getUserById(Long id) throws IdNotFoundException {
		
		Optional<Register> optional =  userRepository.findById(id);
		
		if(optional.isEmpty()) {
			throw new IdNotFoundException("Sorry, User with " + Long.toString(id) + " not found");
		}
		else {
			return optional.get();
		}
	}

	
	@Override
	public String updateUser(Long id, Register register) {
		// TODO Auto-generated method stub
		return null;
	}

	
	@Override
	public String deleteUserById(Long id) throws IdNotFoundException {
		
		Register userRecord = null;
		
		try {
			userRecord = this.getUserById(id);
			if(userRecord == null) {
				throw new IdNotFoundException("Sorry, User with " + Long.toString(id) + " not found");
			}
			else {
				userRepository.deleteById(id);
				return "User Deleted Successfully";
			}
		} 
		catch (IdNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new IdNotFoundException("Sorry, User with " + Long.toString(id) + " not found");
		}
	}

	
	@Override
	public Optional<List<Register>> getAllUserDetails() {
		
		return Optional.ofNullable(userRepository.findAll());
	}

}
