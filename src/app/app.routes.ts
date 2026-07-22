import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'dashboard',
        loadComponent: () => 
            import('./gifs/pages/dashboard-page/dashboard-page'),
        //Aquí estamos haciendo un lazy loading: "a performance optimization technique where
        // non-critical resources (e.g. images, videos, scripts) are not loaded during the initial page load. "
        //?Rutas hijas: es un arreglo de rutas que queremos que aparezcan dentro de la principal. En este caso, 
        //?en la ruta de dashboard. A partir de ahora, tendrán un URL diferente. No será localhost:4200/dashboard o 
        //?localhost:4200/trending, sino localhost:4200/dashboard/trending
        children: [
            {
                path: 'trending',
                loadComponent: () => 
                import('./gifs/pages/trending-page/trending-page')
            },
            {
                path: 'search',
                loadComponent: () => 
                    import('./gifs/pages/search-page/search-page')
            },
            {
                path: '**',
                redirectTo: 'trending'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }

];
