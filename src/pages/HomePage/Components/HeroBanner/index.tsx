import { useEffect, useRef, useState } from "react";
import goatVideo from "../../../../assets/Animated_Goat_Climbs_Mountain_Sunrise.mp4";

export const HeroBanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
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

        // Fade in words one at a time with delays
        setTimeout(() => setVisibleWords([true, false, false]), 0);
        setTimeout(() => setVisibleWords([true, true, false]), 600);
        setTimeout(() => setVisibleWords([true, true, true]), 1200);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const words = ["Climb", "New", "Peaks"];

  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full overflow-hidden bg-deep-horizon">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        playsInline
        loop={false}
      >
        <source src={goatVideo} type="video/mp4" />
      </video>

      {/* Gradient Overlay (Bottom-up, subtle dark gradient) */}
      <div className="absolute inset-0 bg-gradient-to-t from-deep-horizon via-deep-horizon/40 to-transparent z-1 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 sm:space-y-12 px-4">
        <h1
          className="font-display font-extrabold text-granite text-center leading-tight drop-shadow-2xl"
          style={{
            textShadow: "0 4px 20px rgba(0,0,0,0.5)", // Soft, deep shadow
          }}
        >
          <div className="text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[10rem] flex flex-wrap justify-center gap-x-4 gap-y-2">
            {words.map((word, index) => (
              <span
                key={index}
                className={`transition-all duration-1000 ease-bouncy ${
                  visibleWords[index]
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-10 scale-90"
                }`}
              >
                {word}
              </span>
            ))}
          </div>
        </h1>

        {/* Subtitle / Additional Text could go here to enhance the "Expansive" feel */}
      </div>
    </div>
  );
};
