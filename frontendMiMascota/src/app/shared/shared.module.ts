import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjustarTextoPipe } from './pipes/ajustar-texto.pipe';
import { RemoveSpacesPipe } from './pipes/remove-spaces-pipe.pipe';

@NgModule({
  declarations: [AjustarTextoPipe, RemoveSpacesPipe],
  imports: [CommonModule],
  exports: [AjustarTextoPipe, RemoveSpacesPipe],
})
export class SharedModule {}
