package com.learning.dto;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
//@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "register", uniqueConstraints = { @UniqueConstraint(columnNames = "username"),
		@UniqueConstraint(columnNames = "email") })

public class Register implements Comparable<Register> {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Size(max = 55)
	@NotBlank
	private String username;

	@Size(max = 50)
	@Email
	private String email;

	@Size(max = 150)
	@NotBlank
	private String password;

	@NotBlank
	private String address;

	@OneToOne(mappedBy = "register", cascade = CascadeType.ALL)
	private Login login;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "cart", joinColumns = @JoinColumn(name = "userId"),
	inverseJoinColumns = @JoinColumn(name  = "foodId"))
	private List<Food> cart = new ArrayList<Food>();

	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "regId"), inverseJoinColumns = @JoinColumn(name = "roleId"))
	private Set<Role> roles = new HashSet<Role>();

	@Override
	public int compareTo(Register o) {
		// TODO Auto-generated method stub
		return 0;
	}

	public Register(String username, String email, String password, String address) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.address = address;
	}

}
