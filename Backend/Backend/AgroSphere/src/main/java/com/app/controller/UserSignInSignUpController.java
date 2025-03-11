package com.app.controller;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.UserEntityDao;
import com.app.dto.SigninRequest;
import com.app.dto.SigninResponse;
import com.app.dto.Signup;
import com.app.security.CustomUserDetails;
import com.app.security.JwtUtils;
import com.app.service.EmailService;
import com.app.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
public class UserSignInSignUpController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private UserEntityDao userEntityDao;
    @Autowired
    private JwtUtils utils;

    @Autowired
    private AuthenticationManager mgr;

  

    // Sign-up
    @PostMapping("/signup")
    public ResponseEntity<?> userSignup(@RequestBody @Valid Signup dto) {
        System.out.println("In sign-up: " + dto);

        // Register the user
        // var registeredUser = 
       userService.userRegistration(dto);
        
        System.out.println(dto.getFirstName());
        // Send registration email after successful registration
        String subject = "Registration Successful!";
        String message = "Dear " + dto.getFirstName() + ",\n\n" +
                         "Thank you for registering with us. Your account has been successfully created.\n\n" +
                         "Best regards,\n AgrosphereTeam" ;
                        

        emailService.sendRegistrationEmail(dto.getEmail(), dto.getFirstName());

        // Return response with a success message
        return ResponseEntity.status(HttpStatus.CREATED).body("Registration successful! A confirmation email has been sent.");
    }

    // Sign-in (authenticate user)
    @PostMapping("/signin")
    public ResponseEntity<?> signinUser(@RequestBody @Valid SigninRequest reqDTO) {
        System.out.println("In sign-in: " + reqDTO);

        // Authenticate the user
        Authentication verifiedAuth = mgr.authenticate(new UsernamePasswordAuthenticationToken(
                reqDTO.getEmail(), reqDTO.getPassword()));
        
        CustomUserDetails userDetails = (CustomUserDetails) verifiedAuth.getPrincipal();
        
        // Generate and return JWT token along with user details
        SigninResponse response = new SigninResponse(
                utils.generateJwtToken(verifiedAuth),
                "Successful Authentication!",
                userDetails.getUser().getRole().name(),
                userDetails.getUser().getFirstName(),
                userDetails.getUser().getId()
        );

        return ResponseEntity.ok(response);
    }

}
