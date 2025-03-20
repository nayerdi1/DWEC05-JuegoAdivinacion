export class Configuracion{
    constructor(
        public nombreUsuario : string,
        public apellidoUsuario : string,
        public rango : number,
        public intentos : number
    ){}

    public setIntentos(intentos : number){
        this.intentos = intentos;
    }
}