import { HeroSection } from "@/components/sections/hero-section";
import { RegistrationSection } from "@/components/sections/registration-section";
import { FooterSection } from "@/components/sections/footer-section";
import ListDetails from "@/components/sections/list-section";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <RegistrationSection />
        <ListDetails />
      </main>
      <FooterSection />
    </>
  );
}
