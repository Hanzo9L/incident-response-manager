function renderList(targetId, dataObj) {
  const target = document.getElementById(targetId);
  target.innerHTML = "";
  Object.entries(dataObj || {}).forEach(([key, value]) => {
    const li = document.createElement("li");
    li.textContent = `${key}: ${value}`;
    target.appendChild(li);
  });
}

function createSummaryCards(metrics) {
  const cards = [
    { label: "Total incidents", value: metrics.total_incidents },
    { label: "High urgency", value: metrics.high_urgency_count },
    { label: "High urgency rate", value: `${metrics.high_urgency_rate}%` },
    { label: "Runtime (sec)", value: Number(metrics.runtime_seconds).toFixed(3) },
  ];
  const container = document.getElementById("summaryCards");
  container.innerHTML = "";
  cards.forEach((card) => {
    const cardEl = document.createElement("article");
    cardEl.className = "card";
    cardEl.innerHTML = `<div class="label">${card.label}</div><div class="value">${card.value}</div>`;
    container.appendChild(cardEl);
  });
}

function renderDashboard(metrics) {
  createSummaryCards(metrics);
  renderList("queueDistribution", metrics.queue_distribution);
  renderList("priorityDistribution", metrics.priority_distribution);
  renderList("escalationPartners", metrics.escalation_partner_mentions);
  renderList("complianceFlags", metrics.compliance_flag_counts);

  const notes = document.getElementById("operationalNotes");
  const now = new Date(metrics.generated_at_utc || Date.now()).toLocaleString();
  notes.textContent = `Generated at ${now}. This dashboard emphasizes queue pressure, escalation load, and compliance-signaled activity.`;
}

async function loadMetrics() {
  const candidates = [
    "../outputs/dashboard_metrics.json",
    "./sample-dashboard-metrics.json",
  ];
  for (const path of candidates) {
    try {
      const response = await fetch(path, { cache: "no-store" });
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      // Continue to fallback source.
    }
  }
  throw new Error("No metrics source could be loaded.");
}

loadMetrics()
  .then((metrics) => renderDashboard(metrics))
  .catch((error) => {
    const notes = document.getElementById("operationalNotes");
    notes.textContent = `Dashboard failed to load metrics: ${error.message}`;
  });
