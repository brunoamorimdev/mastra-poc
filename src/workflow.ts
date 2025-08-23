import 'dotenv/config';
import { mastra, githubAgent, githubMCPClient } from './index';
import { CONFIG } from './constants';

interface WorkflowInput {
  /** The code changes to implement */
  codeChanges: string;
  /** The file path where changes should be made */
  filePath: string;
  /** Custom branch name (optional) */
  branchName?: string;
  /** Custom commit message (optional) */
  commitMessage?: string;
  /** Custom PR title (optional) */
  prTitle?: string;
  /** Custom PR body (optional) */
  prBody?: string;
}

class GitHubWorkflow {
  private agent = githubAgent;
  private mcpClient = githubMCPClient;
  private config = CONFIG;

  /**
   * Executes the complete GitHub workflow using MCP:
   * 1. Create a branch
   * 2. Edit code
   * 3. Commit changes
   * 4. Generate Pull Request
   */
  async execute(input: WorkflowInput): Promise<void> {
    console.log('🚀 Starting GitHub workflow automation with MCP...');
    
    const {
      codeChanges,
      filePath,
      branchName = `${this.config.workflow.branchPrefix}-${Date.now()}`,
      commitMessage = this.config.workflow.commitMessage,
      prTitle = this.config.workflow.prTitle,
      prBody = this.config.workflow.prBody,
    } = input;

    try {
      // Ensure MCP client is connected
      console.log('🔌 Connecting to GitHub MCP server...');
      await this.mcpClient.connect();
      
      // Step 1: Create a new branch
      console.log('📋 Step 1: Creating new branch...');
      await this.createBranch(branchName);
      
      // Step 2: Edit code
      console.log('✏️ Step 2: Editing code...');
      await this.editCode(filePath, codeChanges, branchName);
      
      // Step 3: Commit changes
      console.log('💾 Step 3: Committing changes...');
      await this.commitChanges(branchName, commitMessage);
      
      // Step 4: Create Pull Request
      console.log('🔀 Step 4: Creating Pull Request...');
      await this.createPullRequest(branchName, prTitle, prBody);
      
      console.log('✅ Workflow completed successfully with MCP!');
    } catch (error) {
      console.error('❌ Workflow failed:', error);
      throw error;
    } finally {
      // Cleanup MCP connection
      await this.mcpClient.disconnect();
    }
  }

  private async createBranch(branchName: string): Promise<void> {
    const prompt = `
As a Senior TypeScript Developer, use the available GitHub MCP tools to create a new branch.

Task: Create a new branch named "${branchName}" in the repository ${this.config.github.repoOwner}/${this.config.github.repoName}.

Steps to follow:
1. Use the appropriate MCP tool to get the default branch reference
2. Create a new branch from the default branch
3. Confirm the branch was created successfully

Use clean architecture principles and ensure proper error handling.
`;

    const result = await this.agent.generate(prompt);
    
    console.log('Branch creation result:', result.text);
  }

  private async editCode(filePath: string, codeChanges: string, branchName: string): Promise<void> {
    const prompt = `
As a Senior TypeScript Developer following TDD, clean architecture, and BDD principles, use the available GitHub MCP tools to edit code.

Task: Edit the file "${filePath}" in the repository ${this.config.github.repoOwner}/${this.config.github.repoName} on branch "${branchName}".

Apply the following code changes:
${codeChanges}

Steps to follow:
1. Use MCP tools to get the current file content
2. Apply the requested changes while maintaining:
   - TypeScript best practices
   - Clean architecture principles
   - Test-driven development approach
   - Behavior-driven development patterns
3. Update the file with the new content
4. Confirm the file was updated successfully

Ensure code quality, proper typing, and maintainability.
`;

    const result = await this.agent.generate(prompt);
    
    console.log('Code editing result:', result.text);
  }

  private async commitChanges(branchName: string, commitMessage: string): Promise<void> {
    const prompt = `
As a Senior TypeScript Developer, use the available GitHub MCP tools to commit changes.

Task: Commit the changes made to branch "${branchName}" in repository ${this.config.github.repoOwner}/${this.config.github.repoName}.
Use the commit message: "${commitMessage}"

Steps to follow:
1. Use MCP tools to get the current commit SHA
2. Create a new commit with the changes
3. Update the branch reference to point to the new commit
4. Confirm the commit was created successfully

Follow conventional commit standards and best practices.
`;

    const result = await this.agent.generate(prompt);
    
    console.log('Commit result:', result.text);
  }

  private async createPullRequest(branchName: string, prTitle: string, prBody: string): Promise<void> {
    const prompt = `
As a Senior TypeScript Developer, use the available GitHub MCP tools to create a Pull Request.

Task: Create a Pull Request in repository ${this.config.github.repoOwner}/${this.config.github.repoName}.
- Source branch: "${branchName}"
- Target branch: "main" (or default branch)
- Title: "${prTitle}"
- Body: "${prBody}"

Steps to follow:
1. Use MCP tools to create the pull request
2. Ensure proper PR template formatting
3. Confirm the PR was created successfully
4. Return the PR URL for reference

Follow clean architecture principles and ensure the PR description is comprehensive.
`;

    const result = await this.agent.generate(prompt);
    
    console.log('Pull Request creation result:', result.text);
  }
}

// Example usage and CLI interface
async function main() {
  const workflow = new GitHubWorkflow();
  
  // Example workflow execution
  const exampleInput: WorkflowInput = {
    codeChanges: `
// Example: Add a new utility function following TypeScript best practices
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Add proper TypeScript types with clean architecture
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

// BDD-style test helper
export function createTestApiResponse<T>(data: T): ApiResponse<T> {
  return {
    data,
    status: 200,
    message: 'Success'
  };
}
`,
    filePath: 'src/utils.ts',
    branchName: 'feature/add-utility-functions',
    commitMessage: 'feat: add date formatting and API response utilities',
    prTitle: 'Add utility functions for date formatting and API responses',
    prBody: 'This PR adds utility functions following TypeScript best practices, clean architecture principles, and TDD/BDD methodologies.',
  };

  try {
    await workflow.execute(exampleInput);
  } catch (error) {
    console.error('Failed to execute workflow:', error);
    process.exit(1);
  }
}

// Run the workflow if this file is executed directly
if (require.main === module) {
  main();
}

export { GitHubWorkflow, type WorkflowInput };