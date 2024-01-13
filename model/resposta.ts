export default class RespostaModel{
    #valor: string
    #certa: boolean
    #revelada: boolean    

    constructor(valor: string, certa: boolean, revelada = false){
        this.#valor = valor
        this.#certa = certa
        this.#revelada = revelada
    }

    static certa(valor: string){
        return new RespostaModel(valor, true);
    }

    static errada(valor: string){
        return new RespostaModel(valor, false);
    }    

    get valor(){
        return this.#valor
    }
    get certa(){
        return this.#certa
    }
    get revelada(){
        return this.#revelada
    } 
    
    static criarUsandoObjeto(obj: RespostaModel): RespostaModel {
        return new RespostaModel(obj.valor, obj.certa, obj.revelada)
    }
    
    revelar(){
        //this.#revelada = true
        //return this;
        return new RespostaModel(this.#valor, this.#certa, true)
    }

    paraObjeto(){
        return {
            valor: this.#valor,
            certa: this.#certa,
            revelada: this.#revelada,              
        }
    }

}