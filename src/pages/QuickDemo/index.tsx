import { useState } from "react";
import { signOut, useAuth } from "../../lib/auth";
import { EmbedDashboard } from "./components/EmbedDashboard";
import { EmbedGenerativeQnA } from "./components/EmbedGenerativeQnA";
import { EmbedQuickChat } from "./components/EmbedQuickChat";

type Tab = "dashboard" | "qna" | "quickchat";

const TABS: { id: Tab; label: string; description: string }[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    description:
      "Interactive read-only Quick Suite dashboard with executive-summary AI.",
  },
  {
    id: "qna",
    label: "Generative Q&A",
    description:
      "Ask natural-language questions against the Q topic and get visual answers.",
  },
  {
    id: "quickchat",
    label: "Quick Chat",
    description:
      "Conversational Quick Suite agent — chat with your data and documents.",
  },
];

export const QuickDemo = () => {
  const auth = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  const accessToken = auth.user?.access_token;
  const email = (auth.user?.profile.email as string | undefined) ?? "";

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="inline-block px-3 py-1 mb-4 bg-golden-hour-start/15 border border-golden-hour-start/30 rounded-pill">
              <span className="text-golden-hour-start font-bold text-xs uppercase tracking-wider">
                Live demo
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
              Quick Suite, embedded.
            </h1>
            <p className="mt-3 text-granite/80 max-w-2xl text-base md:text-lg">
              A working preview of Amazon Quick Suite running inside our own
              app — interactive dashboards, Generative Q&amp;A, and a Quick Chat
              agent, all served via the registered-user embedding flow.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {email ? (
              <div className="text-right">
                <p className="text-granite/60 text-xs uppercase tracking-wider">
                  Signed in
                </p>
                <p className="text-white font-semibold text-sm">{email}</p>
              </div>
            ) : null}
            <button
              type="button"
              onClick={() => signOut(auth)}
              className="px-4 py-2 rounded-pill border border-white/15 text-granite hover:bg-white/5 text-sm font-semibold transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-4 border-b border-white/10">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-3 font-semibold text-sm transition-colors ${
                  isActive
                    ? "text-golden-hour-start"
                    : "text-granite/70 hover:text-white"
                }`}
              >
                {tab.label}
                {isActive ? (
                  <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-golden-gradient" />
                ) : null}
              </button>
            );
          })}
        </div>

        <p className="text-granite/60 text-sm mb-6 max-w-3xl">
          {TABS.find((t) => t.id === activeTab)?.description}
        </p>

        {/* Active embed */}
        {!accessToken ? (
          <div className="bg-atmospheric-haze rounded-card border border-white/10 p-8 text-center text-granite/70">
            No access token available — try refreshing the page.
          </div>
        ) : activeTab === "dashboard" ? (
          <EmbedDashboard
            accessToken={accessToken}
            dashboardId={import.meta.env.VITE_QUICKSIGHT_DASHBOARD_ID as
              | string
              | undefined}
          />
        ) : activeTab === "qna" ? (
          <EmbedGenerativeQnA
            accessToken={accessToken}
            topicId={import.meta.env.VITE_QUICKSIGHT_TOPIC_ID as
              | string
              | undefined}
          />
        ) : (
          <EmbedQuickChat
            accessToken={accessToken}
            agentId={import.meta.env.VITE_QUICKSIGHT_AGENT_ID as
              | string
              | undefined}
          />
        )}

        <p className="mt-8 text-xs text-granite/50">
          Embedded via the Amazon QuickSight Embedding SDK. Visitor identity is
          handled by Amazon Cognito; embed URLs are minted server-side for a
          shared Quick Suite reader user.
        </p>
      </section>
    </div>
  );
};
