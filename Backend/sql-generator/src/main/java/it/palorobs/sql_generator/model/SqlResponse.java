package it.palorobs.sql_generator.model;

public record SqlResponse(
	    String sql, 
	    String explanation
	) {}