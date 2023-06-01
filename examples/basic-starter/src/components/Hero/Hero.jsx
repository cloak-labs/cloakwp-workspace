import { HeroSecondary, HeroTertiary } from '@/components/Hero';

export const Hero = ({ heroData }) => {
  const { display_hero, hero_style } = heroData
  
  const Hero = {
    secondary: HeroSecondary,
    tertiary: HeroTertiary
  }[hero_style]

  return <>{ (Hero && display_hero !== false) && <Hero data={heroData} /> }</>
}