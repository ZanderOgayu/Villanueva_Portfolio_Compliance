import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const ojt = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/ojt" }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    period: z.string(),
    role: z.string(),
    location: z.string(),
    hoursTotal: z.number().default(300),
    dtrSummaryFile: z.string().optional(),
    edtrExcelFile: z.string().optional(),
    metrics: z.array(z.object({
      label: z.string(),
      value: z.string()
    })).optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(1)
  })
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    operationCode: z.string(),
    tagline: z.string(),
    category: z.enum(['Web Application', 'Cryptography', 'System Administration', 'Game Development', 'Machine Learning', 'Graphic Art']),
    techStack: z.array(z.string()),
    clearanceLevel: z.string().default('LEVEL 3'),
    featured: z.boolean().default(false),
    coverImage: z.string().optional(),
    liveDemoUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    downloadUrl: z.string().optional(),
    order: z.number().default(1)
  })
});

export const collections = { ojt, projects };
