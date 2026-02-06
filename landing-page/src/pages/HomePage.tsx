import React from 'react';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/sections/HeroSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import SnapBenefitsSection from '../components/sections/SnapBenefitsSection';
import ProductsSection from '../components/sections/ProductsSection';
import BenefitsSection from '../components/sections/BenefitsSection';
import TestimonialSection from '../components/sections/TestimonialSection';
import FaqSection from '../components/sections/FaqSection';
import ContactSection from '../components/sections/ContactSection';
import CtaSection from '../components/sections/CtaSection';
import Footer from '../components/layout/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <SnapBenefitsSection />
      <ProductsSection />
      <BenefitsSection />
      <TestimonialSection />
      <FaqSection />
      <ContactSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default HomePage;
