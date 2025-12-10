#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import fs from 'fs';
import path from 'path';
// 1. Create the Server
const server = new Server({
    name: "metamorphosis-agent",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
    },
});
// 2. Define the Tools
// This is what Cline will "see" when it asks for help.
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "evolve_button_style",
                description: "Surgically updates the CSS styling of the target button in the frontend.",
                inputSchema: {
                    type: "object",
                    properties: {
                        new_tailwind_classes: {
                            type: "string",
                            description: "The new set of Tailwind CSS classes to apply (e.g., 'bg-blue-500 p-4 text-xl')",
                        },
                        reasoning: {
                            type: "string",
                            description: "Why are you making this change? (e.g., 'Increased contrast for accessibility')",
                        },
                    },
                    required: ["new_tailwind_classes", "reasoning"],
                },
            },
        ],
    };
});
// 3. Handle Tool Execution
// This is the "Hand" that actually edits the file.
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === "evolve_button_style") {
        // @ts-ignore
        const { new_tailwind_classes, reasoning } = request.params.arguments;
        // LOCATE THE FILE (Adjusting path from 'agent' folder to 'frontend' folder)
        const filePath = path.join(process.cwd(), '..', 'frontend', 'app', 'page.tsx');
        try {
            if (!fs.existsSync(filePath)) {
                return {
                    content: [{ type: "text", text: `Error: Could not find file at ${filePath}` }],
                    isError: true,
                };
            }
            // READ THE FILE
            let fileContent = fs.readFileSync(filePath, 'utf-8');
            // SURGERY: Find the class inside the button with id="evolve-me-button"
            // We look for: id="evolve-me-button" ... className="..."
            // Note: This is a simple regex for the hackathon. In production, we'd use AST.
            const regex = /(id="evolve-me-button"[\s\S]*?className=")([^"]*)(")/;
            if (!regex.test(fileContent)) {
                return {
                    content: [{ type: "text", text: "Error: Could not locate the target button (id='evolve-me-button') in the file." }],
                    isError: true,
                };
            }
            // REPLACE THE CLASSES
            const newContent = fileContent.replace(regex, `$1${new_tailwind_classes}$3`);
            // SAVE THE FILE
            fs.writeFileSync(filePath, newContent);
            return {
                content: [
                    {
                        type: "text",
                        text: `SUCCESS: Metamorphosis complete.\nReason: ${reasoning}\nApplied classes: "${new_tailwind_classes}"`,
                    },
                ],
            };
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error during surgery: ${error}` }],
                isError: true,
            };
        }
    }
    throw new Error("Tool not found");
});
// 4. Start the Server
async function run() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Metamorphosis Agent is running on STDIO...");
}
run().catch((error) => {
    console.error("Fatal error running server:", error);
    process.exit(1);
});
