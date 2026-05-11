import React from 'react';
import Hero from '../../components/pricing/Hero';
import Brokerage from '../../components/pricing/Brokerage';
import OpenAccount from '../../components/common/OpenAccount';

function PricingPage() {
  return (
    <>
      <Hero />
      <Brokerage />
      <OpenAccount />
    </>
  );
}

export default PricingPage;
