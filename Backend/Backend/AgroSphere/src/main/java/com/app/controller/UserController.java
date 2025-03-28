package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.FarmerListDto;
import com.app.entities.UserEntity;
import com.app.service.UserService;


@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")

public class UserController 
{

		@Autowired
		UserService userService;
		
		
		@GetMapping("/list")
		
		public ResponseEntity<?> getAllFarmers()
		{
			List<FarmerListDto> users = userService.getUsers();
			
			if(users.isEmpty())
				return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
			
			return ResponseEntity.ok(users);
			
		}

	
		@PutMapping("/edit/{id}")
		public ResponseEntity<?> updateUsers(@PathVariable Long id,@RequestBody UserEntity obj) {
		    System.out.println(obj);
		    return ResponseEntity.status(HttpStatus.ACCEPTED).body(userService.updateUser(id,obj));
		}

		
		
		@DeleteMapping("/delete/{id}")
		public ResponseEntity<?> deleteUser(@PathVariable Long id) {
		   return ResponseEntity.ok(userService.deleteUser(id));
		}


		@GetMapping("/{id}")
		public ResponseEntity<?> getUsers(@PathVariable Long id) {
		    try {
		        UserEntity user = userService.getUsers(id);
		        return ResponseEntity.ok(user);  // Return user if found
		    } catch (RuntimeException e) {
		        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with id: " + id);  // Return error message if user is not found
		    }
		}
}
