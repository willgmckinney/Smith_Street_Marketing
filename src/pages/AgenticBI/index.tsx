import { useEffect, useRef, useState } from "react";
import { SummitButton } from "../../components/Summit/SummitButton";
import { ApolloContactForm } from "../DemoPage/Components/ApolloContactForm";

// Tableau Tax Calculator Component
const TableauTaxCalculator = ({ onGetAudit }: { onGetAudit: () => void }) => {
  const [tableauSeats, setTableauSeats] = useState<number>(50);
  const [hourlyRate, setHourlyRate] = useState<number>(85);
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState<number>(10);

  // Calculate annual waste
  const tableauLicenseCost = tableauSeats * 70 * 12; // ~$70/user/month for Tableau
  const manualFollowUpCost = manualHoursPerWeek * hourlyRate * 52;
  const hiddenDataCost = tableauSeats * 2000; // Opportunity cost of missed insights
  const totalAnnualWaste =
    tableauLicenseCost + manualFollowUpCost + hiddenDataCost;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-deep-horizon rounded-card p-8 border border-white/10 shadow-rim-card">
      <div className="text-center mb-8">
        <div className="inline-block px-3 py-1 mb-4 bg-red-500/20 border border-red-500/30 rounded-pill">
          <span className="text-red-400 font-bold text-xs uppercase tracking-wider">
            The Tableau Tax Calculator
          </span>
        </div>
        <h3 className="font-display text-2xl font-bold text-white">
          Calculate Your Hidden BI Costs
        </h3>
      </div>

      <div className="space-y-6 mb-8">
        {/* Tableau Seats Input */}
        <div>
          <label className="block text-white font-semibold mb-2 text-sm">
            Number of Tableau/Power BI Seats
          </label>
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={tableauSeats}
              onChange={(e) => setTableauSeats(Number(e.target.value))}
              className="flex-1 px-4 py-3 bg-atmospheric-haze border border-white/20 rounded-lg text-white text-lg font-bold focus:outline-none focus:ring-2 focus:ring-golden-hour-start focus:border-transparent"
              min="1"
              step="1"
            />
            <input
              type="range"
              min="5"
              max="500"
              step="5"
              value={tableauSeats}
              onChange={(e) => setTableauSeats(Number(e.target.value))}
              className="flex-1 h-2 bg-atmospheric-haze rounded-lg appearance-none cursor-pointer accent-golden-hour-start"
            />
          </div>
        </div>

        {/* Hourly Rate Input */}
        <div>
          <label className="block text-white font-semibold mb-2 text-sm">
            Average Analyst Hourly Rate ($)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="flex-1 px-4 py-3 bg-atmospheric-haze border border-white/20 rounded-lg text-white text-lg font-bold focus:outline-none focus:ring-2 focus:ring-golden-hour-start focus:border-transparent"
              min="25"
              step="5"
            />
            <input
              type="range"
              min="25"
              max="250"
              step="5"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="flex-1 h-2 bg-atmospheric-haze rounded-lg appearance-none cursor-pointer accent-golden-hour-start"
            />
          </div>
        </div>

        {/* Manual Hours Input */}
        <div>
          <label className="block text-white font-semibold mb-2 text-sm">
            Hours Spent on "Manual Follow-up" Per Week
          </label>
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={manualHoursPerWeek}
              onChange={(e) => setManualHoursPerWeek(Number(e.target.value))}
              className="flex-1 px-4 py-3 bg-atmospheric-haze border border-white/20 rounded-lg text-white text-lg font-bold focus:outline-none focus:ring-2 focus:ring-golden-hour-start focus:border-transparent"
              min="1"
              step="1"
            />
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={manualHoursPerWeek}
              onChange={(e) => setManualHoursPerWeek(Number(e.target.value))}
              className="flex-1 h-2 bg-atmospheric-haze rounded-lg appearance-none cursor-pointer accent-golden-hour-start"
            />
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-atmospheric-haze/50 rounded-lg p-4 border border-red-500/20">
          <div className="text-xs text-granite/60 uppercase tracking-wider mb-1">
            License Costs
          </div>
          <div className="text-xl font-bold text-red-400">
            {formatCurrency(tableauLicenseCost)}
          </div>
        </div>
        <div className="bg-atmospheric-haze/50 rounded-lg p-4 border border-red-500/20">
          <div className="text-xs text-granite/60 uppercase tracking-wider mb-1">
            Manual Labor
          </div>
          <div className="text-xl font-bold text-red-400">
            {formatCurrency(manualFollowUpCost)}
          </div>
        </div>
        <div className="bg-atmospheric-haze/50 rounded-lg p-4 border border-red-500/20">
          <div className="text-xs text-granite/60 uppercase tracking-wider mb-1">
            Hidden Data Cost
          </div>
          <div className="text-xl font-bold text-red-400">
            {formatCurrency(hiddenDataCost)}
          </div>
        </div>
      </div>

      {/* Total Annual Waste */}
      <div className="bg-red-500/10 border-2 border-red-500/50 rounded-lg p-6 text-center mb-6">
        <div className="text-sm text-red-400 font-semibold uppercase tracking-wider mb-2">
          Total Annual Waste
        </div>
        <div className="text-4xl sm:text-5xl font-display font-bold text-red-400 mb-2">
          {formatCurrency(totalAnnualWaste)}
        </div>
        <div className="text-granite/70 text-sm">
          You're leaving this on the table every year with legacy BI
        </div>
      </div>

      <SummitButton className="w-full" size="lg" onClick={onGetAudit}>
        Get the Full Audit
      </SummitButton>
    </div>
  );
};

