package ch.rasc.eventbus.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import ch.rasc.sse.eventbus.config.EnableSseEventBus;

@SpringBootApplication
@EnableScheduling
@EnableSseEventBus
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
