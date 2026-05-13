# Introduction

We will learn how to perform GET requests from the Frontend client to the backend server. It is important to remember that to performn an HTTP GET Request we will need:

- the URI where we will address the request
- optionally, some path or query params.

For instance, if we want to obtain the list of restaurants that belongs to the current logged-in owner, we will do an HTTP GET Request to: `/users/myrestaurants` and we will have to provide a bearer token since this endpoint requires a logged-in user (and it has to be of type owner)

Once we will learn this basic elements, we will develop the Restaurants list and the restaurant detail screen.

Aprenderemos a realizar solicitudes GET desde el cliente Frontend al servidor backend. Es importante recordar que para realizar una solicitud HTTP GET necesitaremos:

- la URI donde dirigiremos la solicitud
- opcionalmente, algunos parámetros de ruta o consulta.

Por ejemplo, si queremos obtener la lista de restaurantes que pertenecen al propietario actualmente conectado, haremos una solicitud HTTP GET a: `/users/myrestaurants` y tendremos que proporcionar un token de portador ya que este endpoint requiere un usuario conectado (y tiene que ser de tipo propietario).

Una vez que aprendamos estos elementos básicos, desarrollaremos la pantalla de lista de restaurantes y la pantalla de detalle del restaurante.

**Explicación adicional:** Las solicitudes GET son la forma más común de recuperar datos del servidor. El token de portador (bearer token) es un mecanismo de seguridad que confirma que el usuario tiene derecho a acceder a ciertos recursos del servidor.

## 0. Setup

Click on "Use this template" in GitHub and "Create a new repository" to create your own repository based on this template. Afterwards, clone your own repository by opening VScode and clone the previously created repository by opening Command Palette (Ctrl+Shift+P or F1) and `Git clone` this repository, or using the terminal and running

```PowerShell
git clone <url>
```

Alternatively, you can use the _Source Control_ button in the left-sided bar and click on _Clone Repository_ button.

In case you are asked if you trust the author, please select yes.

It may be necessary to setup your git username by running the following commands on your terminal, in order to be able to commit and push:

```PowerShell
git config --global user.name "FIRST_NAME LAST_NAME"
git config --global user.email "MY_NAME@example.com"
```

As in previous labs, it is needed to create a copy of the `.env.example` file, name it `.env` and include your environment variables.

Open a terminal a run `npm run install:all:bash` (`npm run install:all:win` for Windows OS) to install dependencies. A folder `node_modules` will be created under the `DeliverUS-Backend` and `DeliverUS-Frontend` folders.

Once you should setup your .env file for DeliverUS-Backend project. API_BASE_URL must points to your server. For instance `API_BASE_URL=http://localhost:3000`.

You have to run the backend server as well. Go to your global project folder and run `start:backend`.

You can then run `start:frontend`. Check that the base project is working.

It is important to notice that **this base project includes**:

- all the required screens and artifacts needed to perform the **Sign-up, Sign-in, Sign-out and edit user information**.
- Helpers files for performing requests for RESTful services
- New packages including: axios, image-pickers, font loading
- some styling and GUI improvements including:
  - Loaded Montserrat fonts.
  - Flash messaging to notify user with results of actions.
  - Text components for re-use of some styling (TextRegular, TextSemibold, TextError).
  - Restaurants and products are rendered using ImageCard componentes (Solution to extra exercises of previous lab).

Es importante notar que **este proyecto base incluye**:

- todas las pantallas y artefactos necesarios para realizar **Registro, Inicio de sesión, Cierre de sesión y edición de información del usuario**.
- Archivos auxiliares para realizar solicitudes de servicios RESTful
- Nuevos paquetes incluyendo: axios, image-pickers, carga de fuentes
- algunas mejoras de estilo e interfaz gráfica incluyendo:
  - Fuentes Montserrat cargadas.
  - Mensajería flash para notificar al usuario con resultados de acciones.
  - Componentes de texto para reutilizar algunos estilos (TextRegular, TextSemibold, TextError).
  - Los restaurantes y productos se representan usando componentes ImageCard (Solución a ejercicios extras del laboratorio anterior).

