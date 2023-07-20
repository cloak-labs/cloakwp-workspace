import { Hero } from '@/components/Hero'

export function HeroBlock({ block }) {
  const { backgroundColor } = block.data.attrs
  return <Hero data={{ ...block.data.attrs.data, backgroundColor }} />
}
