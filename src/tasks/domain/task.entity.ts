//!Dominio: Capa de datos
//! Entity: Modelo de datos para la entidad "Task"

export class Task {
    constructor(
        public readonly id: number,
        public title: string,
        public description: string,
        public status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED',
        public createdAt: Date
    ){}

    //Logica en la capa de dominio
    complete(){
        this.status = 'COMPLETED';
    }
}