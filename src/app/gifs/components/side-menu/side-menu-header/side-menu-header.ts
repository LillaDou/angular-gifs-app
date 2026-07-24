import { Component } from '@angular/core';
import { environment } from '@environments/environment';
// import { environment } from '../../../../../environments/environment';
//* Hemos creado un path alias en el tsconfig.json. Con eso, lo que conseguimos es que no sea tan engorrosa
//* la importación

@Component({
  selector: 'gifs-side-menu-header',
  imports: [],
  templateUrl: './side-menu-header.html',
})
export class SideMenuHeader {

  envs = environment;

}
