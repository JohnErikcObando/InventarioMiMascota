import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjustarTextoPipe } from './pipes/ajustar-texto.pipe';
import { RemoveSpacesPipe } from './pipes/remove-spaces.pipe';
import { NumericPipe } from './pipes/numeric.pipe';

@NgModule({
  declarations: [AjustarTextoPipe, RemoveSpacesPipe, NumericPipe],
  imports: [CommonModule],
  exports: [AjustarTextoPipe, RemoveSpacesPipe, NumericPipe],
})
export class SharedModule {}
