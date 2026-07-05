function renderList(targetId, dataObj) {
  const target = document.getElementById(targetId);
  target.innerHTML = "";
  Object.entries(dataObj || {}).forEach(([key, value]) => {
    const li = document.createElement("li");
    li.textContent = `${key}: ${value}`;
    target.appendChild(li);
  });
}

function renderTextList(targetId, values) {
  const target = document.getElementById(targetId);
  target.innerHTML = "";
  if (!values || values.length === 0) {
    const li = document.createElement("li");
    li.textContent = "none";
    target.appendChild(li);
    return;
  }
  values.forEach((value) => {
    const li = document.createElement("li");
    li.textContent = value;
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

function renderIncidentRows(processedIncidents) {
  const tbody = document.getElementById("incidentRows");
  tbody.innerHTML = "";
  processedIncidents.forEach((incident) => {
    const actions = [
      "triage scoring",
      "queue routing",
      "auto-assignment",
      "ticket enrichment",
    ];
    if ((incident.compliance?.framework_matches || []).length > 0) {
      actions.push("compliance framework flagging");
    }
    if (incident.sla?.at_risk) {
      actions.push("sla at-risk alert");
    }
    if (incident.triage?.abstained) {
      actions.push("manual triage required");
    }
    const priority = incident.triage?.priority || "unknown";
    const queue = incident.assignment?.queue || "unknown";
    const assignee = incident.assignment?.assignee || "unassigned";
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${incident.incident_id}</td>
      <td>${priority}</td>
      <td>${queue}</td>
      <td>${assignee}</td>
      <td>${actions.join(", ")}</td>
    `;
    tbody.appendChild(row);
  });
}

function laneSummary(incident) {
  const priority = incident.triage?.priority || "unknown";
  const assignee = incident.assignment?.assignee || "unassigned";
  return `${incident.incident_id} (${priority}) -> ${assignee}`;
}

function renderActionLanes(processedIncidents) {
  const needsAck = processedIncidents
    .filter((incident) => ["P0", "P1"].includes(incident.triage?.priority))
    .map((incident) => laneSummary(incident));
  const slaRisk = processedIncidents
    .filter((incident) => incident.sla?.at_risk)
    .map(
      (incident) =>
        `${laneSummary(incident)} [${(incident.sla?.risk_reasons || []).join(", ") || "risk"}]`,
    );
  const approvalBlocked = processedIncidents
    .filter(
      (incident) =>
        incident.escalation?.missing_approvals &&
        incident.escalation.missing_approvals.length > 0,
    )
    .map(
      (incident) =>
        `${laneSummary(incident)} [missing: ${(incident.escalation.missing_approvals || []).join(", ")}]`,
    );
  const manualTriage = processedIncidents
    .filter((incident) => incident.triage?.abstained)
    .map((incident) => laneSummary(incident));

  renderTextList("laneNeedsAck", needsAck);
  renderTextList("laneSlaRisk", slaRisk);
  renderTextList("laneApprovalBlocked", approvalBlocked);
  renderTextList("laneManualTriage", manualTriage);
}

function renderApprovalGate(processedIncidents) {
  const tbody = document.getElementById("approvalGateRows");
  const hint = document.getElementById("approvalGateHint");
  tbody.innerHTML = "";

  const blocked = processedIncidents.filter(
    (incident) =>
      incident.escalation?.missing_approvals &&
      incident.escalation.missing_approvals.length > 0,
  );

  if (blocked.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td colspan="4">No approval blockers in current batch.</td>
    `;
    tbody.appendChild(row);
    hint.textContent = "No pending approvals. Gate is clear.";
    return;
  }

  blocked.forEach((incident) => {
    const missing = incident.escalation.missing_approvals || [];
    const approved = incident.escalation.approved_by || [];
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${incident.incident_id}</td>
      <td>${missing.join(", ")}</td>
      <td>${approved.length ? approved.join(", ") : "none"}</td>
      <td><button class="btn-small" data-incident-id="${incident.incident_id}" data-missing="${missing.join(", ")}">Request Approval</button></td>
    `;
    tbody.appendChild(row);
  });

  tbody.querySelectorAll("button[data-incident-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const incidentId = button.getAttribute("data-incident-id");
      const missing = button.getAttribute("data-missing");
      hint.textContent = `Draft prepared: request ${missing} approval for ${incidentId}.`;
    });
  });
}

function renderDashboard(metrics, processedIncidents) {
  createSummaryCards(metrics);
  renderList("queueDistribution", metrics.queue_distribution);
  renderList("priorityDistribution", metrics.priority_distribution);
  renderList("escalationPartners", metrics.escalation_partner_mentions);
  renderList("complianceFlags", metrics.compliance_flag_counts);
  renderIncidentRows(processedIncidents);
  renderActionLanes(processedIncidents);
  renderApprovalGate(processedIncidents);

  const delivered = [
    `Auto-triage scoring: ${metrics.total_incidents} incidents scored`,
    `Auto-routing: ${Object.keys(metrics.queue_distribution || {}).length} queues used`,
    `Auto-assignment: ${metrics.total_incidents} incidents assigned`,
    `Ticket enrichment: ${metrics.total_incidents} incidents enriched`,
    `Compliance flagging: ${metrics.automation_outcomes?.compliance_flagged_count || 0} incidents flagged`,
  ];

  const backlog = [
    "SLA proactive paging to duty manager",
    "Queue load balancing by real-time staffing",
    "External referral package pre-fill with evidence checks",
    "Automated post-incident action item tracking",
    "Runbook auto-PR generation for recurring incident patterns",
  ];

  renderTextList("automationDelivered", delivered);
  renderTextList("automationBacklog", backlog);
  renderList("nowActionQueue", metrics.now_queue || {});
  renderList("automationOutcomes", metrics.automation_outcomes || {});

  const notes = document.getElementById("operationalNotes");
  const now = new Date(metrics.generated_at_utc || Date.now()).toLocaleString();
  notes.textContent = `Generated at ${now}. Action Queue identifies what needs human attention now, while Automation Outcomes shows where automation is reducing manual workload.`;
}

async function loadJson(candidates) {
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
  throw new Error("No data source could be loaded.");
}

async function loadDashboardData() {
  const metrics = await loadJson([
    "../outputs/dashboard_metrics.json",
    "./sample-dashboard-metrics.json",
  ]);
  const incidents = await loadJson([
    "../outputs/processed_incidents.json",
    "./sample-processed-incidents.json",
  ]);
  return { metrics, incidents };
}

loadDashboardData()
  .then(({ metrics, incidents }) => renderDashboard(metrics, incidents))
  .catch((error) => {
    const notes = document.getElementById("operationalNotes");
    notes.textContent = `Dashboard failed to load data: ${error.message}`;
  });
