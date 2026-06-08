import { useEffect } from "react";

export const TaxCompanyDashboard = () => {
  useEffect(() => {
    // Redirect to the static HTML file
    window.location.href = "/tax-company-dashboard.html";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blueprint-base">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-marker-start mx-auto mb-4"></div>
        <p className="text-chalk">
          Redirecting to Tax Company Dashboard...
        </p>
      </div>
    </div>
  );
};
