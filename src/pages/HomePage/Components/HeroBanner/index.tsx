import { useEffect, useRef, useState } from "react";
import goatVideo from "../../../../assets/Animated_Goat_Climbs_Mountain_Sunrise.mp4";

export const HeroBanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showText, setShowText] = useState(false);
  const [visibleWords, setVisibleWords] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= 6.0) {
        video.pause();
        setShowText(true);

        // Fade in words one at a time with delays
        setTimeout(() => setVisibleWords([true, false, false]), 0);
        setTimeout(() => setVisibleWords([true, true, false]), 300);
        setTimeout(() => setVisibleWords([true, true, true]), 600);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const words = ["Climb", "New", "Peaks"];

  return (
    <div className="relative flex flex-col items-center justify-center bg-neutral-color-2 text-tirtiary-color h-[100%] px-4 sm:px-6 lg:px-8 overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        loop={false}
      >
        <source src={goatVideo} type="video/mp4" />
      </video>
      <div className="relative flex flex-col items-center justify-center justify-items-center bg-transparent space-y-40 sm:space-y-32 z-10">
        <h1
          className="text-[2.5rem] sm:text-[4rem] md:text-[6rem] lg:text-[9rem] text-white text-center leading-tight"
          style={{
            textShadow:
              "3px 3px 6px rgba(0, 0, 0, 0.9), -3px -3px 6px rgba(0, 0, 0, 0.9), 3px -3px 6px rgba(0, 0, 0, 0.9), -3px 3px 6px rgba(0, 0, 0, 0.9), 0 0 10px rgba(0, 0, 0, 0.8)",
          }}
        >
          <div
            className={`transition-opacity duration-1000 ${
              showText ? "opacity-100" : "opacity-0"
            }`}
          >
            Smith Avenue Insights
          </div>
          <div className="text-[3rem] sm:text-[4.75rem] md:text-[7.5rem] lg:text-[11rem] flex flex-wrap justify-center gap-4">
            {words.map((word, index) => (
              <span
                key={index}
                className={`transition-opacity duration-500 ${
                  visibleWords[index] ? "opacity-100" : "opacity-0"
                }`}
              >
                {word}
              </span>
            ))}
          </div>
        </h1>
      </div>
    </div>
  );
};
