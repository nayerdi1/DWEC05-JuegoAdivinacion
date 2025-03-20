import { Component } from '@angular/core';
import { Configuracion } from '../modelos/Configuracion';

@Component({
  selector: 'app-juego',
  standalone: false,
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.css'
})
export class JuegoComponent {
  
  public nombreUsuario : string = "";
  public apellidoUsuario : string = "";
  public rango : number = 0;
  public intentos : number = 0;

  public configuracion? : Configuracion; 
  

  public errorNombreVisible : boolean = false;
  public errorApellidoVisible : boolean = false;
  public errorRangoVisible : boolean = false;

  public desactivarFormulario : boolean = false;
  public empezarJuego : boolean = false;
  public desactivarJuego : boolean = false;

  public numeroAleatorio : number | null = null;
  public numIntroducido? : number;

  public mensaje : string = "";
  
  comprobarDatos(): boolean {
    return this.nombreUsuario !== "" && this.apellidoUsuario !== "" && this.rango >= 4 && this.intentos > 0;
  }

  enviarDatos(): void{
    if(this.comprobarDatos()){
      this.configuracion = new Configuracion(this.nombreUsuario, this.apellidoUsuario, this.rango, this.intentos);

      this.desactivarFormulario = true; // Deshabilita el formulario
      this.empezarJuego = true; //Habilita el juego
      this.desactivarJuego = false;

      this.numeroAleatorio = this.configuracion ? Math.floor(Math.random() * (this.configuracion.rango + 1)) : null;
      console.log(this.numeroAleatorio);
    }
    
  }

  onBlurNombre() : void{
    if(this.nombreUsuario === ""){
        this.errorNombreVisible = true;
      } else {
        this.errorNombreVisible = false; 
      }
  }

  onBlurApellido() : void {
    if(this.apellidoUsuario === ""){
      this.errorApellidoVisible = true;  
    } else {
      this.errorApellidoVisible = false; 
    }
  }

  onBlurRango() : void {
    if(this.rango < 4){
      this.errorRangoVisible = true; 
    } else {
      this.errorRangoVisible = false; 
    }
  }

  comprobarNumero() : void{
    if(this.numIntroducido != null && this.numeroAleatorio != null){
      
      if(this.numIntroducido > this.numeroAleatorio) {
        this.mensaje = "Te pasaste";
      }
      if(this.numeroAleatorio - this.numIntroducido == 1){
        this.mensaje = "Caliente";
      }
      if(this.numeroAleatorio - this.numIntroducido == 2){
        this.mensaje = "Templado";
      }
      if(this.numeroAleatorio - this.numIntroducido >= 3){
        this.mensaje = "Frio";
      }
      if(this.numeroAleatorio == this.numIntroducido){
        this.mensaje = "Has ganado";
        this.terminarJuego();
        return;
      }
      if (this.intentos > 0){
        this.intentos -= 1;
        this.configuracion?.setIntentos(this.intentos);
      }
      if(this.intentos == 0){
        this.mensaje = "Has gastado todos los intentos"
        this.terminarJuego();
      }
      
    }
    
  }

  terminarJuego() : void{
    this.desactivarJuego = true;
    this.desactivarFormulario = false;

  }

}