**Explicación adicional:** El proyecto base proporciona toda la infraestructura necesaria para autenticación de usuarios y manejo de archivos. Esto te permite enfocarte en aprender a hacer solicitudes GET sin necesidad de construir desde cero toda la aplicación.

In order to make some API requests, it is needed to be logged-in. So **confirm that you can log-in with some owner user**. The provided user-seeder at the backend creates an owner with the following credentials:

- email: `owner1@owner.com`
- password: `secret`

Once the user is logged in, the bearer token is used in every request.

# 1. RESTful API Requests

You have been provided with some files located at `src/api`:

- `helpers\ApiRequestHelper.js` that includes the needed functions to perform GET, POST, PUT, PATCH and DELETE HTTP requests to the Backend API. It uses Axios package. Axios is the most popular package to perform HTTP requests in Javascript environments. It is an easier to use package than the included Fetch API.
  - `get` function receives the destination route of the request, perform the HTTP GET request and can throw an error exception
  - `post`, `patch` and `put` functions receive the destination route and the data needed to perform a POST, PATCH or a PUT HTTP requests respectively. Keep in mind that POST requests are intended for creating new elements, PUT requests are intended for updating elements and PATCH requests are also intented for updating certain resource properties.
  - `destroy` function receives the destination route to perform a DELETE HTTP request.
- `AuthEndpoints.js` that includes the needed functions to perform authorization and user related operations. It also setup the bearer token for future requests.
- Other helper files that includes errors and files handling when performing requests.

Se le han proporcionado algunos archivos ubicados en `src/api`:

- `helpers\ApiRequestHelper.js` que incluye las funciones necesarias para realizar solicitudes HTTP GET, POST, PUT, PATCH y DELETE a la API del Backend. Utiliza el paquete Axios. Axios es el paquete más popular para realizar solicitudes HTTP en entornos JavaScript. Es un paquete más fácil de usar que la API Fetch incluida.
  - la función `get` recibe la ruta de destino de la solicitud, realiza la solicitud HTTP GET y puede lanzar una excepción de error
  - las funciones `post`, `patch` y `put` reciben la ruta de destino y los datos necesarios para realizar solicitudes HTTP POST, PATCH o PUT respectivamente. Tenga en cuenta que las solicitudes POST están destinadas a crear nuevos elementos, las solicitudes PUT están destinadas a actualizar elementos y las solicitudes PATCH también están destinadas a actualizar ciertas propiedades de recursos.
  - la función `destroy` recibe la ruta de destino para realizar una solicitud HTTP DELETE.
- `AuthEndpoints.js` que incluye las funciones necesarias para realizar operaciones de autorización y relacionadas con el usuario. También configura el token de portador para futuras solicitudes.
- Otros archivos auxiliares que incluyen manejo de errores y archivos al realizar solicitudes.

**Explicación adicional:** Los archivos auxiliares (helpers) encapsulan la lógica de las solicitudes HTTP, lo que permite reutilizar código y mantener una arquitectura limpia. Cada función tiene una responsabilidad específica basada en el tipo de solicitud HTTP que realiza.

## 1.1. RestaurantEndpoints implementation

We have to modify `RestaurantEndpoints.js` in order to perform HTTP GET requests. In the future we will extend this file in order to create or edit restaurants.

Modify the `getAll` function so it uses the `get` method as follows:

```Javascript
import { get } from './helpers/ApiRequestsHelper'
function getAll () {
  return get('/users/myrestaurants')
}
```

Tenemos que modificar `RestaurantEndpoints.js` para realizar solicitudes HTTP GET. En el futuro, extenderemos este archivo para crear o editar restaurantes.

