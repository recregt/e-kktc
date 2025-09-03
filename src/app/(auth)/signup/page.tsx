import { SignUpForm } from '@/components/auth/sign-up-form'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <SignUpForm />
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Zaten hesabınız var mı?{' '}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Giriş yapın
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
