import { FC } from 'react';
import FeatureItem from '../components/FeatureItem';
import Hero from '../components/Hero';
import iconChat from '../assets/img/icon-chat.webp';
import iconMoney from '../assets/img/icon-money.webp';
import iconSecurity from '../assets/img/icon-security.webp';




const Home: FC = () => {
  return (
    <main id='main'>
      <Hero />
      <section className="features">
        <h2 className="sr-only">Features</h2>
        <FeatureItem
            imgSrc={iconChat}
          title="You are our #1 priority"
          description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
        />
        <FeatureItem
          imgSrc={iconMoney}
          title="More savings means higher rates"
          description="The more you save with us, the higher your interest rate will be!"
        />
        <FeatureItem
          imgSrc={iconSecurity}
          title="Security you can trust"
          description="We use top of the line encryption to make sure your data and money is always safe."
        />
      </section>
    </main>
  );
};


export default Home;