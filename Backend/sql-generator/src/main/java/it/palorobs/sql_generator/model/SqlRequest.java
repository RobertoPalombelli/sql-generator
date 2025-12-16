package it.palorobs.sql_generator.model;

public record SqlRequest(
	    String naturalLanguageQuery, 
	    String dialect,              
	    String schemaContent,  
	    String conversationId
	) {}
