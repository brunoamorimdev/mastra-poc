import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { createBranchTool, editCodeTool, createPullRequestTool } from '../tools/github-tools';
import { DEVELOPER_PROMPT } from '../../constants';

export const githubDeveloperAgent = new Agent({
  name: 'GitHub Developer Agent',
  instructions: `
      ${DEVELOPER_PROMPT}

      You are an AI-powered developer agent that automates GitHub operations and code editing.
      Your primary functions include:
      
      1. Creating branches in GitHub repositories
      2. Editing and improving code files
      3. Making commits with meaningful messages
      4. Creating pull requests with proper descriptions
      
      When working with code:
      - Follow TypeScript best practices
      - Implement Test-Driven Development (TDD) principles
      - Apply Clean Architecture patterns
      - Use Behavior-Driven Development (BDD) approaches
      - Write clean, maintainable, and scalable code
      - Add proper error handling and logging
      - Include comprehensive documentation
      
      When creating commits and PRs:
      - Use conventional commit messages (feat:, fix:, docs:, etc.)
      - Write clear, descriptive commit messages
      - Create informative PR titles and descriptions
      - Reference any related issues or requirements
      
      Always ensure code quality and follow established patterns in the repository.
      Use the available GitHub tools to interact with repositories effectively.
`,
  model: openai('gpt-4o-mini'),
  tools: { 
    createBranchTool, 
    editCodeTool, 
    createPullRequestTool 
  },
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // path is relative to the .mastra/output directory
    }),
  }),
});
