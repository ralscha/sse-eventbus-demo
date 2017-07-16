package ch.rasc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import ch.rasc.sse.eventbus.SseEvent;
import ch.rasc.sse.eventbus.SseEventBus;

@Controller
public class SseController {

	private final SseEventBus eventBus;

	public SseController(SseEventBus eventBus) {
		this.eventBus = eventBus;
	}

	@GetMapping("/register/{id}")
	public SseEmitter register(@PathVariable("id") String id,
			@RequestHeader(value = "User-Agent") String userAgent) {
		if (userAgent.toLowerCase().contains("edge/")) {
			//use long polling instead of streaming
			//create an emitter that closes the connection after sending each message
			//this is a workaround for the Microsoft Edge
			return this.eventBus.createSseEmitter(id, 180_000L, false, true,
					SseEvent.DEFAULT_EVENT);
		}
		return this.eventBus.createSseEmitter(id, SseEvent.DEFAULT_EVENT);
	}

}
