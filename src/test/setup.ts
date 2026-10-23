// Test setup file
import { vi } from 'vitest';

// Mock environment variables for tests
vi.stubEnv('VITE_ENABLE_REAL_AI', 'true');
vi.stubEnv('VITE_OPENAI_API_KEY', 'test-key');
