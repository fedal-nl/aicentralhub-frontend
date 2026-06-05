import HeroSection from '@/components/home/HeroSection'
import FeaturedTools from '@/components/home/FeaturedTools'
import CategoriesGrid from '@/components/home/CategoriesGrid'
import StatsBanner from '@/components/home/StatsBanner'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBanner />
      <FeaturedTools />
      <CategoriesGrid />
    </>
  )
}
