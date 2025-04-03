"use client"
import React, { useRef, useState, MouseEvent } from 'react';
import { TiLocationArrow } from 'react-icons/ti';

type BentoTiltProps = {
    children: React.ReactNode;
    className?: string;
};

type BentoCardProps = {
    src: string;
    title: React.ReactNode;
    description?: string;
};

const BentoTilt: React.FC<BentoTiltProps> = ({ children, className = '' }) => {
    const [transformStyle, setTransformStyle] = useState<string>('');
    const itemRef = useRef<HTMLDivElement | null>(null);

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        if (!itemRef.current) return;

        const { left, top, width, height } = itemRef.current.getBoundingClientRect();

        const relativeX = (event.clientX - left) / width;
        const relativeY = (event.clientY - top) / height;

        const tiltX = (relativeY - 0.5) * 5;
        const tiltY = (relativeX - 0.5) * -5;

        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98,0.98,0.98)`;

        setTransformStyle(newTransform);
    };

    const handleMouseLeave = () => {
        setTransformStyle('');
    };

    return (
        <div
            className={className}
            ref={itemRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: transformStyle }}
        >
            {children}
        </div>
    );
};

const BentoCard: React.FC<BentoCardProps> = ({ src, title, description }) => {
    return (
        <div className="relative size-full">
            <video
                src={src}
                loop
                muted
                autoPlay
                className='absolute left-0 top-0 size-full object-cover object-center'
            />
            <div className="relative z-10 flex size-full flex-col justify-between p-5 text-gray-500">
                <div>
                    <h1 className='bento-title'>{title}</h1>
                    {description && (
                        <p className='mt-3 max-w-64 text-xs md:text-base'>{description}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const Features: React.FC = () => {
    return (
        <section className='bg-black pb-52'>
            <div className="container mx-auto px-3 md:px-10">
                <div className="px-5 py-32">
                    <p className='font-circular-web text-lg text-blue-50'>Into the Seasonal Journey Layer</p>
                    <p className='max-w-md font-circular-web text-lg text-blue-50 mb-2'>
                    Immerse yourself in a diverse and ever-evolving travel realm,
                    where breathtaking destinations seamlessly blend into an
                    interconnected seasonal journey across India.
                    </p>
                    <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
                        <BentoCard 
                            src="videos/feature-1.mp4"
                            title={<>Mumb<b>a</b>i</>}
                            description="A seasonal exploration of Mumbai's bustling streets, heritage, and unique travel experiences throughout the year."
                        />
                    </BentoTilt>
                    <div className="grid h-[135vh] grid-cols-2 grd-rows-3 gap-7">
                        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
                            <BentoCard
                                src="videos/feature-2.mp4"
                                title={<>pun<b>e</b></>}
                                description="A cultural and heritage-inspired travel experience—an identity primed for seasonal adventures in Pune."
                            />
                        </BentoTilt>
                        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
                            <BentoCard
                                src="videos/feature-3.mp4"
                                title={<>man<b>a</b>li</>}
                                description="A seasonal travel companion—enhancing your journey through Manali with unforgettable moments."
                            />
                        </BentoTilt>
                        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
                            <BentoCard
                                src="videos/feature-4.mp4"
                                title={<>jaip<b>u</b>r</>}
                                description="A cultural travel guide—making your Jaipur journeys more immersive and memorable."
                            />
                        </BentoTilt>
                        <div className="bento-tilt_2">
                            <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
                                <h1 className='bento-title special-font max-w-64 text-black'>M<b>o</b>re Locations c<b>o</b>ming s<b>o</b>on</h1>
                                <TiLocationArrow className='m-5 scale-[5] self-end' />
                            </div>
                        </div>
                        <BentoTilt className="bento-tilt_2">
                            <video
                                src="videos/feature-5.mp4"
                                loop
                                muted
                                autoPlay
                                className='size-full object-cover object-center'
                            />
                        </BentoTilt>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
