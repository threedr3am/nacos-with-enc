package com.alibaba.nacos.console.config;

import com.ulisesbocchio.jasyptspringboot.encryptor.SimpleGCMConfig;
import com.ulisesbocchio.jasyptspringboot.encryptor.SimpleGCMStringEncryptor;
import org.jasypt.encryption.StringEncryptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JasyptConfig {

    @Bean
    public StringEncryptor encryptor() {
        SimpleGCMConfig config = new SimpleGCMConfig();
        config.setSecretKey(System.getenv("jasypt_secret"));
        return new SimpleGCMStringEncryptor(config);
    }
}
