import React from 'react'
import Image from 'next/image'

interface EnricoLandingProps {
  width?: number
  height?: number
  className?: string
}

export default function EnricoLanding({ width = 1000, height = 1000, className = '' }: EnricoLandingProps) {
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <Image
        src="/images/EnricoLanding.svg"
        alt="Enrico Landing"
        layout="fill"
        objectFit="contain"
      />
    </div>
  )
}