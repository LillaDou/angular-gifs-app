//! Creamos el service para tener toda la información centralizada de nuestros gifs.
//! Va a funcionar como un singleton para tener un lugar centralizado para nuestra información.


import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';//Ponemos el 'type' para ayudar en la transpilación

@Injectable({providedIn: 'root'})
export class GifService {
    
    //Se podría utilizar el fetch API tradicional. Pero en Angular es recomendable utilizar el objeto http
    //Aquí inyectamos al cliente, en el app.config.ts lo proveemos
    private http = inject(HttpClient);

    constructor() {
        this.loadTrendingGifs();
    }

    loadTrendingGifs() {

        // Cogemos el tipado de GiphyResponse de nuestras interfaces. 
        this.http.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/trending`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 20,
            },
        });

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