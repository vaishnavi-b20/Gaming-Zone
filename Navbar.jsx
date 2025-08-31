import React, { useEffect, useRef, useState } from 'react'
import { TiLocationArrow } from 'react-icons/ti';
import Button from './Button';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';

const navItems = ['Nexus', 'vault', 'Prologue', 'About', 'Contact'];

const Navbar = () => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const navbarContainerRef = useRef(null);
    const audioElementRef = useRef(null);

    const {y: currentScrollY} = useWindowScroll();

    useEffect(() => {
        if(currentScrollY === 0) {
            setIsNavVisible(true);
            navbarContainerRef.current.classList.remove('floating-nav');
        } else if (currentScrollY > lastScrollY) {
            setIsNavVisible(false);
            navbarContainerRef.current.classList.add('floating-nav');
        } else if (currentScrollY < lastScrollY) {
            setIsNavVisible(true);
            navbarContainerRef.current.classList.add('floating-nav');
        }
        setLastScrollY(currentScrollY);
    },[currentScrollY, lastScrollY])

    useEffect (() => {
        gsap.to(navbarContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2,
        })
    })

    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev);
        setIsIndicatorActive((prev) => !prev);
    }

    useEffect(() => {
        if(isAudioPlaying) {
            audioElementRef.current.play();
        } else {
            audioElementRef.current.pause();
        }
    }, [isAudioPlaying]);


  return (
    <div ref={navbarContainerRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6 ' >
        <header className='absolute top-1/2 w-full -translate-y-1/2'>
            <nav className='flex items-center size-full justify-between p-4'>
                <div className='flex items-center gap-7 '>
                    <img src="/img/logo.png" alt="logo" className='w-10' />
                    <Button id="product-button" title='Products' rightIcon={<TiLocationArrow />} containerClass='bg-blue-[#DFDFF0] md:flex hidden items-center justify-center gap-1'/>
                </div>
                <div className='flex h-full items-center'>
                    <div className='hidden md:block'>
                        {navItems.map((items) => (
                            <a key={items} href={`#${items.toLowerCase()}`} className='relative ms-10 text-xs uppercase text-blue-50  after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65,0.05,0.36,1)] hover:after:origin-bottom-left hover:after:scale-x-100 dark:after:bg-white cursor-pointer'>
                                {items}
                            </a>
                        ))}
                    </div>
                    <button className='ml-10 flex items-center space-x-0.5 cursor-pointer' onClick={toggleAudioIndicator}>
                        <audio ref={audioElementRef} className='hidden' src='/audio/loop.mp3' loop />
                            {[1, 2, 3, 4].map((bar) => (
                                <div key={bar} className={`indicator-line h-1 w-px rounded-full bg-white transition-all duration-200 ease-in-out ${isIndicatorActive ? 'active' : ''}`} style={{animationDelay: `${bar * 0.1}s`}} />
                            ))}
                        
                    </button>
                </div>
            </nav>

        </header>

    </div>
  )
}

export default Navbar