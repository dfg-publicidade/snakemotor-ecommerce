import { GalleryImage } from "ngx-doe-gallery";

export class ProdutoUtil {
    static getPreco(item: any): any {
        let normal: string = '';
        let desconto: string = '';
        let sobConsulta: boolean = false;

        let produto = item.produto ? item.produto : item;

        if (produto.precoVenda) {
            normal = produto.precoVenda;
        };

        if (produto.precoPromocional) {
            desconto = produto.precoPromocional;
        };
        if (produto.precoSobConsulta) {
            normal = '';
            desconto = '';
            sobConsulta = true;
        };
        if (item.precoVenda) {
            normal = item.precoVenda;
        };
        if (item.precoPromocional) {
            desconto = item.precoPromocional;
        };

        if (item.precoSobConsulta) {
            normal = '';
            desconto = '';
            sobConsulta = true;
        }

        return {
            normal: normal,
            desconto: desconto,
            sobConsulta: sobConsulta
        };
    }

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
}