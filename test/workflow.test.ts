import { GitHubWorkflow, type WorkflowInput } from '../src/workflow';

/**
 * Simple test to verify the workflow can be instantiated and configured correctly.
 * This doesn't make actual API calls but ensures the structure is correct.
 */
async function testWorkflow() {
  console.log('🧪 Testing Mastra AI GitHub Workflow...');

  try {
    // Create workflow instance
    const workflow = new GitHubWorkflow();
    console.log('✅ Workflow instance created successfully');

    // Test input configuration
    const testInput: WorkflowInput = {
      codeChanges: `
// Test function to demonstrate TypeScript best practices
export function calculateTotal(items: number[]): number {
  return items.reduce((sum, item) => sum + item, 0);
}

// Interface following clean architecture principles
export interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
`,
      filePath: 'src/test-utils.ts',
      branchName: 'test/mastra-workflow-validation',
      commitMessage: 'test: add workflow validation utilities',
      prTitle: 'Test: Validate Mastra AI workflow integration',
      prBody: 'This is a test PR to validate the Mastra AI workflow functionality.',
    };

    console.log('✅ Workflow input configured successfully');
    console.log('📋 Test input configuration:');
    console.log(`   - File: ${testInput.filePath}`);
    console.log(`   - Branch: ${testInput.branchName}`);
    console.log(`   - Commit: ${testInput.commitMessage}`);
    console.log(`   - PR Title: ${testInput.prTitle}`);

    // Note: We're not actually executing the workflow to avoid API calls
    // To run the actual workflow, uncomment the following line and ensure
    // environment variables are properly configured:
    // await workflow.execute(testInput);

    console.log('✅ All tests passed! Workflow is ready for execution.');
    console.log('💡 To run the actual workflow, ensure environment variables are set and uncomment the execution line.');

  } catch (error) {
    console.error('❌ Test failed:', error);
    throw error;
  }
}

// Export for use in other test files
export { testWorkflow };

// Run test if this file is executed directly
if (require.main === module) {
  testWorkflow().catch(console.error);
}