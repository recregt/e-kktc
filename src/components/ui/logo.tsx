'use client'

import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  variant?: 'default' | 'white'
}

export default function Logo({ size = 'md', className = '', variant = 'default' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl', 
    lg: 'text-2xl'
  }

  const subSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  const textColor = variant === 'white' ? 'text-white' : 'text-gray-900'
  const marketplaceColor = variant === 'white' ? 'text-blue-300' : 'text-blue-500'

  return (
    <Link href="/" className={`flex items-center hover:opacity-90 transition-opacity ${className}`}>
      {/* Clean Stacked Logo */}
      <div className="flex flex-col items-start">
        {/* Main brand name */}
        <span className={`${sizeClasses[size]} font-black ${textColor} tracking-tight leading-none`}>
          e-KKTC
        </span>
        
        {/* Prominent marketplace subtitle */}
        <span className={`${marketplaceColor} font-semibold ${subSizeClasses[size]} tracking-wide leading-none mt-0.5`}>
          marketplace
        </span>
      </div>
    </Link>
  )
}
