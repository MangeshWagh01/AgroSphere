package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

import com.app.dao.MarketDao;
import com.app.entities.Market;


@Service
@Transactional

public class MarketServiceImpl implements MarketService
{
	
	@Autowired
	MarketDao marketDao;

	@Override
	public List<Market> getAllMarket() {

		return marketDao.findAll();
	}

	@Override
	public String addMarket(Market obj) {
		
		 marketDao.save(obj);
		 return "Market Added";
	}

	@Override
	public String deleteMarket(Long id) {
		
		if(marketDao.existsById(id))
		{
		marketDao.deleteById(id);
		return "Deleted Successully...";
		}
		return "ID NOT FOUND";
	}

	
	@Override
	public String editMarket(Long id, Market obj) {
		
		if(marketDao.existsById(id))
		{
			Market marketData= marketDao.findById(id).get();
			
			marketData.setAddress(obj.getAddress());
			marketData.setName(obj.getName());
			marketData.setDistrict(obj.getDistrict());
			marketData.setState(obj.getState());
			
			
			 marketDao.save(marketData);
			 return "Value Updatd";
			 
		}
		return "Not Updtated";
	}

	@Override
	public Market getMarket(Long id) 
	{
			return marketDao.findById(id).orElseThrow();	

	}
	
}
