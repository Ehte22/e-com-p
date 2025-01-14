import React, { useState } from 'react';

const Carousel: React.FC = () => {
    const images = [
        'https://media.istockphoto.com/id/1338882450/photo/a-bluetooth-headset-blue-color-isolated-on-white-background-closeup-shot.webp?a=1&b=1&s=612x612&w=0&k=20&c=AEP74y3lhMkBS9j8NQw7bNJGC9YzawCSP26WGW_0458=',
        'https://images.unsplash.com/photo-1471174466996-0aa69dbda661?q=80&w=1924&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ]
    if (!images || images.length === 0) {
        return <div className="text-center text-red-500">No images available</div>;
    }
    const [currentIndex, setCurrentIndex] = useState(0);
    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
    const goToPrev = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length)
    }
    return (
        <div className='pt-12'>
            <div className="relative w-full max-w-full mx-auto h-[400px] p-10">
                <div className="relative overflow-hidden rounded-lg">
                    <div className='h-96'>
                        <img
                            src={images[currentIndex]}
                            alt={`Carousel image ${currentIndex}`}
                            className="w-full h-full"
                        />
                    </div>
                </div>
                <button
                    onClick={goToPrev}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-75 hover:opacity-100 transition"
                >
                    &#60;
                </button>
                <button
                    onClick={goToNext}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-75 hover:opacity-100 transition"
                > &#62;
                </button>
            </div>
        </div>
    );
};

export default Carousel;
