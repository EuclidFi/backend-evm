import HeroComponent from '@/src/components/Hero'
import CratesTable from '@/src/components/CratesTable'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-16 lg:p-24">
      <HeroComponent />
      <CratesTable />
    </main>
  );
}
