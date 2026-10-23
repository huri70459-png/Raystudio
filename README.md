# NexusAI - Production SaaS Application

A production-ready AI-powered ecosystem featuring Smart Notepad, RAY-Evals cognitive compilation engine, and interactive sandbox experiences.

## 🚀 Production Features

### ✅ Implemented
- **Real AI Integration**: OpenAI & Anthropic API support with automatic fallback
- **Code Splitting**: Lazy-loaded apps for optimal performance
- **Error Boundaries**: Graceful error handling with user-friendly UI
- **Input Sanitization**: XSS protection and injection prevention
- **Rate Limiting**: Client-side rate limiting for API calls
- **Audit Logging**: Comprehensive action tracking
- **Data Persistence**: LocalStorage with cloud sync support
- **Type Safety**: Full TypeScript coverage
- **Environment Configuration**: Secure API key management

### 🏗️ Architecture

```
src/
├── apps/
│   ├── notepad/          # Smart Notepad with Tiptap + Monaco
│   └── ray-evals/        # RAY-Evals cognitive engine
├── components/           # Shared UI components
├── config/              # Configuration management
├── services/            # Core services
│   ├── aiService.ts     # Real AI API integration
│   ├── authService.ts   # Authentication flow
│   └── persistenceService.ts  # Data persistence
└── utils/               # Utility functions
```

## 📦 Installation

```bash
npm install
```

## 🔧 Configuration

### 1. Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your API keys:

```env
# OpenAI API (for real AI features)
VITE_OPENAI_API_KEY=sk-...
VITE_OPENAI_MODEL=gpt-4

# Anthropic API (alternative)
VITE_ANTHROPIC_API_KEY=sk-ant-...
VITE_ANTHROPIC_MODEL=claude-3-5-sonnet-20241022

# Feature flags
VITE_ENABLE_REAL_AI=true
VITE_ENABLE_ANALYTICS=true
```

### 2. Backend Setup (Optional)

For cloud sync and advanced features, deploy the backend:

```bash
# Backend repository (separate)
git clone https://github.com/your-org/nexusai-backend
cd nexusai-backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Update `.env`:
```env
VITE_BACKEND_URL=http://localhost:8000
```

## 🚀 Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 🏗️ Build for Production

```bash
npm run build
```

Output: `dist/` directory ready for deployment

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Set environment variables in Vercel dashboard:
- `VITE_OPENAI_API_KEY`
- `VITE_ANTHROPIC_API_KEY` (optional)
- `VITE_ENABLE_REAL_AI=true`

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Docker

```bash
docker build -t nexusai .
docker run -p 80:80 \
  -e VITE_OPENAI_API_KEY=your_key \
  -e VITE_ENABLE_REAL_AI=true \
  nexusai
```

## 🔐 Security

### API Key Protection
- Never commit `.env` to git
- Use environment variables in production
- Rotate keys regularly
- Monitor API usage

### Input Validation
- All user inputs are sanitized
- XSS protection enabled
- SQL injection prevention
- Rate limiting on API calls

### Authentication
- Client-side auth flow (demo mode)
- JWT tokens for backend API
- Secure session management

## 📊 Monitoring

### Error Tracking
Integrate with Sentry:

```bash
npm install @sentry/react @sentry/tracing
```

Add to `main.tsx`:
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your_sentry_dsn",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

### Analytics
Enable analytics in `.env`:
```env
VITE_ENABLE_ANALYTICS=true
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 📈 Performance

### Optimizations Applied
- ✅ Code splitting (lazy loading)
- ✅ Tree shaking
- ✅ Image optimization
- ✅ CSS purging
- ✅ Gzip compression
- ✅ CDN-ready assets

### Bundle Analysis

```bash
npm run build
npm run analyze
```

## 🔧 API Integration

### OpenAI

The app uses OpenAI's API for:
- Ghost text completions
- Intent analysis
- Prompt optimization
- Multi-agent orchestration

**Rate Limits:**
- Free tier: 3 RPM, 150K TPM
- Tier 1: 500 RPM, 30M TPM
- Tier 2: 5000 RPM, 6M TPM

### Anthropic

Alternative to OpenAI:
- Claude 3.5 Sonnet for complex tasks
- Faster response times
- Better code generation

**Rate Limits:**
- 50 requests per minute
- 100K tokens per minute

## 🎯 Features

### Smart Notepad
- **Dual Editor**: Tiptap (rich text) + Monaco (code)
- **AI Ghost Text**: Real-time completions
- **File Conversion**: DOCX, PDF, MD, HTML, JSON, YAML
- **Auto-save**: Local + cloud sync
- **Collaboration**: Real-time editing (backend required)

### RAY-Evals
- **Cognitive Compilation**: 5-stage pipeline
- **Skill Matching**: Automatic skill injection
- **Multi-Agent Orchestration**: Parallel execution
- **Intent Analysis**: Smart routing
- **Audit Trail**: Complete logging

### Interactive Sandbox
- **Live Demos**: Test all 5 AI tools
- **Memory Search**: Vector similarity
- **Prompt Evaluation**: A/B testing
- **Agent Pipeline**: Multi-agent visualization

## 🐛 Troubleshooting

### AI Features Not Working

1. Check `.env` file exists
2. Verify API keys are valid
3. Set `VITE_ENABLE_REAL_AI=true`
4. Check browser console for errors
5. Verify API quota not exceeded

### Build Errors

```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Performance Issues

1. Enable code splitting (already configured)
2. Reduce WebGL contexts
3. Lazy load heavy components
4. Use CDN for static assets

## 📚 Documentation

- [API Reference](./docs/API.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Contributing](./CONTRIBUTING.md)

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

## 📄 License

MIT License - see [LICENSE](./LICENSE)

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/your-org/nexusai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/nexusai/discussions)
- **Email**: support@nexusai.dev

## 🎉 Acknowledgments

- OpenAI for AI capabilities
- Anthropic for Claude models
- Vercel for hosting
- The open-source community

---

**Built with ❤️ for the AI-native future**