Modifica la función `getAll` para que utilice el método `get` de la siguiente manera:

```Javascript
import { get } from './helpers/ApiRequestsHelper'
function getAll () {
  return get('/users/myrestaurants')
}
```

**Explicación adicional:** El patrón de encapsular los endpoints en funciones separadas permite cambiar fácilmente la ruta o los parámetros de la solicitud en un solo lugar, en lugar de tener que buscar todas las referencias en el código.

## 1.2. RestaurantsScreen implementation

In order to retrieve owner's restaurants it is needed to be logged-in. There are some ways to avoid that the Front-end makes requests if the user is not logged in. For simplicity, we will just ask if there is a logged-in user before executing the request.

The `loggedInUser` is accessed through the `AuthorizationContext`. Keep in mind that a `Context` is a place to memorize information that could be shared between various components. The `AuthorizationContext` stores the information about the logged-in user. To obtain a reference of the user, add the following to the RestaurantsScreen component:

```JavaScript
const { loggedInUser } = useContext(AuthorizationContext)
```

If `loggedInUser` is `null`, it means that no user is logged-in. By contrast, if a user is logged-in, the `loggedInUser` variable will store the user object including its properties.

Once we have retrieved the `loggedInUser` from the context, we can ask if its null or not before doing the operation.

Para recuperar los restaurantes del propietario, es necesario estar conectado. Hay varias formas de evitar que el Frontend realice solicitudes si el usuario no está conectado. Por simplicidad, simplemente preguntaremos si hay un usuario conectado antes de ejecutar la solicitud.

El `loggedInUser` se accede a través del `AuthorizationContext`. Tenga en cuenta que un `Context` es un lugar para memorizar información que podría compartirse entre varios componentes. El `AuthorizationContext` almacena la información sobre el usuario conectado. Para obtener una referencia del usuario, agregue lo siguiente al componente RestaurantsScreen:

```JavaScript
const { loggedInUser } = useContext(AuthorizationContext)
```

Si `loggedInUser` es `null`, significa que ningún usuario está conectado. Por el contrario, si un usuario está conectado, la variable `loggedInUser` almacenará el objeto de usuario incluyendo sus propiedades.

Una vez que hayamos recuperado el `loggedInUser` del contexto, podemos preguntar si es nulo o no antes de realizar la operación.

**Explicación adicional:** El contexto (Context) es un mecanismo potente en React para pasar información entre componentes sin necesidad de pasar props a través de múltiples niveles. Es especialmente útil para información global como el usuario actualmente autenticado.

We can modify our `useEffect` function so we can retrieve restaurants. Analyse the following code snippet:

```Javascript
useEffect(async () => {
    const fetchedRestaurants = await getAll()
    setRestaurants(fetchedRestaurants)
  }, [loggedInUser])
```

This code snippet has some problems:

1. We have to use `await` since getAll returns a `Promise`. This forces us to declare the arrow function as `async`. Async functions always return a `Promise`. However, `useEffect` expects a function that returns nothing, so we are not allowed to do this.
2. Restaurants should be fetched if a `loggedInUser` exists. We should declare this object as the triggering object value for this `useEffect`. It has to be added to the array that receives as second parameter.
3. No error handling is implemented, an API call could return some kind of error and our code would not notice.

We have to face these problems. Check the following implementation and discuss what have been done to address each of the problems:

Podemos modificar nuestra función `useEffect` para recuperar los restaurantes. Analiza el siguiente fragmento de código:

```Javascript
useEffect(async () => {
    const fetchedRestaurants = await getAll()
    setRestaurants(fetchedRestaurants)
  }, [loggedInUser])
```

Este fragmento de código tiene algunos problemas:

