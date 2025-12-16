package it.palorobs.sql_generator.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import it.palorobs.sql_generator.model.SqlRequest;
import it.palorobs.sql_generator.model.SqlResponse;
import it.palorobs.sql_generator.service.SqlGeneratorAgent;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/sql")
@CrossOrigin("http://localhost:5173")
@Slf4j
public class SqlController {

    private final SqlGeneratorAgent sqlAgent;

    public SqlController(SqlGeneratorAgent sqlAgent) {
        this.sqlAgent = sqlAgent;
       
    }

    @PostMapping("/generate")
    public ResponseEntity<SqlResponse> generateFromText(@RequestBody SqlRequest request) {  	
    	
    	SqlResponse response = sqlAgent.generateSql(
    		request.conversationId(),
            request.naturalLanguageQuery(),
            request.dialect(),
            request.schemaContent()
        );
        return ResponseEntity.ok(response);
    }

   
}
