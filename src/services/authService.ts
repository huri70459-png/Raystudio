// Authentication Service
// This provides client-side auth flow. In production, integrate with your backend.

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const AUTH_STORAGE_KEY = 'nexusai_auth';

// Generate a simple session token (in production, use JWT from backend)
function generateToken(): string {
  return 'tok_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Get current auth state
export function getAuthState(): AuthState {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        user: parsed.user,
        token: parsed.token,
        isAuthenticated: !!parsed.token && !!parsed.user,
      };
    }
  } catch (error) {
    console.error('Failed to parse auth state:', error);
  }
  
  return {
    user: null,
    token: null,
    isAuthenticated: false,
  };
}

// Save auth state
function saveAuthState(state: AuthState): void {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save auth state:', error);
  }
}

// Sign up (demo mode - in production, call backend API)
export async function signUp(
  email: string,
  password: string,
  name?: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  // Validate input
  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  if (password.length < 8) {
    return { success: false, error: 'Password must be at least 8 characters' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Invalid email format' };
  }

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  // Create user (in production, backend creates this)
  const user: User = {
    id: 'user_' + Date.now().toString(36),
    email,
    name,
    plan: 'free',
    createdAt: Date.now(),
  };

  const token = generateToken();
  const state: AuthState = { user, token, isAuthenticated: true };
  saveAuthState(state);

  return { success: true, user };
}

// Sign in (demo mode)
export async function signIn(
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  // In production, verify credentials with backend
  // For demo, accept any valid email/password
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Invalid email format' };
  }

  const user: User = {
    id: 'user_' + Date.now().toString(36),
    email,
    plan: 'free',
    createdAt: Date.now(),
  };

  const token = generateToken();
  const state: AuthState = { user, token, isAuthenticated: true };
  saveAuthState(state);

  return { success: true, user };
}

// Sign out
export function signOut(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

// Update user profile
export function updateUser(updates: Partial<User>): User | null {
  const state = getAuthState();
  if (!state.user) return null;

  const updatedUser = { ...state.user, ...updates };
  const newState = { ...state, user: updatedUser };
  saveAuthState(newState);

  return updatedUser;
}

// Check if user has required plan
export function hasRequiredPlan(requiredPlan: 'free' | 'pro' | 'enterprise'): boolean {
  const state = getAuthState();
  if (!state.user) return false;

  const planLevels = { free: 0, pro: 1, enterprise: 2 };
  return planLevels[state.user.plan] >= planLevels[requiredPlan];
}

// Auth guard for protected routes
export function requireAuth(): User | null {
  const state = getAuthState();
  return state.user;
}
