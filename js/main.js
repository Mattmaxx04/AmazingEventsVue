const { createApp } = Vue;

createApp({
  data() {
    return {
      eventosFinal: [],
      bkpEventosFinal: [],
      urlApi: "https://amazing-events.herokuapp.com/api/events",
      evento: {},
      categorys: [],
      searcher: "",
      categoryCheck: [],
      estadisticas: {
        evento1: {},
        evento2: {},
        evento3: {},
        estadisticasUpcoming: {},
        estadisticasPast: {},
      },
      prueba: [],
    };
  },
  created() {
    this.traerDatos();
  },
  mounted() {
  },
  methods: {

    traerDatos() {
      fetch(this.urlApi)
        .then((response) => response.json())
        .then((data) => {
          this.eventosFinal = data.events;
          this.bkpEventosFinal = this.eventosFinal;
          let eventosUp = this.eventosFinal.filter(
            (event) => event.date >= data.currentDate
          );

          let eventosPast = this.eventosFinal.filter(
            (event) => event.date < data.currentDate
          );

          this.eventosFinal.forEach((evento) => {
            if (!this.categorys.includes(evento.category)) {
              this.categorys.push(evento.category);
            }
          });

          let eventHandL = this.eventosFinal
            .filter((evento) => evento.assistance)
            .sort((a, b) => {
              return (
                (parseInt(b.assistance) * 100) / parseInt(b.capacity) -
                (parseInt(a.assistance) * 100) / parseInt(a.capacity)
              );
            });

          let eventCapacity = this.eventosFinal.sort((a, b) => {
            return parseInt(b.capacity) - parseInt(a.capacity);
          });

          this.estadisticas.evento1 = eventHandL[0]
          this.estadisticas.evento2 = eventHandL[eventHandL.length - 1]
          this.estadisticas.evento3 = eventCapacity[0]
          let prueba = this.showTable(eventosPast)
          let prueba2 = this.showTable(eventosUp)
          console.log(prueba);
          console.log(prueba2);
          if (document.title == "Home") {
            this.eventosFinal;
          } else if (document.title == "Upcoming Events") {
            this.bkpEventosFinal = eventosUp;
            console.log(this.eventosFinal);
          } else if (document.title == "Past Events") {
            this.bkpEventosFinal = eventosPast;
            console.log(this.eventosFinal);
          } else if (document.title == "Details") {
            let id = new URLSearchParams(location.search).get("_id");
            this.evento = this.eventosFinal.find((events) => events._id == id);
          } else if (document.title == "Stats") {
          } else if (document.title == "Contact") {
            /*const contactForm = document.querySelector("#formulario");
          const enviarForm = (evento) => {
            evento.preventDefault();
            new swal("Thankyou!", "You message has been sent!", "success");
            document.forms[0][0].value = ""
            document.forms[0][1].value = ""
            document.forms[0][2].value = ""
          };
          contactForm.addEventListener("submit", enviarForm);*/
          }

        });
    },
    sacarRevenues(events) {
      let categoryStats = [];
      events.forEach((event) => categoryStats.push(event.category));
      let categoriaFiltrada = Array.from(new Set(categoryStats));
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
      console.log(revenues);
      return revenues;
    },
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
      console.log(this.eventHighest);
      return eventHighest;
    },showTable(events){
      let categoryStats = [];
      events.forEach((event) => categoryStats.push(event.category));
      let categoriaFiltrada = Array.from(new Set(categoryStats));
      let revenues = this.sacarRevenues(events);
      let eventHighest = this.highest(events);
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
    },
    
  },
  computed: {
    superFiltro() {
      let filtroTexto = this.bkpEventosFinal.filter(evento =>
        evento.name.toLowerCase().includes(this.searcher.toLowerCase())
      );
      let filtroChecks = filtroTexto.filter(evento =>
        this.categoryCheck.includes(evento.category)
      );
      if (this.categoryCheck.length > 0) {
        this.eventosFinal = filtroChecks;
      } else {
        this.eventosFinal = filtroTexto;
      }
    },
  },
}).mount("#app");
