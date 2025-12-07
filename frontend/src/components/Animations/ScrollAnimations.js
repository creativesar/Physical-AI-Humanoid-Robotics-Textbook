import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const useScrollAnimations = () => {
  useEffect(() => {
    // Animation for section headers
    gsap.utils.toArray('.fade-in-section').forEach((element) => {
      gsap.fromTo(element, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Animation for feature cards
    gsap.utils.toArray('.feature-card-animate').forEach((element) => {
      gsap.fromTo(element, 
        { opacity: 0, scale: 0.9, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Animation for testimonial cards
    gsap.utils.toArray('.testimonial-card-animate').forEach((element, i) => {
      gsap.fromTo(element, 
        { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: i * 0.2,
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Parallax effect for background elements
    gsap.utils.toArray('.parallax-element').forEach((element) => {
      gsap.to(element, {
        y: -50,
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Text split animations
    gsap.utils.toArray('.split-text').forEach((element) => {
      const text = element.textContent;
      const words = text.split(' ');
      element.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
      
      const wordSpans = element.querySelectorAll('.word');
      wordSpans.forEach((span, i) => {
        gsap.fromTo(span, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.05,
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};

export default useScrollAnimations;