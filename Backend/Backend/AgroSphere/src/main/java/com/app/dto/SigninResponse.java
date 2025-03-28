package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class SigninResponse {
	private String jwt;
	private String mesg;
	private String role;
	private String firstName;
	private Long  id;
}
