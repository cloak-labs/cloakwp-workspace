import { HeroSecondary, HeroTertiary } from '@/components/Hero'

export function HeroBlock({ block }) {
  const { hero_style } = block.data.attrs.data
  const { backgroundColor } = block.data.attrs
  
  const Hero = {
    primary: HeroSecondary,
    secondary: HeroSecondary,
    tertiary: HeroTertiary
  }[hero_style]

  return <Hero data={{ ...block.data.attrs.data, backgroundColor }} />
}
