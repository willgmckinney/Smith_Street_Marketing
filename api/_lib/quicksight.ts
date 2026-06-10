import {
  GenerateEmbedUrlForRegisteredUserCommand,
  QuickSightClient,
  type RegisteredUserEmbeddingExperienceConfiguration,
} from "@aws-sdk/client-quicksight";

const region = process.env.AWS_REGION || "us-east-1";

let _client: QuickSightClient | null = null;
function getClient(): QuickSightClient {
  if (!_client) _client = new QuickSightClient({ region });
  return _client;
}

export type ExperienceKind = "dashboard" | "qna" | "quickchat";

export interface EmbedUrlParams {
  experience: ExperienceKind;
  dashboardId?: string;
  topicId?: string;
}

function buildExperienceConfiguration(
  params: EmbedUrlParams,
): RegisteredUserEmbeddingExperienceConfiguration {
  switch (params.experience) {
    case "dashboard": {
      const dashboardId = params.dashboardId || process.env.QUICKSIGHT_DASHBOARD_ID;
      if (!dashboardId) {
        throw new Error(
          "Missing dashboardId (body) and QUICKSIGHT_DASHBOARD_ID (env).",
        );
      }
      return {
        Dashboard: {
          InitialDashboardId: dashboardId,
          FeatureConfigurations: {
            AmazonQInQuickSight: {
              ExecutiveSummary: { Enabled: true },
            },
          },
        },
      };
    }

    case "qna": {
      const topicId = params.topicId || process.env.QUICKSIGHT_TOPIC_ID;
      return {
        GenerativeQnA: topicId ? { InitialTopicId: topicId } : {},
      };
    }

    case "quickchat": {
      // The Quick Chat experience configuration is intentionally empty server-side;
      // the agent is selected client-side via agentOptions.fixedAgentId in the SDK.
      return { QuickChat: {} };
    }
  }
}

export async function generateRegisteredUserEmbedUrl(
  params: EmbedUrlParams,
): Promise<string> {
  const awsAccountId = process.env.AWS_ACCOUNT_ID;
  const userArn = process.env.QUICKSIGHT_USER_ARN;
  const allowedDomain = process.env.QUICKSIGHT_ALLOWED_DOMAIN;

  if (!awsAccountId) throw new Error("Missing AWS_ACCOUNT_ID env var.");
  if (!userArn) throw new Error("Missing QUICKSIGHT_USER_ARN env var.");

  const result = await getClient().send(
    new GenerateEmbedUrlForRegisteredUserCommand({
      AwsAccountId: awsAccountId,
      UserArn: userArn,
      SessionLifetimeInMinutes: 600,
      AllowedDomains: allowedDomain ? [allowedDomain] : undefined,
      ExperienceConfiguration: buildExperienceConfiguration(params),
    }),
  );

  if (!result.EmbedUrl) {
    throw new Error("QuickSight returned no EmbedUrl in the response.");
  }
  return result.EmbedUrl;
}
