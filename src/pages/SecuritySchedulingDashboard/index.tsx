import { useEffect } from "react";

export const SecuritySchedulingDashboard = () => {
  useEffect(() => {
    // Redirect to the static HTML file
    window.location.href = "/security-scheduling-dashboard.html";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blueprint-base">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-marker-start mx-auto mb-4"></div>
        <p className="text-chalk">
          Redirecting to Security Scheduling Dashboard...
        </p>
      </div>
    </div>
  );
};
