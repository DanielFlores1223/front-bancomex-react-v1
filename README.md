<h1 align="center">Welcome to Bancomex</h1>
<p style="text-align:center">
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="url" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://opensource.org/licenses/MIT" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> This is a banking system, it will allow the use of several roles, and each one will have different capabilities, this system has QR recognition, the PERN stack was chosen in the Frontend part, it was implemented in ReactJS and a solid backend made in NodeJS , Express and PostgreSQL.

## Links of Interest
### 💻 [Frontend](https://github.com/DanielFlores1223/front-bancomex-react-v1)
### 💾 [Backend](https://github.com/cardiadev/bancomex-webapp-back)
### 📄 [Documentation - General](https://docs.google.com/document/d/1OmqDfYfswVWqb56eYoNa7wePpm_ntu2yDpB7YECZkDM/edit#heading=h.bo6mhawj1ohg)
### 📄 [Documentation Endpoints](https://documenter.getpostman.com/view/19718282/UVyyuZ83)

## Install

```sh
npm install
```

## Usage

```sh
npm run dev
```


# Individual Activities

### 👨🏻‍💻 **Alexei Sandoval**
| Nombre Actividad              | Descripción de Actividad                                                                                                                                                                                                   |
|-------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Generar QR.                   | Generación automática de un código QR único al momento de crear un nuevo cliente.                                                                                                                                          |
| Enviar código QR por correo.  | Envío automático del código QR mediante un correo electrónico vinculado al cliente.                                                                                                                                        |
| Depositar a Cuenta.           | Se desarrollo la vista y funcionalidad para que el sistema permita depositar a un número de tarjeta específico.                                                                                                            |
| Retirar Efectivo.             | Se desarrollo la vista y funcionalidad para que el sistema permita al cliente disponer de efectivo de alguna de sus tarjetas.                                                                                              |
| Generar reporte diario (PDF). | Generación de un documento PDF que muestra el reporte diario de cada una de las cajas, sobre la cantidad de dinero con la que cuenta al final del día, la cantidad con la que se inició, las denominaciones y los totales. |


### 👨🏻‍💻 **Daniel Flores**
| Nombre Actividad                                | Descripción de Actividad                                                                                                                                                                                                                                           |
|-------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Mostrar Cajas disponibles al cajero             | Al momento de que inicie sesión el cajero debe de poder ver las cajas que se encuentran disponibles para que comience su turno, antes de elegir una caja, el usuario no puede realizar otra acción ya que necesita abrir caja para poder hacer depositos y retiros |
| Abrir caja seleccionada                         | Al momento de que el cajero seleccione la caja, le aparece un formulario donde se debe ingresar la cantidad inicial de la caja                                                                                                                                     |
| Dashboard de la caja seleccionada por el cajero | Mostrar información de la caja y de su apertura como la fecha, la hora, el monto inicial y el nombre del cajero                                                                                                                                                    |
| Hacer corte de caja                             | Opción de hacer corte de caja mediante un formulario donde el cajero debe ingresar la cantidad de cada denominación , una vez que se haga el corte se cierra la caja y por tanto la sesión del cajero                                                              |
| Credito Hipotecario                             | Opción en el menú del ejecutivo para poder solicitar un credito hipotecario                                                                                                                                                                                        |
| Ver lista de creditos hipotecarios              | Opción de ver los creditos hipotecarios en el gerente y filtrarlos por su estatus                                                                                                                                                                                  |
| Aceptar o rechazar el credito hipotecario       | Opción para aceptar o rechazar un credito hipotecario, solo el gerente                                                                                                                                                                                             |
| Cambio de contraseña de un usuario              | Metodo en el back end para realizar un cambio de contraseña de cualquier empleado                                                                                                                                                                                  |

### 👨🏻‍💻 **Carlos Diaz**

