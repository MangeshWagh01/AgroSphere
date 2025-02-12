package com.app.dto;

import java.time.LocalDate;

import com.app.entities.UserRole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor


@Builder
public class FarmerListDto 
{
	private Long id;
	private String firstName;
	private String lastName;
	private String email;
	private String address;
	private String contactNo;	
	private UserRole role;
	private String password;
//	private LocalDate created_on;
//	private  LocalDate updated_on;
	
}
