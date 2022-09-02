const {response} = require('express')

const express = require('express')
const {Server : HttpServer} = require('http')
const{Server : Ioserver} = require('socket.io')
const Contenedor = require ("./contenedor.js")

const { Knex } = require('knex')
const {conexion} = require('./conexionBd/bdConect') 
const knex = require ('knex')(conexion)

const ContenedorDb = require ("./contenedorDb.js")

const app = express()
const {Router} = express
const routerProductos = Router()
const routerCarrito = Router()

const httpServer = new HttpServer (app)
const io = new Ioserver(httpServer)

const PORT= process.env.PORT ||8080

app.use(express.static('public'))
app.use(express.json())
app.use(express.static('file'))
app.use(express.urlencoded({ extended : true })) 

//const arrayProductos = []


routerProductos.get('/', async ( req, res )=> {
   
    try {
        const contenedor = new Contenedor('./producto.txt')        
        const productos = await contenedor.getAll()
        console.log(productos)
        res.send({status: 200, productos})
        
    } catch (error) {
        res.send({status: 500, error})
    }
})


routerProductos.get('/:id', async ( req, res )=> {
    try {
        const { id } = req.params 
        console.log(id)
        const contenedor = new Contenedor('./producto.txt')        
        const productos = await contenedor.getById(id)
         console.log(productos)
        res.send({status: 200, productos})
        
    } catch (error) {
        res.send({status: 500, error})
    }
})


routerCarrito.get('/', async ( req, res )=> {
   
    try {
        const contenedor = new Contenedor('./producto.txt')        
        const productos = await contenedor.getAll()
        console.log(productos)
        res.send({status: 200, productos})
        
    } catch (error) {
        res.send({status: 500, error})
    }
})


routerCarrito.get('/:id', async ( req, res )=> {
    try {
        const { id } = req.params 
        console.log(id)
        const contenedor = new Contenedor('./producto.txt')        
        const productos = await contenedor.getById(id)
         console.log(productos)
        res.send({status: 200, productos})
        
    } catch (error) {
        res.send({status: 500, error})
    }
})


routerProductos.post('/', async(req , res)=>{
  try {
     const objProducto = req.body
     const contenedor = new Contenedor('./productos.txt')
      await contenedor.save(objProducto)
         console.log(objProducto)
    res.json({msg: `producto guardado`,
            Producto:[{objProducto}]
        })
    } catch (error) {
    console.log(error)
    } 
 })

 routerCarrito.post('/', async(req , res)=>{
    try {
       const objProducto = req.body
       const objProductoNw = (objProducto, id=Math.floor(Math.random() * 50))
       const contenedorDb = new ContenedorDb('./conexionBd/bdConect.js')
       await contenedorBd.saveProducto(objProductoNw)
           console.log(objProductoNw)
      res.send({msg: `productos en el carrito`,
              Producto:[{objProductoNw}]
          })
      } catch (error) {
      console.log(error)
      } 
   })
  


routerProductos.put('/:id', async(req , res)=>{
  try {
     const { id } = req.params 
    console.log(id)
   const objProductos = req.body
   console.log(objProductos)
   const contenedor = await new Contenedor ('./producto.txt')
   contenedor.updateById({id: parseInt(id),... objProductos }) 
   const respuesta = updateById({ id: title , price , thumbnail })
   res.send({respuesta})
} catch (error) {
    console.log(error)
     }
 })


 
routerCarrito.put('/:id', async(req , res)=>{
    try {
       const { id } = req.params 
      console.log(id)
     const objProductos = req.body
     console.log(objProductos)
     const contenedorDb = await new ContenedorDb ('./conexionBd/bdConect.js')
     contenedorDb.saveProducto({id: parseInt(id),... objProductos }) 
     const respuesta = saveProducto({ id: title , price , thumbnail })
     res.send({respuesta})
  } catch (error) {
      console.log(error)
       }
   })
  

 routerProductos.delete('/api/productos:id', async ( req, res )=> {
    try {
        const { id } = req.params 
        
        const contenedor = new Contenedor('./producto.txt')        
        const productos = await contenedor.deleteAll(id)
         console.log(productos)
        res.send({status: 200, mensaje:'producto eliminado'})
        
    } catch (error) {
        res.send({status: 500, error})
    }
})




io.on ('connection', async(socket)=>{
   try{
         const contenedor = new Contenedor('./producto.txt')
         const productos= await  contenedor.getAll()
         const mensaje = {
            mensaje: 'ok',
            productos
        }
        socket.emit('mensaje-servidor', mensaje)
           // console.log(mensaje)
    
        socket.on('producto-nuevo', (producto, cb) => {
            productos.push(producto)
            const mensaje = {
                mensaje: 'productos insertado',
                productos
            }
            const id = new Date().getTime()
            io.sockets.emit('mensaje-servidor', mensaje )
            cb(id)
        })
    
    } catch (error) {
        console.log(error)
    }
       
  
})

app.use(routerProductos)
app.use(routerCarrito)
app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)


httpServer.listen(PORT, error =>{
    if (error) throw error
    console.log(`servidor escuchando en el puerto ${PORT}`)
})