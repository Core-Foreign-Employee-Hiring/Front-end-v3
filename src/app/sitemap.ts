// app/sitemap.ts

import { MetadataRoute } from 'next'

// 당신의 프로젝트 데이터
const PROJECT_DATA_MAP: Record<string, { projectTitle: string }> = {
  '1': { projectTitle: 'ROOMIO' },
  '2': { projectTitle: 'EZIP' },
  '3': { projectTitle: 'KUUID' },
  '4': { projectTitle: 'KORI' },
  '5': { projectTitle: 'KODIC' },
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://korfit.vercel.app'

  // 1️⃣ 정적 페이지
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/archive`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/study`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // 2️⃣ 동적 페이지 (스터디 프로젝트)
  const dynamicPages: MetadataRoute.Sitemap = Object.entries(PROJECT_DATA_MAP).flatMap(([studyId, projectData]) =>
    Object.entries(PROJECT_DATA_MAP).map(([projectId]) => ({
      url: `${baseUrl}/study/${studyId}/${projectId}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  return [...staticPages, ...dynamicPages]
}
