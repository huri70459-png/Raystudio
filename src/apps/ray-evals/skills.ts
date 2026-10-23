import { Skill } from './types';

export const SKILLS: Skill[] = [
  {
    id: 'sec_skill_sql_injection_v1',
    name: 'SQL Injection Prevention',
    version: '1.2.0',
    domain: 'security',
    keywords: ['sql', 'query', 'database', 'postgres', 'mysql', 'prisma', 'orm'],
    systemPromptAddition: 'CRITICAL: Never generate raw SQL strings vulnerable to injection. Always enforce parameterized queries or ORM query builders. Ensure proper indexing considerations are mentioned in comments.',
    fewShotExamples: [
      {
        input: 'Write a query to find users by email',
        output: "db.query('SELECT id, email FROM users WHERE email = $1', [email]);"
      }
    ]
  },
  {
    id: 'sec_skill_auth_v1',
    name: 'Authentication & Authorization',
    version: '2.0.0',
    domain: 'security',
    keywords: ['auth', 'login', 'jwt', 'token', 'session', 'oauth', 'password', 'bcrypt'],
    systemPromptAddition: 'MANDATORY: Implement proper password hashing (bcrypt/argon2), JWT validation, rate limiting on auth endpoints, and secure session management. Never store plain-text passwords.',
    fewShotExamples: [
      {
        input: 'Create a login endpoint',
        output: 'Use bcrypt.hash() for password storage, JWT.sign() for tokens, and implement rate limiting middleware.'
      }
    ]
  },
  {
    id: 'db_skill_postgres_v1',
    name: 'PostgreSQL Best Practices',
    version: '1.5.0',
    domain: 'database',
    keywords: ['postgres', 'postgresql', 'database', 'migration', 'schema', 'index'],
    systemPromptAddition: 'Follow PostgreSQL best practices: Use proper indexing, implement migrations, avoid SELECT *, use EXPLAIN ANALYZE for query optimization, and implement connection pooling.',
    fewShotExamples: [
      {
        input: 'Optimize this slow query',
        output: 'Add indexes on frequently queried columns, use EXPLAIN ANALYZE to identify bottlenecks, implement pagination with LIMIT/OFFSET or cursor-based pagination.'
      }
    ]
  },
  {
    id: 'fe_skill_react_v1',
    name: 'React Performance Optimization',
    version: '1.8.0',
    domain: 'frontend',
    keywords: ['react', 'component', 'hook', 'state', 'render', 'performance', 'memo'],
    systemPromptAddition: 'Optimize React components: Use React.memo for pure components, useMemo for expensive calculations, useCallback for stable function references, and implement proper key props for lists.',
    fewShotExamples: [
      {
        input: 'Optimize this list rendering',
        output: 'Wrap list items in React.memo, use stable keys (not array indices), implement virtualization for large lists with react-window or react-virtualized.'
      }
    ]
  },
  {
    id: 'comp_skill_gdpr_v1',
    name: 'GDPR Compliance',
    version: '1.0.0',
    domain: 'compliance',
    keywords: ['gdpr', 'privacy', 'data', 'personal', 'consent', 'cookie', 'user data'],
    systemPromptAddition: 'Ensure GDPR compliance: Implement data minimization, obtain explicit consent, provide data export/deletion endpoints, log all data access, and implement proper encryption for personal data.',
    fewShotExamples: [
      {
        input: 'Store user preferences',
        output: 'Implement consent management, encrypt personal data at rest, provide /api/user/export and /api/user/delete endpoints, log all data access with timestamps.'
      }
    ]
  },
  {
    id: 'devops_skill_docker_v1',
    name: 'Docker & Containerization',
    version: '1.3.0',
    domain: 'devops',
    keywords: ['docker', 'container', 'deploy', 'kubernetes', 'k8s', 'ci/cd', 'pipeline'],
    systemPromptAddition: 'Follow Docker best practices: Use multi-stage builds, minimize layer count, implement health checks, use .dockerignore, scan images for vulnerabilities, and implement proper resource limits.',
    fewShotExamples: [
      {
        input: 'Create a Dockerfile for Node.js app',
        output: 'Use multi-stage build with node:alpine, copy package.json first for layer caching, use non-root user, implement health check, and add .dockerignore for node_modules.'
      }
    ]
  }
];

export function matchSkills(prompt: string): Skill[] {
  const lowerPrompt = prompt.toLowerCase();
  const words = lowerPrompt.split(/\s+/);
  
  return SKILLS.filter(skill => {
    return skill.keywords.some(keyword => 
      lowerPrompt.includes(keyword) || 
      words.some(word => word.includes(keyword) || keyword.includes(word))
    );
  });
}
