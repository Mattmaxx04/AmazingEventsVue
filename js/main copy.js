/*-------------------btn to top-----------------*/
const toTop = document.querySelector(".btnup");
let tableTwo = document.getElementById("table2");
let tableThree = document.getElementById("table3");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
});
/*-------------------pintar cards-----------------*/



/*-------------------pintar on page-----------------*/
function traerDatos(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      eventosFinal = data.events;
      eventosUp = eventosFinal.filter(
        (event) => event.date >= data.currentDate
      );
      eventosPast = eventosFinal.filter(
        (event) => event.date < data.currentDate
      );
      if (document.title == "Home") {
        searcher.addEventListener("keyup", () => {
          superFiltro();
        });
        switches.addEventListener("click", () => {
          superFiltro();
        });
        eventosFinal = data.events;
      } else if (document.title == "Upcoming Events") {
        searcher.addEventListener("keyup", () => {
          superFiltro();
        });
        switches.addEventListener("click", () => {
          superFiltro();
        });
        eventosFinal = eventosUp;
      } else if (document.title == "Past Events") {
        searcher.addEventListener("keyup", () => {
          superFiltro();
        });
        switches.addEventListener("click", () => {
          superFiltro();
        });
        eventosFinal = eventosPast;
      } else if (document.title == "Details") {
        let parametrosUrl = location.search;
        let parametros = new URLSearchParams(parametrosUrl);
        let id = parametros.get("_id");
        let eventoFiltrado = eventosFinal.filter((events) => {
          return events._id;
        });
        let eventoEncontrado = eventoFiltrado.find(
          (events) => events._id == id
        );
        showCard(eventoEncontrado);
      } else if (document.title == "Stats") {
        /* showTableOne(eventosFinal);
         showTable(eventosUp, tableTwo);
         showTable(eventosPast, tableThree);*/
      } else if (document.title == "Contact") {
        const contactForm = document.querySelector("#formulario");
        const enviarForm = (evento) => {
          evento.preventDefault();
          new swal("Thankyou!", "You message has been sent!", "success");
          document.forms[0][0].value = ""
          document.forms[0][1].value = ""
          document.forms[0][2].value = ""
        };
        contactForm.addEventListener("submit", enviarForm);
      }
      pintarChecks(eventosFinal);
      pintarCards(eventosFinal);
    });
}

/*-------------------funcion de busqueda-----------------*/
/*
let searcher = document.getElementById("searchbox");



function search(events) {
  let palabras = searcher.value.toLowerCase();
  let eventoFiltrado = [];
  events.filter(events => {
    if (events.name.toLowerCase().includes(palabras)) {
      eventoFiltrado.push(events);
    }
  });

  return eventoFiltrado;
}

/*-------------------mostrar checkbox por categoria-----------------*/
/*
let categorys = [];
let checks = document.getElementById("checks");

function pintarChecks(events) {
  events.forEach((category) => {
    if (!categorys.includes(category.category)) {
      categorys.push(category.category);
    }
  });
  categorys.forEach((category) => {
    let check = document.createElement("div");
    check.className = `form-check form-switch d-flex flex-wrap`;
    check.innerHTML = `<input class="form-check-input" type="checkbox" role="switch" 
    id="${category.replace(" ", "-")}" value="${category.replace(" ", "-")}" 
    value="${category.replace(" ", "-")}">
    <label class="form-check-label" for="${category.replace(
      " ",
      "-"
    )}"> <h4>${category}</h4> </label>`;
    checks.prepend(check);
  });
}*/

/*-------------------filtro por checkbox-----------------*/
/*
let switches = document.querySelector("form");
function filtrarPorCategoria(events) {
  let checkBoxes = document.querySelectorAll('input[type="checkbox"]');
  let arrayCheckBoxes = Array.from(checkBoxes);
  let inputCheckers = arrayCheckBoxes.filter((checkBox) => checkBox.checked);
  let valueCheckers = inputCheckers.map((input) => input.value);
  let filtro = [];
  events.filter((event) => {
    valueCheckers.forEach((category) => {
      if (category == event.category.replace(" ", "-")) {
        filtro.push(event);
      }
    });
  });
  if (!filtro.length) {
    filtro = events;
  }
  return filtro;
}
*/
/*if (!filtroChecks.length) {
        this.eventosFinal = this.bkpEventosFinal
      }else{
        this.eventosFinal = filtroTexto
      }*/
/*-------------------Funcion super filtro-----------------*//*
function superFiltro() {
  let filtroCategoria = filtrarPorCategoria(eventosFinal);
  let filtradoTexto = search(filtroCategoria);

  pintarCards(filtradoTexto);
}*/

/*--------------Funcion show card details-----------------*/
/*
function showCard(events) {
  let people = assistanceOrEstimate();

  function assistanceOrEstimate() {
    if (events.assistance == undefined) {
      return `Estimate: ${events.estimate}`;
    } else {
      return `Assistance: ${events.assistance}`;
    }
  }
  let container = document.getElementById("details");
  container.innerHTML = "";
  let div = document.createElement("div");
  div.className = "card";
  div.style.maxwidth = "80%";
  div.style.minHeight = "20rem";
  div.style.padding = "0.5rem";
  div.innerHTML = `<div class="detail__card">
    <div class="col-md-6">
      <img src="${events.image}" class="img-fluid detail__image" alt="eventimage">
    </div>
    <div class="col-md-6">
      <div class="card-body">
        <h5 class="card-title"> ${events.name}</h5>
        <p class="card-text detail__p"> ${events.description}</p>
        <p class="card-text detail__p">Date: ${events.date}</p>
        <p class="card-text detail__p">Place: ${events.place}</p>
        <p class="card-text detail__p">Capacity: ${events.capacity}</p>
        <p class="card-text detail__p">${people}</p>
        <h4 class="price">Price: $${events.price}</p>
      </div>
    </div>
  </div>`;
  container.appendChild(div);
}*/

