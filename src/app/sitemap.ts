import type { MetadataRoute } from 'next'
import { fetchSceneMetas } from '@/scene-components/utils/fetch-scenes';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const scenes = await fetchSceneMetas();

    return [
        {
            url: 'https://zane-nostalgia.kiyo-n-zane.com/',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        ...(scenes.map(({ route }) => ({
            url: `https://zane-nostalgia.kiyo-n-zane.com/scenes/${route}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
        })) as MetadataRoute.Sitemap)
    ]
}