package ch.rasc.eventbus.demo;

import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import ch.rasc.sse.eventbus.SseEvent;

@Service
public class DataEmitterService {

	public record Dto(int i, String s) {
	}

	private final ApplicationEventPublisher eventPublisher;

	private final AtomicLong eventId = new AtomicLong();

	public DataEmitterService(ApplicationEventPublisher eventPublisher) {
		this.eventPublisher = eventPublisher;
	}

	@Scheduled(initialDelay = 2000, fixedRate = 5_000)
	public void sendData() {
		int[] values = ThreadLocalRandom.current().ints(5, 0, 31).toArray();
		this.eventPublisher.publishEvent(SseEvent.builder().data(values).id(nextEventId()).build());

		this.eventPublisher
			.publishEvent(SseEvent.builder().event("dto").data(new Dto(10, "test")).id(nextEventId()).build());
	}

	private String nextEventId() {
		return Long.toString(this.eventId.incrementAndGet());
	}

}
