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
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Product;
import com.app.service.ProductService;

@RestController
@RequestMapping("/product")

@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
	@Autowired
	private ProductService productService;	
	
	@GetMapping("/list")
	public ResponseEntity<?> getAllProducts(){
		List<Product> products = productService.getProducts();
		if(products.isEmpty())
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        
        return ResponseEntity.ok(products);    
	}
	
	@PostMapping("/add")
	public ResponseEntity<?> addProduct(@RequestBody Product product){
        return ResponseEntity.status(HttpStatus.CREATED).
        		body(productService.addProduct(product));
    }    	
	
	@DeleteMapping("/delete/{productId}")
	public ResponseEntity<?> deleteProduct(@PathVariable Long productId){
		try {
			return ResponseEntity.ok(productService.deleteProduct(productId));
				} catch (Exception e) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
                }
        } {
	}
        
    @PutMapping("/edit/{productId}")
    	public ResponseEntity<?> updateProduct(@RequestBody Product product,@PathVariable Long productId){	
    		return ResponseEntity.ok(productService.updateProduct(product ,productId));
    	}
    	
    }
    

