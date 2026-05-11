import React from 'react';
import Hero from '../../components/home/Hero';
import Awards from '../../components/home/Awards';
import Stats from '../../components/home/Stats';
import Pricing from '../../components/home/Pricing';
import Education from '../../components/home/Education';
import OpenAccount from '../../components/common/OpenAccount';

function HomePage(){
    return(
        <>
          <Hero/>
          <Awards/>
          <Stats/>
          <Pricing/>
          <Education/>
          <OpenAccount/>
        </>
    );
}

export default HomePage;
