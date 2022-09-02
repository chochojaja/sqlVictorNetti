
const fs = require('fs');

const { Knex } = require('knex')


const {conexion} = require('./conexionBd/bdConect')

 const knex = require ('knex')(conexion)



class contenedorDb {
    constructor(canal){
        this.canal = canal
        
    }
  



    async saveProducto(obj){
        try {
            await this.knex('productos').insert(obj)(this.canal, 'utf-8')
             .then(resp => console.log(resp))
             .catch(err => console.log(err))
             .finally(() => knex.destroy())
        } catch (error) { console.log(error)            
        }  
        
    }

    async modificaProductoId(){
        try {
            await this.knex.from('cars').where('price', 100000).update({
                price: 1000000 })   (this.canal, 'utf-8')    
             .then(resp => console.log(resp))
             .catch(err => console.log(err))
             .finally(() => knex.destroy())
        } catch (error) { console.log(error)            
        }  
        
    }
 

    async traerProductos(){

    try{
           await this.knex.from('productos').select('*')(this.canal, 'utf-8')
                    .then(resp => {
                for(obj of resp){
                    console.log(`El id: ${obj.id} es un ${obj.name} y cuesta ${obj.price}`)
             }
            })
       } catch {   (err => console.log(err))
         }
     }
    async deletAll(){
        try {
            await knex.from('productos').where('id', '=', 8).del()
            .then(() => console.log('tabla borrada'))
            .catch(err => console.log(err))
            .finally(() => knex.destroy())
            
        } catch (error) { console.log(error)            
        }  
        
    }




}
module.exports = contenedorDb