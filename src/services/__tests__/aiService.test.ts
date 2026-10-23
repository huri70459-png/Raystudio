import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateCompletion, analyzeIntent, checkRateLimit, logAudit, getAuditLogs } from '../aiService';

// Mock fetch for API tests
(globalThis as any).fetch = vi.fn();

describe('AI Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('generateCompletion', () => {
    it('should return a completion response', async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({
          choices: [{ message: { content: 'Test completion' } }],
          model: 'gpt-4',
          usage: { prompt_tokens: 10, completion_tokens: 20, total_tokens: 30 },
        }),
      };
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse as any);

      const result = await generateCompletion('Test prompt');
      
      expect(result).toBeDefined();
      expect(result.text).toBe('Test completion');
      expect(result.provider).toBe('openai');
    });

    it('should sanitize input to prevent XSS', async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({
          choices: [{ message: { content: 'Safe response' } }],
          model: 'gpt-4',
          usage: { prompt_tokens: 10, completion_tokens: 20, total_tokens: 30 },
        }),
      };
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse as any);

      const maliciousInput = '<script>alert("xss")</script>Hello';
      await generateCompletion(maliciousInput);

      const fetchCall = vi.mocked(fetch).mock.calls[0];
      const body = JSON.parse(fetchCall[1]?.body as string);
      expect(body.messages[0].content).not.toContain('<script>');
    });

    it('should throw error for empty prompt', async () => {
      await expect(generateCompletion('')).rejects.toThrow('Prompt cannot be empty');
    });
  });

  describe('analyzeIntent', () => {
    it('should detect API development intent', async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({
          choices: [{ message: { content: '{"intent":"api_development","confidence":0.95,"keywords":["api","endpoint"]}' } }],
          model: 'gpt-4',
          usage: { prompt_tokens: 10, completion_tokens: 20, total_tokens: 30 },
        }),
      };
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse as any);

      const result = await analyzeIntent('Create a REST API endpoint');
      expect(result.intent).toBe('api_development');
    });

    it('should fallback to keyword matching on error', async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new Error('API error'));

      const result = await analyzeIntent('Build a database query');
      expect(result.intent).toBe('database_query');
    });
  });

  describe('checkRateLimit', () => {
    it('should allow requests within limit', () => {
      expect(checkRateLimit('user1', 5, 60000)).toBe(true);
      expect(checkRateLimit('user1', 5, 60000)).toBe(true);
    });

    it('should block requests over limit', () => {
      for (let i = 0; i < 5; i++) {
        checkRateLimit('user2', 5, 60000);
      }
      expect(checkRateLimit('user2', 5, 60000)).toBe(false);
    });
  });

  describe('logAudit', () => {
    it('should log audit entries', () => {
      logAudit({
        userId: 'test-user',
        action: 'test_action',
        details: { test: true },
        success: true,
      });

      const logs = getAuditLogs('test-user');
      expect(logs.length).toBeGreaterThan(0);
      expect(logs[0].action).toBe('test_action');
    });
  });
});
