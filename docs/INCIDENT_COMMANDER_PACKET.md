# Incident Commander Packet (Sample)

## Scenario

A coordinated abuse campaign rapidly spreads high-risk content across multiple regions while the on-call routing service is partially degraded.

## First 120 minutes

### 0-30 minutes

- classify incident as P0 due to risk profile and operational degradation
- open incident command channel and assign primary/secondary leads
- trigger mitigations to reduce spread and disable risky vectors
- page Policy, Legal, Product, and Comms

### 31-60 minutes

- validate scope and prioritize highest-harm clusters
- publish first executive update with decisions, risks, and asks
- activate backup assignment path for degraded tooling

### 61-120 minutes

- deploy targeted product mitigations
- complete legal/policy review checkpoint
- prepare external-communication and regulatory decision branch
- define stabilization criteria and next update cadence

## Stakeholder matrix

- **Safeguards:** incident command, triage, and containment
- **Policy:** policy interpretation and enforcement consistency
- **Legal:** referral criteria and external risk posture
- **Product:** mitigation implementation and guardrail tuning
- **Comms:** external and internal messaging alignment

## Decision log template

- timestamp
- decision owner
- decision made
- alternatives considered
- trade-offs and residual risk
- follow-up owner and due date

## Post-incident outputs

- root-cause and process-gap summary
- automation opportunities list
- runbook updates accepted/rejected with rationale
- metrics impact review (TTA, containment time, queue pressure)
