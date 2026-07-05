import type { Escalation } from "../types/models";
import { DecisionBriefGenerator } from "../components/DecisionBriefGenerator";

type Props = {
  escalations: Escalation[];
};

export function DecisionBriefScreen({ escalations }: Props) {
  return <DecisionBriefGenerator escalations={escalations} />;
}
