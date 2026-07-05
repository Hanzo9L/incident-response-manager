# Near-Real-Time Enforcement Dashboard Blueprint

## Design intent

Create a dual-view dashboard:

- **Operator view:** live queue health and SLA risk
- **Leadership view:** trends, staffing pressure, and investment signals

Think of this as a trust-and-safety equivalent of contact-center agent metrics.

## Core panels

### Inbound and queue health

- incidents per 15-minute window
- incidents by source and category
- queue depth and aging buckets
- unassigned/high-risk incident count

### Response performance

- time-to-acknowledge (median, P90)
- time-to-contain (median, P90)
- time-to-resolve by category
- SLA breach rate by queue and severity

### Escalation and quality

- escalation rate by severity
- cross-functional engagement frequency
- repeat incident ratio
- post-incident action completion rate

### Compliance and external referral operations

- potential framework-flag count (NCMEC / EU DSA style)
- referral decision latency
- open referral inventory
- evidence completeness score

### Staffing and capacity

- active on-call coverage status
- incidents per on-call engineer/operator
- handoff quality and shift transition lag
- projected load vs staffing trendline

## Data contract (example)

- `incident_id`
- `created_at`
- `priority`
- `queue`
- `assignee`
- `ack_at`
- `contain_at`
- `resolve_at`
- `escalated_partners`
- `compliance_flags`

## Cadence

- refresh operational tiles every 1 to 5 minutes
- refresh trendline and staffing forecasts every hour
- weekly executive rollup generated automatically
