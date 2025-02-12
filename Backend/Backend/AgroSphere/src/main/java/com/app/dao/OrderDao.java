package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Order;
import com.app.entities.UserEntity;

public interface OrderDao extends JpaRepository<Order, Long> {

	List<Order> findByBuyer(UserEntity buyer);
}
