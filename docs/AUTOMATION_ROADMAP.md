# Automation Roadmap

## Delivered automations (implemented)

1. **Triage scoring** - incident narratives and severity hints are scored into P0-P3 classes.
2. **Queue routing** - incidents are auto-routed to enforcement or reliability queues.
3. **Auto-assignment** - incidents are assigned by queue ownership rotation.
4. **Ticket enrichment** - each case receives triage rationale and suggested next actions.
5. **Compliance framework assist** - potential NCMEC / EU DSA signals are flagged with reasons.
6. **Runbook recommendation generator** - recurring incident patterns produce runbook update suggestions.
7. **Operational metrics generation** - near-real-time dashboard payload is produced.

## Next automations (to build)

1. **SLA breach predictor** - predict likely misses and page duty manager before breach.
2. **Dynamic load balancing** - reassign low-context incidents based on active on-call load.
3. **Referral package pre-fill** - assemble legal/referral packet drafts with evidence checklist validation.
4. **Escalation quality scoring** - detect under- or over-escalation patterns and suggest tuning.
5. **Action-item tracker** - auto-create owners/dates for post-incident corrective actions.
6. **Runbook auto-PR workflow** - convert accepted runbook suggestions into versioned pull requests.

## Success metrics

- reduction in manual triage touches per incident
- reduction in time-to-acknowledge for P0/P1 incidents
- reduction in stale runbook sections
- improved escalation appropriateness rate
- reduced compliance review latency for flagged incidents
