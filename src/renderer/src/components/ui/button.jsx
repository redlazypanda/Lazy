import React from 'react'
import { Button as HeadlessButton } from '@headlessui/react'
import clsx from 'clsx'

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg'
}

const Button = ({
  children,
  variant = 'primary',
  size = 'sm',
  className = '',
  disabled = false,
  as = 'button',
  ...props
}) => {
  const base =
    'flex items-center rounded-lg font-medium transition-all duration-200 select-none focus:outline-none hover:scale-105 active:scale-95'

  const variants = {
    primary:
      'bg-Lazy-primary text-white hover:brightness-110 border-Lazy-secondary hover:bg-Lazy-secondary hover:border-Lazy-primary',
    outline:
      'border border-Lazy-primary text-Lazy-primary hover:bg-Lazy-primary hover:text-white',
    secondary:
      'bg-Lazy-card border border-Lazy-secondary text-Lazy-text hover:bg-Lazy-secondary hover:border-Lazy-card',
    danger:
      'bg-red-600 text-white border border-red-700 hover:bg-red-700 hover:border-red-800 focus:ring-red-500'
  }

  const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none'

  return (
    <HeadlessButton
      as={as}
      className={clsx(
        base,
        sizes[size],
        variants[variant],
        disabled ? disabledClasses : '',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </HeadlessButton>
  )
}

export default Button
