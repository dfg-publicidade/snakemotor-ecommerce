import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'fillNumber'
})
export class FillNumberPipe implements PipeTransform {
    transform(item: string): string {
        return (String('0').repeat(6) + item).substr( (6 * -1), 6) ;
    }
}