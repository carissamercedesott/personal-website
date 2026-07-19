// Live interaction demos for the Waddl case study. Each demo is a small,
// self-contained rebuild of a Waddl pattern; all of them collapse to an
// instant (non-animated) render under prefers-reduced-motion.

(function initWaddlDemos() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // ── Streaming text ──
  const streamOutput = document.getElementById("stream-output");
  const streamPlay = document.getElementById("stream-play");
  const streamStatus = document.getElementById("stream-status");

  if (streamOutput && streamPlay) {
    const SCRIPT = [
      { text: "reading src/greeting.ts …", pause: 500 },
      { text: " found the greeting logic.", pause: 700 },
      { text: "\nhmm — this always says \"Hello\", even at 7am.", pause: 900 },
      { text: "\nediting src/greeting.ts …", pause: 500 },
      { text: " done! mornings are greeted properly now. 🌅", pause: 0 },
    ];

    let timer = null;

    function setStatus(text) {
      if (streamStatus) streamStatus.textContent = text;
    }

    function renderInstant() {
      streamOutput.textContent = SCRIPT.map((step) => step.text).join("");
      setStatus("done");
      streamPlay.textContent = "Replay narration";
      streamPlay.disabled = false;
    }

    function streamStep(stepIndex, charIndex) {
      if (stepIndex >= SCRIPT.length) {
        streamOutput.querySelector(".stream-cursor")?.remove();
        setStatus("done");
        streamPlay.textContent = "Replay narration";
        streamPlay.disabled = false;
        return;
      }

      const step = SCRIPT[stepIndex];
      if (charIndex < step.text.length) {
        const cursor = streamOutput.querySelector(".stream-cursor");
        cursor?.remove();
        streamOutput.append(step.text[charIndex]);
        if (cursor) streamOutput.append(cursor);
        timer = setTimeout(() => streamStep(stepIndex, charIndex + 1), 24);
      } else {
        // Between steps the agent "thinks": the cursor holds, blinking.
        setStatus(stepIndex === SCRIPT.length - 1 ? "done" : "thinking…");
        timer = setTimeout(() => {
          setStatus("working");
          streamStep(stepIndex + 1, 0);
        }, step.pause);
      }
    }

    streamPlay.addEventListener("click", () => {
      clearTimeout(timer);
      streamOutput.textContent = "";

      if (reducedMotion.matches) {
        renderInstant();
        return;
      }

      const cursor = document.createElement("span");
      cursor.className = "stream-cursor";
      cursor.setAttribute("aria-hidden", "true");
      streamOutput.append(cursor);
      streamPlay.disabled = true;
      setStatus("working");
      streamStep(0, 0);
    });
  }

  // ── Collapsible diff ──
  const diffToggle = document.getElementById("diff-toggle");
  const diffBody = document.getElementById("diff-body");

  if (diffToggle && diffBody) {
    // Stagger indexes for the cascade; assigned once up front.
    diffBody.querySelectorAll(".diff-line").forEach((line, index) => {
      line.style.setProperty("--line-index", String(index));
    });

    diffToggle.addEventListener("click", () => {
      const expanded = diffToggle.getAttribute("aria-expanded") === "true";
      diffToggle.setAttribute("aria-expanded", String(!expanded));
      diffBody.hidden = expanded;
    });
  }

  // ── Error state ──
  const taskRow = document.getElementById("task-row");
  const taskIcon = document.getElementById("task-icon");
  const taskText = document.getElementById("task-text");
  const taskError = document.getElementById("task-error");
  const taskRun = document.getElementById("task-run");
  const taskRetry = document.getElementById("task-retry");

  if (taskRow && taskRun && taskRetry) {
    const ICONS = { idle: "○", running: "◔", error: "✕", done: "✓" };
    let timer = null;

    function setState(state, text) {
      taskRow.dataset.state = state;
      taskIcon.textContent = ICONS[state];
      taskText.textContent = text;
    }

    function runTask() {
      clearTimeout(timer);
      taskError.hidden = true;
      taskRun.disabled = true;
      setState("running", "running the test suite…");
      const delay = reducedMotion.matches ? 0 : 900;
      timer = setTimeout(() => {
        setState("error", "test suite failed");
        taskError.hidden = false;
        taskRetry.focus();
      }, delay);
    }

    function retryTask() {
      clearTimeout(timer);
      taskError.hidden = true;
      setState("running", "fixing greeting.test.ts …");
      const delay = reducedMotion.matches ? 0 : 1100;
      timer = setTimeout(() => {
        setState("done", "tests passing — fixed the morning greeting");
        taskRun.disabled = false;
        taskRun.textContent = "Run it again";
      }, delay);
    }

    taskRun.addEventListener("click", runTask);
    taskRetry.addEventListener("click", retryTask);
  }
})();
