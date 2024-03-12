let listaCiudadanos = [];

const load = async (url) => {
    try {
        lista = [];
        const respuesta = await fetch(`http://localhost:3000/${url}`);

        if (!respuesta.ok) {
            throw new Error(`Error al cargar ${url}. Estado: ` + respuesta.status);
        }
        const listaJson = await respuesta.json();
        lista.push(...listaJson);
        return lista;
    } catch (error) {
        console.error(`Error al cargar ${url}`, error.message);
    }
}


const guardarCiudadano = async (nuevoCiudadano) => {
    try {
        const respuesta = await fetch('http://localhost:3000/ciudadanos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoCiudadano),
        });

        if (!respuesta.ok) {
            throw new Error('Error al crear el ciudadano. Estado: ' + respuesta.status);
        }
        const ciudadanoCreado = await respuesta.json();
        console.log('Ciudadano creado:', ciudadanoCreado);
    } catch (error) {
        console.error("Error al crear ciudadano", error.message);
    }
}

const cargarFormularioCiudadanos = () => {
    const ciudadanosForm = document.getElementById('ciudadanos-crear');
    ciudadanosForm.innerHTML = `
        <form>
            <label for="nombreCiudadano">Nombre del Ciudadano:</label>
            <input type="text" id="nombreCiudadano" required>
            <label for="direccionCiudadano">Dirección:</label>
            <input type="text" id="direccionCiudadano" required>
            <label for="celularCiudadano">Celular:</label>
            <input type="text" id="celularCiudadano" required>
            <label for="codigoADNCiudadano">Código ADN:</label>
            <input type="text" id="codigoADNCiudadano" required>
            <button type="button" onclick="crearCiudadano()">Crear Ciudadano</button>
            <button type="button" onclick="mostrarListadoCiudadanos()">Ver Listado de Ciudadanos</button>
        </form>
    `;
    const listadoCiudadanos = document.getElementById('listado-ciudadanos');
}

const crearCiudadano = async () => {
    const nombreInput = document.getElementById('nombreCiudadano').value;
    const direccionInput = document.getElementById('direccionCiudadano').value;
    const celularInput = document.getElementById('celularCiudadano').value;
    const codigoADNInput = document.getElementById('codigoADNCiudadano').value;

    const nuevoCiudadano = {
        nombre_completo: nombreInput,
        direccion: direccionInput,
        celular: celularInput,
        codigo_adn: codigoADNInput
    };

    await guardarCiudadano(nuevoCiudadano);
    listaCiudadanos = await load("ciudadanos")

    const form = document.querySelector('form');
    form.reset();

    alert('Ciudadano creado con éxito!');
}

const mostrarListadoCiudadanos = async () => {
    listaCiudadanos = await load("ciudadanos")
    const ciudadanosForm = document.getElementById('ciudadanos-crear');
    const listadoCiudadanos = document.getElementById('Listado-ciudadanos');
    ciudadanosForm.style.display = 'none';
    listadoCiudadanos.style.display = 'block';

    const ul = document.createElement('ul');

    for (const ciudadano of listaCiudadanos) {
        const li = document.createElement('li');
        li.innerHTML = createCard(ciudadano);
        ul.appendChild(li);
    }

    listadoCiudadanos.innerHTML = '';
    listadoCiudadanos.appendChild(ul);

    const volverButton = document.createElement('button');
    volverButton.textContent = 'Volver al Formulario';
    volverButton.addEventListener('click', volverFormularioCiudadanos);
    listadoCiudadanos.appendChild(volverButton);
}

const volverFormularioCiudadanos = () => {
    const ciudadanosForm = document.getElementById('ciudadanos-crear');
    const listadoCiudadanos = document.getElementById('Listado-ciudadanos');

    listadoCiudadanos.style.display = 'none';
    ciudadanosForm.style.display = 'block';
}

