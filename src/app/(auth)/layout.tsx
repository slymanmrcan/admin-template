export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left: Branding Area */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-primary p-12">
        <div className="max-w-md text-center space-y-6">
          <div className="flex items-center justify-center">
            <div className="h-16 w-16 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
              <span className="text-3xl font-bold text-primary-foreground">A</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground">
            Admin Panel
          </h1>
          <p className="text-primary-foreground/70 text-lg">
            Modern, ölçeklenebilir ve güvenli admin panel şablonu.
          </p>
        </div>
      </div>

      {/* Right: Form Area */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}
