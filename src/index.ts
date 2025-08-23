import 'dotenv/config';
import { Mastra } from '@mastra/core';
import { Agent } from '@mastra/core';
import { MastraMCPClient } from '@mastra/mcp';
import { openai } from '@ai-sdk/openai';
import { CONFIG } from './constants';

// Initialize GitHub MCP Client
const githubMCPClient = new MastraMCPClient({
  name: 'github-mcp',
  server: {
    command: 'npx',
    args: ['github-mcp-server'],
    env: {
      GITHUB_PERSONAL_ACCESS_TOKEN: CONFIG.github.token,
    },
  },
});

// Create the GitHub automation agent with MCP tools
const githubAgent = new Agent({
  name: 'github-automation-agent',
  instructions: CONFIG.agent.prompt,
  model: openai(CONFIG.ai.model),
  tools: async () => {
    await githubMCPClient.connect();
    return await githubMCPClient.tools();
  },
});

// Initialize Mastra instance
const mastra = new Mastra({
  agents: {
    githubAgent,
  },
});

export { mastra, githubAgent, githubMCPClient };