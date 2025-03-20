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

  public jugarDeNuevo : boolean = false;
  
  // Comprueba si todos los campos cumplen con las condiciones puestas
  // cuando devuelve true se activa el boton "Recoger datos"
  comprobarDatos(): boolean {
    return this.nombreUsuario !== "" && this.apellidoUsuario !== "" && this.rango >= 4 && this.intentos > 0;
  }

  // Crea un nuevo objeto Configuracion 
  // genera un numero aleatorio
  // activa el juego y desactiva el formulario 
  enviarDatos(): void{
    if(this.comprobarDatos()){
      this.configuracion = new Configuracion(this.nombreUsuario, this.apellidoUsuario, this.rango, this.intentos);

      this.numeroAleatorio = this.configuracion ? Math.floor(Math.random() * (this.configuracion.rango + 1)) : null;
      console.log(this.numeroAleatorio);

      this.comenzarJuego();
    }
  }

  // se ejecuta cuando el usuario pierde el foco en el campo Nombre
  //  actualiza la visibilidad del error (`errorNombreVisible`)
  onBlurNombre() : void{
    if(this.validarDatos(this.nombreUsuario)){
      this.errorNombreVisible = true;
    } else{
      this.errorNombreVisible = false;
    }
  }

  // se ejecuta cuando el usuario pierde el foco en el campo Apellido
  // actualiza la visibilidad del error (`errorApellidoVisible`)
  onBlurApellido() : void {
    if(this.validarDatos(this.apellidoUsuario)){
      this.errorApellidoVisible = true;
    } else{
      this.errorApellidoVisible = false;
    }
    
  }

  // se ejecuta cuando el usuario pierde el foco en el campo Rango
  // Actualiza la visibilidad del error (`errorRangoVisible`)
  onBlurRango() : void {
    if(this.validarDatos(this.rango)){
      this.errorRangoVisible = true;
    } else{
      this.errorRangoVisible = false;
    }
  }

  // Valida el dato recibido 
  validarDatos(dato : string | number) : boolean {
    if (typeof dato === "number") {
      return dato < 4;    
    } else {
      return dato === "";
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
        this.intentos = 0;
        this.terminarJuego();
        return;
      }
      this.getColor;
      this.actualizarIntentos();
      
    } 
  }

  getColor(): string {
    switch (this.mensaje) {
      case "Caliente":
        return "red";
      case "Templado":
        return "yellow";
      case "Frio":
        return "blue";
      case "Has ganado":
        return "green";
      default:
        return "black";
    }
  }

  actualizarIntentos() : void{
    if (this.intentos > 0){
      this.intentos -= 1;
      this.configuracion?.setIntentos(this.intentos);
    }
    if(this.intentos === 0){

      this.mensaje = "Has gastado todos los intentos"
      this.terminarJuego();
    }      
  }
  //Activa el juego y desactiva el formulario
  comenzarJuego() : void{
    this.desactivarFormulario = true;
    this.empezarJuego = true; 
    this.desactivarJuego = false;
  }

  //Activa el formulario y desactiva el juego
  terminarJuego() : void{
    this.jugarDeNuevo = true;
    this.desactivarJuego = true;
  }

  comenzarDeNuevo() : void{
    this.desactivarFormulario = false;
    this.empezarJuego = false;
    this.jugarDeNuevo = false;

    this.nombreUsuario = "";
    this.apellidoUsuario = "";
    this.rango = 0;
    this.intentos = 0;
    this.numIntroducido = 0;

  }


}
