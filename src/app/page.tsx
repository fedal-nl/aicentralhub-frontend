import { getTotalToolCount, formatToolCount } from '@/lib/toolCount'
import HeroSection from '@/components/home/HeroSection'
import StatsBanner from '@/components/home/StatsBanner'
import FeaturedTools from '@/components/home/FeaturedTools'
import WhySection from '@/components/home/WhySection'
import CategoriesGrid from '@/components/home/CategoriesGrid'
import RecentTools from '@/components/home/RecentTools'
import WebsiteStructuredData from '@/components/structured-data/WebsiteStructuredData'
import NewsletterSection from '@/components/home/NewsletterSection'

export default async function HomePage() {
  const count = await getTotalToolCount()
  const toolCountLabel = formatToolCount(count)

  return (
    <>
      <WebsiteStructuredData toolCountLabel={toolCountLabel} />
      <HeroSection toolCountLabel={toolCountLabel} />
      <StatsBanner toolCountLabel={toolCountLabel} />
      <WhySection toolCountLabel={toolCountLabel} />
      <FeaturedTools />
      <CategoriesGrid />
      <NewsletterSection />
      <RecentTools />
    </>
  )
}
