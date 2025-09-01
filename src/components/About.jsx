import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React from 'react'
import AnimatedTitle from './AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: '#clip',
                start: 'center center',
                end: '+=800 center',
                scrub: 0.5,
                pin: true,
                pinSpacing: true,
            }
        })
        clipAnimation.to('.clip-path', {
            width: '100vw',
            height: '100vh',
            borderRadius: 0,
        })
    })
  return (
    <div id='about' className='min-h-screen w-screen'>
        <div className='relative mb-8 mt-36 flex flex-col items-center gap-5'>
            <h2 className='font-general text-sm uppercase md:text-[10px]'>Welcome to Zentry</h2>

            <AnimatedTitle title="Disc<b>o</b>ver the world's <br/> l<b>a</b>rgest shared adventure" containerClass="mt-5 text-black text-center"/>
            

            <div className='absolute bottom-[-75dvh] md:bottom-[-80dvh] left-1/2 w-full max-w-96 -translate-x-1/2 text-center text-lg md:max-w-[34rem]'>
                <p>
                    The Game of Games begins-your life, now an epic MMORPG
                </p>
                <p>
                    Zentry unites every player from countless games and platforms
                </p>
            </div>
        </div>
        <div className='h-dvh w-screen ' id='clip'>
            <div className='clip-path [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] absolute left-1/2 top-0 z-20 h-[50vh] w-72 origin-center -translate-x-1/2 overflow-hidden rounded-3xl md:w-[30vw] md:h-[60vh] '>
                <img src="img/about.webp" alt="background" className='absolute left-0 top-0 size-full object-cover' />
            </div>
        </div>
    </div>
  )
}

export default About