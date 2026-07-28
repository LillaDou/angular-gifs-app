import { Component, inject } from '@angular/core';
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-gif-history',
  imports: [],
  templateUrl: './gif-history.html',
})
export default class GifHistory {

  query = toSignal( inject(ActivatedRoute).params.pipe(
    map( params => params['query'] )
  ) )
  // Nos interesa el query (indicado en las rutas). Para extraer la info, hacemos lo siguiente: 
  // Primero inyectamos el ActivatedRoute. 
  // Al añadir el .params lo convertimos en un observable, que va a estar emitiendo valores conforme
  // el URL cambie.
  // El toSignal convierte todo eso en una señal pues va a ir cambiando siempre.
  // De todos los parámetros que recibimos (.params), solo nos interesa el query. Para ello, utilizamos las 
  // observables. 
  // El .pipe nos permite conectarnos con los diferentes operadores de RxJS.
  // Dentro del .pipe nos interesa el map. De los parámetros, nos interesa el query (el que indicamos en las rutas)

}
