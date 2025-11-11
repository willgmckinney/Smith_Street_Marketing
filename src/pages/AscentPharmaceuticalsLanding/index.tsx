import { useEffect } from "react";

export const AscentPharmaceuticalsLanding = () => {
  useEffect(() => {
    window.location.href = "/ascent-pharmaceuticals-landing.html";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-color-2">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tirtiary-color mx-auto mb-4"></div>
        <p className="text-tirtiary-color">
          Redirecting to Ascent Pharmaceuticals Landing Page...
        </p>
      </div>
    </div>
  );
};


