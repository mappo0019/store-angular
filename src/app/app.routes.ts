import { Routes } from '@angular/router';

import { ListComponent } from './domains/products/pages/list/list.component';
import { AboutComponent } from './domains/info/pages/about/about.component';
import { NotFoundComponent } from '@info/pages/not-found/not-found.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';
import { ProductDetailComponent } from '@products/pages/product-detail/product-detail.component';

export const routes: Routes = [
    {
        path:"",
        component: LayoutComponent,
        children:[
            {
                path: "",
                loadComponent: ()=> import("./domains/products/pages/list/list.component").then(m=> m.ListComponent)
            },
            {
                path: "about",
                loadComponent: ()=> import("./domains/info/pages/about/about.component").then(m=> m.AboutComponent)
            },
            {
                path: "product/:id",
                loadComponent: ()=> import("./domains/products/pages/product-detail/product-detail.component").then(m=> m.ProductDetailComponent)
            },
        ]
    },
    {
        path: "**",
        loadComponent: ()=> import("./domains/info/pages/not-found/not-found.component").then(m=> m.NotFoundComponent)
    }
];
