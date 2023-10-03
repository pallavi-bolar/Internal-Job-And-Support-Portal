package com.axis.ijp.cors;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") // Adjust the mapping based on your API endpoints
                        .allowedOrigins("http://localhost:3000") // Add the allowed origin(s)
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // Add the allowed HTTP methods
                        .allowedHeaders("*"); // Allow all headers
            }
        };
    }
}
