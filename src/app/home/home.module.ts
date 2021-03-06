import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CompareModule } from '../compare/compare.module';

import { BannerComponent } from './banner.component';
import { HomeComponent } from './home.component';
import { IntroComponent } from './intro.component';

@NgModule({
    imports: [
        SharedModule,
        CompareModule
    ],
    declarations: [
        BannerComponent,
        HomeComponent,
        IntroComponent
    ],
    exports: [
        HomeComponent
    ]
})
export class HomeModule {}