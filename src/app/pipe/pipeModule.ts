import { NgModule } from '@angular/core';
import { TextEllipsisPipe } from './textEllipsisPipe';
import { SanitizeHtmlPipe } from './sanizeHtmlPipe';
import { UrlFormatPipe } from './urlFormatPipe';
import { FilterPipe } from './filterPipe';
import { FillNumberPipe } from './fillNumberPipe';
import { FirstNamePipe } from './firstNamePipe';

@NgModule({
    imports: [

    ],
    declarations: [
        SanitizeHtmlPipe,
        TextEllipsisPipe,
        UrlFormatPipe,
        FilterPipe,
        FillNumberPipe,
        FirstNamePipe
    ],
    exports: [
        SanitizeHtmlPipe,
        TextEllipsisPipe,
        UrlFormatPipe,
        FilterPipe,
        FillNumberPipe,
        FirstNamePipe
    ]
})
export class PipeModule { }