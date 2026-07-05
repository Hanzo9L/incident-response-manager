# Infraction Simulation Trace

This trace shows how each infraction moved through automation and where human action is required.

## INF-001
- Priority: `P0` (score=137, confidence=0.91, abstained=False)
- Queue and assignment: `abuse_operations` -> `chris` (backup: `devin`)
- SLA risk: `at_risk=True` reasons: high_user_impact
- Escalation partners: Safeguards, Policy, Product, Legal
- Missing approvals: PolicyLead, Legal
- Compliance framework flags: EU_DSA
- Suggested next actions: Confirm immediate containment, Validate policy applicability, Publish stakeholder update in 30 minutes

## INF-002
- Priority: `P0` (score=180, confidence=0.99, abstained=False)
- Queue and assignment: `high_risk_enforcement` -> `alice` (backup: `ben`)
- SLA risk: `at_risk=False` reasons: none
- Escalation partners: Safeguards, Policy, Product, Legal
- Missing approvals: PolicyLead, Legal
- Compliance framework flags: NCMEC
- Suggested next actions: Confirm immediate containment, Validate policy applicability, Publish stakeholder update in 30 minutes

## INF-003
- Priority: `P2` (score=73, confidence=0.56, abstained=False)
- Queue and assignment: `abuse_operations` -> `devin` (backup: `chris`)
- SLA risk: `at_risk=False` reasons: none
- Escalation partners: Safeguards, Comms
- Missing approvals: none
- Compliance framework flags: none
- Suggested next actions: Confirm immediate containment, Validate policy applicability, Publish stakeholder update in 30 minutes

## INF-004
- Priority: `P0` (score=130, confidence=0.87, abstained=False)
- Queue and assignment: `abuse_operations` -> `chris` (backup: `devin`)
- SLA risk: `at_risk=True` reasons: assignee_load_high, high_user_impact
- Escalation partners: Safeguards, Policy, Product
- Missing approvals: PolicyLead
- Compliance framework flags: none
- Suggested next actions: Confirm immediate containment, Validate policy applicability, Publish stakeholder update in 30 minutes

## INF-005
- Priority: `P2` (score=80, confidence=0.59, abstained=False)
- Queue and assignment: `platform_reliability` -> `erin` (backup: `frank`)
- SLA risk: `at_risk=True` reasons: tooling_degraded
- Escalation partners: Safeguards
- Missing approvals: none
- Compliance framework flags: none
- Suggested next actions: Confirm immediate containment, Validate policy applicability, Publish stakeholder update in 30 minutes

## INF-006
- Priority: `P3` (score=50, confidence=0.38, abstained=True)
- Queue and assignment: `abuse_operations` -> `devin` (backup: `chris`)
- SLA risk: `at_risk=False` reasons: assignee_load_high, triage_abstained
- Escalation partners: Safeguards, Legal
- Missing approvals: Legal
- Compliance framework flags: EU_DSA
- Suggested next actions: Confirm immediate containment, Validate policy applicability, Publish stakeholder update in 30 minutes

## INF-007
- Priority: `P3` (score=21, confidence=0.22, abstained=True)
- Queue and assignment: `general_enforcement` -> `grace` (backup: `harper`)
- SLA risk: `at_risk=False` reasons: triage_abstained
- Escalation partners: Safeguards
- Missing approvals: none
- Compliance framework flags: none
- Suggested next actions: Confirm immediate containment, Validate policy applicability, Publish stakeholder update in 30 minutes