/*--------------FuncTionS table ONE-----------------*/

/*--------------Function highest all-----------------*/
  function showTableOne(event) {
    let eventHandL= event
      .filter((evento) => evento.assistance)
      .sort((a, b) => {
        return (
          (parseInt(b.assistance) * 100) / parseInt(b.capacity) -
          (parseInt(a.assistance) * 100) / parseInt(a.capacity)
        );
      });
    let eventCapacity = event.sort((a, b) => {
        return parseInt(b.capacity) - parseInt(a.capacity);
      });
    let highestElement = [eventHandL[0],eventHandL[eventHandL.length-1]];
    let largerCapacityElement = eventCapacity[0];
    let evento = { highestElement, largerCapacityElement };
    return evento  
  }
/*--------------Function showtableone-----------------*/
/*function showTableOne(event) {
  
  let table = document.getElementById("table1");
  table.innerHTML = "";
  let tableBody = document.createElement("table");
  table.className = "table";
  tableBody.innerHTML = `
  
  <thead>
  <tr>
    <th scope="col">Event with the highest percentage of attendance</th>
 
    <th scope="col">Event with the lowest percentage of attendance</th>
  
    <th scope="col">Event with larger capacity</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>
    <a href="./details.html?_id=${highestElement[1]}" class="btn btn-primary">${highestElement[0]}</a>
    </td>
    <td>
    <a href="./details.html?_id=${lowestElement[1]}" class="btn btn-primary">${lowestElement[0]}</a>
    </td>
    <td>
    <a href="./details.html?_id=${largerCapacityElement[1]}" class="btn btn-primary">${largerCapacityElement[0]}</a>
    </td>    
  </tr>            
</tbody>
</table>
  `;
  table.appendChild(tableBody);
}
/*--------------FuncTionS table 2 and 3-----------------*/
/*----------filtrar categorias------------------*//*
function filtroCategorias(events) {
  let categoryStats = [];
  events.forEach((event) => categoryStats.push(event.category));
  let unificados = Array.from(new Set(categoryStats));
  return unificados;
}
/*----------sacar revenues up------------------*//*
function sacarRevenues(events) {
  let categoriaFiltrada = filtroCategorias(events);
  let revenues = [];
  categoriaFiltrada.forEach((category) => {
    let filtrados = events
      .filter((evento) => evento.category == category)
      .map((event) => (event.estimate || event.assistance) * event.price)
      .reduce((precio1, precio2) => {
        return precio1 + precio2;
      });
    revenues.push(filtrados);
  });
  return revenues;
}

/*----------sacar highest percentage------------------*//*
function highest(events) {
  let categoriaFiltrada = filtroCategorias(events);
  let eventHighest = [];
  categoriaFiltrada.forEach((category) => {
    let filtrados = events.filter((evento) => evento.category == category);
    /*funca hasta aca*/
/*
let nuevo = filtrados.map(
  (event) =>
    (parseInt(event.estimate || event.assistance) * 100) /
    parseInt(event.capacity) /
    filtrados.length
);

let otro = nuevo.reduce((precio1, precio2) => {
  return precio1 + precio2;
});

eventHighest.push(otro.toFixed(2));
});
return eventHighest;
}

function juntarArrays(events) {
let categoriaFiltrada = filtroCategorias(events);
let revenues = sacarRevenues(events);
let eventHighest = highest(events);
let arrayFusionado = [];
categoriaFiltrada.forEach((events, i=categoriaFiltrada.length,categoriaFiltrada)=>{
arrayFusionado[i] = {
  category: categoriaFiltrada[i],
  revenue: revenues[i],
  percentage: eventHighest[i],
};
}) 
return arrayFusionado;
}

function showTable(events, container) {
let arrayFinal = juntarArrays(events);
console.log(arrayFinal);
arrayFinal.forEach((eventos) => {
let tr = document.createElement("tr");
tr.className = "tg";
tr.innerHTML = `  a
<td><q>${eventos.category}</q></td>
<td>$${eventos.revenue.toLocaleString()}</td>
<td>%${eventos.percentage}</td>
`;
container.appendChild(tr);
});
}*/

/*pasar a main*/
/*
      highest(events) {
        let categoryStats = [];
        events.forEach((event) => categoryStats.push(event.category));
        let categoriaFiltrada = Array.from(new Set(categoryStats));
        let eventHighest = [];
        categoriaFiltrada.forEach((category) => {
          let filtrados = events.filter((evento) => evento.category == category);
        
          let nuevo = filtrados.map(
            (event) =>
              (parseInt(event.estimate || event.assistance) * 100) /
              parseInt(event.capacity) /
              filtrados.length
          ).reduce((precio1, precio2) => {
            return precio1 + precio2;
          });
      
          eventHighest.push(nuevo.toFixed(2));
        });
        return eventHighest;
      },
      showTable(events){
        let categoryStats = [];
        events.forEach((event) => categoryStats.push(event.category));
        let categoriaFiltrada = Array.from(new Set(categoryStats));
        let revenues = sacarRevenues(events);
        let eventHighest = highest(events);
        let arrayFusionado = [];
        categoriaFiltrada.forEach(
          (events, i = categoriaFiltrada.length, categoriaFiltrada) => {
            arrayFusionado[i] = {
              category: categoriaFiltrada[i],
              revenue: revenues[i],
              percentage: eventHighest[i],
            };
          }
        )
      }*/
