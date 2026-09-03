// Project status LEDs.
document.querySelectorAll(".project").forEach((project) => {
  const title = project.querySelector(".project-title");
  const action = project.querySelector(".project-action");
  const isPending = title?.textContent.includes("- Processing");

  if (isPending) {
    project.classList.add("project-pending");
    project.setAttribute("aria-disabled", "true");
    if (action) {
      action.innerHTML =
        '<span class="status-led status-led-pending" aria-hidden="true"></span><span>[pending]</span>';
    }
    project.addEventListener("click", (event) => event.preventDefault());
  } else {
    project.classList.add("project-active");
    if (action) {
      const label = action.textContent.trim();
      action.innerHTML =
        '<span class="status-led status-led-active" aria-hidden="true"></span><span>' +
        label +
        '</span>';
    }
    if (project.getAttribute("href") === "#") {
      project.addEventListener("click", (event) => event.preventDefault());
    }
  }
});

const statusStyles = document.createElement("style");
statusStyles.textContent = `
  .project-action {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .status-led {
    width: 6px;
    height: 6px;
    flex: 0 0 6px;
    border-radius: 50%;
  }

  .status-led-active {
    background: #39a85a;
    box-shadow: 0 0 5px rgba(57, 168, 90, 0.42);
  }

  .project-pending {
    cursor: default;
  }

  .project-pending:hover,
  .project-pending:focus-visible {
    padding-left: 0;
    color: inherit;
  }

  .project-pending .project-action,
  .project-pending:hover .project-action,
  .project-pending:focus-visible .project-action {
    color: var(--muted);
  }

  .status-led-pending {
    background: #8f2323;
    box-shadow: 0 0 5px rgba(180, 38, 38, 0.38);
    animation: pendingPulse 1.6s ease-in-out infinite;
  }

  @keyframes pendingPulse {
    0%, 100% {
      opacity: 0.28;
      box-shadow: 0 0 2px rgba(180, 38, 38, 0.18);
    }
    50% {
      opacity: 0.95;
      box-shadow: 0 0 7px rgba(210, 42, 42, 0.5);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .status-led-pending {
      animation: none;
      opacity: 0.7;
    }
  }
`;

document.head.appendChild(statusStyles);
