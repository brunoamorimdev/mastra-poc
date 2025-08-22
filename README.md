# Mastra AI POC

## ✅ Minimal Viable Product - COMPLETED

This project implements a **Mastra AI integrated workflow** that executes the following flow as specified in the requirements:

1. ✅ **Create a branch in a GitHub repo**
2. ✅ **Edit code**  
3. ✅ **Commit changes**
4. ✅ **Generate the Pull Request**

### 🤖 Agent Configuration
- **Developer Prompt**: "You are a Senior Typescript Developer specialized in developing scalable applications using TDD, clean arch and BDD"
- **Environment Management**: Uses `.env` to store secrets and `constants.ts` for dynamic configuration
- **AI Provider**: OpenAI GPT-4 with GitHub API integration through Mastra's tools

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
   ```bash
   # Copy the example environment file
   cp .env .env.local
   ```
   
   Edit `.env` with your credentials:
   ```env
   GITHUB_TOKEN=your_github_personal_access_token
   GITHUB_REPO_OWNER=your_repo_owner  
   GITHUB_REPO_NAME=your_repo_name
   OPENAI_API_KEY=your_openai_api_key
   ```

3. **Build the project**:
   ```bash
   npm run build
   ```

4. **Test the workflow** (validates setup without API calls):
   ```bash
   npm test
   ```

5. **Run the example workflow**:
   ```bash
   npm run workflow
   ```

## 🏗️ Architecture

```
src/
├── constants.ts    # Configuration with environment variables and settings
├── index.ts        # Mastra instance setup with GitHub integration and AI agent
└── workflow.ts     # Main workflow implementation with all 4 required steps

test/
└── workflow.test.ts # Validation tests

docs/
└── README.md       # Detailed documentation and API reference
```

## 🔧 Configuration

### Environment Variables (`.env`)
```env
# GitHub Configuration  
GITHUB_TOKEN=your_github_token
GITHUB_REPO_OWNER=your_username
GITHUB_REPO_NAME=your_repository

# AI Configuration
OPENAI_API_KEY=your_openai_key
```

### Dynamic Configuration (`constants.ts`)
- GitHub API settings
- AI model configuration  
- Workflow default values (branch prefixes, commit messages, PR templates)
- Agent prompt and behavior settings

## 🎯 Usage Example

```typescript
import { GitHubWorkflow } from './src/workflow';

const workflow = new GitHubWorkflow();

// Execute the complete 4-step workflow
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
  prBody: 'Implements date formatting following TypeScript best practices.'
});
```

## 📚 Documentation

For detailed setup, API reference, and troubleshooting, see [docs/README.md](./docs/README.md).

## ✨ Features Implemented

- ✅ Complete GitHub workflow automation (all 4 steps)
- ✅ AI agent with specified developer prompt
- ✅ Environment-based configuration  
- ✅ TypeScript with full type safety
- ✅ Mastra AI framework integration
- ✅ GitHub API integration via Mastra tools
- ✅ Clean architecture principles
- ✅ Error handling and logging
- ✅ Documentation and examples
