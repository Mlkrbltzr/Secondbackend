import {promises as fs} from "fs"
import { json } from "stream/consumers";

class ProductManager {
    constructor(){
        this.patch = "./productos.text";
        this.products = []
    }
    static id = 0
    addProduct = async (title, description, price, imagen, code, stock) => {
        ProductManager.id++

        let newProduct ={
            title,
            description,
            price,
            imagen,
            code,
            stock,
            id: ProductManager.id
        };
        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products));
    };
    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)

    };

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
       

    };
    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
       if(!respuesta3.find(product => product.id ===id)){
        console.log("Producto no Encontrado")
       } else {
        console.log(respuesta3.find(product => product.id ===id))
       }
        
    };
    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id)
      await fs.writeFile(this.patch, JSON.stringify(productFilter));
      console.log("Producto Eliminado");

    };
    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductsById(id);
        let productOld = await this.readProducts()
        let productsModif = [{ ...producto, id}, ...productOld];
        await fs.writeFile(this.patch, JSON.stringify(productsModif));

       

        

    };

    
    }


const productos = new ProductManager ();
/*productos.addProduct("Titulo1","description", "2000", "image1", "abc123", "100")
productos.addProduct("Titulo2","description2", "3000", "image2", "abc1234", "50")*/

//productos.getProducts()
//productos.getProductsById(4)
//productos.deleteProductsById(2)
productos.updateProducts({
    title: 'Titulo1',
    description: 'description',
    price: '4500',
    imagen: 'image1',
    code: 'abc123',
    stock: '100',
    id: 1
})



