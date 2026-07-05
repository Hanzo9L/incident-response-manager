import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from src.incident_manager import load_incidents, process_incident_batch, write_outputs


def main() -> None:
    input_path = ROOT / "data" / "incidents.sample.jsonl"
    output_path = ROOT / "outputs"

    incidents = load_incidents(input_path)
    processed, metrics, runbook_md = process_incident_batch(incidents)
    write_outputs(processed, metrics, runbook_md, output_path)

    print(f"Processed incidents: {len(processed)}")
    print(f"Dashboard metrics written to: {output_path / 'dashboard_metrics.json'}")
    print(f"Runbook suggestions written to: {output_path / 'runbook_updates.md'}")


if __name__ == "__main__":
    main()
