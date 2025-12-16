package it.palorobs.sql_generator.service;

import dev.langchain4j.service.MemoryId;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import dev.langchain4j.service.V;
import dev.langchain4j.service.spring.AiService;
import it.palorobs.sql_generator.model.SqlResponse;

@AiService
public interface SqlGeneratorAgent {

	@SystemMessage("""
	        You are a Senior Polyglot Database Architect.
	        Your task is to convert natural language requests into executable database query code.
	        
	        General Rules:
	        1. Carefully analyze the requested dialect (e.g., MySQL, PostgreSQL, Oracle, MongoDB).
	        2. Return ONLY the raw executable code. Do not use markdown formatting (no ```).
	        3. Provide a brief technical explanation in English.
	        
	        Rules for SQL (Relational):
	        - If the dialect is SQL (MySQL, Postgres, Oracle...): Generate standard SQL queries.
	        - Use appropriate JOINs and clauses based strictly on the provided DDL schema.
	        
	        Rules for NoSQL (MongoDB):
	        - If the dialect is MongoDB: Generate Mongo shell syntax (e.g., `db.collection.find({...})` or `db.collection.aggregate([...])`).
	        - If the schema is provided as a JSON sample, use it to infer field names and nested structures.
	        - Prefer the Aggregation Pipeline for complex queries.
	        """)
	    @UserMessage("""
	        Target Dialect: {{dialect}}
	        
	        Database Schema:
	        {{schema}}
	        
	        User Request:
	        {{query}}
	        """)
    SqlResponse generateSql(
    	@MemoryId String conversationId,
        @V("query") String query,
        @V("dialect") String dialect,
        @V("schema") String schema
    );
}
