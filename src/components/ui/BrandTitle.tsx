import { weddingConfig } from '../../config'

interface BrandTitleProps {
  className?: string
  as?: 'h1' | 'h2' | 'div'
  /** 헤더 등 한 줄 표시 */
  inline?: boolean
}

export function BrandTitle({ className = '', as: Tag = 'div', inline = false }: BrandTitleProps) {
  const { line1, line2 } = weddingConfig.ui.brandTitle

  const text = [line1, line2].filter(Boolean).join(' ')

  if (inline) {
    return (
      <Tag className={`lowercase italic text-primary whitespace-nowrap ${className}`.trim()}>
        {text}
      </Tag>
    )
  }

  return (
    <Tag className={`lowercase italic leading-tight text-primary ${className}`.trim()}>
      {line1 && <span className="block">{line1}</span>}
      {line2 && <span className="block">{line2}</span>}
    </Tag>
  )
}
