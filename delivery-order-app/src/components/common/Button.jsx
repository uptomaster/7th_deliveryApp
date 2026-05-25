function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
}) {
  const baseStyle =
    'inline-flex items-center justify-center rounded-xl font-semibold transition disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-white'

  const variantStyle = {
    primary: 'bg-orange-500 text-white shadow-md hover:bg-orange-600',
    secondary: 'bg-orange-100 text-orange-600 hover:bg-orange-200',
    outline: 'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50',
    dark: 'bg-zinc-900 text-white hover:bg-zinc-800',
  }

  const sizeStyle = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-12 px-5 text-sm',
    lg: 'h-14 px-6 text-base',
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyle} ${variantStyle[variant]} ${sizeStyle[size]} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button