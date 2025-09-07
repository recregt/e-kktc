'use client'

import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  variant?: 'default' | 'white'
}

export default function Logo({ size = 'md', className = '', variant = 'default' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-12 w-auto'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }

  const textColor = variant === 'white' ? 'text-white' : 'text-gray-900'
  const subTextColor = variant === 'white' ? 'text-gray-300' : 'text-gray-500'

  return (
    <Link href="/" className={`flex items-center space-x-2 ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizeClasses[size]} relative`}>
        <div className="relative">
          {/* Modern Cyprus inspired logo */}
          <svg 
            className={sizeClasses[size]} 
            viewBox="0 0 40 40" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer ring - represents Cyprus island */}
            <circle 
              cx="20" 
              cy="20" 
              r="18" 
              stroke="url(#gradient1)" 
              strokeWidth="2" 
              fill="none"
            />
            
            {/* Inner elements - shopping/commerce theme */}
            <path 
              d="M12 16L16 20L28 12" 
              stroke="url(#gradient2)" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            
            {/* Shopping bag icon integrated */}
            <path 
              d="M14 24H26L25 28H15L14 24Z" 
              fill="url(#gradient3)" 
              opacity="0.8"
            />
            <path 
              d="M17 22V20C17 18.9 17.9 18 19 18H21C22.1 18 23 18.9 23 20V22" 
              stroke="url(#gradient2)" 
              strokeWidth="1.5" 
              fill="none"
            />
            
            {/* Gradients */}
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      
      {/* Logo Text */}
      <div className="flex flex-col">
        <span className={`font-bold ${textColor} ${textSizeClasses[size]} leading-none`}>
          e-KKTC
        </span>
        <span className={`text-xs ${subTextColor} leading-none`}>
          marketplace
        </span>
      </div>
    </Link>
  )
}
