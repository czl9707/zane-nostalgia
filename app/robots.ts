import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/scene/', '/scene/api']
        },
        sitemap: 'https://zane-nostalgia.kiyo-n-zane.com/sitemap.xml',
    }
}