/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HUBSPOT_PORTAL_ID?: string;
  readonly VITE_HUBSPOT_FORM_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ApolloMeetingsAPI {
  submit: (options?: {
    formId?: string;
    map?: boolean;
    lead?: Record<string, string>;
    closeOnOutside?: boolean;
    preventRedirect?: boolean;
    onRedirect?: (url: string) => void;
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
    onRouted?: (result: unknown) => void;
  }) => void;
  initWidget: (config: {
    appId: string;
    schedulingLink: string;
    domElement?: HTMLElement;
  }) => void;
}

declare global {
  interface Window {
    ApolloMeetings?: ApolloMeetingsAPI;
  }
}

export {};
