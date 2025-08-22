import 'dotenv/config';
import { mastra, githubAgent } from './index';
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
  private config = CONFIG;

  /**
   * Executes the complete GitHub workflow:
   * 1. Create a branch
   * 2. Edit code
   * 3. Commit changes
   * 4. Generate Pull Request
   */
  async execute(input: WorkflowInput): Promise<void> {
    console.log('🚀 Starting GitHub workflow automation...');
    
    const {
      codeChanges,
      filePath,
      branchName = `${this.config.workflow.branchPrefix}-${Date.now()}`,
      commitMessage = this.config.workflow.commitMessage,
      prTitle = this.config.workflow.prTitle,
      prBody = this.config.workflow.prBody,
    } = input;

    try {
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
      
      console.log('✅ Workflow completed successfully!');
    } catch (error) {
      console.error('❌ Workflow failed:', error);
      throw error;
    }
  }

  private async createBranch(branchName: string): Promise<void> {
    const prompt = `
Create a new branch named "${branchName}" in the repository ${this.config.github.repoOwner}/${this.config.github.repoName}.
Use the GitHub API to:
1. Get the default branch reference
2. Create a new branch from the default branch
3. Confirm the branch was created successfully
`;

    const result = await this.agent.generate(prompt);
    
    console.log('Branch creation result:', result.text);
  }

  private async editCode(filePath: string, codeChanges: string, branchName: string): Promise<void> {
    const prompt = `
Edit the file "${filePath}" in the repository ${this.config.github.repoOwner}/${this.config.github.repoName} on branch "${branchName}".
Apply the following code changes:

${codeChanges}

Use the GitHub API to:
1. Get the current file content
2. Apply the requested changes
3. Update the file with the new content
4. Confirm the file was updated successfully

Make sure to preserve existing code structure and follow TypeScript/clean architecture best practices.
`;

    const result = await this.agent.generate(prompt);
    
    console.log('Code editing result:', result.text);
  }

  private async commitChanges(branchName: string, commitMessage: string): Promise<void> {
    const prompt = `
Commit the changes made to branch "${branchName}" in repository ${this.config.github.repoOwner}/${this.config.github.repoName}.
Use the commit message: "${commitMessage}"

Use the GitHub API to:
1. Get the current commit SHA
2. Create a new commit with the changes
3. Update the branch reference to point to the new commit
4. Confirm the commit was created successfully
`;

    const result = await this.agent.generate(prompt);
    
    console.log('Commit result:', result.text);
  }

  private async createPullRequest(branchName: string, prTitle: string, prBody: string): Promise<void> {
    const prompt = `
Create a Pull Request in repository ${this.config.github.repoOwner}/${this.config.github.repoName}.
- Source branch: "${branchName}"
- Target branch: "main" (or default branch)
- Title: "${prTitle}"
- Body: "${prBody}"

Use the GitHub API to:
1. Create the pull request
2. Confirm the PR was created successfully
3. Return the PR URL for reference
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
// Example: Add a new utility function
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Add proper TypeScript types
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}
`,
    filePath: 'src/utils.ts',
    branchName: 'feature/add-utility-functions',
    commitMessage: 'feat: add date formatting and API response utilities',
    prTitle: 'Add utility functions for date formatting and API responses',
    prBody: 'This PR adds utility functions following TypeScript best practices and clean architecture principles.',
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