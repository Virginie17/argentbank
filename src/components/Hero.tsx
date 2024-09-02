import { FC } from "react";
import HeroContent from "../components/HeroContent";

const Hero: FC = () => {
  return (
    <div className="hero">
      {/* Inclusion du composant HeroContent */}
      <HeroContent />
    </div>
  );
};

export default Hero;