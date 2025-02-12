package com.app.service;

import java.util.List;

import com.app.entities.Order;

public interface OrderService 
{


	List<Order> getAllOrders();

	List<Order> getByBuyerId(Long id);

	Order createOrder(Long buyerId, Long prodId, Long marketId, Long appointmentId, Long quantity, Double rate);

}
