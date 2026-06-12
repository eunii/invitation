import { useEffect } from 'react'
import { weddingConfig } from '../config'

export function usePageMeta() {
  useEffect(() => {
    const { couple, tagline, meta } = weddingConfig
    const title = meta.title.includes(couple.display) ? meta.title : `${couple.display} — Wedding Credits`
    const description = `${couple.display} — ${tagline} 모바일 웨딩 청첩장.`

    document.title = title
    document.documentElement.lang = 'ko'

    const setMeta = (selector: string, attr: 'content' | 'property', value: string) => {
      const el = document.querySelector(selector)
      if (el) el.setAttribute(attr, value)
    }

    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', tagline)
  }, [])
}
