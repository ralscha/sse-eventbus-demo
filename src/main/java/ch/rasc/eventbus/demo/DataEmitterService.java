package ch.rasc.eventbus.demo;

import java.util.Random;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import ch.rasc.sse.eventbus.SseEvent;

@Service
public class DataEmitterService {

	private final ApplicationEventPublisher eventPublisher;

	// OR: private final ApplicationContext ctx;
	// this bean implements the ApplicationEventPublisher interface

	private final static Random random = new Random();

	public DataEmitterService(ApplicationEventPublisher eventPublisher) {
		this.eventPublisher = eventPublisher;
	}

	@Scheduled(initialDelay = 2000, fixedRate = 5_000)
	public void sendData() {
		StringBuilder sb = new StringBuilder("[");
		for (int i = 0; i < 5; i++) {
			sb.append(random.nextInt(31));
			sb.append(",");
		}
		sb.replace(sb.length() - 1, sb.length(), "]");
		this.eventPublisher.publishEvent(SseEvent.ofData(sb.toString()));
	}

}
