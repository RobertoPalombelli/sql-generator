package it.palorobs.sql_generator.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import dev.langchain4j.memory.chat.ChatMemoryProvider;
import dev.langchain4j.memory.chat.MessageWindowChatMemory;
import dev.langchain4j.model.chat.ChatModel;
import dev.langchain4j.model.github.GitHubModelsChatModel;

@Configuration
public class ModelConfiguration {
	
	@Value("${github.configuration.token}")
    private String gitHubToken;

    @Bean
    ChatModel gitHubModelsChatModel() {
        return GitHubModelsChatModel.builder()
                .gitHubToken(gitHubToken)
                .modelName("gpt-4o-mini")
                .logRequestsAndResponses(true)
                .build();
    }
    
    @Bean
    ChatMemoryProvider chatMemoryProvider() {
        return memoryId -> MessageWindowChatMemory.withMaxMessages(10);
    }

}
