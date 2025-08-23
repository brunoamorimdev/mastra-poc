# Mastra AI POC - GitHub Developer Agent

## ✅ Project Overview

This project implements a **Mastra AI integrated workflow** using the official **Mastra CLI scaffolding** and **GitHub's Model Context Protocol (MCP)** that executes the complete automation flow:

1. ✅ **Create a branch in a GitHub repo**
2. ✅ **Edit code**  
3. ✅ **Commit changes**
4. ✅ **Generate the Pull Request**

## 🤖 Developer Agent Configuration

- **Developer Prompt**: "You are a Senior Typescript Developer specialized in developing scalable applications using TDD, clean arch and BDD"
- **Environment Management**: Uses `.env` to store secrets and `constants.ts` for dynamic configuration
- **AI Provider**: OpenAI GPT-4 with GitHub integration through **GitHub MCP Server**
- **Architecture**: Official Mastra CLI scaffolding with proper structure

## 🏗️ Project Structure

Built using the official Mastra CLI (`npx create-mastra@latest`) with the following structure:

```
src/
├── constants.ts                 # Configuration with environment variables and settings
├── mastra/
│   ├── index.ts                # Main Mastra instance with GitHub MCP integration
│   ├── agents/
│   │   └── github-developer-agent.ts  # TypeScript developer agent
│   ├── tools/
│   │   └── github-tools.ts     # GitHub MCP tools (branch, edit, PR)
│   └── workflows/
│       └── github-workflow.ts  # Complete 4-step automation workflow
└── test-workflow.mjs           # Test script for validation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- GitHub Personal Access Token
- OpenAI API Key

### Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Edit `.env` with your credentials:
   ```env
   OPENAI_API_KEY=your-openai-api-key
   GITHUB_TOKEN=your-github-token
   GITHUB_REPO_OWNER=your-github-username
   GITHUB_REPO_NAME=your-repository-name
   ```

3. **Build the project**:
   ```bash
   npm run build
   ```

4. **Test the setup**:
   ```bash
   node test-workflow.mjs
   ```

5. **Run the workflow**:
   ```bash
   npm run workflow
   ```

## 🔧 Configuration

### Environment Variables (`.env`)
```env
# GitHub Configuration (used by MCP server)
GITHUB_TOKEN=your-github-token
GITHUB_REPO_OWNER=your-username
GITHUB_REPO_NAME=your-repository

# AI Configuration
OPENAI_API_KEY=your-openai-key
```

### Dynamic Configuration (`constants.ts`)
- GitHub API settings
- AI model configuration  
- Workflow default values (branch prefixes, commit messages, PR templates)
- Agent prompt and behavior settings
- MCP client configuration

## 🔄 Architecture Flow

```
TypeScript Developer Agent
    ↓ 
Mastra Core Framework (Official CLI Scaffolding)
    ↓
GitHub MCP Client (@mastra/mcp)
    ↓
GitHub MCP Server (github-mcp-server)
    ↓
GitHub API (REST/GraphQL)
```

## 🎯 Usage Example

The workflow automatically executes all 4 steps:

```typescript
// Example workflow input
const workflowInput = {
  branchName: 'feature/mastra-typescript-service',
  filePath: 'src/services/user-service.ts',
  content: `
    export class UserService {
      // TypeScript code following TDD, clean arch, and BDD
    }
  `,
  commitMessage: 'feat: add user service with clean architecture',
  prTitle: 'Add TypeScript user service',
  prBody: 'Implements user service following best practices...'
};
```

## ✨ Features Implemented

- ✅ **Official Mastra CLI Scaffolding**: Proper project structure using `npx create-mastra@latest`
- ✅ **Complete GitHub workflow automation** (all 4 steps)
- ✅ **AI agent with specified developer prompt**
- ✅ **Environment-based configuration** (`.env` + `constants.ts`)
- ✅ **TypeScript with full type safety**
- ✅ **Mastra AI framework integration**
- ✅ **GitHub Model Context Protocol (MCP) integration**
- ✅ **Clean architecture principles**
- ✅ **Error handling and logging**
- ✅ **Comprehensive documentation**

## 🔗 GitHub MCP Integration

This implementation leverages the official `github-mcp-server` package that provides:
- Comprehensive Git repository management capabilities
- 29+ Git operations with advanced developer workflows
- Standardized Model Context Protocol interface
- Enhanced security and reliability

## 📋 Available Scripts

- `npm run dev` - Start Mastra development server
- `npm run build` - Build the Mastra application
- `npm run start` - Start the production server
- `npm run workflow` - Execute the GitHub workflow
- `node test-workflow.mjs` - Test the workflow setup

## 🔧 Development Guidelines

### TypeScript Best Practices
- Follow TDD (Test-Driven Development)
- Implement Clean Architecture patterns
- Use BDD (Behavior-Driven Development) approaches
- Maintain proper type safety
- Add comprehensive error handling

### GitHub Operations
- Use conventional commit messages
- Create descriptive PR titles and descriptions
- Follow branching strategies
- Maintain code quality standards

## 🎉 Summary

This implementation provides a complete Mastra AI Developer Agent that:
- Uses the **official Mastra CLI scaffolding** as requested
- Integrates **GitHub's Model Context Protocol** for reliable GitHub operations  
- Follows the **specified developer prompt** for TypeScript development
- Maintains **clean architecture** with proper separation of concerns
- Provides **environment-based configuration** as required
- Delivers a **production-ready workflow** for automated GitHub operations

The project is now properly structured using Mastra's official scaffolding and ready for GitHub automation through the standardized Model Context Protocol.