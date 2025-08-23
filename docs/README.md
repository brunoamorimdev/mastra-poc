# Mastra AI POC - Setup and Usage Guide (GitHub MCP Integration)

This project implements a Mastra AI integrated workflow that automates GitHub operations using **GitHub's Model Context Protocol (MCP)**, including branch creation, code editing, committing changes, and pull request generation.

## Features

✅ **GitHub MCP Workflow Automation**:
1. Create branches in GitHub repositories via MCP
2. Edit code files through AI-powered automation using MCP tools
3. Commit changes with meaningful messages through MCP
4. Generate Pull Requests automatically via MCP server

✅ **AI Developer Agent Configuration**:
- Senior TypeScript Developer persona specialized in TDD, clean architecture, and BDD
- Integrated with GitHub via **Model Context Protocol (MCP)** for standardized API access
- Uses OpenAI GPT-4 for intelligent code modifications
- Leverages `github-mcp-server` for comprehensive Git operations

✅ **MCP Architecture**:
- Standardized protocol for AI-to-GitHub communication
- Enhanced security and reliability through MCP
- 29+ Git operations with advanced developer workflows
- Environment-based configuration for MCP client setup

## Prerequisites

- Node.js 20+ 
- GitHub Personal Access Token with repository permissions
- OpenAI API Key

## Installation

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd mastra-poc
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   cp .env .env.local
   # Edit .env.local with your actual credentials
   ```

3. **Update configuration**:
   Edit `src/constants.ts` with your repository details:
   ```typescript
   github: {
     repoOwner: 'your-github-username',
     repoName: 'your-repository-name',
   }
   ```

## Environment Variables

Create a `.env` file with the following variables:

```env
# GitHub Configuration
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_REPO_OWNER=your_repo_owner
GITHUB_REPO_NAME=your_repo_name

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Environment
NODE_ENV=development
```

## Usage

### 1. Build the project
```bash
npm run build
```

### 2. Run the MCP workflow
```bash
npm run workflow
```

### 3. Development mode
```bash
npm run dev
```

## Project Structure

```
src/
├── constants.ts          # Configuration and constants
├── index.ts             # Main Mastra instance with MCP client setup
└── workflow.ts          # GitHub MCP workflow implementation

dist/                    # Compiled JavaScript output
```

## MCP Configuration

### Agent Prompt
The developer agent is configured with the following prompt as specified in requirements:
> "You are a Senior Typescript Developer specialized in developing scalable applications using TDD, clean arch and BDD"

### MCP Client Configuration
The GitHub MCP client is configured to:
- Connect to `github-mcp-server` via stdio transport
- Use environment variables for GitHub authentication
- Provide 29+ Git operations through standardized MCP protocol

### Workflow Configuration
Default settings in `constants.ts`:
- Branch prefix: `mastra-auto`
- Commit message: `feat: automated code changes via Mastra AI`
- PR title: `Automated changes via Mastra AI`

## API Reference

### GitHubWorkflow Class

#### `execute(input: WorkflowInput): Promise<void>`
Executes the complete GitHub workflow using MCP.

**MCP Workflow Steps:**
1. Connects to GitHub MCP server
2. Creates branch via MCP tools
3. Edits code through MCP automation
4. Commits changes using MCP
5. Creates PR via MCP server
6. Disconnects from MCP client

**Parameters:**
- `codeChanges: string` - The code changes to implement
- `filePath: string` - The file path where changes should be made
- `branchName?: string` - Custom branch name (optional)
- `commitMessage?: string` - Custom commit message (optional)
- `prTitle?: string` - Custom PR title (optional)
- `prBody?: string` - Custom PR body (optional)

**Example:**
```typescript
import { GitHubWorkflow } from './src/workflow';

const workflow = new GitHubWorkflow();

await workflow.execute({
  codeChanges: `
    export function formatDate(date: Date): string {
      return date.toISOString().split('T')[0];
    }
  `,
  filePath: 'src/utils.ts',
  branchName: 'feature/add-date-formatter',
  commitMessage: 'feat: add date formatting utility',
  prTitle: 'Add date formatting utility function',
  prBody: 'Implements date formatting following TypeScript best practices.',
});
```

## Development

### Scripts
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Run the compiled application
- `npm run dev` - Run with ts-node for development
- `npm run workflow` - Execute the workflow example

### Architecture
- **Clean Architecture**: Separation of concerns with clear boundaries
- **TypeScript**: Full type safety and modern language features
- **Mastra Framework**: AI-powered workflow orchestration
- **GitHub Integration**: Direct API integration through Mastra's GitHub package

## Security Notes

- Never commit `.env` files to version control
- Use environment variables for all sensitive data
- GitHub tokens should have minimal required permissions
- Review generated code changes before deployment

## Troubleshooting

### Common Issues

1. **Build Errors**: Ensure all dependencies are installed with `npm install`
2. **API Rate Limits**: GitHub API has rate limits; implement retry logic for production use
3. **Authentication**: Verify GitHub token has correct repository permissions
4. **OpenAI Limits**: Monitor OpenAI API usage and implement proper error handling

### Debugging

Enable debug logging by setting:
```env
NODE_ENV=development
```

## Contributing

1. Follow TypeScript best practices
2. Implement proper error handling
3. Add tests for new features
4. Update documentation for API changes

## License

[Add your license information here]