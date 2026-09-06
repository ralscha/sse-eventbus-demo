package ch.rasc.eventbus.demo;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;

import ch.rasc.eventbus.demo.DataEmitterService.Dto;
import ch.rasc.sse.eventbus.SseEvent;

class DataEmitterServiceTest {

	@Test
	void publishesTypedReplayableEvents() {
		List<Object> publishedEvents = new ArrayList<>();
		DataEmitterService service = new DataEmitterService(publishedEvents::add);

		service.sendData();

		assertThat(publishedEvents).hasSize(2).allMatch(SseEvent.class::isInstance);
		List<SseEvent> events = publishedEvents.stream().map(SseEvent.class::cast).toList();

		SseEvent gaugeEvent = events.get(0);
		assertThat(gaugeEvent.event()).isEqualTo(SseEvent.DEFAULT_EVENT);
		assertThat(gaugeEvent.id()).contains("1");
		int[] values = (int[]) gaugeEvent.data();
		assertThat(values).hasSize(5);
		assertThat(Arrays.stream(values).allMatch(value -> value >= 0 && value <= 30)).isTrue();

		SseEvent dtoEvent = events.get(1);
		assertThat(dtoEvent.event()).isEqualTo("dto");
		assertThat(dtoEvent.id()).contains("2");
		assertThat(dtoEvent.data()).isEqualTo(new Dto(10, "test"));
	}

}
