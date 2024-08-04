// Objeto seguro
const seguros = {
    automovil: {
        valor: 140,
        iva: 0.10
    },
    moto: {
        valor: 120,
        iva: 0.05
    }
};

//Constructor de usuarios
function Usuario(nombre) {
    this.nombre = nombre;
    this.total = 0;

    // Método definido dentro del constructor
    this.actualizarTotal = function(total) {
        this.total = total;
    };
}

//Array usuarios
const usuarios = [];

//Función para calcular porcentaje de iva, sumar y obtener el resultado
function calcularTotal(base, iva) {
    return base + (base * iva);
}

function comprarSeguro() {
    const numUsuarios = parseInt(prompt("¡Bienvenido! ¿Cuántos usuarios requiere crear?"));

    for (let i = 0; i < numUsuarios; i++) {
        let usuario;

        //Asegurarse de que el nombre de usuario sea unico
        while (true) {
            usuario = prompt("Ingrese el nombre de usuario con el que crearás tu cuenta");

            if (usuarios.find(user => user.nombre === usuario)) {
                alert("El nombre de usuario ya existe. Intente con otro nombre.");
            } else {
                usuarios.push(new Usuario(usuario));
                alert("Bienvenido, su nombre de usuario es: " + usuario);
                break;
            }
        }

        let intentos = 0;
        const maxIntentos = 3;

        while (intentos < maxIntentos) {
            let intentoUsuario = prompt("Ingrese su nombre de usuario para verificar:");

            if (intentoUsuario === usuario) {
                alert("Usuario verificado correctamente.");

                let menuSeguro = prompt("Seleccione el medio de transporte al cual le comprará el seguro: \n1. Automóvil \n2. Moto");
                let total = 0;

                switch (menuSeguro) {
                    case "1":
                        console.log("El usuario ha seleccionado el medio de transporte: Automóvil");
                        total = calcularTotal(seguros.automovil.valor, seguros.automovil.iva);
                        break;

                    case "2":
                        console.log("El usuario ha seleccionado el medio de transporte: Moto");
                        total = calcularTotal(seguros.moto.valor, seguros.moto.iva);
                        break;

                    default:
                        alert("Opción inválida");
                        continue;
                }

                //Actualizar el total del usuario en el array
                let usuarioObj = usuarios.find(user => user.nombre === usuario);
                usuarioObj.actualizarTotal(total.toFixed(2));

                alert(`Gracias por su compra, el total es de: ${total.toFixed(2)}`);
                break;

            } else {
                intentos++;
                if (intentos < maxIntentos) {
                    alert("Nombre de usuario incorrecto. Te quedan " + (maxIntentos - intentos) + " intentos.");
                }
            }
        }

        if (intentos === maxIntentos) {
            alert("Has superado el número máximo de intentos. Inténtalo más tarde.");
            console.log("El usuario ha superado el número máximo de intentos.");
        }
    }

    //Ordenar el array por nombre de usuario
    usuarios.sort((a, b) => a.nombre.localeCompare(b.nombre));

    //Mostrar los resultados ordenados en la consola
    usuarios.forEach(user => {
        console.log(`Usuario: ${user.nombre}, Total Seguro: ${user.total}`);
    });

    alert("Usuarios creados y ordenados por nombre. Ver la consola para más detalles.");
}

comprarSeguro();
