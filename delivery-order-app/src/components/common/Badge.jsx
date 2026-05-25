function Badge({ children, variant = 'primary', className = '' }) {
  const variantStyle = {
    primary: 'bg-primary text-gray-0',
    secondary: 'bg-secondary text-gray-5',
    assistive: 'bg-assistive text-primary',
    yellow: 'bg-yellow-primary text-gray-5',
    gray: 'bg-gray-1 text-gray-4',
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-[12px] font-medium ${variantStyle[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

export default Badge