package io.aetherit.kfashion.ws.configuration;

import io.aetherit.kfashion.ws.configuration.support.TomcatProperties;
import io.aetherit.kfashion.ws.util.*;
import org.apache.catalina.connector.Connector;
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;
import org.springframework.aop.interceptor.SimpleAsyncUncaughtExceptionHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.MimeMappings;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.awt.image.BufferedImage;
import java.io.UnsupportedEncodingException;
import java.util.concurrent.Executor;

import org.apache.catalina.connector.Connector;
import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;
import org.springframework.aop.interceptor.SimpleAsyncUncaughtExceptionHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.MimeMappings;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.converter.BufferedImageHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.client.RestTemplate;


@Configuration
@EnableAsync
public class ApplicationConfiguration implements AsyncConfigurer {

    @Value("${spring.http.encoding.charset}")
    private String encoding;

    @Value("${restTemplate.factory.readTimeout}")
    private int readTimeout;

    @Value("${restTemplate.factory.connectTimeout}")
    private int connectTimeout;

    @Value("${restTemplate.httpClient.maxConnTotal}")
    private int maxConnTotal;

    @Value("${restTemplate.httpClient.maxConnPerRoute}")
    private int maxConnPerRoute;


    @Override
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(200);
        executor.setQueueCapacity(20);
        executor.initialize();

        return executor;
    }

    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return new SimpleAsyncUncaughtExceptionHandler();
    }

    // Tomcat configuration
    @Bean
    public TomcatServletWebServerFactory servletContainer(TomcatProperties tomcatProperties) {
        final TomcatServletWebServerFactory factory = new TomcatServletWebServerFactory() {
            @Override
            protected void customizeConnector(Connector connector) {
                super.customizeConnector(connector);

                connector.setProperty("maxThreads", 			tomcatProperties.getMaxThreads());
                connector.setProperty("minSpareThreads", 		tomcatProperties.getMinSpareThreads());
                connector.setProperty("maxConnections",		    tomcatProperties.getMaxConnections());
                connector.setProperty("connectionLinger", 	    tomcatProperties.getConnectionLingers());
                connector.setProperty("connectionTimeout", 	    tomcatProperties.getConnectionTimeout());
                connector.setProperty("keepAliveTimeout", 	    tomcatProperties.getKeepAliveTimeout());
                connector.setProperty("maxKeepAliveRequests",   tomcatProperties.getMaxKeepAliveRequests());
                connector.setProperty("server", 				tomcatProperties.getServerInfo());
            }

        };

        final MimeMappings mimeMappings = new MimeMappings(MimeMappings.DEFAULT);
        mimeMappings.add("wasm", "application/wasm");

        factory.setMimeMappings(mimeMappings);

        return factory;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public SystemEnvUtil systemEnvUtil() {
        return new SystemEnvUtil();
    }

    @Bean
    public CommonUtil commonUtil() {
        return new CommonUtil();
    }

    @Bean
    public MailTemplate mailTemplate() {
        return new MailTemplate();
    }

    @Bean
    public AES256Util aesUtil() throws UnsupportedEncodingException {
        return new AES256Util();
    }

    @Bean
    public JwtTokenUtil jwtTokenUtil() {
        return new JwtTokenUtil();
    }

    @Bean
    public HttpMessageConverter<BufferedImage> createImageHttpMessageConverter() {
        return new BufferedImageHttpMessageConverter();
    }

    @Bean
    public RestTemplate restTemplate() {

        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        factory.setReadTimeout(readTimeout);
        factory.setConnectTimeout(connectTimeout);

        HttpClient httpClient = HttpClientBuilder.create()
                .setMaxConnTotal(maxConnTotal)
                .setMaxConnPerRoute(maxConnPerRoute)
                .build();

        factory.setHttpClient(httpClient);
        RestTemplate restTemplate = new RestTemplate(factory);

        return restTemplate;
    }

}
