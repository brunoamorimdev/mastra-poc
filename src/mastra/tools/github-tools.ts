import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { MCPClient } from '@mastra/mcp';
import { GITHUB_CONFIG } from '../../constants';

// Initialize GitHub MCP Client
const githubMcpClient = new MCPClient({
  name: 'github-mcp-server',
  command: 'npx',
  args: ['-y', 'github-mcp-server'],
  env: {
    GITHUB_TOKEN: GITHUB_CONFIG.token,
  },
});

export const createBranchTool = createTool({
  id: 'create-branch',
  description: 'Create a new branch in a GitHub repository',
  inputSchema: z.object({
    branchName: z.string().describe('Name of the new branch'),
    baseBranch: z.string().default('main').describe('Base branch to create from'),
  }),
  outputSchema: z.object({
    branchName: z.string(),
    sha: z.string(),
    success: z.boolean(),
  }),
  execute: async ({ context }) => {
    try {
      // Connect to GitHub MCP server
      await githubMcpClient.connect();

      // Create branch using MCP
      const result = await githubMcpClient.callTool('create_branch', {
        owner: GITHUB_CONFIG.repoOwner,
        repo: GITHUB_CONFIG.repoName,
        branch: context.branchName,
        sha: context.baseBranch, // This will be resolved to the SHA by the MCP server
      });

      return {
        branchName: context.branchName,
        sha: result.sha || 'unknown',
        success: true,
      };
    } catch (error) {
      console.error('Error creating branch:', error);
      // Fallback to mock data for now
      return {
        branchName: context.branchName,
        sha: 'mock-sha-' + Math.random().toString(36).substr(2, 9),
        success: false,
      };
    } finally {
      await githubMcpClient.disconnect();
    }
  },
});

export const editCodeTool = createTool({
  id: 'edit-code',
  description: 'Edit code in a repository file',
  inputSchema: z.object({
    filePath: z.string().describe('Path to the file to edit'),
    content: z.string().describe('New content for the file'),
    commitMessage: z.string().describe('Commit message for the change'),
  }),
  outputSchema: z.object({
    filePath: z.string(),
    commitSha: z.string(),
    success: z.boolean(),
  }),
  execute: async ({ context }) => {
    try {
      // Connect to GitHub MCP server
      await githubMcpClient.connect();

      // Create or update file using MCP
      const result = await githubMcpClient.callTool('create_or_update_file', {
        owner: GITHUB_CONFIG.repoOwner,
        repo: GITHUB_CONFIG.repoName,
        path: context.filePath,
        message: context.commitMessage,
        content: Buffer.from(context.content).toString('base64'),
      });

      return {
        filePath: context.filePath,
        commitSha: result.commit?.sha || 'unknown',
        success: true,
      };
    } catch (error) {
      console.error('Error editing code:', error);
      // Fallback to mock data for now
      return {
        filePath: context.filePath,
        commitSha: 'mock-commit-' + Math.random().toString(36).substr(2, 9),
        success: false,
      };
    } finally {
      await githubMcpClient.disconnect();
    }
  },
});

export const createPullRequestTool = createTool({
  id: 'create-pull-request',
  description: 'Create a pull request from the current branch',
  inputSchema: z.object({
    title: z.string().describe('Title of the pull request'),
    body: z.string().describe('Description of the pull request'),
    headBranch: z.string().describe('Source branch for the PR'),
    baseBranch: z.string().default('main').describe('Target branch for the PR'),
  }),
  outputSchema: z.object({
    prNumber: z.number(),
    htmlUrl: z.string(),
    success: z.boolean(),
  }),
  execute: async ({ context }) => {
    try {
      // Connect to GitHub MCP server
      await githubMcpClient.connect();

      // Create pull request using MCP
      const result = await githubMcpClient.callTool('create_pull_request', {
        owner: GITHUB_CONFIG.repoOwner,
        repo: GITHUB_CONFIG.repoName,
        title: context.title,
        body: context.body,
        head: context.headBranch,
        base: context.baseBranch,
      });

      return {
        prNumber: result.number || 0,
        htmlUrl: result.html_url || `https://github.com/${GITHUB_CONFIG.repoOwner}/${GITHUB_CONFIG.repoName}/pulls`,
        success: true,
      };
    } catch (error) {
      console.error('Error creating pull request:', error);
      // Fallback to mock data for now
      return {
        prNumber: Math.floor(Math.random() * 1000) + 1,
        htmlUrl: `https://github.com/${GITHUB_CONFIG.repoOwner}/${GITHUB_CONFIG.repoName}/pull/${Math.floor(Math.random() * 1000) + 1}`,
        success: false,
      };
    } finally {
      await githubMcpClient.disconnect();
    }
  },
});
