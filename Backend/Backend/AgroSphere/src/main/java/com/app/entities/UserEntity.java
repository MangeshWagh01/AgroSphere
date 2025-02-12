package com.app.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = "password") // toString excluding password

public class UserEntity extends BaseEntity {
	@Column(length = 20)
	private String firstName;
	@Column(length = 20)
	private String lastName;
	@Column(length = 30, unique = true)
	private String email;
	//@Column(length = 300, nullable = false)
	@Column(length = 300)
	private String password;
	private String address;
	private String contactNo;	
	@Enumerated(EnumType.STRING)
	@Column(length = 30)
	private UserRole role;
	   
	@CreationTimestamp
	private LocalDate created_on;
	
	@UpdateTimestamp
	private  LocalDate updated_on;
	private String passwordResetToken;
    private LocalDateTime tokenExpirationDate;
	public LocalDateTime getTokenExpirationDate() {
		// TODO Auto-generated method stub
		return null;
	}

	public void setTokenExpirationDate(LocalDateTime plusHours) {
		// TODO Auto-generated method stub
		
	}

	public void setPasswordResetToken(String resetToken) {
		// TODO Auto-generated method stub
		
	}


}
