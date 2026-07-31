import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import DashboardClient from '@/components/dashboard/DashboardClient'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Manage your AI CentralHub account, profile and favorite tools.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/dashboard' },
}

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.backendProfile) {
    redirect('/login')
  }

  return (
    <DashboardClient profile={session.backendProfile} user={session.user} />
  )
}
