package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.MarketRateDao;
import com.app.entities.MarketRate;


@Service
@Transactional

public class MarketRateServiceImpl implements MarketRateService
{
	@Autowired
	MarketRateDao marketRateDao;

	@Override
	public List<MarketRate> getAllRates() 
	{
		return marketRateDao.findAll();
	}

	@Override
	public String addRate(MarketRate obj) {
		// TODO Auto-generated method stub
		marketRateDao.save(obj);
		return "Added Successfullly...";
	}

	@Override
	public String deleteRate(Long id) {

		if(marketRateDao.existsById(id))
		{
				marketRateDao.deleteById(id);
				return "Deleted...";
		}
		return "ID NOT FOUN...D";
	}

	
	@Override
	public String updateRate(Long id, MarketRate obj) {

		if(marketRateDao.existsById(id))
		{
			MarketRate rates= marketRateDao.findById(id).get();
			
			rates.setRate(obj.getRate());
			rates.setMarket(obj.getMarket());
			rates.setProduct(obj.getProduct());
			
			 marketRateDao.save(rates);
			return "Updated Sucessfully...";
		}
		return "ID NOT FOUND";
	}
	
	
	
	
	
	
	
	

}
