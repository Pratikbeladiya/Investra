import React from 'react';
import HeroProduct from "../../components/products/HeroProduct";
import LeftSection from "../../components/products/LeftSection";
import RightSection from "../../components/products/RightSection";
import Universe from "../../components/products/Universe";

function ProductPage(){
    return(
      <>
       <HeroProduct/> 
      <LeftSection
       imageURL="/media/images/kite.png"
       productName="kite"
       productDescription="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the kite experience seamlessly on your Android and IOs devices."
       tryDemo=""
       learnMore=""
       googlePlay=""
       appStore=""
      />
      <RightSection
       imageURL="/media/images/console.png"
       productName="Console"
       productDescription="The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations."
       learnMore=""
      />
      <LeftSection
       imageURL="/media/images/coin.png"
       productName="Coin"
       productDescription="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices."
       tryDemo=""
       learnMore=""
       googlePlay=""
       appStore=""
      />
      <RightSection
       imageURL="/media/images/kiteconnect.png"
       productName="Kite connect API"
       productDescription="Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase."
       learnMore=""
      />
      <p className="text-center mt-5 mb-5">Want to know more about our technology stack? Check out the Zerodha.tech blog.
      The Zerodha Universe</p>
      <Universe/>
      </>
    );
}

export default ProductPage;
