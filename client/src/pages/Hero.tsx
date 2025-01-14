import React from 'react'
import Footer from '../components/Footer'
import Product from './Product'
import Carousel from './Carousel'
import TrustSignals from './TrustSignals'

const Hero: React.FC = () => {
    return (
        <div>
            <Carousel />
            <Product />
            <TrustSignals />
            <Footer />
        </div>
    )
}

export default Hero