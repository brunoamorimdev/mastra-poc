import 'dotenv/config';
import { Mastra } from '@mastra/core';
import { Agent } from '@mastra/core';
import { GithubIntegration } from '@mastra/github';
import { openai } from '@ai-sdk/openai';
import { CONFIG } from './constants';

// Initialize GitHub integration
const githubIntegration = new GithubIntegration({
  config: {
    PERSONAL_ACCESS_TOKEN: CONFIG.github.token,
  },
});

// Create the GitHub automation agent
const githubAgent = new Agent({
  name: 'github-automation-agent',
  instructions: CONFIG.agent.prompt,
  model: openai(CONFIG.ai.model),
  tools: githubIntegration.getStaticTools(),
});

// Initialize Mastra instance
const mastra = new Mastra({
  agents: {
    githubAgent,
  },
});

export { mastra, githubAgent, githubIntegration };