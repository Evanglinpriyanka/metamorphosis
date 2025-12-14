# 🦋 Metamorphosis: The Self-Healing Interface
> 

**Metamorphosis** is the world's first "Biological Website." It doesn't just display content; it feels user frustration and physically rewrites its own code to evolve in real-time.

---

## 💡 The Problem
The web is "dead." Once deployed, software is static. If a user struggles with a button, the website does nothing until a human developer reads a log, writes a fix, and deploys it days later.

## 🚀 The Solution
Metamorphosis is an **Autonomous Agentic Loop**.
1.  **Senses:** Detects "Rage Clicks" or low conversion (simulated).
2.  **Thinks:** Uses **Oumi**-synthesized data to intuit better UX patterns.
3.  **Acts:** Triggers **Cline** (via a custom **MCP Server**) to surgically edit the React source code.
4.  **Verifies:** Uses **CodeRabbit** to ensure the new code is safe.
5.  **Evolves:** **Kestra** orchestrates the deployment to **Vercel** instantly.

---

## 🛠️ The Tech Stack (Infinity Stones)

| Component | Technology | Role in Architecture |
| :--- | :--- | :--- |
| **The Hands** | **Cline + MCP** | Custom TypeScript MCP Server for AST-based code refactoring. |
| **The Nervous System** | **Kestra** | Event-driven orchestration flow to trigger agents. |
| **The Brain** | **Oumi** | Synthetic data generation for UX optimization training. |
| **The Safety** | **CodeRabbit** | AI-on-AI code review before merging. |
| **The Body** | **Vercel** | Instant deployment of the "mutated" website. |

---

## ⚡ How to Run "Metamorphosis" Locally

### 1. The Agent (Cline + MCP)
The heart of the project is a custom Model Context Protocol server.
```bash
cd agent
npm install
npm run build
# Configure Cline to use: agent/dist/index.js

2. The Simulation (Kestra)
We use Kestra to simulate the "Evolution Event."

docker compose up -d
# Open localhost:8080 and execute the 'metamorphosis-reflex' flow.

3. The Brain (Oumi)
Generate the synthetic training data.

cd brain
python train_simulator.py


🔮 Future Roadmap
Real-time Eye Tracking: Evolve layout based on where users look.



