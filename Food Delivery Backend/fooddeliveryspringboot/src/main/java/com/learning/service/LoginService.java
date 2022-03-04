package com.learning.service;

import com.learning.dto.Login;

public interface LoginService {

	public String addCredentials(Login login);
	public Login updateCredentials(String email, Login login);
	public String getCredentialsByEmail(Login login);
}
