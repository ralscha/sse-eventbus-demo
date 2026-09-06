package ch.rasc.eventbus.demo;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ScheduledExecutorService;

import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import ch.rasc.sse.eventbus.DefaultSubscriptionRegistry;
import ch.rasc.sse.eventbus.SseEvent;
import ch.rasc.sse.eventbus.SseEventBus;
import ch.rasc.sse.eventbus.config.SseEventBusConfigurer;

class SseControllerTest {

	@Test
	void registersReplayableProxySafeConnection() {
		RecordingSseEventBus eventBus = new RecordingSseEventBus();
		MockHttpServletResponse response = new MockHttpServletResponse();

		SseEmitter result = new SseController(eventBus).register("client-1", "event-7", response);

		assertThat(result).isSameAs(eventBus.emitter);
		assertThat(response.getHeader("Cache-Control")).isEqualTo("no-store");
		assertThat(response.getHeader("X-Accel-Buffering")).isEqualTo("no");
		assertThat(eventBus.clientId).isEqualTo("client-1");
		assertThat(eventBus.lastEventId).isEqualTo("event-7");
		assertThat(eventBus.events).containsExactly(SseEvent.DEFAULT_EVENT, "dto");
	}

	private static final class RecordingSseEventBus extends SseEventBus {

		private final SseEmitter emitter = new SseEmitter();

		private String clientId;

		private String lastEventId;

		private List<String> events;

		private RecordingSseEventBus() {
			super(new SseEventBusConfigurer() {
				@Override
				public ScheduledExecutorService taskScheduler() {
					return null;
				}
			}, new DefaultSubscriptionRegistry(), List.of(), null);
		}

		@Override
		public SseEmitter createReplayableSseEmitter(String clientId, String lastEventId, String... events) {
			this.clientId = clientId;
			this.lastEventId = lastEventId;
			this.events = Arrays.asList(events);
			return this.emitter;
		}

	}

}
