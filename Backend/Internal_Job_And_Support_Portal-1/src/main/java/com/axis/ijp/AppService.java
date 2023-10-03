//package com.axis.ijp;
//
//import com.axis.ijp.AppConfiguration;
//import org.springframework.stereotype.Service;
//
//import jakarta.annotation.PostConstruct;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//@Service
//public class AppService {
//    private final AppConfiguration appConfiguration;
//    private static final Logger log = LoggerFactory.getLogger(AppService.class);
//
//    public AppService(AppConfiguration appConfiguration) {
//        this.appConfiguration = appConfiguration;
//    }
//
//    @PostConstruct
//    public void readConfigs() {
//        log.info("Reading configuration {} - {}", appConfiguration.getToken(), appConfiguration.getUsername());
//    }
//
//    // Manually create getters for the properties you need
//    public String getToken() {
//        return appConfiguration.getToken();
//    }
//
//    public String getUsername() {
//        return appConfiguration.getUsername();
//    }
//}
