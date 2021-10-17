import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerTransformPipe } from './dom-sanitizer-transform.pipe';

@NgModule({
  declarations: [DomSanitizerTransformPipe],
  imports: [CommonModule],
  exports: [DomSanitizerTransformPipe],
})
export class PipesModule {}
