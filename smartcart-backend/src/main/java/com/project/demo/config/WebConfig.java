//
//package com.project.demo.config;
//
//import org.springframework.context.annotation.Bean;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class WebConfig {
//
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//        	@Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/api/**") // Allow all endpoints
//                        .allowedOriginPatterns("http://localhost:5173") // Allow requests from all origins (for development only)
//                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow these HTTP methods
//                        .allowedHeaders("*") // Allow all headers
//                        .allowCredentials(true);
//            }
//        };
//    }
//}