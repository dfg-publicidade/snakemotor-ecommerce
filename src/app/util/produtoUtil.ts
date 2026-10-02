import { GalleryImage } from "ngx-doe-gallery";

export class ProdutoUtil {
    static getImagemDestaque(item: any): string {
        let imagens = [];

        if (item.imagens) {
            imagens = item.imagens;
        } else {
            if (item.produto && item.produto.imagens) {
                imagens = item.produto.imagens;
            }
        }

        if (imagens && imagens.length > 0) {
            let timestamp = new Date().getTime();

            let imagemDestaque: any;

            imagens.find((img: any) => {
                if (img.destaque) {
                    imagemDestaque = img;
                }
            });

            return imagemDestaque ? `${imagemDestaque.xs.original}?timestamp=${timestamp}` : `${imagens[0].xs.original}?timestamp=${timestamp}`;
        } else {
            return '';
        }
    }

    static getGaleriaImagens(item: any): GalleryImage[] {
        let imagens: any = [];
        let galeria: GalleryImage[] = [];

        if (item.imagens) {
            imagens = item.imagens;
        } else {
            if (item.produto && item.produto.imagens) {
                imagens = item.produto.imagens;
            }
        }

        imagens.forEach((imagem: any) => {
            galeria.push(new GalleryImage(imagem.original, imagem.xs.original));
        });

        return galeria;
    }

    static isProdutoPneu(item: any): boolean {
        if (!item) {
            return false;
        }
        let categoria = item.categoria || (item.produto ? item.produto.categoria : null) || (item.nome && (item.permalink || item.whatsapp !== undefined) ? item : null);
        if (!categoria) {
            return false;
        }
        const nome = (categoria.nome || '').toLowerCase().trim();
        const permalink = (categoria.permalink || '').toLowerCase().trim();
        const superNome = (categoria.supercategoria?.nome || '').toLowerCase().trim();
        const superPermalink = (categoria.supercategoria?.permalink || '').toLowerCase().trim();

        return (
            categoria.whatsapp === true ||
            categoria.whatsapp === 'true' ||
            categoria.whatsapp === 1 ||
            categoria.whatsapp === '1' ||
            nome === 'pneus' ||
            nome === 'pneu' ||
            permalink === 'pneus' ||
            permalink === 'pneu' ||
            superNome === 'pneus' ||
            superNome === 'pneu' ||
            superPermalink === 'pneus' ||
            superPermalink === 'pneu'
        );
    }
}