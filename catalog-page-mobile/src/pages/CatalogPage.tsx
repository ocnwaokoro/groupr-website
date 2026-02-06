import React from 'react'
import Navbar from '../components/layout/Navbar'
import PromoBanner from '../components/sections/PromoBanner'
import HeroSearch from '../components/sections/HeroSearch'
import CategoryStrip from '../components/sections/CategoryStrip'
import ProductGrid from '../components/sections/ProductGrid'
import Pagination from '../components/sections/Pagination'
import MerchantInfo from '../components/sections/MerchantInfo'
import Footer from '../components/layout/Footer'

const CatalogPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-bg-primary flex flex-col text-text-primary font-sans">
      <div className="w-full min-w-0 flex flex-col items-stretch">
        <Navbar />
        <PromoBanner />
        <HeroSearch />
        <main className="w-full flex flex-col items-center flex-1 px-0 py-5 pb-20">
          <div className="w-full flex flex-col items-stretch gap-8">
            <div className="w-full flex items-center justify-center py-2">
              <CategoryStrip />
            </div>
            <div className="w-full flex flex-col gap-8 px-5">
              <ProductGrid />
              <div className="flex flex-col items-center gap-6">
                <Pagination />
                <MerchantInfo />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default CatalogPage
