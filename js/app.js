
// filtros select
const year = document.querySelector('#year');
const marca = document.querySelector('#marca');
const modelo = document.querySelector('#modelo');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// listado para pintar autos en html
const listado = document.querySelector('#resultado');

let anios = new Date().getFullYear();
const min = anios-10;
// console.log(min);

// se dispara cuando el DOM es cargado por completo
document.addEventListener('DOMContentLoaded',()=>{
   dibujarAutos(autos);
   listarYears();
});
// limpiar html

function limpiarHtml(){
    while(listado.firstChild){
        listado.removeChild(listado.firstChild);
    }
}

// capturamos todos los cambios en los selects
marca.addEventListener('change',(e)=>{
   let marc = e.target.value;
   filtros.marca = marc;
   filtrar();
});
year.addEventListener('change',(e)=>{
   let yer = e.target.value;
   filtros.year = yer;
   filtrar();
});
puertas.addEventListener('change',(e)=>{
   let puert = e.target.value;
   filtros.puertas = puert;
   filtrar();
});
transmision.addEventListener('change',(e)=>{
   let trans = e.target.value;
   filtros.transmision = trans;
   filtrar();
});
color.addEventListener('change',(e)=>{
   let col = e.target.value;
   filtros.color = col;
   filtrar();
});
maximo.addEventListener('change',(e)=>{
    let max = e.target.value;
    filtros.maxi = max;
   filtrar();
});
minimo.addEventListener('change',(e)=>{
    let mini = e.target.value;
    filtros.minii = mini;
   filtrar();
});

// filtros de busqueda
let filtros = {
    year : '',
    marca : '',
    modelo : '',
    minii : '',
    maxi : '',
    puertas : '',
    transmision : '',
    color : '',
}

// dibujar autos

function dibujarAutos(autos){
    limpiarHtml();
    if(autos.length){
        autos.forEach(auto =>{
            
            let {marca, modelo, year, precio, puertas, color, transmision} = auto;
    
            let p = document.createElement('p');
            p.textContent = `
                ${marca}, ${modelo}, ${year}, ${precio}, ${puertas}, ${color}, ${transmision}
            `;
            listado.appendChild(p);
        });
    }else{
        console.log('en else')
        let parrafo = document.createElement('p');
        parrafo.textContent= `
            Sin registros en la base de datos.
        `
        listado.appendChild(parrafo);
    }

}

// llenar select anios 
function listarYears(){
    for(let i = anios; i>= min; i--){
        let opcion = document.createElement('option');
        opcion.value =i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
};

// realiza los filters 
function filtrar(){
    let resultado = autos.filter(resultadoMarca).filter(resultadoYear).filter(resultadoPreciominio).filter(resultadoPreciomaximo).filter(resultadoPuertas).filter(resultadoColor).filter(resultadoTransmision);
    dibujarAutos(resultado);
};
// resultados de busqueda
function resultadoMarca(auto){
     let {marca} = filtros
    if(marca){
        return marca === auto.marca;
    }else{
       return auto;
    }
   
}
function resultadoYear(auto){
    let {year} = filtros;
    if(year){
        return year == auto.year
    }else{
        return auto;
    }
}
function resultadoPuertas(auto){
    let {puertas} = filtros;
    if(puertas){
        return puertas == auto.puertas
    }else{
        return auto;
    }
}
function resultadoTransmision(auto){
    let {transmision} = filtros;
    if(transmision){
        return transmision == auto.transmision
    }else{
        return auto;
    }
}
function resultadoColor(auto){
    let {color} = filtros;
    if(color){
        return color == auto.color
    }else{
        return auto;
    }
}
function resultadoPreciominio(auto){
    if(filtros.minii){
        return auto.precio >= filtros.minii;
    }
    return auto;
}
function resultadoPreciomaximo(auto){
    if(filtros.maxi){
        return auto.precio <= filtros.maxi;
    }
    return auto;
}