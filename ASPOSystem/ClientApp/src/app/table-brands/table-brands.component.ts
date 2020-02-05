import { Component, Inject, OnInit } from '@angular/core';
import { BrandService, IBrands } from './BrandService';

@Component({
    selector: 'app-table-brands',
    templateUrl: './table-brands.component.html',
    styleUrls: ['./table-brands.component.css']
})
export class TableBrandsComponent {
    public brands: IBrands[];
    constructor(private brandService: BrandService) {
        this.brandService.subject.subscribe(this.brandReceived);
    }

    brandReceived = (data: IBrands[]) => {
        this.brands = data;
    }

    ngOnInit() {
        this.brandService.getBrands();
    }

}
