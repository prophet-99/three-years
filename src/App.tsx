import heroeImg from './assets/images/heroe.jpeg'
import sound from './assets/sound/New-West-Those-Eyes.mp3';
import './App.css'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useRef, useState } from 'react';
// import required modules
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import confetti from 'canvas-confetti';
import IMAGES from './images';


const App = () => {
  const swiperRef = useRef(null); // Referencia al Swiper
  const audioRef = useRef(new Audio(sound));
  const [isVisible, setIsVisible] = useState(false); // Estado para saber si el Swiper está en pantalla

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // El Swiper está en pantalla
        } else {
          setIsVisible(false); // El Swiper salió de pantalla
        }
      },
      { threshold: 0.5 } // Se activa cuando el 50% del Swiper es visible
    );

    if (swiperRef.current) {
      observer.observe(swiperRef.current);
    }

    return () => {
      if (swiperRef.current) {
        observer.unobserve(swiperRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      // 🎉 Lanzar confetti de corazones
      const duration = 5 * 1000; // 5 segundos
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          shapes: ['circle'],
          colors: ['#ff4d6d', '#ff69b4', '#ff85a2'],
        });

        confetti({
          particleCount: 5,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          shapes: ['circle'],
          colors: ['#ff4d6d', '#ff69b4', '#ff85a2'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      // 🎶 Reproducir música automáticamente
      const audio = audioRef.current;
      audio.volume = 0.5;
      audio.play().catch((err) => console.log('AutoPlay bloqueado:', err));
    } else {
      // 🛑 Detener la música si el Swiper ya no está visible
      const audio = audioRef.current;
      audio.pause();
      audio.currentTime = 0;
    }
  }, [isVisible]);

  return (
    <main>
      <section className="heroe__container">
        <div className="heroe__mask">
          <h1>Felices 03 años, Mi Amor <span>❤</span></h1>
          </div>
        <img className="heroe__image" alt="she and me" src={heroeImg} />
      </section>
      <section>
        <h2>Es hora de inmortalizar estos 36 meses juntos 🐣</h2>
        <Swiper
          ref={swiperRef}
          spaceBetween={30}
          effect={'fade'}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2_500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, EffectFade, Pagination]}
        >
          {IMAGES.map((src, index) => (
            <SwiperSlide key={index}>
              <img src={src} alt={`Imagen ${index + 1}`} loading="lazy" />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </main>
  )
}

export default App;
