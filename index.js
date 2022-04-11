const pintarProductos = (data = {}) => {
  //console.log(data);
  const template = document.querySelector("#template-portfolio").content;
  const contenedor = document.querySelector(".contenedor-de-contenido");
  const fragment = document.createDocumentFragment();
  // console.log(template)
  //data.forEach((producto = {}) => {
  // console.log(producto);
  template.querySelector(".portfolio-img").setAttribute("src", producto.image);
  template.querySelector(".card-title").textContent = producto.title;
  // template.querySelector("p span").textContent = producto.price;
  //template.querySelector("button").dataset.id = producto.id;
  const clone = template.cloneNode(true);
  fragment.appendChild(clone);
  //});
  contenedor.appendChild(fragment);
};

function addWorkCard(params = {}) {
  const template = document.querySelector("#template-portfolio");
  const contenedor = document.querySelector(".contenedor-de-contenido");
  template.content.querySelector(".card-title").textContent = params.title;
  template.content.querySelector(".portfolio-img").src = params.image;
  template.content.querySelector(".card-text").textContent = params.descripcion;
  template.content.querySelector(".card-link").href = params.url;

  const clone = document.importNode(template.content, true);
  contenedor.appendChild(clone);
}

function getWorks() {
  return fetch(
    "https://cdn.contentful.com/spaces/b8btg7kqes7l/environments/master/entries?access_token=urZv1ThIopPc-FIwI4vTFL-EP0jIWojllDZ2FZgh6jI&&content_type=work"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const fieldsCollections = data.items.map((item) => {
        const imgId = item.fields.imagen.sys.id;
        const img = getImgW(imgId, data);
        return {
          title: item.fields.titulo,
          descripcion: item.fields.descripcion,
          url: item.fields.url,
          image: img.fields.file.url,
        };
      });
      return fieldsCollections;
    });
}

function getImgW(id, data) {
  return data.includes.Asset.find((i) => {
    return i.sys.id == id;
  });
}

function main() {
  getWorks().then((works) => {
    for (const w of works) {
      addWorkCard(w);
    }
  });
}

//pintarProductos();
//   addWorkCard({
//     title: "Standing here i realize",
//     image: "",
//     descripcion: "Metal gear REVENGEANCE",
//     url: "https://www.youtube.com/watch?v=G02qV_plM7k",
//   });
//   addWorkCard({
//     title: "GAMBARREMBO",
//     url: "https://www.youtube.com/watch?v=JDWIbLH74A8",
//   });

//}

main();
