package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.OrderRequestdDto;
import com.app.entities.Order;
import com.app.service.OrderService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "http://localhost:3000")


public class OrderController 
{

	@Autowired
	OrderService orderService;
	
	@PostMapping("/add")
	public ResponseEntity<Order>createOrder(@RequestBody OrderRequestdDto orderRequest)
	{
		try {
			
			Order order= orderService.createOrder(
					orderRequest.getBuyerId(),
					orderRequest.getProductId(),
					orderRequest.getMarketId(),
					orderRequest.getAppointmentId(),
					orderRequest.getQuantity(),
					orderRequest.getRate()
					
					);
			return new ResponseEntity<>(order , HttpStatus.CREATED);
					
		}catch (Exception e) 
		{
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		}
	}
	
	
	@GetMapping("/list")
	public List<Order>getAllOrders()
	{
		return orderService.getAllOrders();
	}
	
	
	@GetMapping("/{id}")
	public List<Order>getByBuyerId(@PathVariable Long id)
	{
		return orderService.getByBuyerId(id);
	}
	
	
}
