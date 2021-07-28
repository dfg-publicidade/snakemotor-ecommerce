import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'formatUrl'
})
export class UrlFormatPipe implements PipeTransform {
    transform(value: string): string {
        if (value) {
            const fromChars: string = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;';
            const toChars: string = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------';
            const rgx: RegExp = new RegExp(fromChars.split('').join('|'), 'g');

            return value.toString().toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with
            .replace(rgx, (char: string) => toChars.charAt(fromChars.indexOf(char))) // Replace special characters
            .replace(/&/g, '-and-') // Replace & with ‘and’
            .replace(/[^\w\-]+/g, '') // Remove all non-word characters
            .replace(/\-\-+/g, '-') // Replace multiple — with single -
            .replace(/^-+/, ''); // Trim — from start of text .replace(/-+$/, '') // Trim — from end of text
        } else {
            return ''
        }
    }
}