1. Tenemos que usar `await` ya que getAll devuelve una `Promise`. Esto nos obliga a declarar la función de flecha como `async`. Las funciones asíncronas siempre devuelven una `Promise`. Sin embargo, `useEffect` espera una función que no devuelva nada, por lo que no se nos permite hacer esto.
2. Los restaurantes deben recuperarse si existe un `loggedInUser`. Debemos declarar este objeto como el valor de objeto desencadenante para este `useEffect`. Tiene que añadirse al array que recibe como segundo parámetro.
3. No hay manejo de errores implementado, una llamada a la API podría devolver algún tipo de error y nuestro código no lo notaría.

Tenemos que enfrentar estos problemas. Comprueba la siguiente implementación y discute qué se ha hecho para abordar cada uno de los problemas:

**Explicación adicional:** El problema principal es que `useEffect` no puede ser una función async directamente. La solución es definir una función async dentro del useEffect y luego llamarla. Esto permite manejar correctamente las promesas y los errores sin violar las reglas de React.

First, import showMessage and some styles as follows:

```Javascript
import { showMessage } from 'react-native-flash-message'
```

Secondly, check the following implementation:

```Javascript

  const { loggedInUser } = useContext(AuthorizationContext)
  useEffect(() => {
    async function fetchRestaurants () { // Addresses problem 1
      try {
        const fetchedRestaurants = await getAll()
        setRestaurants(fetchedRestaurants)
      } catch (error) { // Addresses problem 3
        showMessage({
          message: `There was an error while retrieving restaurants. ${error} `,
          type: 'error',
          style: GlobalStyles.flashStyle,
          titleStyle: GlobalStyles.flashTextStyle
        })
      }
    }
    if (loggedInUser) { // Addresses problem 2
      fetchRestaurants()
    } else {
      setRestaurants(null)
    }
  }, [loggedInUser]) // Addresses problem 2
```

Ahora, comprueba que los restaurantes del propietario se recuperan del backend y que se enumeran en el componente RestaurantsScreen. Recuerda conectarte como propietario.

Now, check that the owner's restaurants are retrieved from the backend and that they are listed at RestaurantsScreen component. Remember to log in as an owner.

## 1.3. RestaurantDetail implementation

Now we need to modify our code to retrieve restaurant details. To this end, modify your code to:

- Change `getDetail(id)` function of `RestaurantEndpoints.js`
- Change `useEffect` function of `RestaurantDetailScreen.js`

Notice that we do not need to check if a user is logged in, as the details of restaurants are public.

Check that restaurant details and products are retrieved from the backend and listed at RestaurantDetailScreen component.

Ahora necesitamos modificar nuestro código para recuperar los detalles del restaurante. Para ello, modifica tu código para:

- Cambiar la función `getDetail(id)` de `RestaurantEndpoints.js`
- Cambiar la función `useEffect` de `RestaurantDetailScreen.js`

Observa que no necesitamos verificar si un usuario está conectado, ya que los detalles de los restaurantes son públicos.

Comprueba que los detalles del restaurante y los productos se recuperan del backend y se enumeran en el componente RestaurantDetailScreen.

**Explicación adicional:** Los datos públicos no requieren autenticación para acceder. Esto permite que cualquiera vea los detalles de los restaurantes sin necesidad de iniciar sesión.

# 2. Extra

`FlatList` has a way of rendering an empty list. For instance, when no restaurants are fetched. Check out FlatList documentation for more information, and modify RestaurantsScreen and RestaurantDetail to include an empty list renderer. https://reactnative.dev/docs/flatlist#listemptycomponent

`FlatList` tiene una forma de renderizar una lista vacía. Por ejemplo, cuando no se recuperan restaurantes. Consulta la documentación de FlatList para más información, y modifica RestaurantsScreen y RestaurantDetail para incluir un renderizador de lista vacía. https://reactnative.dev/docs/flatlist#listemptycomponent

**Explicación adicional:** Mostrar un mensaje cuando la lista está vacía mejora la experiencia del usuario, ya que sabe que la operación se completó pero no hay datos disponibles, en lugar de creer que la aplicación se ha congelado.
