import {
  Header,
  Footer,
  HeroSection,
  PropertyGrid,
  FeaturesSection,
  AboutSection,
  TestimonialsSection,
  ContactSection,
  FAQSection,
  NewsSection,
  PropertyTypesSection,
} from "@/components";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <PropertyTypesSection />
        <PropertyGrid />
        <FeaturesSection />
        <AboutSection />
        <TestimonialsSection />
        <FAQSection />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
