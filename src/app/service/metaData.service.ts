import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

declare var ga: any;

export interface PageMetadata {
    title: string;
    description: string;
    author: string;
    keywords: string[];
    type: string;
    image: string;
    url: string;
    fbpages: string;
    appId: string;
    robots: string;
}

const defaultMetadata: PageMetadata = {
    title: environment.title,
    description: environment.description,
    author: 'Snake Motor',
    keywords: ['motos', 'capacetes', 'acessórios', 'escamentos', 'loja', 'online'],
    type: 'website',
    image: environment.contextPath + '/res/imagens/fbdefault.png',
    url: environment.contextPath,
    fbpages: environment.fbPages,
    appId: environment.appId,
    robots: 'index, follow',
}

@Injectable()
export class MetadataService {
    constructor(private metaTagService: Meta, private titleService: Title, private router: Router) { }

    public updateMetadata(metadata: Partial<PageMetadata>, index: boolean = true): void {
        const pageMetadata: PageMetadata = { ...defaultMetadata, ...metadata };

        this.titleService.setTitle(`${pageMetadata.title} | ${pageMetadata.description}`);

        let keywords = '';
        defaultMetadata.keywords.forEach(word => {
            if (keywords !== '') {
                keywords += `,${word}`;
            } else {
                keywords += `${word}`;
            }
        });

        if (pageMetadata.keywords.length > 0) {
            pageMetadata.keywords.forEach(word => {
                if (keywords !== '') {
                    keywords += `,${word}`;
                } else {
                    keywords += `${word}`;
                }
            });
        }

        this.metaTagService.updateTag({ name: 'title', content: pageMetadata.title }, "name='title'");
        this.metaTagService.updateTag({ name: 'description', content: pageMetadata.description }, "name='description'");
        this.metaTagService.updateTag({ name: 'autor', content: pageMetadata.author }, "name='autor'");
        this.metaTagService.updateTag({ name: 'keywords', content: keywords }, "name='keywords'");
        this.metaTagService.updateTag({ property: 'og:type', content: pageMetadata.type }, "property='og:type'");
        this.metaTagService.updateTag({ property: 'og:author', content: pageMetadata.author }, "property='og:author'");
        this.metaTagService.updateTag({ property: 'og:url', content: `${environment.contextPath}${pageMetadata.url}` }, "property='og:url'");
        this.metaTagService.updateTag({ property: 'og:title', content: pageMetadata.title }, "property='og:title'");
        this.metaTagService.updateTag({ property: 'og:description', content: pageMetadata.description }, "property='og:description'");
        this.metaTagService.updateTag({ property: 'og:image', content: pageMetadata.image }, "property='og:image'");
        this.metaTagService.updateTag({ property: 'fb:pages', content: pageMetadata.fbpages }, "property='fb:pages'");
        this.metaTagService.updateTag({ property: 'fb:app_id', content: pageMetadata.appId }, "property='fb:app_id'");
        this.metaTagService.updateTag({ property: 'fb:robots', content: pageMetadata.robots }, "property='fb:robots'");
        this.metaTagService.updateTag({ name: 'robots', content: pageMetadata.robots }, "name='robots'");
        this.metaTagService.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' }, "name='viewport'");
    }
}