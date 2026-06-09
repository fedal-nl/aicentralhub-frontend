import HeroSection from '@/components/home/HeroSection'
import StatsBanner from '@/components/home/StatsBanner'
import FeaturedTools from '@/components/home/FeaturedTools'
import WhySection from '@/components/home/WhySection'
import CategoriesGrid from '@/components/home/CategoriesGrid'
import RecentTools from '@/components/home/RecentTools'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBanner />
      <WhySection />
      <FeaturedTools />
      <CategoriesGrid />
      <RecentTools />
    </>
  )
}
