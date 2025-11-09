// app/admin/(auth)/login/page.tsx

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <h2 className="text-center text-3xl font-bold">Sign in</h2>
        {/* Your login form here */}
        <form className="mt-8 space-y-6">
          <input type="email" placeholder="Email" className="w-full..." required />
          <input type="password" placeholder="Password" className="w-full..." required />
          <button type="submit" className="w-full btn btn-primary">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}