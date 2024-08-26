import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FadeInDiv = () => {
  const divRef = useRef(null);

  useEffect(() => {
    const element = divRef.current;
    gsap.set(element, { opacity: 0 });

    gsap.fromTo(
      element,
      { opacity: 0 }, // Start with opacity 0
      {
        opacity: 0.7, // End at opacity 0.7
        scrollTrigger: {
          trigger: element,
          start: "top+=75% bottom", // Start when the top of the div meets the bottom of the viewport
          end: "bottom bottom", // End when the bottom of the div meets the bottom of the viewport
          scrub: true, // Smoothly animate as the user scrolls
        },
      }
    );
  }, []);

  return (
    <div
      ref={divRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        opacity: 0, // Initial opacity is controlled by GSAP
      }}
    />
  );
};

export default FadeInDiv;
