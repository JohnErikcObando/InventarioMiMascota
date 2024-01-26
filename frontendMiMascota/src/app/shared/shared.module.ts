import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjustarTextoPipe } from './pipes/ajustar-texto.pipe';
import { RemoveSpacesPipe } from './pipes/remove-spaces.pipe';
import { NumericPipe } from './pipes/numeric.pipe';
import { FormatFechaPipe } from './pipes/format-fecha.pipe';

@NgModule({
  declarations: [
    AjustarTextoPipe,
    RemoveSpacesPipe,
    NumericPipe,
    FormatFechaPipe,
  ],
  imports: [CommonModule],
  exports: [AjustarTextoPipe, RemoveSpacesPipe, NumericPipe, FormatFechaPipe],
})
export class SharedModule {}
