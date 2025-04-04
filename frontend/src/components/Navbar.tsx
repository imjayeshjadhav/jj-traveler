"use client"
import React, { useEffect, useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import { gsap } from "gsap";
import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/navigation";

const navItems: string[] = ["", "", "About", "Contact"];

const Navbar: React.FC = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState<boolean>(false);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true);
  const router = useRouter();

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (!navContainerRef.current) return;

    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    if (!navContainerRef.current) return;

    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (!audioElementRef.current) return;

    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  const handleNavigateToTravel = () => {
    router.push("/travel");
  };

  return (
    <div ref={navContainerRef} className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <Image src="/img/logo.png" alt="logo" className="w-10 cursor-pointer" width={50} height={50} />
            <Button
              id="product-button"
              title="Travel"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1 px-5 py-2 rounded-md"
              onClick={handleNavigateToTravel}
            />
          </div>
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a key={index} href={`#${item.toLowerCase()}`} className="nav-hover-btn">
                  {item}
                </a>
              ))}
            </div>
            <button className="ml-10 flex items-center space-x-0.5" onClick={toggleAudioIndicator}>
              <audio ref={audioElementRef} className="hidden" src="/audio/loop2.mp3" />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  className={`indicator-line ${isIndicatorActive ? "active" : ""}`}
                  key={bar}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
