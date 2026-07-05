# Model Risk Register - Compliance Assist and Triage Support

## Purpose

Track and mitigate risks from AI-assisted triage and framework matching in trust and safety workflows.

## Risk scoring scale

- **Likelihood:** Low / Medium / High
- **Impact:** Low / Medium / High
- **Residual risk:** expected risk after controls

## Risk register

| Risk ID | Risk description | Likelihood | Impact | Controls | Owner | Residual risk |
| --- | --- | --- | --- | --- | --- | --- |
| MR-001 | False negatives on high-risk content result in delayed escalation | Medium | High | deterministic keyword backstops, low-confidence escalation rules, weekly misses audit | T&S Ops Lead | Medium |
| MR-002 | False positives cause unnecessary legal/policy load | High | Medium | confidence thresholds, sampled QA, reviewer override tracking | Policy Ops Lead | Medium |
| MR-003 | Model drift degrades framework matching quality over time | Medium | High | drift monitors, monthly recalibration, benchmark replay suite | ML Systems Owner | Medium |
| MR-004 | Over-reliance on model recommendations reduces human scrutiny | Medium | High | mandatory rationale entry by reviewer, periodic blind human-only review | Safeguards Manager | Medium |
| MR-005 | Sensitive data leakage through logs or prompts | Low | High | redaction, strict logging policy, data retention controls, access monitoring | Security Lead | Low |
| MR-006 | Prompt or input injection manipulates recommendation output | Medium | Medium | input sanitization, schema validation, deterministic fallback for high-risk paths | Engineering Lead | Medium |
| MR-007 | Bias in model suggestions affects escalation consistency | Medium | High | fairness/consistency checks, cross-region calibration, independent review | Responsible AI Owner | Medium |

## Key risk indicators (KRIs)

- false-negative rate in sampled high-risk incidents
- false-positive rate by framework and region
- reviewer override rate by confidence bucket
- recommendation abstain rate trend
- calibration delta month-over-month

## Mitigation workflow

1. detect risk breach via KRI alert
2. open model-risk incident with severity
3. apply mitigation (threshold change, fallback, temporary disable)
4. verify outcomes with replay and human review
5. document residual risk and next review date
