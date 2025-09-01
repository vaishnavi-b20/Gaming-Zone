import gsap from 'gsap';
import React, { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/all';
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({title, containerClass}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const titleAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: '100 bottom',
                    end: 'center bottom',
                    toggleActions: 'play none none reverse'
                },
            });
            titleAnimation.to('.animated-word', {
                opacity: 1,
                transform: 'translate3d(0,0,0) rotateY(0deg) rotateX(0deg)',
                ease: 'power2.inOut',
                stagger: 0.02,
            },0);
        }, containerRef);

        return () => ctx.revert();
    }, []);

  return (
    <div ref={containerRef} className={clsx(
    "flex flex-col gap-1 text-4xl uppercase leading-[.8] text-black sm:px-32 md:text-[6rem]",
    "animated-title",
    containerClass
  )}>
        {title.split('<br />').map((line, index) => (
            <div key={index} className='flex justify-center items-center max-w-full flex-wrap gap-2 px-10 md:gap-3'>
                {line.split(' ').map((word, i) => (
                    <span key={i} className="animated-word special-font font-black opacity-0 will-change-[opacity,transform]" style={{
                        transform: "translate3d(10px, 51px, -60px) rotateY(60deg) rotateX(-40deg)",
                        transformOrigin: "50% 50% -150px",
                        fontFamily: "'Zentry', sans-serif",
                    }} dangerouslySetInnerHTML={{ __html: word}}  />
                ))}
            </div>
        ))}
    </div>
  )
}

export default AnimatedTitle