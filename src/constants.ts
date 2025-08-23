export const GITHUB_CONFIG = {
  token: process.env.GITHUB_TOKEN || '',
  repoOwner: process.env.GITHUB_REPO_OWNER || '',
  repoName: process.env.GITHUB_REPO_NAME || '',
} as const;

export const AI_CONFIG = {
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  model: 'gpt-4o-mini',
} as const;

export const WORKFLOW_DEFAULTS = {
  branchPrefix: 'feature/mastra-',
  commitMessagePrefix: 'feat: ',
  prTemplate: {
    title: 'Automated code changes via Mastra AI',
    body: 'This PR was generated automatically by the Mastra AI Developer Agent.',
  },
} as const;

export const DEVELOPER_PROMPT = "You are a Senior Typescript Developer specialized in developing scalable applications using TDD, clean arch and BDD";