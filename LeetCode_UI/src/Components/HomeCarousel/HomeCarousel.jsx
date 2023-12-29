import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { HomeCarouselData } from './HomeCarouselData';

const items = HomeCarouselData.map((item)=><img style={{width:'100%' , height:'300px'}} className='cursor-pointer' role='presentation'
src={item.image}/>)

export const HomeCarousel = () => (
    <AliceCarousel
        autoPlay
        autoPlayStrategy="none"
        autoPlayInterval={3000}
        animationDuration={1000}
        animationType="fadeout"
        infinite
        touchTracking={false}
        disableDotsControls
        disableButtonsControls
        items={items}
    />
);