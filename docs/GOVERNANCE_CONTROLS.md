# Governance Controls and Decision Rights

## Governance intent

Ensure speed, consistency, and defensibility in high-stakes trust and safety operations.

## Decision rights matrix

| Decision type | Primary owner | Required reviewers | SLA |
| --- | --- | --- | --- |
| Priority assignment (P0-P3) | On-call IC | Secondary on-call for P0/P1 | 10 min |
| Policy interpretation variance | Policy lead | Legal + Safeguards lead | 30 min |
| External referral decision | Legal | Policy + IC | 60 min |
| Public comms statement | Comms lead | Legal + Product + IC | 90 min |
| Automation logic change | Engineering owner | Policy + Legal + Security | Pre-deploy |

## Mandatory controls

### Control 1: Human-in-the-loop for high-impact outcomes

- no autonomous external referrals or regulatory submissions
- no fully automated closure of high-risk incidents

### Control 2: Explainability standard

Every decision recommendation must include:

- confidence level
- evidence summary
- alternatives considered
- escalation trigger used

### Control 3: Quality assurance

- weekly sample audits of incident decisions
- monthly calibration across Policy, Legal, and Safeguards
- quarterly tabletop exercises with adversarial scenarios

### Control 4: Documentation lifecycle

- runbooks and SOPs version-controlled
- each change has owner, rationale, and review date
- stale sections auto-flagged for review

### Control 5: Separation of duties

- creators of automation logic cannot self-approve production release
- reviewers for sensitive referrals must be independent of model output authoring

## Escalation governance triggers

- repeated false positives in framework assist above threshold
- high-risk incident backlog exceeds staffing capacity
- unresolved policy ambiguity across >2 incidents in a week
- any evidence of unauthorized access to sensitive case data

## Governance cadences

- **Daily:** on-call handoff and unresolved high-risk review
- **Weekly:** incident trends + control exceptions review
- **Monthly:** quality, bias, and override analysis
- **Quarterly:** governance policy refresh and regulator-readiness review
