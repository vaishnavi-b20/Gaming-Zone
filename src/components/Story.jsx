import React from 'react'
import AnimatedTitle from './AnimatedTitle'
import { useRef } from 'react'
import gsap from 'gsap';
import Button from './Button';

const Story = () => {
    const frameRef = useRef(null);
    const handleMouseLeave = () => {
        const element = frameRef.current;

        gsap.to(element, {
            duration: 0.3,
            rotateX: 0, 
            rotateY: 0,
            ease: 'power1.inOut'
        })
    }

    const handleMouseMove = (e) => {
        const { clientX, clientY} = e;
        const element = frameRef.current;

        if(!element) return;

        const rect = element.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
            duration: 0.3,
            rotateX, rotateY,
            transformPerspective: 500,
            ease: 'power1.inOut'
        })
    }

  return (
    <section id='story' className='min-h-dvh w-screen bg-black text-blue-50'>
        <div className='flex size-full flex-col items-center py-10 pb-24'>
            <p className='font-general text-sm uppercase md:text-[15px]'>the multiversal ip world</p>

            <div className='relative size-full'>
                <AnimatedTitle 
                    title="the st<b>o</b>ry of <br/> a hidden real<b>m</b>"
                    containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10 text-white "
                />
                <div className='relative h-[90vh] md:h-dvh w-full [filter:url(#flt_tag)]'>
                <div className='absolute left-0 top-0 size-full overflow-hidden md:left-[20%] md:top-[-10%] md:size-4/5 [clip-path:polygon(4%_0,83%_21%,100%_73%,0%_100%)]'>
                    <div className='absolute w-full md:h-dvh h-[50dvh] opacity-100 left-10 top-16 md:left-0 md:top-10 lg:left-[-300px] lg:top-[-100px] [transform:translate3d(0,0,0)_rotateX(0)_rotateY(0)_rotateZ(0)_scale(1)]'>
                        <img ref={frameRef} onMouseLeave={handleMouseLeave} onMouseUp={handleMouseLeave} onMouseEnter={handleMouseLeave} onMouseMove={handleMouseMove} src="/img/entrance.webp" alt="Entrance" className='object-contain' />
                    </div>
                </div>
                <svg className="invisible absolute size-0" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"
                  />
                </filter>
              </defs>
            </svg>
                </div>
            </div>
            <div className='-mt-100 flex w-full justify-center md:-mt-50 md:me-44 md:justify-end'>
                <div className='flex h-full w-fit flex-col items-center md:items-start'>
                    <p className='mt-3 max-w-sm text-center text-violet-50 md:text-start font-circular-web'>
                        Where realms converge, lies Zentry and the boundless pillar. Discover its secrets and shape your fate amidst infinite opportunities.
                    </p>
                    <Button id="realm-button" title="discover prologue" containerClass="mt-5" />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Story