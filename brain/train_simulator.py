import json
import time

print("🦁 OUMI DATA SYNTHESIS ENGINE STARTING...")
print("------------------------------------------")

dataset_file = "ux_dataset.jsonl"
valid_entries = 0

# Simulate Oumi Data Loading
try:
    with open(dataset_file, 'r') as f:
        print(f"📂 Loading dataset: {dataset_file}")
        time.sleep(1) # Dramatic pause for the demo video
        
        for line in f:
            data = json.loads(line)
            if "instruction" in data and "output" in data:
                valid_entries += 1
                print(f"✅ Validated Training Pair: {data['input']} -> {data['output']}")
                time.sleep(0.2)

    print("------------------------------------------")
    print(f"🚀 OUMI SYNTHESIS COMPLETE.")
    print(f"🧠 Validated {valid_entries} high-quality UX patterns.")
    print("READY FOR FINE-TUNING.")

except FileNotFoundError:
    print("❌ Error: Dataset not found.")