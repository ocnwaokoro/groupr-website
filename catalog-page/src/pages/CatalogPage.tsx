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
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <Navbar />
      <PromoBanner />
      <HeroSearch />
      <main className="w-full max-w-[1440px] mx-auto px-section py-5 pb-20 flex flex-col items-center flex-1">
        <div className="w-full max-w-[1312px] flex flex-col items-stretch gap-16">
          <div className="w-full flex items-center justify-center py-8">
            <CategoryStrip />
          </div>
          <div className="w-full flex flex-col gap-10">
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
  )
}

export default CatalogPage
