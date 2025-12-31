import React, { useEffect, useRef, useState } from 'react'
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import VideoPreview from './VideoPreview';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isloading, setIsloading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 4;
    const nextVdRef = useRef(null);

    const handleVideoLoad = () => {
        setLoadedVideos((prev) => prev + 1);
    }

    const upcomingVdIndex = (currentIndex % totalVideos) + 1;

    const handleMiniVdClick = () => {
        setHasClicked(true);
        setCurrentIndex(upcomingVdIndex);
    }

    useEffect(() => {
        if(loadedVideos === totalVideos - 1) {
            setIsloading(false);
        }
    },[loadedVideos])

    useGSAP(() => {
        if(hasClicked) {
            gsap.set('#next-video', {visibility: 'visible'});
            gsap.to('#next-video', {
                transformOrigin: 'center center',
                scale: 1,
                width: '100%',
                height: '100%',
                duration: 1,
                ease: 'power1.inOut',
                onStart: () => nextVdRef.current.play(),
            })

            gsap.from('#current-video', {
                transformOrigin: 'center center',
                scale: 0,
                duration: 1.5,
                ease: 'power1.inOut',
            })
        }
    }, {dependencies: [currentIndex], revertOnUpdate: true})

    useGSAP(() => {
        gsap.set('#video-frame', {
            clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
            borderRadius: '0 0 40% 10%',
        });

        gsap.from('#video-frame', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius: '0 0 0 0',
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '#video-frame',
                start: 'center center',
                end: 'bottom center',
                scrub: true,
            }
        })
    },[]);

    const getVideSrc = (index) => `videos/hero-${index}.mp4`;
  return (
    <div className='relative h-dvh w-screen overflow-x-hidden'>
        {isloading && (
            <div className='flex justify-center items-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
                <div className="three-body">
                    <div className="three-body__dot"></div>
                    <div className="three-body__dot"></div>
                    <div className="three-body__dot"></div>
                </div>
            </div>
        )}
        <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-[#dfdff2]'>
            <div>
                <div className='[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] absolute-center absolute z-50 size-48 cursor-pointer overflow-hidden rounded-lg'>
                <VideoPreview>
                    <div onClick={handleMiniVdClick} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
                        <video ref={nextVdRef} src={getVideSrc(upcomingVdIndex)} loop muted id='current-video' className='size-48 origin-center scale-150 object-cover object-center ' onLoadedData={handleVideoLoad}/>
                    </div>
                </VideoPreview>
                </div>
                <video ref={nextVdRef} src={getVideSrc(currentIndex)} loop muted id='next-video' className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] invisible z-20 size-48 object-cover object-center' onLoadedData={handleVideoLoad} />
                <video src={getVideSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)} autoPlay  loop muted className='absolute left-0 top-0 size-full object-cover object-center' onLoadedData={handleVideoLoad}/>
            </div>
            <h1 className='special-font uppercase font-black text-5xl sm:right-10 sm:text-7xl md:text-9xl lg:text-[10rem] font-sans absolute bottom-5 right-5 z-40 text-[#dfdff2]' style={{ fontFamily: "'Zentry', serif" }}>
                G<b>a</b>ming
            </h1>
            <div className='absolute left-0 top-0 z-40 size-full'>
                <div className='mt-24 px-5 sm:px-10'>
                    <h1 className='special-font uppercase font-black text-5xl sm:right-10 sm:text-7xl md:text-9xl lg:text-[10rem] font-sans text-[#f0f2fa]' style={{ fontFamily: "'Zentry', serif" }}>redefi<b>n</b>e</h1>
                    <p className='mb-5 max-w-64 font-robert-regular text-[#f0f2fa]'>Enter the MetaGame Layer <br/>Unleash the Play Economy</p>
                    <Button id='watch-trailer' title='Watch Trailer' leftIcon={<TiLocationArrow />} containerClass='!bg-[#be983f] flex  items-center justify-center gap-1'/>
                </div>
            </div>
        </div>
        <h1 className='special-font uppercase font-black text-5xl sm:right-10 sm:text-7xl md:text-9xl lg:text-[10rem] font-sans absolute bottom-5 right-5  text-black' style={{ fontFamily: "'Zentry', serif" }}>
            G<b>a</b>ming
        </h1>
    </div>
  )
}

export default Hero