// Quick Index Terminal Demo Component
const QuickIndexDemo = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);
  const [showInsight, setShowInsight] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const processingMessages = [
    "Initializing Quick Index...",
    "Scanning document structure...",
    "Indexing content patterns...",
    "Analyzing sentiment clusters...",
    "Cross-referencing with CRM data...",
    "Finding patterns... 14 recurring churn reasons identified",
    "Generating insight summary...",
  ];

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    startProcessing();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    if (!isProcessing && !showInsight) {
      startProcessing();
    }
  };

  const startProcessing = () => {
    setIsProcessing(true);
    setProcessingStage(0);
    setShowInsight(false);
  };

  useEffect(() => {
    if (isProcessing && processingStage < processingMessages.length) {
      const timer = setTimeout(() => {
        setProcessingStage((prev) => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    } else if (processingStage >= processingMessages.length) {
      setTimeout(() => {
        setIsProcessing(false);
        setShowInsight(true);
      }, 500);
    }
  }, [isProcessing, processingStage]);

  const resetDemo = () => {
    setIsProcessing(false);
    setProcessingStage(0);
    setShowInsight(false);
  };

  return (
    <div className="bg-deep-horizon rounded-card border border-white/10 shadow-rim-card overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-atmospheric-haze/80 px-4 py-3 flex items-center gap-2 border-b border-white/10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <span className="text-granite/60 text-sm font-mono ml-4">
          quick-index-preview
        </span>
      </div>

      {/* Terminal Content */}
      <div ref={terminalRef} className="p-6 font-mono text-sm min-h-[300px]">
        {!isProcessing && !showInsight && (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={handleClick}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300
              ${
                isDragging
                  ? "border-golden-hour-start bg-golden-hour-start/10"
                  : "border-white/20 hover:border-white/40 hover:bg-white/5"
              }
            `}
          >
            <div className="text-4xl mb-4">📁</div>
            <div className="text-white font-semibold mb-2">
              Upload a sample "Lost Deal" CSV or Support PDF
            </div>
            <div className="text-granite/60 text-xs">
              Drag and drop or click to simulate upload
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="space-y-2">
            <div className="text-golden-hour-start mb-4">
              $ quick-index --analyze --deep
            </div>
            {processingMessages.slice(0, processingStage).map((msg, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className={`${i === processingStage - 1 ? "text-golden-hour-start" : "text-alpine-flora"}`}
                >
                  {i === processingStage - 1 &&
                  processingStage < processingMessages.length
                    ? "⟳"
                    : "✓"}
                </span>
                <span
                  className={
                    i === processingStage - 1 ? "text-white" : "text-granite/70"
                  }
                >
                  {msg}
                </span>
              </div>
            ))}
            {processingStage < processingMessages.length && (
              <div className="flex items-center gap-2 animate-pulse">
                <span className="text-golden-hour-start">▋</span>
              </div>
            )}
          </div>
        )}

        {showInsight && (
          <div className="space-y-4">
            <div className="text-alpine-flora">✓ Analysis complete</div>

            {/* Insight Card */}
            <div className="bg-gradient-to-br from-golden-hour-start/20 to-alpine-flora/20 border border-golden-hour-start/50 rounded-lg p-6 mt-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-golden-hour-start/30 rounded text-xs text-golden-hour-start font-bold">
                  SAMPLE INSIGHT
                </span>
                <span className="px-2 py-1 bg-red-500/30 rounded text-xs text-red-400 font-bold">
                  HIGH PRIORITY
                </span>
              </div>
              <p className="text-white font-semibold mb-2 text-base">
                "60% of churned users mentioned [Feature X] in support tickets,
                but it's missing from your Tableau Revenue Chart."
              </p>
              <div className="text-granite/70 text-xs mt-3 space-y-1">
                <div>• 847 Slack mentions of "Feature X" frustration</div>
                <div>• 0 references in existing BI dashboards</div>
                <div>• Estimated revenue impact: $340,000/year</div>
              </div>
            </div>

            <button
              onClick={resetDemo}
              className="text-golden-hour-start text-xs hover:underline mt-4"
            >
              ↻ Run another scan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Legacy vs Agentic Comparison Component
const LegacyVsAgenticComparison = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Legacy Side */}
      <div className="bg-atmospheric-haze/30 rounded-card p-8 border border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-transparent"></div>
        <div className="relative">
          <div className="inline-block px-3 py-1 mb-4 bg-gray-500/20 border border-gray-500/30 rounded-pill">
            <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">
              Legacy BI
            </span>
          </div>
          <h3 className="font-display text-2xl font-bold text-gray-400 mb-6">
            Manual Reports
          </h3>

          {/* Static Bar Charts */}
          <div className="space-y-4 mb-6 opacity-60">
            <div className="flex items-end gap-2 h-32">
              <div className="w-1/4 bg-gray-600 h-[60%] rounded-t"></div>
              <div className="w-1/4 bg-gray-600 h-[80%] rounded-t"></div>
              <div className="w-1/4 bg-gray-600 h-[45%] rounded-t"></div>
              <div className="w-1/4 bg-gray-600 h-[70%] rounded-t"></div>
            </div>
            <div className="text-xs text-gray-500 text-center">
              Q1 Revenue by Region (Static)
            </div>
          </div>

          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center gap-2">
              <span className="text-red-400">✗</span>
              <span>Dashboards require manual refresh</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-400">✗</span>
              <span>Insights trapped in specialized tools</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-400">✗</span>
              <span>80% of data invisible (unstructured)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-400">✗</span>
              <span>Action requires human handoff</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Agentic Side */}
      <div className="bg-atmospheric-haze/50 rounded-card p-8 border border-golden-hour-start/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-golden-hour-start/10 to-alpine-flora/5"></div>
        <div className="relative">
          <div className="inline-block px-3 py-1 mb-4 bg-golden-hour-start/20 border border-golden-hour-start/30 rounded-pill">
            <span className="text-golden-hour-start font-bold text-xs uppercase tracking-wider">
              Agentic BI
            </span>
          </div>
          <h3 className="font-display text-2xl font-bold text-white mb-6">
            AI-Powered Agents
          </h3>

          {/* Active Nodes Animation */}
          <div className="relative h-32 mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Central Node */}
              <div className="w-12 h-12 bg-golden-hour-start rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-golden-hour-start/50">
                <span className="text-deep-horizon font-bold text-xs">AI</span>
              </div>

              {/* Connected Nodes */}
              <div className="absolute top-2 left-1/4 w-8 h-8 bg-alpine-flora/80 rounded-full flex items-center justify-center">
                <span className="text-deep-horizon font-bold text-[10px]">
                  CRM
                </span>
              </div>
              <div className="absolute top-4 right-1/4 w-8 h-8 bg-blue-500/80 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-[10px]">Slack</span>
              </div>
              <div className="absolute bottom-2 left-1/3 w-8 h-8 bg-purple-500/80 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-[10px]">Jira</span>
              </div>
              <div className="absolute bottom-4 right-1/3 w-8 h-8 bg-orange-500/80 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-[10px]">PDF</span>
              </div>

              {/* Connection Lines (SVG) */}
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ zIndex: -1 }}
              >
                <line
                  x1="50%"
                  y1="50%"
                  x2="25%"
                  y2="20%"
                  stroke="rgba(0,196,132,0.3)"
                  strokeWidth="2"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="75%"
                  y2="25%"
                  stroke="rgba(0,196,132,0.3)"
                  strokeWidth="2"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="33%"
                  y2="85%"
                  stroke="rgba(0,196,132,0.3)"
                  strokeWidth="2"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="67%"
                  y2="80%"
                  stroke="rgba(0,196,132,0.3)"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Processing Badge */}
            <div className="absolute top-0 right-0 px-2 py-1 bg-alpine-flora/20 border border-alpine-flora/50 rounded text-xs text-alpine-flora animate-pulse">
              Processing...
            </div>

            {/* Action Badge */}
            <div className="absolute bottom-0 right-0 px-2 py-1 bg-golden-hour-start/20 border border-golden-hour-start/50 rounded text-xs text-golden-hour-start">
              Action Taken ✓
            </div>
          </div>

          <ul className="space-y-3 text-white pt-[30px]">
            <li className="flex items-center gap-2">
              <span className="text-alpine-flora">✓</span>
              <span>Real-time autonomous monitoring</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-alpine-flora">✓</span>
              <span>Insights delivered in natural language</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-alpine-flora">✓</span>
              <span>100% of data indexed (PDFs, Slack, Jira)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-alpine-flora">✓</span>
              <span>Automated actions via Quick Flows</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Lead Capture Modal Component
const APOLLO_AUDIT_FORM_ID = "apollo-audit-form";

const LeadCaptureModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
  }>({});
  const succeededRef = useRef(false);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Watch for Apollo overlay being removed from the DOM (user closed calendar)
  useEffect(() => {
    if (!isSubmitting) return;

    const observer = new MutationObserver(() => {
      // Apollo adds an iframe / overlay to <body>; when it's gone the user dismissed it
      const apolloOverlay =
        document.querySelector("iframe[src*='apollo']") ||
        document.querySelector("[class*='apollo']") ||
        document.querySelector("[id*='apollo-overlay']");

      if (!apolloOverlay && succeededRef.current === false) {
        // Small delay to avoid race with onSuccess firing
        setTimeout(() => {
          if (!succeededRef.current) {
            setIsSubmitting(false);
            if (fallbackTimerRef.current)
              clearTimeout(fallbackTimerRef.current);
          }
        }, 500);
      }
    });

    // Start observing after a brief delay to let Apollo add its elements first
    const startTimer = setTimeout(() => {
      observer.observe(document.body, { childList: true, subtree: true });
    }, 2000);

    return () => {
      clearTimeout(startTimer);
      observer.disconnect();
    };
  }, [isSubmitting]);

  // Clean up on unmount or modal close
  useEffect(() => {
    if (!isOpen) {
      setIsSubmitting(false);
      setError(null);
      setFieldErrors({});
      succeededRef.current = false;
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
    }
  }, [isOpen]);

  const validateFields = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const name = (formData.get("name") as string)?.trim() ?? "";
    const email = (formData.get("email") as string)?.trim() ?? "";
    const errors: { name?: string; email?: string } = {};

    if (!name) errors.name = "Please enter your name.";
    if (!email) {
      errors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    succeededRef.current = false;

    const errors = validateFields(e.currentTarget);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    if (!window.ApolloMeetings) {
      setError(
        "Our scheduling tool is still loading. Please wait a moment and try again.",
      );
      return;
    }

    setIsSubmitting(true);
    fallbackTimerRef.current = setTimeout(() => {
      setIsSubmitting(false);
      setError(
        "Something took too long. Please try again or scroll down to use the booking form at the bottom of the page.",
      );
    }, 30000);

    window.ApolloMeetings.submit({
      formId: APOLLO_AUDIT_FORM_ID,
      onSuccess: () => {
        succeededRef.current = true;
        if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
        setIsSubmitting(false);
        onClose();
      },
      onError: () => {
        if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
        setIsSubmitting(false);
        setError(
          "Something went wrong opening the calendar. Please try again or scroll down to use the booking form at the bottom of the page.",
        );
      },
    });
  };

  if (!isOpen) return null;

  const inputBase =
    "w-full px-4 py-3 bg-deep-horizon border rounded-lg text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-golden-hour-start focus:border-transparent";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-deep-horizon/90 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-atmospheric-haze rounded-card p-8 max-w-md w-full border border-white/10 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-granite/60 hover:text-white transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h3 className="font-display text-2xl font-bold text-white mb-2">
          Get Your Full BI Audit
        </h3>
        <p className="text-granite/70 mb-6">
          We'll analyze your current BI stack and show you exactly where you're
          leaving money on the table.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
            {error}
          </div>
        )}

        <form
          id={APOLLO_AUDIT_FORM_ID}
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4"
        >
          <div>
            <label className="block text-white font-semibold mb-2 text-sm">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              autoComplete="name"
              className={`${inputBase} ${fieldErrors.name ? "border-red-400" : "border-white/20"}`}
              placeholder="e.g. Jordan Smith"
              onChange={() =>
                fieldErrors.name &&
                setFieldErrors((prev) => ({ ...prev, name: undefined }))
              }
            />
            {fieldErrors.name && (
              <p className="mt-1.5 text-red-400 text-xs">{fieldErrors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-white font-semibold mb-2 text-sm">
              Work Email
            </label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              className={`${inputBase} ${fieldErrors.email ? "border-red-400" : "border-white/20"}`}
              placeholder="you@company.com"
              onChange={() =>
                fieldErrors.email &&
                setFieldErrors((prev) => ({ ...prev, email: undefined }))
              }
            />
            {fieldErrors.email && (
              <p className="mt-1.5 text-red-400 text-xs">{fieldErrors.email}</p>
            )}
          </div>
          <SummitButton
            type="submit"
            disabled={isSubmitting}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-deep-horizon/30 border-t-deep-horizon" />
                Opening calendar…
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Continue to calendar
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </span>
            )}
          </SummitButton>
        </form>
      </div>
    </div>
  );
};

// Main Page Component
export const AgenticBI = () => {
  const [showModal, setShowModal] = useState(false);

  const scrollToBooking = () => {
    setTimeout(() => {
      const element = document.getElementById("booking-section");
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const scrollToCalculator = () => {
    setTimeout(() => {
      const element = document.getElementById("calculator-section");
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-deep-horizon text-granite">
      {/* Grid Background Pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-deep-horizon" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-deep-horizon via-atmospheric-haze to-deep-horizon opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,196,132,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(50,232,117,0.1),transparent_50%)]" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-block px-4 py-2 mb-6 bg-golden-hour-start/20 border border-golden-hour-start/30 rounded-pill">
            <span className="text-golden-hour-start font-bold text-sm uppercase tracking-wider">
              The Agentic BI Revolution
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight lg:leading-[78px]">
            Stop Building Dashboards. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-golden-gradient">
              Start Building Agents.
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-granite/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Slash BI costs by <strong className="text-white">60%</strong> and
            index the{" "}
            <span className="text-golden-hour-start">80% of data</span> your
            legacy tools can't see.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <SummitButton
              size="lg"
              onClick={scrollToBooking}
              className="text-lg px-10 py-4"
            >
              Get Your Free Data Audit
            </SummitButton>
            <SummitButton
              variant="outline"
              size="lg"
              onClick={scrollToCalculator}
              className="text-lg px-10 py-4"
            >
              Calculate Your Waste
            </SummitButton>
          </div>

          <p className="mt-6 text-sm text-granite/60">
            No payment required • Get your audit in 2 days or less
          </p>
        </div>
      </section>

      {/* The Pain: "The Tableau Tax" Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-atmospheric-haze/50 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 mb-4 bg-red-500/20 border border-red-500/30 rounded-pill">
              <span className="text-red-400 font-bold text-xs uppercase tracking-wider">
                The Hidden Cost
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              The "Tableau Tax" is Bleeding You Dry
            </h2>
            <p className="text-lg text-granite/80 max-w-2xl mx-auto">
              Legacy BI tools create a triple penalty: Cost, Effort, and Delay.
              Here's what you're really paying for.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-deep-horizon rounded-card p-8 border border-red-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="text-5xl font-display font-bold text-red-400 mb-4">
                  $70+
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Per User, Per Month
                </h3>
                <p className="text-granite/70">
                  Tableau and Power BI Premium licensing costs scale linearly
                  with your team. 100 users = $84,000/year minimum.
                </p>
              </div>
            </div>

            <div className="bg-deep-horizon rounded-card p-8 border border-red-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="text-5xl font-display font-bold text-red-400 mb-4">
                  40%
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Analyst Time Wasted
                </h3>
                <p className="text-granite/70">
                  Manual data refreshes, report formatting, and
                  cross-referencing between tools consume your most expensive
                  resource.
                </p>
              </div>
            </div>

            <div className="bg-deep-horizon rounded-card p-8 border border-red-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="text-5xl font-display font-bold text-red-400 mb-4">
                  80%
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Dark Data Invisible
                </h3>
                <p className="text-granite/70">
                  Slack threads, support PDFs, Jira tickets—your legacy BI can't
                  see the unstructured data where real insights hide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-deep-horizon">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Legacy vs. Agentic: See the Difference
            </h2>
            <p className="text-lg text-granite/80 max-w-2xl mx-auto">
              Your dashboards show you the past. AI agents shape your future.
            </p>
          </div>

          <LegacyVsAgenticComparison />
        </div>
      </section>

      {/* The Mechanism: How Quick Index Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-atmospheric-haze/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 mb-4 bg-golden-hour-start/20 border border-golden-hour-start/30 rounded-pill">
              <span className="text-golden-hour-start font-bold text-xs uppercase tracking-wider">
                The Mechanism
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              How Quick Index Reads What Others Can't
            </h2>
            <p className="text-lg text-granite/80 max-w-2xl mx-auto">
              While legacy tools query databases, Quick Index scans your entire
              knowledge base—Slack, PDFs, Jira, and more.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-golden-gradient rounded-full flex items-center justify-center flex-shrink-0 text-deep-horizon font-display font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    Connect Everything
                  </h3>
                  <p className="text-granite/70">
                    Link Slack, Google Drive, Confluence, Jira, Salesforce, and
                    your data warehouse in minutes. No data migration required.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-golden-gradient rounded-full flex items-center justify-center flex-shrink-0 text-deep-horizon font-display font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    Index the Unstructured
                  </h3>
                  <p className="text-granite/70">
                    Quick Index scans PDFs, chat logs, emails, and documents to
                    surface patterns your SQL queries will never find.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-golden-gradient rounded-full flex items-center justify-center flex-shrink-0 text-deep-horizon font-display font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    Agents Take Action
                  </h3>
                  <p className="text-granite/70">
                    Quick Flows don't just report—they act. Create Jira tickets,
                    send Slack alerts, and update CRMs automatically.
                  </p>
                </div>
              </div>
            </div>

            <QuickIndexDemo />
          </div>
        </div>
      </section>

      {/* Social Proof: $400k Case Study – hidden for now */}
      {/* <section className="py-20 px-4 sm:px-6 lg:px-8 bg-deep-horizon">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-golden-hour-start/20 to-alpine-flora/10 border border-golden-hour-start/30 rounded-card p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-golden-hour-start/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="inline-block px-3 py-1 mb-6 bg-alpine-flora/20 border border-alpine-flora/30 rounded-pill">
                <span className="text-alpine-flora font-bold text-xs uppercase tracking-wider">
                  Case Study
                </span>
              </div>

              <div className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-white mb-4">
                $400,000
              </div>
              <div className="text-2xl text-golden-hour-start font-semibold mb-6">
                Hidden Revenue Discovered in 30 Days
              </div>

              <p className="text-granite/80 text-lg mb-8 max-w-2xl">
                A Fortune 500 manufacturer used Quick Index to scan support
                tickets, Slack channels, and sales call transcripts. The AI
                found a recurring product complaint mentioned in 60% of churned
                accounts—but completely invisible to their Tableau dashboards.
              </p>

              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-display font-bold text-alpine-flora">
                    10%
                  </div>
                  <div className="text-granite/60 text-sm">
                    Reduction in Scrap
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-display font-bold text-alpine-flora">
                    67%
                  </div>
                  <div className="text-granite/60 text-sm">Lower BI TCO</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-display font-bold text-alpine-flora">
                    14
                  </div>
                  <div className="text-granite/60 text-sm">
                    Churn Reasons Found
                  </div>
                </div>
              </div>

              <blockquote className="border-l-4 border-golden-hour-start pl-6 italic text-granite/80">
                "We had the data all along. We just couldn't see it until Quick
                Index connected the dots between our CRM and our support
                tickets."
                <div className="mt-2 text-white font-semibold not-italic">
                  — VP of Operations, Manufacturing Company
                </div>
              </blockquote>
            </div>
          </div>
        </div>
      </section> */}

      {/* Interactive Calculator Section */}
      <section
        id="calculator-section"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-atmospheric-haze/50"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Calculate Your "Dark Data" Waste
            </h2>
            <p className="text-lg text-granite/80 max-w-2xl mx-auto">
              See exactly how much your legacy BI is costing you in licenses,
              labor, and lost insights.
            </p>
          </div>

          <TableauTaxCalculator onGetAudit={() => setShowModal(true)} />
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-deep-horizon">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              QuickSuite vs. Legacy BI: The Numbers
            </h2>
          </div>

          <div className="bg-atmospheric-haze rounded-card p-8 border border-white/10 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left p-4 font-display font-bold text-white text-lg">
                    Feature
                  </th>
                  <th className="text-left p-4 font-display font-bold text-red-400 text-lg">
                    Tableau / Power BI
                  </th>
                  <th className="text-left p-4 font-display font-bold text-alpine-flora text-lg">
                    Amazon QuickSuite
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="p-4 font-semibold text-white">
                    Pricing Model
                  </td>
                  <td className="p-4 text-red-400">
                    <div>$70/user/month (Tableau)</div>
                    <div className="text-sm text-granite/60 mt-1">
                      + Premium add-ons
                    </div>
                  </td>
                  <td className="p-4 text-alpine-flora">
                    <div>$20/user/month</div>
                    <div className="text-sm text-granite/60 mt-1">
                      Usage-based agent hours
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 font-semibold text-white">Data Types</td>
                  <td className="p-4 text-red-400">
                    Structured databases only
                  </td>
                  <td className="p-4 text-alpine-flora">
                    Structured + Unstructured (PDFs, Slack, etc.)
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 font-semibold text-white">Automation</td>
                  <td className="p-4 text-red-400">
                    Limited third-party hooks
                  </td>
                  <td className="p-4 text-alpine-flora">
                    Native Quick Flows & Quick Automate
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 font-semibold text-white">
                    Migration Risk
                  </td>
                  <td className="p-4 text-red-400">High (complex rebuilds)</td>
                  <td className="p-4 text-alpine-flora">
                    Zero (in-place evolution)
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 font-semibold text-white">
                    Time to Insight
                  </td>
                  <td className="p-4 text-red-400">Days to weeks</td>
                  <td className="p-4 text-alpine-flora">
                    Minutes (Quick Research)
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">3-Year TCO</td>
                  <td className="p-4 text-red-400 text-xl font-bold">
                    $500k - $1M+
                  </td>
                  <td className="p-4 text-alpine-flora text-xl font-bold">
                    $170k (67% less)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Final CTA with Booking Form */}
      <section
        id="booking-section"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-atmospheric-haze/50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Get Your Free "Dark Data" Audit
            </h2>
            <p className="text-lg text-granite/80 max-w-2xl mx-auto mb-8">
              In 30 minutes, we'll show you exactly what insights your legacy BI
              is missing—and how much it's costing you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="bg-deep-horizon rounded-card p-6 border border-white/10">
                <h3 className="font-display text-xl font-bold text-white mb-4">
                  What You'll Discover:
                </h3>
                <ul className="space-y-3">
                  {[
                    "Complete TCO breakdown of your current BI stack",
                    "Specific data sources your dashboards can't see",
                    "3 automations you can deploy in week one",
                    "ROI projection for the first 90 days",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="bg-golden-gradient p-1 rounded-full mr-3 mt-1 flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-deep-horizon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-granite/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-golden-gradient/10 border border-golden-hour-start/30 rounded-card p-6">
                <p className="text-white font-semibold mb-2">Our Guarantee</p>
                <p className="text-granite/80 text-sm">
                  If we can't identify at least{" "}
                  <strong className="text-white">
                    $50,000 in annual savings
                  </strong>{" "}
                  or hidden revenue, we'll pay you for your time.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-card shadow-2xl p-0 border border-white/10 overflow-hidden">
              <ApolloContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Break-up Footer – hidden for now */}
      {/* <section className="py-16 px-4 sm:px-6 lg:px-8 bg-deep-horizon border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="font-display text-2xl font-bold text-white mb-4">
            Not ready to talk? No problem.
          </h3>
          <p className="text-granite/70 mb-6">
            Download our free guide and see what you're missing.
          </p>
          <div className="bg-atmospheric-haze rounded-card p-8 border border-white/10 inline-block">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="text-6xl">📊</div>
              <div className="text-left">
                <div className="font-display font-bold text-white text-lg mb-1">
                  "3 Things Tableau Misses"
                </div>
                <div className="text-granite/60 text-sm mb-4">
                  A 5-minute read that could save you $100k/year
                </div>
                <SummitButton
                  variant="outline"
                  size="sm"
                  onClick={() => setShowModal(true)}
                >
                  Download Free PDF
                </SummitButton>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};
