import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitizerTransform',
})
export class DomSanitizerTransformPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(img: any): any {
    return this.domSanitizer.bypassSecurityTrustUrl(
      'data:image/jpeg;base64,' + img
    );
  }
}
