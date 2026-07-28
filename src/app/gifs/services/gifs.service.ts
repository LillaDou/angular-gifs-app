//! Creamos el service para tener toda la información centralizada de nuestros gifs.
//! Va a funcionar como un singleton para tener un lugar centralizado para nuestra información.


import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';//Ponemos el 'type' para ayudar en la transpilación
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GifService {
    
    //Se podría utilizar el fetch API tradicional. Pero en Angular es recomendable utilizar el objeto http
    //Aquí inyectamos al cliente, en el app.config.ts lo proveemos
    private http = inject(HttpClient);


    // Aquí almacenaremos el estado de los trending gifs
    trendingGifs = signal<Gif[]>( [] );
    trendingGifsLoading = signal(true);


    constructor() {
        this.loadTrendingGifs();
    }

    loadTrendingGifs() {

        // Cogemos el tipado de GiphyResponse de nuestras interfaces. 
        // Siempre que hagamos una petición http .get, .push, .patch... no se va a disparar hasta que nos suscibamos a 
        // la petición. Si no hay suscripción, no se hace la petición.
        this.http.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/trending`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 20,
            },
        }).subscribe( (resp) => {
            const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
            this.trendingGifs.set(gifs);
            this.trendingGifsLoading.set(false);
            console.log(gifs);
        } );

    }


    searchGifs( query: string ) {
        return this.http.get<GiphyResponse>( `${ environment.giphyUrl }/gifs/search`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 20,
                q: query,
            },
        } )
        .pipe(
            // tap( resp => console.log({tap: resp}))
            map( ({data}) => data ),
            map( (items) => GifMapper.mapGiphyItemsToGifArray(items) ),

            //TODO: Historial
        )
        //El .pipe nos permite encadenar funcionamientos especiales a las Observables.
        //El tap es un método de RXJS que sirve para disparar efectos secundarios.
        //El .map permite barrer cada uno de los elementos de mi respuesta y regresar una transformación
        //totalmente diferente. Se pueden concatenar varios métodos dentro del pipe, como vemos ahora con el map
        //Con esto, lo que estamos haciendo es transformar la respuesta del http.get, para que el resultado sea 
        //el arreglo de gifs(creado en el mapper) y que se vea en nuestra aplicación (en el search-page creamos
        //una señal llamada gifs. Esta será utilizada dentro del método de searchGifs, al que nos vamos a suscribir
        // y dentro del cual llamaremos esa señal gifs(). La respuesta a esta señal será la respuesta a este método
        //con el .set. Luego queda llamar la señal gifs() en el html correspondiente. )


        // .subscribe( (resp) => {
        //     const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);

        //     console.log({search: gifs});
        // } )

    }
}

// El httpClient nos permite hacer la petición get, put, delete, patch... 
// Tenemos que inyectar el httpClient en este servicio para usarlo, y debemos proveerlo en el app.config.ts

// Para poder adaptarnos mejor en caso de cambios en un futuro, creamos parte del link de nuestro api como 
// una variable de entorno (environments). 
// En estos momentos, hemos cogido la API v1 ('https://api.giphy.com/v1'...), pero si cambia en un futuro a v2 
// u otro tipo, siempre podemos cambiar esa información en los 'environments' sin tener que hacer cambios en el código del servicio. 
// En los 'environments' creamos la propiedad 'giphyUrl' con ese url indicado anteriormente, y añadimos seguidamente
// el resto del url al que queremos llegar: el '/gifs/trending'. Quedaría de tal manera: 
// `${ environment.giphyUrl }/gifs/trending`
// Para que funcione, es necesario mandar a pedir el 'api_key'. Para ello, utilizamos los params.
// Escribimos los 'api_keys' de esta manera, ya que la API en postman lo manda a pedir de esa manera y no con otra estructura.