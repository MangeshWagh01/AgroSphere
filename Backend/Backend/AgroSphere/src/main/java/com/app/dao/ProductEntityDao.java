package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Product;

public interface ProductEntityDao extends JpaRepository<Product, Long> {

//	List<Products> findByNameContaining(String name);

}
