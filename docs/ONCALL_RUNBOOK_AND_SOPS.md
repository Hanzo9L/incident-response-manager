# On-Call Runbook and SOPs

## Program ownership model

- **Primary on-call:** owns first response and incident command
- **Secondary on-call:** backup escalation and parallel investigation support
- **Duty manager:** resolves blockers, staffing conflicts, and cross-team deadlocks

## Coverage and escalation paths

- P0 and P1 incidents page primary + secondary immediately.
- Tooling degradation pages platform reliability owner and duty manager.
- Policy-sensitive incidents include Policy and Legal at first decision gate.
- External-risk incidents include LE liaison based on referral criteria.

## Response SLOs

- P0 acknowledge: 5 minutes
- P1 acknowledge: 10 minutes
- P2 acknowledge: 30 minutes
- First stakeholder update: within 30 minutes for P0/P1

## SOP quick actions by phase

### 1) Intake and triage

- Validate severity signal and impacted surface.
- Confirm incident class and assign priority.
- Trigger initial owner assignment and SLA timer.

### 2) Containment and coordination

- Open incident channel and capture decision log.
- Confirm mitigations and fallback actions.
- Add required stakeholders from escalation matrix.

### 3) Communication and closure

- Send operator update and executive update templates.
- Capture compliance checkpoints and evidence notes.
- Complete post-incident review with owner and due date.

## Documentation quality loop

- Weekly: runbook freshness review for top 5 incident categories
- Monthly: SOP quality audit against real incidents
- Quarterly: severity rubric calibration and escalation criteria update

## Dynamic runbook update criteria

Runbook sections should be auto-proposed for update when any of the below are true:

- same category appears 3+ times in 7 days
- same tool failure appears 2+ times in 14 days
- compliance-flagged incidents exceed threshold in a week
- response SLO miss rate exceeds 10% in a queue

Suggested update outputs:

- add a new checklist step
- revise escalation trigger
- add a decision-tree branch
- update communication templates
