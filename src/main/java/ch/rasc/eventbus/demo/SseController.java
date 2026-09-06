package ch.rasc.eventbus.demo;

import jakarta.servlet.http.HttpServletResponse;

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
			@RequestHeader(name = "Last-Event-ID", required = false) String lastEventId, HttpServletResponse response) {
		response.setHeader("Cache-Control", "no-store");
		response.setHeader("X-Accel-Buffering", "no");
		return this.eventBus.createReplayableSseEmitter(id, lastEventId, SseEvent.DEFAULT_EVENT, "dto");
	}

}
