# Incident Response Manager - Automation-First Demo

This repository is a creative application project for an Incident Response Manager role.

It demonstrates how to automate:

- on-call triage and routing
- auto-assignment and ticket enrichment
- compliance signal checks (NCMEC / EU DSA style flags)
- runbook update suggestions from incident patterns
- near-real-time reporting outputs for leadership dashboards

## Hiring Manager Start Here

If you only have 2 minutes, review in this order:

1. Live UI dashboard (Vercel project URL)
2. `docs/APPLICATION_MESSAGE.md`
3. `docs/INCIDENT_COMMANDER_PACKET.md`
4. `docs/ONCALL_RUNBOOK_AND_SOPS.md`
5. `docs/SECURITY_MODEL.md`

What this demonstrates quickly:

- I can run cross-functional escalations under pressure.
- I can reduce repetitive toil through safe automation.
- I build systems that are auditable, policy-aligned, and regulator-ready.

## Why this project exists

The goal is to show operator judgment and process maturity, not just code.
Every artifact maps directly to responsibilities found in trust and safety escalation roles:

- on-call program ownership
- cross-functional escalation coordination
- automation and program maturity
- reporting and operational health visibility

## Project structure

- `src/incident_manager.py` - core triage, routing, enrichment, compliance checks, and metrics
- `scripts/run_demo.py` - demo runner that processes sample incidents and writes outputs
- `data/incidents.sample.jsonl` - synthetic sample incident stream
- `docs/` - runbooks, SOP logic, dashboard blueprint, and application narrative
- `outputs/` - generated artifacts after running the demo
- `ui/` - static dashboard UI for quick visual demo

## Quick start

1. Run the demo:

```bash
python scripts/run_demo.py
```

2. Review generated files:

- `outputs/processed_incidents.json`
- `outputs/dashboard_metrics.json`
- `outputs/runbook_updates.md`

3. Open the UI dashboard locally:

```bash
python -m http.server 8000
```

Then navigate to `http://localhost:8000/ui/`.

## Vercel deploy

Use these project settings in Vercel:

- Framework Preset: `Other`
- Root Directory: `ui`
- Build Command: `echo "no build"` (or leave blank)
- Output Directory: `.` (or leave blank if your Vercel UI requires)
- Install Command: leave blank

Deploy steps:

1. Push this repo to GitHub
2. Import project in Vercel
3. Apply the settings above and deploy

The UI loads:

- `sample-dashboard-metrics.json` by default in Vercel deployment

## High-scrutiny review packet

The repository includes governance artifacts designed for security, policy, legal, and regulator review:

- `docs/SECURITY_MODEL.md`
- `docs/GOVERNANCE_CONTROLS.md`
- `docs/MODEL_RISK_REGISTER.md`
- `docs/REGULATOR_READY_DECISION_TEMPLATE.md`

## Automation features included

### 1) Routing and triage

- priority scoring from severity hints + risk keywords
- queue routing by incident class and urgency
- auto-assignment using an on-call roster and queue ownership

### 2) Ticket enrichment

- severity rationale
- impacted-surface summary
- suggested stakeholders (Policy, Legal, Product, Comms)
- previous-similar incident references

### 3) Compliance assist

- NCMEC-style signal matching (possible CSAM-related language)
- EU DSA-style signal matching (systemic abuse / illegal content concerns)
- human-in-the-loop recommendation with confidence and evidence

### 4) Runbook maturity loop

- detects repeated patterns by category and tag
- proposes runbook additions or updates automatically
- writes recommendations into an auditable markdown file

### 5) Dashboard reporting

- inbound volume and category mix
- response-time proxy metrics
- escalation rates and compliance-flag volume
- staffing and queue pressure summaries

## Notes

- This is intentionally lightweight and self-contained (standard library only).
- It is designed as an interview/demo artifact that can evolve into production workflows.