### 👩🏻‍💻  **Mayte Medrano**
| Nombre Actividad                       | Descripción de Actividad                                                                                                                                                                          |
|----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Formulario para la creación de cuentas | El ejecutivo deberá observar en el menú la opción  para crear una cuenta, en ella podrá seleccionar  si será de débito o crédito.                                                                 |
| Generar cliente                        | El ejecutivo podrá ingresar los datos del cliente  para generar su cuenta, y el formulario cuenta  con validaciones para asegurar que todos los campos  estén correctamente llenados.             |
| Agregar beneficiario a cliente         | El ejecutivo podrá agregar beneficiarios al cliente  mediante un formulario, llenando los datos necesarios.  El formulario cuenta con validaciones para asegurar que  los campos estén completos. |
| Dasboard Ejecutivo                     | Pantalla principal del menú para el ejecutivo. En ella puede  visualizar la cantidad de créditos aperturados por id del  ejecutivo y la cantidad de clientes.                                     |
| Endpoints para Dashboard               | Contar cantidad de créditos aperturados por id de Ejecutivo.                                                                                                                                      |
| Endpoints básicos para tabla Cargos    | Creación de los 5 principales endpoints para la tabla de Cargos. (Find All, FindOne, Create, Update)                                                                                              |
| Documentación                          | Se realizó el diccionario de datos. Se generó el esquema de lo s componentes creados en el proyecto con su debida descripción.                                                                    |

### 👩🏻‍💻  **Laura Perez**
 | Nombre Actividad                                   | Descripción de Actividad                                                                                                                                                                                |   |                                                 |
|----------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---|-------------------------------------------------|
| Creación de seeders                                | Para poblar tablas de la base de datos                                                                                                                                                                  |   |                                                 |
| Creación de endpints                               | -FindAll, FindOne, create, update del modelo "Guarantees" -FindAll, FindOne, create, update del modelo "Cards"                                                                                          |   |                                                 |
| Formulario para crear empleados                    | Permite al gerente crear empleados agregando nombre y apellido, pemite seleccionar el rol y el área al que pertenecerá el empleado.                                                                     |   |                                                 |
|        Asignar código de empleado y estatus        | Cuando el gerente haya llenado los campos del formulario correctamente, se asignrá un código de empleado                                                                                                |   |                                                 |
| Dashboard Gerente                                  | Cuado el gerente inicie sesión aparecerá como vista principal en la que este podrá visualizar datos de su interes, como: Total de cuentas activas, total de creditos otigdados y monto total del banco. |   |                                                 |
| Endpoints paara funcionalidad de dashboard gerente | Contar el total de cuentas activas. Contar el total de creditos aprobados. Mostrar elo monto total en la cuenta del banco.                                                                              |   | Mostrar elo monto total en la cuenta del banco. |
| Estilos dashboard ejecutivo                        | Estlización de elementos del dashboard                                                                                                                                                                  |   |                                                 |

### 👩🏻‍💻  **Irasema Serrano**
| Nombre Actividad              | Descripción de Actividad                                                                                                                                                                                                   |
|-------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Generar QR.                   | Generación automática de un código QR único al momento de crear un nuevo cliente.                                                                                                                                          |
| Enviar código QR por correo.  | Envío automático del código QR mediante un correo electrónico vinculado al cliente.                                                                                                                                        |
| Depositar a Cuenta.           | Se desarrollo la vista y funcionalidad para que el sistema permita depositar a un número de tarjeta específico.                                                                                                            |
| Retirar Efectivo.             | Se desarrollo la vista y funcionalidad para que el sistema permita al cliente disponer de efectivo de alguna de sus tarjetas.                                                                                              |
| Generar reporte diario (PDF). | Generación de un documento PDF que muestra el reporte diario de cada una de las cajas, sobre la cantidad de dinero con la que cuenta al final del día, la cantidad con la que se inició, las denominaciones y los totales. |




## DevYou Team 

👨🏻‍💻 [**Carlos Diaz**](http://github.com/cardiadev)
👨🏻‍💻 [**Daniel Flores**](https://github.com/DanielFlores1223)
👩🏻‍💻 [**Mayte Medrano**](https://github.com/holdonmay)
👩🏻‍💻 [**Irasema Serrano**](https://github.com/IrasemaSerrano)
👨🏻‍💻 [**Alexei Sandoval**](https://github.com/AlexeiNay)
👩🏻‍💻 [**Laura Perez**](https://github.com/GeorginaPerez)


## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This project is [MIT](https://opensource.org/licenses/MIT) licensed.

***
_This README was generated with ❤️  by [DevYou](https://github.com/cardiadev)_