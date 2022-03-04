package com.learning.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "food")
public class Food implements Comparable<Food>{
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@NotBlank
	private String foodName;
	
	@NotNull
	private float foodCost;
	
	@Enumerated(EnumType.STRING)
	@Column(length = 30)
	private EFOOD foodType;
	
	@NotBlank
	private String description;
	
	@NotBlank
	private String foodPic;
	
	
	
	@Override
	public int compareTo(Food o) {
		// TODO Auto-generated method stub
		return 0;
	}

}
