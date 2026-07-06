import { getTotalToolCount, formatToolCount } from '@/lib/toolCount'
import NotFoundClient from '@/components/NotFoundClient'

export default async function NotFound() {
  const count = await getTotalToolCount()
  const toolCountLabel = formatToolCount(count)

  return <NotFoundClient toolCountLabel={toolCountLabel} />
}
