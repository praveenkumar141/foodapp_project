package com.learning.dto;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Data;

@Data
@Embeddable
public class Address {
	@Column(name = "house_no")
    private Integer houseno;
    private String street;
    private String city;
    private String state;
    private Integer zip;
}
