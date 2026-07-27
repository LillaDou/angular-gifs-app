import { Gif } from "../interfaces/gif.interface";
import { GiphyItem } from "../interfaces/giphy.interfaces";


export class GifMapper {

    static mapGiphyItemToGif( item: GiphyItem ): Gif {

        return {
            id: item.id,
            title: item.title,
            url: item.images.original.url,
        };
    };

    static mapGiphyItemsToGifArray( items: GiphyItem[] ): Gif[] {
        return items.map( this.mapGiphyItemToGif )
    }
}

// Hemos creado este mapper para poder transformar data a información que necesitamos. 
// En este caso, nos interesa transformar toda la información de los Giphy Interfaces (GiphyItem) de la
// API de Giphy a un objeto basado en nuestra interfaz de gif.interface 
// 