package com.app.dto;

public class MarketProductDto 
{
	 private String marketName;
	    private String productDetails;

	    public MarketProductDto(String marketName, String productDetails) {
	        this.marketName = marketName;
	        this.productDetails = productDetails;
	    }

	    public String getMarketName() {
	        return marketName;
	    }

	    public String getProductDetails() {
	        return productDetails;
	    }
}
