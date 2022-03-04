package com.learning.controller;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning.dto.EROLE;
import com.learning.dto.Register;
import com.learning.dto.Role;
import com.learning.exception.IdNotFoundException;
import com.learning.payload.request.LoginRequest;
import com.learning.payload.request.SignupRequest;
import com.learning.payload.response.JwtResponse;
import com.learning.payload.response.MessageResponse;
import com.learning.repository.RoleRepository;
import com.learning.repository.UserRepository;
import com.learning.security.jwt.JwtUtils;
import com.learning.security.services.UserDetailsImpl;
import com.learning.service.UserService;


@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	UserService userService = null;

	@Autowired
	UserRepository userRepository = null;

	@Autowired
	RoleRepository roleRepository = null;

	@Autowired
	PasswordEncoder passwordEncoder = null;

	@Autowired
	JwtUtils jwtUtils;

	@Autowired
	AuthenticationManager authenticationManager;

	
	// User authentication is handled here
	
	@PostMapping("/authenticate")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		
		if(!(userRepository.existsByEmail(loginRequest.getEmail()))) {
			return ResponseEntity.status(403).body(new MessageResponse("Error: Email does not exist"));
		}
		
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail()
						, loginRequest.getPassword()));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateToken(authentication);
		UserDetailsImpl userDetailsImpl = (UserDetailsImpl) authentication.getPrincipal();
		
		List<String> roles = userDetailsImpl.getAuthorities()
								.stream()
								.map(i->i.getAuthority())
								.collect(Collectors.toList());
		
		return ResponseEntity.ok(new JwtResponse(jwt, 
				userDetailsImpl.getId(), 
				userDetailsImpl.getUsername(), 
				userDetailsImpl.getEmail(), 
				roles));
	}
	
	
	// Registering the new user, provided same username and email do not exist
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {

		if (userRepository.existsByUsername(signupRequest.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken"));
		}

		if (userRepository.existsByEmail(signupRequest.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use"));
		}

		Register register = new Register(signupRequest.getUsername(), signupRequest.getEmail(),
				passwordEncoder.encode(signupRequest.getPassword()), signupRequest.getAddress());

		Set<String> strRoles = signupRequest.getRole();

		Set<Role> roles = new HashSet<Role>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByRoleName(EROLE.ROLE_ADMIN)
					.orElseThrow(() -> new RuntimeException("Error: Role Not Found"));
			roles.add(userRole);
		} 
		else {
			strRoles.forEach(e -> {
				switch (e) {
				case "admin":
					Role roleAdmin = roleRepository.findByRoleName(EROLE.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role Not Found"));

					roles.add(roleAdmin);
					break;

				default:
					Role userRole = roleRepository.findByRoleName(EROLE.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role Not Found"));

					roles.add(userRole);
					break;
				}
			});

		}
		
		register.setRoles(roles);
		userRepository.save(register);
		
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(signupRequest.getEmail()
						, signupRequest.getPassword()));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateToken(authentication);
		UserDetailsImpl userDetailsImpl = (UserDetailsImpl) authentication.getPrincipal();
		
		List<String> roles1 = userDetailsImpl.getAuthorities()
								.stream()
								.map(i->i.getAuthority())
								.collect(Collectors.toList());
		
		return ResponseEntity.ok(new JwtResponse(jwt, 
				userDetailsImpl.getId(), 
				userDetailsImpl.getUsername(), 
				userDetailsImpl.getEmail(), 
				roles1));
//		return ResponseEntity.status(201).body(new MessageResponse("User Created Successfully"));
	}

	@GetMapping("/auth/{authToken}")
	public ResponseEntity<?> auth(@PathVariable("authToken") String authToken){
		if(jwtUtils.validateJwtToken(authToken)) 
		{
			String username = jwtUtils.getUserNameFromJwtToken(authToken) ;
			Optional<Register> register = userRepository.findByEmail(username);
			return ResponseEntity.ok(register.get());
		}
		return ResponseEntity.status(400).body(new MessageResponse("Unauthorized"));
	}
	
	// Retrieving all user details
	@GetMapping("/users")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> getAllUserDetails() {

		Optional<List<Register>> allUserDetails = userService.getAllUserDetails();

		if (allUserDetails.isEmpty()) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("Message", "No Record Found");
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(map);
		}
		return ResponseEntity.ok(allUserDetails.get());
	}

	
	// Retrieving user details based on their ID
	@GetMapping("/users/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> getUserById(@PathVariable("id") Long id) throws IdNotFoundException {

		Register userDetails = userService.getUserById(id);
		return ResponseEntity.ok(userDetails);
	}

	
	// Updating user details
	@PutMapping("/users/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> updateUserDetails(@PathVariable("id") Long id,
			@Valid @RequestBody Map<String, String> updateDetails) throws IdNotFoundException {

		Register userDetails = userService.getUserById(id);

		userDetails.setEmail(updateDetails.get("email"));
		userDetails.setPassword(updateDetails.get("password"));
		userDetails.setAddress(updateDetails.get("address"));

		Register updatedDetails = userRepository.save(userDetails);

		return ResponseEntity.ok(updatedDetails);
	}

	
	// Deleting user details
	@DeleteMapping("/users/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deleteUserByID(@PathVariable("id") Long id) throws IdNotFoundException {

		String result = userService.deleteUserById(id);
		Map<String, String> map = new HashMap<String, String>();

		map.put("Message", result);
		return ResponseEntity.ok(map);
	}

}
