import { NgModule } from '@angular/core';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatDividerModule } from '@angular/material/divider';
@NgModule({
    exports: [
        MatDialogModule,
        MatExpansionModule,
        MatPaginatorModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatTableModule,
        MatDividerModule

    ],
    declarations: [
    ]
})
export class MaterialModule { }