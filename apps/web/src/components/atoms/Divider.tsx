interface DividerProps {
  text?: string
  className?: string
}

export function Divider({ text, className = '' }: DividerProps) {
  if (text) {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <div className="h-px flex-1 bg-dark-lighter/60" />
        <span className="text-body-sm text-text-primary whitespace-nowrap">{text}</span>
        <div className="h-px flex-1 bg-dark-lighter/60" />
      </div>
    )
  }

  return <div className={`h-px bg-dark-lighter ${className}`} />
}
