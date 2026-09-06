package ch.rasc.eventbus.demo;

import java.time.Duration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import ch.rasc.sse.eventbus.InMemoryReplayStore;
import ch.rasc.sse.eventbus.ReplayStore;
import ch.rasc.sse.eventbus.config.SseEventBusConfigurer;

@Configuration
public class SseEventBusConfiguration implements SseEventBusConfigurer {

	@Bean
	@Override
	public ReplayStore replayStore() {
		return new InMemoryReplayStore(100);
	}

	@Override
	public Duration heartbeatInterval() {
		return Duration.ofSeconds(15);
	}

}
