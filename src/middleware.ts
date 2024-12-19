import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Ajouter des en-têtes de sécurité de base
  const response = NextResponse.next()
  
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
}

export const config = {
  matcher: [
    // Appliquer le middleware uniquement aux routes API
    '/api/:path*',
  ],
}

// test vs code
// see documentation on : https://clerk.com/docs/quickstarts/nextjs
// see this github to use clerk auth : https://github.com/steven-tey/precedent/blob/main/app/layout.tsx

// use for create clerk config : https://dashboard.clerk.com/sign-in?redirect_url=https%3A%2F%2Fdashboard.clerk.com%2Fapps%2Fapp_2nZE1enK8wi69D7T7MdOO6cNHRv%2Finstances%2Fins_2nZE1dHf4s8yUtipM8C6ICBaASs
