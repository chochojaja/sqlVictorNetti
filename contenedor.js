
const fs = require('fs');

class contenedor {
    constructor(canal){
        this.canal = canal
        
    }

    async #readFileFunction(canal){
        let archivo = await fs.promises.readFile(canal,'utf-8')
        let dataArch = await JSON.parse(archivo)
        return dataArch
    }

    async save(obj){
        try {
            let dataArch = await this.#readFileFunction(this.canal, 'utf-8')
            if (dataArch.length) {
                await fs.promises.writeFile(this.canal, JSON.stringify([...dataArch,{ ...obj, id:dataArch[dataArch.length]}]))
                
            } else {
                await fs.promises.writeFile(this.canal, JSON.stringify([{...obj, id:1}],null,2))
            } 
            console.log(`El archivo tiene el numero id:${dataArch[dataArch.length - 1].id + 1 }`) 

        } catch (error) { console.log(error)            
        }  
        
    }


    async getById(id){
        try {let data = await fs.promises.readFile(this.canal, 'utf-8')
        const dataParse = JSON.parse(data)
        let producto = dataParse.find(producto => producto.id === id)
        if (producto) {
            return producto
                
        } else {
            console.log('no hay producto')
            
        }   
        } catch (error) {
            console.log(error)
        }
    }
/*
    async getById(id){
        try {
            let dataArch = await this.#readFileFunction(this.canal, 'utf-8')
            let producto = dataArch.find(producto => producto.id === id)
            if (producto) {
                return producto
                    
               } else {
                console.log('no hay producto')
                
            }
            
        } catch (error) { console.log(error)
            
        }
         }
    
*/

    async updateById(obj){
        try {
         let dataArch = await this.#readFileFunction(this.canal, 'utf-8')
            console.log(dataArch)
         const objIndex = dataArch.findIndex(prod =>prod.id === obj.id)
                  if (objIndex !== -1) {
                     dataArch[objIndex] = obj
                     await fs.promises.writeFile(this.canal, JSON.stringify(dataArch, null, 2))
                    return {msj: 'producto actualizado con id'}
                 } else {
                     return {error: 'no existe ningun producto'}
         }
                 } catch (error) { console.log(error)
        
        }

     }
 
 async getAll(){ 
    try {
        let data = await fs.promises.readFile(this.canal, 'utf-8')
        const dataParse = JSON.parse(data)
        return dataParse
        

    } catch (error) {
        console.log(error)
    }
    
 }

 async deleteAll(id){
     try {
        let dataArch = await this.#readFileFunction(this.canal, 'utf-8')
        let producto = dataArch.find(producto => producto.id !== id)
        if (producto) {
            let dataFiltrado = dataParse.filter(producto =>producto.id !== id)
            await fs.promises.writeFile(this.canal,JSON.stringify(dataFiltrado,null,2))
            console.log('producto eliminado')
        } else {
            console.log('no se encontro el producto')
            
        }
     } catch (error) { 
        console.log(error)
        
     }   
        
 }

} 

module.exports = contenedor