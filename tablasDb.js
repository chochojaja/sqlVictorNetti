const { Knex } = require('knex')


const {conexion} = require('./conexionBd/bdConect')

 const knex = require ('knex')(conexion)



  const crearTabla = async (nombreDeTabla)=>{
    try {
        await knex.schema.createTable(nombreDeTabla, table => {
            table.increments('id_carrito')
            table.integer('precioTotal')
            table.string('nombre')
        })
        console.log('tabla creada')
     } catch (error) {
        console.log(error)
    }
      
      
    }
    
 crearTabla('carrito')

 
 const crearTabla2 = async (nombreDeTabla)=>{
    try {
        await knex.schema.createTable(nombreDeTabla, table => {
            table.increments('id_productoCarrito')
            table.integer('id_carrito')
            table.integer('id_producto')
            table.integer('precio')
            table.integer('cantidad')
        })
        console.log('tabla creada')
     } catch (error) {
        console.log(error)
    }
      
      
    }
    
 crearTabla2('productoCarrito')
 
 const crearTabla3 = async (nombreDeTabla)=>{
    try {
        await knex.schema.createTable(nombreDeTabla, table => {
            table.increments('id_producto')
            table.integer('precio')
            table.integer('stock')
            table.string('nombre')
            table.integer('cantidad')
            table.string('categoria')
        })
        console.log('tabla creada')
     } catch (error) {
        console.log(error)
    }
      
      
    }
    
 crearTabla3('producto')
 

 const crearTabla4 = async (nombreDeTabla)=>{
    try {
        await knex.schema.createTable(nombreDeTabla, table => {
            table.increments('id')
            table.integer('price')
            table.string('title')
            table.string('thumbnail')
        })
        console.log('tabla creada')
     } catch (error) {
        console.log(error)
    }
      
      
    }
    
 crearTabla4('productos')
