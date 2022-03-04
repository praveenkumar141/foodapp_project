package com.learning.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learning.dto.Login;
import com.learning.repository.LoginRepository;
import com.learning.service.LoginService;

@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	private LoginRepository loginRepository;
	
	
	@Override
	public String addCredentials(Login login) {
		
		Login login2 = loginRepository.save(login);
		if(login2!=null)
		{
			return "Success";
		}
		else
		{
			return "Fail";
		}
	}

	
	@Override
	public Login updateCredentials(String email, Login login) {
		// TODO Auto-generated method stub
		return null;
	}

	
	@Override
	public String getCredentialsByEmail(Login login) {
		
		if(loginRepository.existsByEmail(login.getEmail()))
		{
			return "Success";
		}
		else
		{
			return "Fail";
		}
		
	}

}
