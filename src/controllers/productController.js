
const navHtmlUser = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clothes Website Dashboard</title>
    <link rel="stylesheet" href="../styles.css">
    </head>
    <body>
    <header>
    <h1>VENTA ROPA </h1>
    </header>
    <nav>
    <ul>
     <li><a href="/products">Todos</a></li>
    <li><a href="/products/Accesorios">Accesorios</a></li>
    <li><a href="/products/Camisetas">Camisetas</a></li>
    <li><a href="/products/Pantalones">Pantalones</a></li>
    <li><a href="/products/Zapatos">Zapatos</a></li>
    <li><a href="#">Log in</a></li>
    </ul>
    </nav>`


const navHtmlAdmin = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clothes Website Dashboard</title>
    <link rel="stylesheet" href="../styles.css">
    </head>
    <body>
    <header>
    <h1>VENTA ROPA </h1>
    </header>
    <nav>
    <ul>
    <li><a href="/products">Todos</a></li>
    <li><a href="/products/Accesorios">Accesorios</a></li>
    <li><a href="/products/Camisetas">Camisetas</a></li>
    <li><a href="/products/Pantalones">Pantalones</a></li>
    <li><a href="/products/Zapatos">Zapatos</a></li>
    <li><a href="#">Log in</a></li>
    <li><a href="/dashboard/new"><mark>Añadir NUEVO producto</mark></a></li>
    </ul>
    </nav>`


const mainInitialHtlm = `<main id="products-card"> `
const mainFinalHtlm = `</main>`

const footerHtml = `
    <footer>
    <p>&copy; 2022 Clothes Website. All rights reserved.</p>
    </footer>
    </body>
    </html>`

function showProductUser(products) {
    let html = '';
    for (let product of products) {
        html += `
            <div class="product-card">
              <img src="${product.image}" alt="${product.name}">
              <h2>${product.name}</h2>
              <p>${product.description}</p>
              <p>${product.price}€</p>
              <a href="/products/${product._id}">Ver detalle</a>
            </div>
          `;
    }

    return html;


}



function showProductAdmin(products) {
    let html = '';
    for (let product of products) {
        html += `
            <div class="product-card">
              <img src="${product.image}" alt="${product.name}">
              <h2>${product.name}</h2>
              <p>${product.description}</p>
              <p>${product.price}€</p>
              <form action="/dashboard/${product._id}/delete" method ="post">
              <input type="submit" value="Eliminar producto" class="deleteButton">
              </form>
              <a href="/dashboard/${product._id}">Ver detalle</a>
              <a href="/dashboard/${product._id}/edit"><mark>Editar producto</mark></a>
            </div>
          `;
    }

    return html;


}











function showProductById(product) {


    return (
        `  <div class="productId-card">
              <img src="${product.image}" alt="${product.name}">
              <h2>${product.name}</h2>
              <p>${product.description}</p>
              <p>${product.size}</p>

              <p>${product.price}€</p>
              <a href="/products">Volver a todos los productos</a>
            </div>
          `
    )
}





function showProductByIdAdmin(product) {


    return (
        `  <div class="productId-card">
              <img src="${product.image}" alt="${product.name}">
              <h2>${product.name}</h2>
              <p>${product.description}</p>
              <p>${product.size}</p>
              <p>${product.price}€</p>
              <a href="/dashboard">Volver a todos los productos</a>
            </div>
          `
    )
}




function formProduct(url, name, description, image, category, size, price) {

    return (
        `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clothes Website Dashboard</title>
    <link rel="stylesheet" href="../styles.css">
    </head>

    <form action=${url} method ="post">
    <label for="name" >Nombre:</label>
    <input type="text" id="name" name="name" value=${name}><br><br>

    <label for="description" >Descripción:</label>
    <textarea id="description" name="description" >${description}</textarea><br><br>

    <label for="image" >Imagen:</label>
    <input type="url" id="image" name="image" value=${image}><br><br>

    <label for="category">Categoría:</label>
    <select id="category" name="category" >
        <option >Acccesorios</option>
        <option >Camisetas</option>
         <option >Pantalones</option>
         <option >Zapatos</option>
         <option selected disable hidden>${category}</option>

         
         

    </select><br><br>
    

    <label for="size">Talla:</label>
    <select  id="size" name="size" >
        <option >XS</option>
        <option >S</option>
         <option >M</option>
         <option >L</option>
         <option >XL</option>
         <option selected disable hidden>${size}</option>
         
         
    </select><br><br>


    <label for="price">Precio:</label>
    <input type="number" id="price" name="price" step="any" value=${Number(price)}><br><br>

    
    <input type="submit" value="Submit">
    <a href='/dashboard'>Volver a todos los productos</a>
</form>
</htlm>

`)

};











module.exports = { formProduct, showProductUser, showProductAdmin, showProductById, showProductByIdAdmin, footerHtml, navHtmlUser, navHtmlAdmin, mainInitialHtlm, mainFinalHtlm }