// Páginas locales («Mudanzas en …»): una por cada zona donde trabajamos.
// Cada una tiene su texto propio (nada de copiar y pegar cambiando el nombre: Google lo penaliza).
// Distancias por carretera desde nuestra base (Polígono Polirrosa, Huelva), aproximadas.
// Si añades una zona, escribe su texto de verdad y añádela a `cerca` de las vecinas.

export type Zona = {
  slug: string;
  nombre: string;
  donde: string;            // «en Lepe», «en el centro de Sevilla»…
  provincia: "Huelva" | "Sevilla";
  km: number;
  min: number;              // minutos aproximados en camión
  nucleos?: string[];       // núcleos y urbanizaciones que cubrimos dentro del municipio
  titulo: string;           // <title> (sin la marca)
  descripcion: string;      // meta description (≤ 160 caracteres)
  intro: string;
  notas: { t: string; p: string }[];
  faqs: { q: string; a: string }[];
  cerca: string[];          // slugs de zonas vecinas
};

export const ZONAS: Zona[] = [
  {
    slug: "huelva", nombre: "Huelva", donde: "en Huelva capital", provincia: "Huelva", km: 0, min: 0,
    nucleos: ["Centro", "Isla Chica", "El Molino de la Vega", "Los Rosales", "La Orden", "El Torrejón", "Pescadería", "Zafra", "Huerta Mena"],
    titulo: "Mudanzas en Huelva capital con presupuesto al momento",
    descripcion: "Empresa de mudanzas en Huelva capital: pisos, casas y portes con nuestro propio equipo. Desmontaje, embalaje y precio orientativo en 2 minutos.",
    intro: "Nuestra base está en el Polígono Polirrosa, así que en Huelva capital jugamos en casa: salimos de aquí cada mañana y conocemos bien los accesos de cada barrio, desde los pisos sin ascensor del centro hasta las urbanizaciones nuevas de El Molino de la Vega.",
    notas: [
      { t: "Centro y calles peatonales", p: "En el centro hay calles peatonales y zonas de carga y descarga con horario. Si el camión no puede llegar al portal, lo vemos antes contigo y, si hace falta, pedimos al Ayuntamiento la reserva de espacio para el día de la mudanza." },
      { t: "Pisos sin ascensor", p: "Muchos bloques de Isla Chica, La Orden o El Torrejón no tienen ascensor o lo tienen pequeño. Lo tenemos en cuenta en el presupuesto: más manos, mantas y correas para bajar sofás y frigoríficos por la escalera sin rozar paredes." },
      { t: "Mudanzas dentro de la ciudad", p: "Una mudanza dentro de Huelva se suele hacer en el día y con un solo viaje de camión. Si solo son unas cosas, hacemos portes en furgoneta." },
    ],
    faqs: [
      { q: "¿Hacéis mudanzas en el mismo día dentro de Huelva?", a: "Sí. Una mudanza de un piso dentro de la ciudad se hace normalmente en el día, cargando y descargando en un solo viaje. Reserva con una o dos semanas de antelación, sobre todo a final de mes." },
      { q: "¿Qué pasa si el camión no puede parar en mi calle?", a: "Lo hablamos antes. En calles estrechas o peatonales usamos la zona de carga más cercana o pedimos la reserva de espacio en el Ayuntamiento. En la calculadora puedes marcar en el mapa dónde puede parar el camión." },
      { q: "¿Hacéis portes pequeños por Huelva?", a: "Sí: un sofá, un electrodoméstico, recoger una compra o unas pocas cosas. En la calculadora elige «Unas cosas (porte)»." },
    ],
    cerca: ["aljaraque", "san-juan-del-puerto", "gibraleon", "palos-de-la-frontera", "punta-umbria"],
  },
  {
    slug: "aljaraque", nombre: "Aljaraque", donde: "en Aljaraque", provincia: "Huelva", km: 11, min: 15,
    nucleos: ["Aljaraque pueblo", "Corrales", "Bellavista", "Dehesa Golf"],
    titulo: "Mudanzas en Aljaraque, Corrales y Bellavista",
    descripcion: "Mudanzas en Aljaraque, Corrales y Bellavista desde Huelva, a 15 minutos. Chalets, adosados y pisos: desmontamos, embalamos y montamos.",
    intro: "Aljaraque es de las zonas donde más trabajamos: está a un cuarto de hora de nuestra base y mucha gente se muda de Huelva capital a Corrales, a Bellavista o a los adosados y chalets de la zona, o al revés.",
    notas: [
      { t: "Chalets y adosados", p: "En casas de dos plantas lo que más tiempo lleva son los armarios y las camas de los dormitorios de arriba. Los desmontamos, los bajamos protegidos y los dejamos montados en la casa nueva." },
      { t: "Huelva ↔ Aljaraque", p: "Es un trayecto corto: lo normal es hacer la mudanza en el día y en un solo viaje de camión, aunque sea una casa completa." },
      { t: "Jardín y trastero", p: "Si hay muebles de jardín, barbacoa o cosas del trastero, dínoslo en la calculadora o en las fotos: así llevamos el vehículo y el material justos." },
    ],
    faqs: [
      { q: "¿Trabajáis en Corrales y Bellavista?", a: "Sí, en todo el municipio de Aljaraque: el pueblo, Corrales, Bellavista y las urbanizaciones de alrededor." },
      { q: "¿Cuánto se tarda en una mudanza de Huelva a Aljaraque?", a: "Depende del volumen, pero al estar tan cerca casi siempre se hace en el día. La calculadora te dice las horas y personas que hacen falta para tu caso." },
      { q: "¿Desmontáis los armarios de un chalet?", a: "Sí. Desmontamos y montamos armarios, canapés y camas, y protegemos cada pieza con mantas y film." },
    ],
    cerca: ["huelva", "punta-umbria", "cartaya", "gibraleon"],
  },
  {
    slug: "punta-umbria", nombre: "Punta Umbría", donde: "en Punta Umbría", provincia: "Huelva", km: 21, min: 25,
    nucleos: ["Punta Umbría", "El Portil"],
    titulo: "Mudanzas en Punta Umbría y El Portil",
    descripcion: "Mudanzas y portes en Punta Umbría y El Portil: pisos, apartamentos de playa y segundas residencias. Presupuesto gratis y precio orientativo al momento.",
    intro: "En Punta Umbría muchas mudanzas son de apartamentos y segundas residencias: vaciar el piso de la playa, amueblarlo para el verano o mudarse a vivir todo el año. Son trabajos con mucho mueble pequeño, terrazas y, a veces, poco sitio para aparcar.",
    notas: [
      { t: "Mejor fuera de temporada", p: "En julio y agosto el tráfico y el aparcamiento lo complican todo. Si puedes elegir, la primavera y el otoño son mejores; si tiene que ser en verano, empezamos temprano." },
      { t: "Apartamentos y ascensores pequeños", p: "En muchos bloques de la playa el ascensor es pequeño. Lo que no cabe se baja por la escalera, protegido, y lo tenemos en cuenta en las horas del presupuesto." },
      { t: "Amueblar o vaciar el piso de la playa", p: "También hacemos portes: llevar unos muebles al apartamento, recoger una compra o vaciar lo que ya no usas." },
    ],
    faqs: [
      { q: "¿Hacéis mudanzas en verano en Punta Umbría?", a: "Sí, aunque recomendamos empezar a primera hora para evitar el tráfico y el calor. Reserva con tiempo: el verano se llena antes." },
      { q: "¿Llegáis a El Portil?", a: "Sí, trabajamos en Punta Umbría y El Portil, y en el resto de la costa de Huelva." },
      { q: "¿Podéis llevar solo unos muebles al apartamento?", a: "Claro. Para unas pocas cosas hacemos un porte en furgoneta. Elige «Unas cosas (porte)» en la calculadora." },
    ],
    cerca: ["aljaraque", "cartaya", "huelva"],
  },
  {
    slug: "cartaya", nombre: "Cartaya", donde: "en Cartaya", provincia: "Huelva", km: 27, min: 25,
    nucleos: ["Cartaya", "El Rompido", "Nuevo Portil"],
    titulo: "Mudanzas en Cartaya y El Rompido",
    descripcion: "Empresa de mudanzas para Cartaya, El Rompido y Nuevo Portil. Casas, pisos y portes con desmontaje y montaje. Calcula tu precio orientativo en 2 minutos.",
    intro: "Cartaya tiene dos caras: el pueblo, con casas de toda la vida y calles estrechas en el casco antiguo, y la costa de El Rompido y Nuevo Portil, con urbanizaciones y viviendas de vacaciones. Trabajamos en las dos.",
    notas: [
      { t: "Casco antiguo", p: "En las calles más estrechas del centro a veces no entra el camión de 20 m³. En ese caso vamos con furgoneta o acercamos los muebles desde la esquina, y lo tenemos previsto en el presupuesto." },
      { t: "El Rompido y Nuevo Portil", p: "Urbanizaciones con garajes y zonas comunes: dinos si hay acceso de vehículos y dónde podemos parar para cargar sin molestar a los vecinos." },
      { t: "Mudanzas por la costa", p: "Muchos clientes se mueven entre Cartaya, Lepe y Huelva. Son trayectos cortos que se hacen en el día." },
    ],
    faqs: [
      { q: "¿Hacéis mudanzas a El Rompido?", a: "Sí, a El Rompido, Nuevo Portil y el resto del término de Cartaya." },
      { q: "¿Y si mi calle es muy estrecha?", a: "Marca en el mapa de la calculadora dónde puede parar el camión. Si no entra, vamos con furgoneta o hacemos el último tramo a mano, y te lo decimos antes en el precio." },
      { q: "¿Montáis los muebles en la casa nueva?", a: "Sí: desmontamos y montamos armarios, canapés, camas y mesas." },
    ],
    cerca: ["lepe", "punta-umbria", "aljaraque", "isla-cristina"],
  },
  {
    slug: "lepe", nombre: "Lepe", donde: "en Lepe", provincia: "Huelva", km: 38, min: 35,
    nucleos: ["Lepe", "La Antilla", "Islantilla", "El Terrón"],
    titulo: "Mudanzas en Lepe, La Antilla e Islantilla",
    descripcion: "Mudanzas y portes en Lepe, La Antilla e Islantilla. Pisos, casas y apartamentos con nuestro propio equipo. Presupuesto gratis por WhatsApp.",
    intro: "En Lepe hacemos de todo: casas en el pueblo, apartamentos en La Antilla e Islantilla y mudanzas de gente que viene de Huelva o de Sevilla. Está a unos 35 minutos de nuestra base, así que lo organizamos para hacerlo en el día.",
    notas: [
      { t: "La Antilla e Islantilla", p: "Muchos apartamentos de playa: bloques con ascensores pequeños y mucho movimiento en verano. Mejor a primera hora o fuera de temporada." },
      { t: "Casas de pueblo", p: "Casas de dos plantas con escaleras estrechas: medimos antes los muebles grandes y, si hace falta, los desmontamos para sacarlos sin rozar." },
      { t: "Desde Huelva o Sevilla", p: "Si te mudas a Lepe desde Huelva capital o desde Sevilla, lo hacemos en un solo viaje siempre que el volumen quepa en el camión." },
    ],
    faqs: [
      { q: "¿Trabajáis en La Antilla e Islantilla?", a: "Sí, en todo el término de Lepe: el pueblo, La Antilla, Islantilla y El Terrón." },
      { q: "¿Cuánto cuesta una mudanza a Lepe?", a: "Depende del volumen, los pisos y los kilómetros. Con la calculadora de la web tienes un precio orientativo al momento y te lo confirmamos por WhatsApp." },
      { q: "¿Hacéis mudanzas de Sevilla a Lepe?", a: "Sí, es un trayecto que hacemos a menudo. Con un camión de 20 m³ cabe un piso completo de tamaño medio en un solo viaje." },
    ],
    cerca: ["cartaya", "isla-cristina", "ayamonte"],
  },
  {
    slug: "isla-cristina", nombre: "Isla Cristina", donde: "en Isla Cristina", provincia: "Huelva", km: 50, min: 45,
    nucleos: ["Isla Cristina", "Islantilla", "Pozo del Camino", "La Redondela"],
    titulo: "Mudanzas en Isla Cristina, Islantilla y La Redondela",
    descripcion: "Mudanzas en Isla Cristina, Islantilla, Pozo del Camino y La Redondela. Bajamos neveras y armarios por la escalera sin un rasguño. Presupuesto gratis.",
    intro: "Hace poco hicimos una mudanza en Isla Cristina con dos armarios que desmontar y una nevera que bajar por una escalera estrecha: el típico trabajo de la zona, donde muchas viviendas no tienen ascensor y hay que ir con cuidado.",
    notas: [
      { t: "Escaleras estrechas", p: "Para bajar frigoríficos y muebles pesados por escaleras estrechas vamos con correas, mantas y las manos suficientes. Si hay que desmontar puertas o tiradores, lo hacemos." },
      { t: "Armarios grandes", p: "Los armarios antiguos de madera maciza pesan mucho y hay que desmontarlos con cuidado para que encajen igual en la casa nueva." },
      { t: "Por toda la zona", p: "Cubrimos el casco urbano, Islantilla, Pozo del Camino y La Redondela, y las mudanzas hacia Lepe, Ayamonte o Huelva." },
    ],
    faqs: [
      { q: "¿Bajáis la nevera por la escalera?", a: "Sí, con correas y protegiéndola. Recuerda desconectarla y vaciarla al menos 12 horas antes para que se descongele." },
      { q: "¿Trabajáis en La Redondela y Pozo del Camino?", a: "Sí, en todo el término de Isla Cristina y en Islantilla." },
      { q: "¿Desmontáis armarios antiguos?", a: "Sí. Los desmontamos, protegemos cada pieza y los montamos en la casa nueva." },
    ],
    cerca: ["lepe", "ayamonte", "cartaya"],
  },
  {
    slug: "ayamonte", nombre: "Ayamonte", donde: "en Ayamonte", provincia: "Huelva", km: 54, min: 45,
    nucleos: ["Ayamonte", "Isla Canela", "Punta del Moral"],
    titulo: "Mudanzas en Ayamonte e Isla Canela",
    descripcion: "Empresa de mudanzas para Ayamonte, Isla Canela y Punta del Moral. Pisos, casas y portes desde Huelva. Calcula tu precio orientativo con fotos.",
    intro: "Ayamonte es el extremo de la costa de Huelva y de nuestras rutas habituales: el centro histórico, con calles en cuesta y estrechas, y las urbanizaciones de Isla Canela y Punta del Moral, con muchos apartamentos.",
    notas: [
      { t: "Centro con cuestas", p: "En el casco antiguo hay calles estrechas y en pendiente. Vemos antes dónde puede parar el camión y, si no llega, usamos la furgoneta para el tramo final." },
      { t: "Isla Canela y Punta del Moral", p: "Apartamentos y adosados de vacaciones: mudanzas de segunda residencia, amueblar para el verano o vaciar para vender." },
      { t: "Organizado para hacerlo en el día", p: "Al estar a unos 45 minutos, salimos temprano y planificamos la carga para hacer la mudanza en un solo viaje siempre que el volumen lo permita." },
    ],
    faqs: [
      { q: "¿Hacéis mudanzas a Isla Canela?", a: "Sí, a Isla Canela, Punta del Moral y todo Ayamonte." },
      { q: "¿Cobráis el desplazamiento desde Huelva?", a: "El precio incluye los kilómetros del trabajo. La calculadora los calcula con la ruta real y te da el precio orientativo con todo incluido." },
      { q: "¿Con cuánta antelación tengo que reservar?", a: "Lo ideal es de una a tres semanas; en verano y a final de mes, cuanto antes mejor." },
    ],
    cerca: ["isla-cristina", "lepe"],
  },
  {
    slug: "moguer", nombre: "Moguer", donde: "en Moguer", provincia: "Huelva", km: 19, min: 20,
    nucleos: ["Moguer", "Mazagón"],
    titulo: "Mudanzas en Moguer y Mazagón",
    descripcion: "Mudanzas y portes en Moguer y Mazagón desde Huelva, a 20 minutos. Casas de pueblo, pisos y chalets, con desmontaje y embalaje. Presupuesto gratis.",
    intro: "Moguer está a veinte minutos de Huelva y es un destino habitual de las mudanzas que hacemos: casas de pueblo encaladas en el centro, pisos más nuevos en las afueras y la costa de Mazagón, que comparte término con Palos.",
    notas: [
      { t: "Casas de pueblo", p: "Muchas tienen patio y escalera estrecha a la planta de arriba. Desmontamos lo que no pase y protegemos marcos y paredes." },
      { t: "Calles del centro", p: "En el centro histórico el camión no siempre puede parar en la puerta; lo vemos antes y lo marcamos en el presupuesto." },
      { t: "Huelva ↔ Moguer", p: "Trayecto corto: una mudanza de un piso se hace en el día y en un solo viaje." },
    ],
    faqs: [
      { q: "¿Trabajáis en Mazagón?", a: "Sí, tanto en la parte de Moguer como en la de Palos de la Frontera." },
      { q: "¿Hacéis portes de un solo mueble a Moguer?", a: "Sí. Para unas pocas cosas usamos la furgoneta: elige «Unas cosas (porte)» en la calculadora." },
      { q: "¿Embaláis vosotros?", a: "Como prefieras: lo embalamos todo, solo lo frágil (vajilla, cristalería, cuadros) o lo embalas tú." },
    ],
    cerca: ["palos-de-la-frontera", "mazagon", "san-juan-del-puerto", "huelva"],
  },
  {
    slug: "palos-de-la-frontera", nombre: "Palos de la Frontera", donde: "en Palos de la Frontera", provincia: "Huelva", km: 13, min: 15,
    nucleos: ["Palos de la Frontera", "La Rábida", "Mazagón"],
    titulo: "Mudanzas en Palos de la Frontera y La Rábida",
    descripcion: "Mudanzas en Palos de la Frontera, La Rábida y Mazagón, a 15 minutos de Huelva. Pisos, casas y portes con nuestro propio equipo.",
    intro: "Palos está prácticamente al lado de Huelva, cruzando el puente. Hacemos mudanzas en el pueblo, en La Rábida y en la parte de Mazagón que pertenece a Palos, y portes para quien solo necesita mover unas cosas.",
    notas: [
      { t: "Muy cerca de nuestra base", p: "Al estar a un cuarto de hora, son mudanzas que se hacen en el día y en las que el trayecto apenas suma tiempo." },
      { t: "Pisos y casas nuevas", p: "En las zonas nuevas hay garajes y ascensores amplios; en el centro, casas de dos plantas. En las fotos de la calculadora vemos qué toca." },
      { t: "Portes", p: "Para un electrodoméstico, un sofá o unas cajas, vamos con furgoneta." },
    ],
    faqs: [
      { q: "¿Trabajáis en La Rábida?", a: "Sí, en todo el término de Palos de la Frontera, incluida La Rábida y la parte de Mazagón." },
      { q: "¿Cuánto tardáis en una mudanza de Huelva a Palos?", a: "Casi siempre se hace en una jornada. La calculadora te da las horas y el equipo para tu caso." },
      { q: "¿Puedo pedir el presupuesto por WhatsApp?", a: "Sí: manda fotos de lo que hay que llevar y las dos direcciones al 659 71 52 71." },
    ],
    cerca: ["moguer", "mazagon", "huelva", "san-juan-del-puerto"],
  },
  {
    slug: "san-juan-del-puerto", nombre: "San Juan del Puerto", donde: "en San Juan del Puerto", provincia: "Huelva", km: 13, min: 15,
    titulo: "Mudanzas en San Juan del Puerto",
    descripcion: "Mudanzas y portes en San Juan del Puerto, a 15 minutos de Huelva. Desmontaje, embalaje y montaje. Precio orientativo al momento con la calculadora.",
    intro: "San Juan del Puerto está a quince minutos de nuestra base por la A-49 y cada vez más gente se muda aquí desde Huelva buscando casa más grande. Hacemos mudanzas completas y portes en el pueblo y en las urbanizaciones nuevas.",
    notas: [
      { t: "De piso a casa", p: "Muchas mudanzas son de un piso de Huelva a una casa en San Juan: más metros, más muebles que montar. Lo desmontamos todo y lo dejamos montado." },
      { t: "Urbanizaciones nuevas", p: "Calles amplias donde el camión suele poder parar en la puerta, lo que acorta mucho la mudanza." },
      { t: "Hacia el Condado", p: "También hacemos trayectos hacia Niebla, La Palma del Condado o Sevilla por la A-49." },
    ],
    faqs: [
      { q: "¿Hacéis mudanzas de Huelva a San Juan del Puerto?", a: "Sí, es un trayecto corto que se hace en el día y en un solo viaje." },
      { q: "¿Montáis los muebles nuevos?", a: "Desmontamos y montamos los muebles que llevamos de tu casa. Si es un mueble nuevo de tienda, pregúntanos por WhatsApp." },
      { q: "¿El presupuesto es gratis?", a: "Sí, gratis y sin compromiso. Con la calculadora tienes un precio orientativo al momento." },
    ],
    cerca: ["huelva", "moguer", "gibraleon", "palos-de-la-frontera"],
  },
  {
    slug: "gibraleon", nombre: "Gibraleón", donde: "en Gibraleón", provincia: "Huelva", km: 17, min: 20,
    titulo: "Mudanzas en Gibraleón",
    descripcion: "Empresa de mudanzas en Gibraleón, a 20 minutos de Huelva. Casas, pisos y portes con desmontaje y montaje. Presupuesto gratis por WhatsApp.",
    intro: "Gibraleón está a veinte minutos al norte de Huelva. Trabajamos en el pueblo y en las casas de las afueras, con mudanzas que suelen ir o venir de Huelva capital y portes de muebles y electrodomésticos.",
    notas: [
      { t: "Casas de dos plantas", p: "Las escaleras de muchas casas del pueblo son estrechas: desmontamos camas y armarios para bajarlos sin dañar nada." },
      { t: "Cerca de todo", p: "Desde aquí llegamos rápido a Huelva, Aljaraque o San Juan del Puerto, así que la mudanza se hace en el día." },
      { t: "Portes", p: "Un sofá, una lavadora o la compra de una tienda de Huelva: lo llevamos en furgoneta." },
    ],
    faqs: [
      { q: "¿Hacéis portes a Gibraleón?", a: "Sí. Para unas pocas cosas usamos la furgoneta. Elige «Unas cosas (porte)» en la calculadora." },
      { q: "¿Qué datos necesitáis para el presupuesto?", a: "Fotos de lo que hay que llevar, las dos direcciones, el piso, si hay ascensor y si el camión puede parar en la puerta. La calculadora te lo pide paso a paso." },
      { q: "¿Trabajáis los sábados?", a: "Consúltanos por WhatsApp la fecha que te viene bien y te decimos si la tenemos libre." },
    ],
    cerca: ["huelva", "aljaraque", "san-juan-del-puerto"],
  },
  {
    slug: "mazagon", nombre: "Mazagón", donde: "en Mazagón", provincia: "Huelva", km: 23, min: 25,
    titulo: "Mudanzas en Mazagón",
    descripcion: "Mudanzas y portes en Mazagón (Moguer y Palos): casas, chalets y apartamentos de playa. Presupuesto gratis y precio orientativo en 2 minutos.",
    intro: "Mazagón es costa de Huelva repartida entre Moguer y Palos de la Frontera: chalets entre pinos, apartamentos cerca de la playa y mucha vivienda de vacaciones. Llegamos en unos 25 minutos.",
    notas: [
      { t: "Chalets y parcelas", p: "Si la casa está dentro de una parcela o al final de un camino, dinos por dónde se entra: así sabemos si va el camión o la furgoneta." },
      { t: "Segunda residencia", p: "Amueblar la casa de la playa, vaciarla para venderla o mudarse a vivir todo el año: hacemos las tres cosas." },
      { t: "Verano", p: "En julio y agosto mejor a primera hora. Fuera de temporada es más fácil aparcar y cargar." },
    ],
    faqs: [
      { q: "¿Trabajáis en toda Mazagón?", a: "Sí, en la parte de Moguer y en la de Palos de la Frontera." },
      { q: "¿Podéis vaciar una casa de la playa?", a: "Sí, llevamos los muebles a tu otra vivienda o donde nos digas. Si hay algo para tirar, coméntalo antes." },
      { q: "¿Cómo pido el presupuesto?", a: "Con la calculadora de la web (fotos y direcciones) o por WhatsApp al 659 71 52 71." },
    ],
    cerca: ["moguer", "palos-de-la-frontera", "huelva"],
  },
  {
    slug: "sevilla", nombre: "Sevilla", donde: "en Sevilla y de Huelva a Sevilla", provincia: "Sevilla", km: 94, min: 70,
    titulo: "Mudanzas Huelva–Sevilla y en Sevilla",
    descripcion: "Mudanzas de Huelva a Sevilla y dentro de Sevilla con camión de 20 m³: piso completo en un solo viaje. Desmontaje, embalaje y presupuesto gratis.",
    intro: "Huelva–Sevilla es uno de los trayectos que más repetimos: gente que se va a trabajar o a estudiar a Sevilla, o que vuelve a Huelva. Con el camión de 20 m³ un piso de tamaño medio cabe en un solo viaje por la A-49, así que se hace en el día.",
    notas: [
      { t: "Casco antiguo de Sevilla", p: "En el centro hay calles donde no entra un camión grande y zonas con acceso restringido. Lo vemos antes: vamos con furgoneta o pedimos la autorización para ocupar la vía el día de la mudanza." },
      { t: "Pisos de estudiantes", p: "Mudanzas pequeñas de un piso compartido o una habitación: un porte en furgoneta suele bastar." },
      { t: "Un solo viaje", p: "Planificamos la carga para que todo vaya en un viaje: menos kilómetros y menos horas en el presupuesto." },
    ],
    faqs: [
      { q: "¿Cuánto se tarda en una mudanza de Huelva a Sevilla?", a: "Son unos 70 minutos de trayecto. Una mudanza de un piso completo se hace normalmente en una jornada." },
      { q: "¿Hacéis mudanzas dentro de Sevilla?", a: "Sí, sobre todo cuando uno de los dos extremos está en Huelva o en la zona entre las dos provincias. Consúltanos por WhatsApp." },
      { q: "¿Necesito un permiso para el camión en Sevilla?", a: "En algunas calles sí. Si es tu caso, te avisamos y lo gestionamos contigo antes del día." },
    ],
    cerca: ["huelva", "san-juan-del-puerto", "lepe"],
  },
];

export const zona = (slug: string) => ZONAS.find((z) => z.slug === slug);
