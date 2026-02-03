import { useState } from "react";
import { SummitButton } from "../../components/Summit/SummitButton";
import { ApolloContactForm } from "../DemoPage/Components/ApolloContactForm";

export const ShopifyProfitRecovery = () => {
  const [annualRevenue, setAnnualRevenue] = useState<number>(5000000);

  // Calculate Shopify fees
  const calculateShopifyFees = (revenue: number) => {
    const monthlyRevenue = revenue / 12;
    
    // Transaction fees: 2.15% + $0.30 per transaction
    // Assuming average order value of $100, that's ~1 transaction per $100
    const transactionFeeRate = 0.0215;
    const transactionFixedFee = 0.30;
    const avgOrderValue = 100;
    const transactions = revenue / avgOrderValue;
    const transactionFees = revenue * transactionFeeRate + transactions * transactionFixedFee;
    
    // Platform fee: 0.25% above $1M/month
    const platformFee = monthlyRevenue > 1000000 
      ? (monthlyRevenue - 1000000) * 12 * 0.0025 
      : 0;
    
    // App subscriptions: $18,000 - $60,000 annually (using $40,000 as average)
    const appCosts = 40000;
    
    // Currency conversion if applicable (assuming 1.5% for international)
    const currencyConversion = revenue * 0.015 * 0.3; // Assuming 30% international
    
    return transactionFees + platformFee + appCosts + currencyConversion;
  };

  // Calculate custom stack costs
  const calculateCustomCosts = (revenue: number) => {
    // Processing: Interchange + 10-20bps (~1.8% effective)
    const processingFees = revenue * 0.018;
    
    // Fixed hosting and infrastructure: ~$2,000/month
    const hostingCosts = 24000;
    
    // Maintenance and API costs: <$5,000 annually
    const maintenanceCosts = 5000;
    
    return processingFees + hostingCosts + maintenanceCosts;
  };

  const shopifyFees = calculateShopifyFees(annualRevenue);
  const customCosts = calculateCustomCosts(annualRevenue);
  const profitRecovered = shopifyFees - customCosts;
  const percentageRecovered = (profitRecovered / annualRevenue) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const scrollToBooking = () => {
    setTimeout(() => {
      const element = document.getElementById("booking-section");
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-deep-horizon text-granite">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-deep-horizon via-atmospheric-haze to-deep-horizon opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,184,0,0.1),transparent_50%)]" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-block px-4 py-2 mb-6 bg-golden-hour-start/20 border border-golden-hour-start/30 rounded-pill">
            <span className="text-golden-hour-start font-bold text-sm uppercase tracking-wider">
              Stop the Success Tax
            </span>
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
            Reclaim{" "}
            <span className="text-transparent bg-clip-text bg-golden-gradient">
              2-3% of Your Revenue
            </span>
            <br />
            from Shopify's Hidden Fees
          </h1>
          
          <p className="text-xl sm:text-2xl text-granite/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            <strong className="text-white">Owner Infrastructure</strong> vs{" "}
            <span className="text-golden-hour-start">Rented Infrastructure</span>.
            <br />
            Stop paying the "Success Tax" that grows with your revenue.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <SummitButton size="lg" onClick={scrollToBooking} className="text-lg px-10 py-4">
              Get My Free Profit Recovery Audit
            </SummitButton>
          </div>
          
          <p className="mt-6 text-sm text-granite/60">
            No upfront payment required • 2-page audit delivered in 48 hours
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-atmospheric-haze/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              The "Success Tax" Calculator
            </h2>
            <p className="text-lg text-granite/80 max-w-2xl mx-auto">
              Enter your annual revenue to see exactly how much you're paying Shopify
              vs. what you'd pay with a custom infrastructure you own.
            </p>
          </div>

          <div className="bg-deep-horizon rounded-card p-8 border border-white/10 shadow-rim-card">
            <div className="mb-8">
              <label htmlFor="revenue" className="block text-white font-semibold mb-3 text-lg">
                Annual Revenue
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-golden-hour-start font-bold text-xl">
                  $
                </span>
                <input
                  id="revenue"
                  type="number"
                  value={annualRevenue}
                  onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-4 bg-atmospheric-haze border border-white/20 rounded-lg text-white text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-golden-hour-start focus:border-transparent"
                  placeholder="5,000,000"
                  min="0"
                  step="10000"
                />
              </div>
              <input
                type="range"
                min="1000000"
                max="50000000"
                step="100000"
                value={annualRevenue}
                onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                className="w-full mt-4 h-2 bg-atmospheric-haze rounded-lg appearance-none cursor-pointer accent-golden-hour-start"
              />
              <div className="flex justify-between text-sm text-granite/60 mt-2">
                <span>$1M</span>
                <span>$50M</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-atmospheric-haze/50 rounded-lg p-6 border border-red-500/20">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-red-400 font-semibold text-sm uppercase tracking-wider">
                    Shopify Plus (Renter)
                  </h3>
                </div>
                <div className="text-3xl font-bold text-red-400 mb-1">
                  {formatCurrency(shopifyFees)}
                </div>
                <div className="text-sm text-granite/70">
                  Annual fees & costs
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 text-xs text-granite/60 space-y-1">
                  <div>Transaction fees: {formatCurrency(annualRevenue * 0.0215 + (annualRevenue / 100) * 0.30)}</div>
                  <div>Platform fees: {formatCurrency(annualRevenue / 12 > 1000000 ? (annualRevenue / 12 - 1000000) * 12 * 0.0025 : 0)}</div>
                  <div>App subscriptions: {formatCurrency(40000)}</div>
                </div>
              </div>

              <div className="bg-atmospheric-haze/50 rounded-lg p-6 border border-alpine-flora/30">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-alpine-flora font-semibold text-sm uppercase tracking-wider">
                    Custom Stack (Owner)
                  </h3>
                </div>
                <div className="text-3xl font-bold text-alpine-flora mb-1">
                  {formatCurrency(customCosts)}
                </div>
                <div className="text-sm text-granite/70">
                  Annual costs
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 text-xs text-granite/60 space-y-1">
                  <div>Processing: {formatCurrency(annualRevenue * 0.018)}</div>
                  <div>Hosting: {formatCurrency(24000)}</div>
                  <div>Maintenance: {formatCurrency(5000)}</div>
                </div>
              </div>
            </div>

            <div className="bg-golden-gradient/20 border-2 border-golden-hour-start rounded-lg p-8 text-center">
              <div className="text-sm text-golden-hour-start font-semibold uppercase tracking-wider mb-2">
                Total Profit Recovered
              </div>
              <div className="text-5xl sm:text-6xl font-display font-bold text-white mb-2">
                {formatCurrency(profitRecovered)}
              </div>
              <div className="text-xl text-granite/80">
                That's <strong className="text-white">{percentageRecovered.toFixed(1)}%</strong> of your revenue back in your pocket
              </div>
              <div className="mt-6">
                <SummitButton className="mx-auto" size="lg" onClick={scrollToBooking}>
                  Get My Free Audit
                </SummitButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Equation Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-deep-horizon">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Why CEOs choose to own their infrastructure instead of renting it
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-atmospheric-haze rounded-card p-8 border border-white/10">              
              <h3 className="font-display text-xl font-bold text-golden-hour-start mb-3">
              Instant margin expansion
              </h3>
              <p className="text-granite/80 leading-relaxed">
                 Reclaim 2-3% of revenue that was going to platform fees. That's pure profit that scales with your growth.
              </p>
            </div>

            <div className="bg-atmospheric-haze rounded-card p-8 border border-white/10">              
              <h3 className="font-display text-xl font-bold text-golden-hour-start mb-3">
                Sub-1-second load times
              </h3>
              <p className="text-granite/80 leading-relaxed">
                We guarantee measurable performance improvements or we refund the migration.
              </p>
            </div>

            <div className="bg-atmospheric-haze rounded-card p-8 border border-white/10">              
              <h3 className="font-display text-xl font-bold text-golden-hour-start mb-3">
                90-Day "Plumbing Swap"
              </h3>
              <p className="text-granite/80 leading-relaxed">
               No redesign needed! We migrate your store, products, and customers while you keep selling.
              </p>
            </div>

            <div className="bg-atmospheric-haze rounded-card p-8 border border-white/10">              
              <h3 className="font-display text-xl font-bold text-golden-hour-start mb-3">
                Absolutely Zero Downtime
              </h3>
              <p className="text-granite/80 leading-relaxed">
                We handle 100% of data migration, testing, and go-live. Your team focuses on growth, not infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Owner vs Renter Comparison */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-atmospheric-haze/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Owner vs. Renter: The Fiduciary Choice
            </h2>
            <p className="text-lg text-granite/80 max-w-2xl mx-auto mb-8">
              If you were renting an office for $50,000/month, you'd buy the building. Why aren't you doing the same with your digital infrastructure?
            </p>
          </div>

          <div className="bg-deep-horizon rounded-card p-8 border border-white/10 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left p-4 font-display font-bold text-white text-lg">
                    Metric
                  </th>
                  <th className="text-left p-4 font-display font-bold text-red-400 text-lg">
                    Shopify Plus (Renter)
                  </th>
                  <th className="text-left p-4 font-display font-bold text-alpine-flora text-lg">
                    Custom Stack (Owner)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="p-4 font-semibold text-white">Transaction & Platform Fees</td>
                  <td className="p-4 text-red-400">
                    <div>2.15% + $0.30 per transaction</div>
                    <div className="text-sm text-granite/60 mt-1">+ 0.25% platform fee (above $1M/mo)</div>
                    <div className="text-sm text-granite/60">+ 0.20% gateway fee (if not using Shopify Payments)</div>
                  </td>
                  <td className="p-4 text-alpine-flora">
                    <div>Interchange + 10-20bps (~1.8% effective)</div>
                    <div className="text-sm text-granite/60 mt-1">Fixed hosting costs</div>
                    <div className="text-sm text-granite/60">Total choice of provider</div>
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 font-semibold text-white">App Subscription Costs</td>
                  <td className="p-4 text-red-400">
                    <div>$18,000 - $60,000+ annually</div>
                    <div className="text-sm text-granite/60 mt-1">Search: $500-$2,000/mo</div>
                    <div className="text-sm text-granite/60">Loyalty: $300-$1,500/mo</div>
                    <div className="text-sm text-granite/60">Subscriptions: $500+/mo</div>
                  </td>
                  <td className="p-4 text-alpine-flora">
                    <div>&lt;$5,000 annually</div>
                    <div className="text-sm text-granite/60 mt-1">Built into code (owned forever)</div>
                    <div className="text-sm text-granite/60">Self-hosted or flat-rate APIs</div>
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 font-semibold text-white">Speed (LCP)</td>
                  <td className="p-4 text-red-400">
                    <div>2.5s - 4.0s average</div>
                    <div className="text-sm text-granite/60 mt-1">App bloat slows performance</div>
                    <div className="text-sm text-granite/60">Every 100ms delay = 7% conversion drop</div>
                  </td>
                  <td className="p-4 text-alpine-flora">
                    <div>&lt; 1.0s (sub-second)</div>
                    <div className="text-sm text-granite/60 mt-1">Built for speed from day one</div>
                    <div className="text-sm text-granite/60">Higher SEO rankings, lower Ad costs</div>
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 font-semibold text-white">Platform Risk</td>
                  <td className="p-4 text-red-400">
                    <div>Account freezes (5-20 day holds)</div>
                    <div className="text-sm text-granite/60 mt-1">Forced migrations break custom logic</div>
                    <div className="text-sm text-granite/60">TOS volatility (category shutdowns)</div>
                    <div className="text-sm text-granite/60">Data ownership limitations</div>
                  </td>
                  <td className="p-4 text-alpine-flora">
                    <div>Total ownership</div>
                    <div className="text-sm text-granite/60 mt-1">No platform dependencies</div>
                    <div className="text-sm text-granite/60">Full data control</div>
                    <div className="text-sm text-granite/60">Risk-free infrastructure</div>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Cost Over 3 Years</td>
                  <td className="p-4 text-red-400 text-xl font-bold">$750,000+</td>
                  <td className="p-4 text-alpine-flora text-xl font-bold">$250,000 (Fixed)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Risk Reversal / Guarantee */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-deep-horizon">
        <div className="max-w-4xl mx-auto">
          <div className="bg-golden-gradient/20 border-2 border-golden-hour-start rounded-card p-12 text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              If we can't show you a path to at least{" "}
              <span className="text-transparent bg-clip-text bg-golden-gradient">
                $50k in savings
              </span>
              , we'll pay you for your time.
            </h2>
            <p className="text-lg text-granite/80 mb-8 max-w-2xl mx-auto">
              We're that confident in our analysis. The audit is free, and if we can't
              demonstrate clear ROI, we'll compensate you for the 30 minutes it takes to review it.
            </p>
            <SummitButton className="mx-auto" size="lg" onClick={scrollToBooking}>
              Get My Free Audit
            </SummitButton>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-atmospheric-haze/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              The Process: 3 Simple Steps
            </h2>
            <p className="text-lg text-granite/80 max-w-2xl mx-auto">
              From audit to profit recovery in 30 days
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-deep-horizon rounded-card p-8 border border-white/10 text-center">
              <div className="w-16 h-16 bg-golden-gradient rounded-full flex items-center justify-center mx-auto mb-6 text-deep-horizon font-display font-bold text-2xl">
                1
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">
                The Audit
              </h3>
              <p className="text-granite/80 leading-relaxed">
                We find the leaks. Our 2-page audit identifies every fee, hidden cost, and
                opportunity for margin recovery in your current Shopify setup.
              </p>
            </div>

            <div className="bg-deep-horizon rounded-card p-8 border border-white/10 text-center">
              <div className="w-16 h-16 bg-golden-gradient rounded-full flex items-center justify-center mx-auto mb-6 text-deep-horizon font-display font-bold text-2xl">
                2
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">
                The Migration
              </h3>
              <p className="text-granite/80 leading-relaxed">
                We swap the engine. Zero downtime migration of products, customers, orders,
                and data to your new custom infrastructure. You keep selling throughout.
              </p>
            </div>

            <div className="bg-deep-horizon rounded-card p-8 border border-white/10 text-center">
              <div className="w-16 h-16 bg-golden-gradient rounded-full flex items-center justify-center mx-auto mb-6 text-deep-horizon font-display font-bold text-2xl">
                3
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">
                The Recovery
              </h3>
              <p className="text-granite/80 leading-relaxed">
                You keep the margin. Every dollar saved goes straight to your bottom line.
                No more success tax. No more platform fees growing with your revenue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA with booking form */}
      <section id="booking-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-deep-horizon">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Get Your Free 2-Page Profit Recovery Audit
            </h2>
            <p className="text-lg text-granite/80 max-w-2xl mx-auto mb-8">
              Schedule a 30-minute call. We'll analyze your Shopify costs and show you exactly
              how much you can recover by owning your infrastructure instead of renting it.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="bg-atmospheric-haze rounded-card p-6 border border-white/10">
                <h3 className="font-display text-xl font-bold text-white mb-4">
                  What You'll Get:
                </h3>
                <ul className="space-y-3">
                  {[
                    "Complete breakdown of your current Shopify fees",
                    "Projected savings with custom infrastructure",
                    "30-day migration timeline",
                    "ROI calculation specific to your revenue",
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
                <p className="text-white font-semibold mb-2">
                  ⚡ White paper delivered in 48 hours after the audit call
                </p>
                <p className="text-granite/80 text-sm">
                  No upfront payment required. Just 30 minutes of your time to discover
                  how much revenue you're leaving on the table.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-card shadow-2xl p-4 sm:p-6 border border-white/10 overflow-hidden">
              <ApolloContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
