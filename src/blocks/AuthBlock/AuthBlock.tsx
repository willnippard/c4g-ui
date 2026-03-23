import { type FormEvent, useState } from 'react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { cn } from '../../lib/utils'

export interface AuthBlockProps {
  mode?: 'login' | 'signup'
  layout?: 'split' | 'centered'
  /** Controls the brand panel width in split layout. '2' = half, '3' = third. */
  splitRatio?: '2' | '3'
  onSubmit?: (data: { email: string; password: string }) => void
  onSSOClick?: (provider: 'google' | 'github' | 'apple') => void
  onModeChange?: (mode: 'login' | 'signup') => void
  onForgotPassword?: () => void
  className?: string
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.014 24.014 0 0 0 0 21.56l7.98-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  )
}

function BrandPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between bg-inverse-surface border-r border-outline-variant/20 p-12 xl:p-16">
      {/* Brand */}
      <div>
        <h1 className="font-epilogue text-3xl xl:text-4xl font-bold tracking-tight text-inverse-on-surface">
          Code<span className="text-primary">4</span>Good
        </h1>
      </div>

      {/* Accent bar */}
      <div className="mt-auto">
        <div className="h-1 w-full bg-primary/20 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-2/3 rounded-full" />
        </div>
      </div>
    </div>
  )
}

function AuthForm({
  isLogin,
  onSubmit,
  onSSOClick,
  onModeChange,
  onForgotPassword,
  showBrandHeader,
}: {
  isLogin: boolean
  onSubmit?: (data: { email: string; password: string }) => void
  onSSOClick?: (provider: 'google' | 'github' | 'apple') => void
  onModeChange?: () => void
  onForgotPassword?: () => void
  showBrandHeader: boolean
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit?.({ email, password })
  }

  return (
    <div className="flex flex-col justify-center w-full max-w-md mx-auto">
      {showBrandHeader && (
        <div className="mb-10 text-center">
          <h1 className="font-epilogue text-3xl font-extrabold text-on-surface">
            Code<span className="text-primary">4</span>Good
          </h1>
        </div>
      )}

      <div className="mb-2">
        <h2 className="font-epilogue text-2xl font-bold text-on-surface">
          {isLogin ? 'Welcome back' : 'Get started'}
        </h2>
        <p className="mt-1 font-manrope text-sm text-muted-foreground">
          {isLogin ? 'Sign in to your account' : 'Create your free account'}
        </p>
      </div>

      {/* SSO buttons */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => onSSOClick?.('google')}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-outline-variant/30 bg-surface-container-lowest px-4 py-3 font-manrope text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-low focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Continue with Google"
        >
          <GoogleIcon />
          <span className="hidden sm:inline">Google</span>
        </button>
        <button
          type="button"
          onClick={() => onSSOClick?.('github')}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-outline-variant/30 bg-surface-container-lowest px-4 py-3 font-manrope text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-low focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Continue with GitHub"
        >
          <GitHubIcon />
          <span className="hidden sm:inline">GitHub</span>
        </button>
        <button
          type="button"
          onClick={() => onSSOClick?.('apple')}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-outline-variant/30 bg-surface-container-lowest px-4 py-3 font-manrope text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-low focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Continue with Apple"
        >
          <AppleIcon />
          <span className="hidden sm:inline">Apple</span>
        </button>
      </div>

      {/* Divider */}
      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-outline-variant/30" />
        <span className="font-manrope text-xs text-muted-foreground uppercase tracking-wider">or</span>
        <div className="h-px flex-1 bg-outline-variant/30" />
      </div>

      {/* Email/password form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete={isLogin ? 'current-password' : 'new-password'}
        />

        {isLogin && (
          <div className="flex justify-end -mt-2">
            <button
              type="button"
              onClick={onForgotPassword}
              className="font-manrope text-xs font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
            >
              Forgot password?
            </button>
          </div>
        )}

        <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
          {isLogin ? 'Sign in' : 'Create account'}
        </Button>
      </form>

      {/* Mode toggle */}
      <p className="mt-8 text-center font-manrope text-sm text-muted-foreground">
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button
          type="button"
          onClick={onModeChange}
          className="font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
        >
          {isLogin ? 'Sign up' : 'Sign in'}
        </button>
      </p>
    </div>
  )
}

const splitGridStyles = {
  '2': 'lg:grid-cols-2',
  '3': 'lg:grid-cols-[1fr_2fr]',
}

export function AuthBlock({
  mode: controlledMode,
  layout = 'split',
  splitRatio = '2',
  onSubmit,
  onSSOClick,
  onModeChange,
  onForgotPassword,
  className,
}: AuthBlockProps) {
  const [internalMode, setInternalMode] = useState<'login' | 'signup'>('login')
  const mode = controlledMode ?? internalMode

  const handleModeToggle = () => {
    const nextMode = mode === 'login' ? 'signup' : 'login'
    if (onModeChange) {
      onModeChange(nextMode)
    } else {
      setInternalMode(nextMode)
    }
  }

  const isLogin = mode === 'login'

  if (layout === 'centered') {
    return (
      <div
        className={cn(
          'flex min-h-screen items-center justify-center bg-background p-4',
          className,
        )}
      >
        <div className="w-full max-w-md rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-8 sm:p-10">
          <AuthForm
            isLogin={isLogin}
            onSubmit={onSubmit}
            onSSOClick={onSSOClick}
            onModeChange={handleModeToggle}
            onForgotPassword={onForgotPassword}
            showBrandHeader
          />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'grid min-h-screen',
        splitGridStyles[splitRatio],
        className,
      )}
    >
      <BrandPanel />
      <div className="flex items-center justify-center bg-background p-8 sm:p-12 lg:p-16">
        <AuthForm
          isLogin={isLogin}
          onSubmit={onSubmit}
          onSSOClick={onSSOClick}
          onModeChange={handleModeToggle}
          onForgotPassword={onForgotPassword}
          showBrandHeader={false}
        />
      </div>
    </div>
  )
}
