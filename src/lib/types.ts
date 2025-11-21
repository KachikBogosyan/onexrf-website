// lib/types.ts
export type Related = {
    products?: string[];
    materials?: string[];
    tooling?: string[];
    technologies?: string[];
    support?: string[]; // we'll map support.json entries here later
  };
  
  export type SubApplication = {
    slug: string;
    name: string;
    description: string;
    image?: string;
    related?: Related;
  };
  
  export type Application = {
    slug: string;
    name: string;
    aliases?: string[];
    description: string;
    sub_applications?: SubApplication[];
    related: Related;
  };
  