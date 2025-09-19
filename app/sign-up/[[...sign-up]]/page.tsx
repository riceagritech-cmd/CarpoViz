import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join CarpoViz</h1>
          <p className="text-gray-600">Create your account and start carpooling</p>
        </div>
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: "bg-emerald-600 hover:bg-emerald-700",
              card: "shadow-xl border-0",
            },
          }}
        />
      </div>
    </div>
  )
}
