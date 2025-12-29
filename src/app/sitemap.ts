import type { MetadataRoute } from 'next'
import { sceneModules } from '@/scene-components';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: 'https://zane-nostalgia.kiyo-n-zane.com/',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        ...(sceneModules.map(({ route }) => ({
            url: `https://zane-nostalgia.kiyo-n-zane.com/scenes/${route}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
        })) as MetadataRoute.Sitemap)
    ]
}