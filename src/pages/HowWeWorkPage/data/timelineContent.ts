export interface TimelineMilestone {
  id: string;
  title: string;
  icon: string;
  description: string;
  metrics: { value: string; label: string }[];
}

export type ServiceType = "analytics" | "software" | "aws";

export const serviceLabels: Record<
  ServiceType,
  { label: string; description: string }
> = {
  analytics: {
    label: "Data Analytics",
    description: "Transform raw data into strategic insights",
  },
  software: {
    label: "Custom Software",
    description: "Build scalable, production-ready applications",
  },
  aws: {
    label: "AWS Migration",
    description: "Migrate and modernize your cloud infrastructure",
  },
};

export const timelineContent: Record<ServiceType, TimelineMilestone[]> = {
  analytics: [
    {
      id: "analytics-1",
      title: "Discovery & Assessment",
      icon: "compass",
      description:
        "We don't start with technology—we start with your business. Through intensive stakeholder workshops, we map your entire data ecosystem, identify hidden opportunities, and create a roadmap that transforms data chaos into competitive advantage. You'll know exactly what insights are possible before we write a single line of code.",
      metrics: [
        { value: "100%", label: "Data Coverage" },
        { value: "2-3", label: "Week Sprint" },
      ],
    },
    {
      id: "analytics-2",
      title: "Data Pipeline Architecture",
      icon: "layers",
      description:
        "We build data infrastructure that actually scales with your business. Using AWS Glue, Lambda, and Step Functions, we create self-healing pipelines with automatic error recovery and quality checks. No more broken ETL jobs at 3 AM—our systems catch issues before they reach your dashboards.",
      metrics: [
        { value: "99.9%", label: "Uptime SLA" },
        { value: "10x", label: "Faster Processing" },
      ],
    },
    {
      id: "analytics-3",
      title: "Advanced Analytics & ML",
      icon: "brain",
      description:
        "Turn your historical data into predictive power. We deploy custom machine learning models using SageMaker and Python that forecast demand, detect anomalies, and automate complex decisions. Our models don't just predict—they explain their reasoning, so your team trusts the insights.",
      metrics: [
        { value: "85%+", label: "Prediction Accuracy" },
        { value: "60%", label: "Time Saved" },
      ],
    },
    {
      id: "analytics-4",
      title: "Visualization & Reporting",
      icon: "chart",
      description:
        "Dashboards that executives actually use. We combine AWS QuickSight with custom React visualizations to create interfaces that answer questions before they're asked. Real-time updates, drill-down capabilities, and mobile-first design mean insights are always at your fingertips.",
      metrics: [
        { value: "Real-time", label: "Data Refresh" },
        { value: "5-sec", label: "Load Time" },
      ],
    },
    {
      id: "analytics-5",
      title: "Ongoing Optimization",
      icon: "summit",
      description:
        "Analytics isn't a one-time project—it's a competitive advantage that compounds over time. We provide 24/7 monitoring, quarterly model retraining, and continuous dashboard evolution. As your business grows, your analytics capabilities grow with it.",
      metrics: [
        { value: "24/7", label: "Support" },
        { value: "Quarterly", label: "Health Checks" },
      ],
    },
  ],

  software: [
    {
      id: "software-1",
      title: "Requirements Engineering",
      icon: "compass",
      description:
        "Most software projects fail because they build the wrong thing beautifully. We prevent that. Through design sprints and user story mapping, we validate assumptions, identify edge cases, and define success metrics before development begins. You'll have complete clarity on what you're getting.",
      metrics: [
        { value: "100%", label: "Stakeholder Alignment" },
        { value: "1-2", label: "Week Discovery" },
      ],
    },
    {
      id: "software-2",
      title: "Technical Design & Prototyping",
      icon: "layers",
      description:
        "See your product before we build it. We deliver clickable prototypes and comprehensive architecture diagrams that validate user flows and technical feasibility. Our designs aren't just pretty—they're informed by scalability requirements, security constraints, and cost optimization from day one.",
      metrics: [
        { value: "2 Weeks", label: "To Prototype" },
        { value: "Cloud-native", label: "Architecture" },
      ],
    },
    {
      id: "software-3",
      title: "Development & Testing",
      icon: "brain",
      description:
        "We write code that lasts. TypeScript-first development with 95%+ test coverage means fewer bugs in production and faster feature delivery. Our CI/CD pipelines run thousands of automated tests on every commit—catching issues before they reach staging, let alone production.",
      metrics: [
        { value: "95%+", label: "Test Coverage" },
        { value: "4-hr", label: "Deploy Cycle" },
      ],
    },
    {
      id: "software-4",
      title: "Deployment & Launch",
      icon: "chart",
      description:
        "Launch day should be boring—and with us, it is. Blue-green deployments on AWS with automatic rollback mean zero-downtime releases. Comprehensive monitoring catches performance degradation before users notice. We've launched products that handled 10x traffic spikes without breaking a sweat.",
      metrics: [
        { value: "Zero", label: "Downtime" },
        { value: "99.99%", label: "Uptime SLA" },
      ],
    },
    {
      id: "software-5",
      title: "Maintenance & Evolution",
      icon: "summit",
      description:
        "Software isn't done when it ships—that's when the real work begins. We provide proactive maintenance, security patching, performance optimization, and feature evolution. <4 hour response times and monthly enhancement cycles mean your product never falls behind.",
      metrics: [
        { value: "<4hr", label: "Issue Response" },
        { value: "Monthly", label: "Updates" },
      ],
    },
  ],

  aws: [
    {
      id: "aws-1",
      title: "Migration Assessment",
      icon: "compass",
      description:
        "Cloud migrations fail when the business case isn't rock solid. We conduct comprehensive infrastructure audits, dependency mapping, and TCO analysis that proves the ROI. You'll know exactly what you're getting into: timeline, risks, costs, and benefits—all quantified.",
      metrics: [
        { value: "1 Week", label: "Full Assessment" },
        { value: "30-40%", label: "Avg Cost Savings" },
      ],
    },
    {
      id: "aws-2",
      title: "Architecture & Planning",
      icon: "layers",
      description:
        "We design AWS infrastructure using the Well-Architected Framework—security, reliability, performance, cost optimization, and operational excellence baked in from the start. Multi-region failover, auto-scaling, and disaster recovery aren't add-ons—they're foundational.",
      metrics: [
        { value: "5 Pillars", label: "Well-Architected" },
        { value: "Multi-region", label: "Design" },
      ],
    },
    {
      id: "aws-3",
      title: "Migration Execution",
      icon: "brain",
      description:
        "Our phased migration approach means your business never stops. We migrate workloads incrementally with comprehensive rollback plans at every step. Automated testing validates functionality in the cloud before we cut over. Zero data loss isn't a goal—it's a guarantee.",
      metrics: [
        { value: "Zero", label: "Data Loss" },
        { value: "Phased", label: "Rollout" },
      ],
    },
    {
      id: "aws-4",
      title: "Security & Compliance",
      icon: "chart",
      description:
        "Security is non-negotiable. We implement defense-in-depth: VPC architecture, IAM least-privilege, encryption everywhere, automated compliance scanning with AWS Config, and SOC 2 controls. Your AWS environment will pass audits from day one.",
      metrics: [
        { value: "SOC 2", label: "Ready" },
        { value: "Automated", label: "Compliance" },
      ],
    },
    {
      id: "aws-5",
      title: "Optimization & Support",
      icon: "summit",
      description:
        "AWS costs spiral when left unmanaged. We provide continuous cost optimization through reserved instance planning, auto-scaling tuning, and resource rightsizing. 24/7 monitoring with CloudWatch and custom alerting means issues are resolved before they impact users.",
      metrics: [
        { value: "24/7", label: "Monitoring" },
        { value: "15-25%", label: "Annual Savings" },
      ],
    },
  ],
};
