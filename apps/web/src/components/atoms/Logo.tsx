interface LogoProps {
  className?: string
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <div
      role="img"
      aria-label="code connect"
      className={`relative h-10 w-[127px] shrink-0 overflow-hidden ${className}`}
    >
      <div className="absolute inset-[35.48%_88.04%_6.09%_0]">
        <img
          src="/logo-icon-a.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full max-w-none"
        />
      </div>
      <div className="absolute inset-[15.11%_78.6%_26.47%_9.43%]">
        <img
          src="/logo-icon-b.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full max-w-none"
        />
      </div>
      <div className="absolute inset-[0_0_0_26.88%]">
        <img
          src="/logo-wordmark.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full max-w-none"
        />
      </div>
    </div>
  )
}
