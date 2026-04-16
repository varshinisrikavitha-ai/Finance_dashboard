import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const AuthContext = createContext(null);

const USERS_STORAGE_KEY = 'finance-dashboard-users-v1';
const SESSION_STORAGE_KEY = 'finance-dashboard-auth-session-v1';
const SESSION_TTL_MS = {
  short: 24 * 60 * 60 * 1000,
  long: 30 * 24 * 60 * 60 * 1000
};

const initialState = {
  user: null,
  isHydrating: true,
  isSubmitting: false,
  error: null
};

function authReducer(state, action) {
  switch (action.type) {
    case 'hydrate-finish':
      return { ...state, user: action.user ?? null, isHydrating: false };
    case 'auth-start':
      return { ...state, isSubmitting: true, error: null };
    case 'auth-success':
      return { ...state, user: action.user, isSubmitting: false, error: null };
    case 'auth-error':
      return { ...state, isSubmitting: false, error: action.error };
    case 'logout':
      return { ...state, user: null, isSubmitting: false, error: null };
    default:
      return state;
  }
}

function safeParse(rawValue, fallbackValue) {
  try {
    return rawValue ? JSON.parse(rawValue) : fallbackValue;
  } catch {
    return fallbackValue;
  }
}

function readUsers() {
  if (typeof window === 'undefined') return [];
  return safeParse(window.localStorage.getItem(USERS_STORAGE_KEY), []);
}

function saveUsers(users) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function persistSession(user, remember) {
  if (typeof window === 'undefined') return;

  const expiresAt = Date.now() + (remember ? SESSION_TTL_MS.long : SESSION_TTL_MS.short);
  const session = {
    user,
    remember,
    expiresAt
  };

  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

function loadValidSession() {
  if (typeof window === 'undefined') return null;

  const session = safeParse(window.localStorage.getItem(SESSION_STORAGE_KEY), null);

  if (!session?.user || !session?.expiresAt || Date.now() > session.expiresAt) {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
    return null;
  }

  return session.user;
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const sessionUser = loadValidSession();
    dispatch({ type: 'hydrate-finish', user: sessionUser });
  }, []);

  async function login({ email, password, role, remember }) {
    dispatch({ type: 'auth-start' });

    await new Promise((resolve) => window.setTimeout(resolve, 650));

    const users = readUsers();
    const normalizedEmail = email.trim().toLowerCase();

    const foundUser = users.find((user) => user.email.toLowerCase() === normalizedEmail && user.password === password);

    if (!foundUser) {
      const error = 'Invalid email or password.';
      dispatch({ type: 'auth-error', error });
      throw new Error(error);
    }

    const authenticatedUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: role ?? foundUser.role
    };

    persistSession(authenticatedUser, Boolean(remember));
    dispatch({ type: 'auth-success', user: authenticatedUser });

    return authenticatedUser;
  }

  async function signup({ name, email, password, role, remember }) {
    dispatch({ type: 'auth-start' });

    await new Promise((resolve) => window.setTimeout(resolve, 800));

    const users = readUsers();
    const normalizedEmail = email.trim().toLowerCase();

    const emailInUse = users.some((user) => user.email.toLowerCase() === normalizedEmail);

    if (emailInUse) {
      const error = 'An account already exists with this email.';
      dispatch({ type: 'auth-error', error });
      throw new Error(error);
    }

    const newUser = {
      id: window.crypto.randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
      password,
      role,
      createdAt: new Date().toISOString()
    };

    saveUsers([...users, newUser]);

    const authenticatedUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };

    persistSession(authenticatedUser, Boolean(remember));
    dispatch({ type: 'auth-success', user: authenticatedUser });

    return authenticatedUser;
  }

  function logout() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
    }

    dispatch({ type: 'logout' });
  }

  const value = useMemo(
    () => ({
      user: state.user,
      isAuthenticated: Boolean(state.user),
      isHydrating: state.isHydrating,
      isSubmitting: state.isSubmitting,
      error: state.error,
      login,
      signup,
      logout
    }),
    [state.user, state.isHydrating, state.isSubmitting, state.error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
