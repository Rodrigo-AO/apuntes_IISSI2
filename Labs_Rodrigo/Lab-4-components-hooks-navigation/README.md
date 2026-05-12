# Introduction

We will learn basic React-native elements needed to develop software graphical user interfaces including:

- Components
  - States
  - Props
- Hooks

Apenderemos los elementos básicos de React-native necesarios para desarrollar interfaces gráficas de usuario en aplicaciones de software, incluyendo:

- Componentes
  - Estados
  - Props
- Hooks

Once we will learn this basic elements, we will develop the Restaurants list and the restaurant detail screen.

Una vez que aprendamos estos elementos básicos, desarrollaremos la pantalla de lista de restaurantes y la pantalla de detalle del restaurante.

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

# 1. Components

In general, software components are some kind of artifacts that encapsulates a set of related functions so they can be reused. **React components are the reusable building blocks that we can define to create our Apps' user interfaces.**
In the previous Lab, we used some components included in react-native library such as `View`, `Text` or `Pressable`. We also defined some components (such as our screens or a simple component named `SystemInfo`).

En general, los componentes de software son artefactos que encapsulan un conjunto de funciones relacionadas para que puedan reutilizarse. **Los componentes de React son los bloques de construcción reutilizables que podemos definir para crear las interfaces de usuario de nuestras aplicaciones.**
En el laboratorio anterior, utilizamos algunos componentes incluidos en la biblioteca react-native como `View`, `Text` o `Pressable`. También definimos algunos componentes (como nuestras pantallas o un componente simple llamado `SystemInfo`).

The preferred option to create components in React and React-native is the so-called _Function Components_. The defined function component takes as **input some parameters which are called props**, and returns a React element.

La opción preferida para crear componentes en React y React-native se llama _Componentes Funcionales_. El componente funcional definido toma como **entrada algunos parámetros que se llaman props** y devuelve un elemento de React.

**Explicación adicional:** Los props son como los parámetros que pasamos a una función. Así como una función recibe argumentos para realizar su tarea, un componente de React recibe props para saber cómo debe renderizarse. Por ejemplo, si tenemos un componente de botón, podemos pasarle el texto que debe mostrar como prop.

You can check out the `RestaurantsScreen.js` file to understand how a component is defined:

```Javascript
import { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Pressable } from 'react-native'
import TextRegular from '../../components/TextRegular'
import { getAll } from '../../api/RestaurantEndpoints'
import * as GlobalStyles from '../../styles/GlobalStyles'

export default function RestaurantsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TextRegular style={{ fontSize: 16, alignSelf: 'center', margin: 20 }}>Random Restaurant</TextRegular>
      <Pressable
        onPress={() => {
          navigation.navigate('RestaurantDetailScreen', { id: Math.floor(Math.random() * 100) })
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? GlobalStyles.brandBlueTap
              : GlobalStyles.brandBlue
          },
          styles.actionButton
        ]}
      >
        <TextRegular textStyle={styles.text}>
          Go to Random Restaurant Details
        </TextRegular>
      </Pressable>
    </View>
  )
}
```

# 2. States

Components usually needs to maintain some data in memory to _remember_ things. In React and React-native this is called the _state_. In order to create and update the state we need to use the `useState` hook (we will learn about this in the next section):

```Javascript
const [state, setState] = useState(initialValue)
```

Los componentes generalmente necesitan mantener algunos datos en la memoria para _recordar_ cosas. En React y React-native esto se llama el _estado_. Para crear y actualizar el estado necesitamos usar el hook `useState` (aprenderemos sobre esto en la siguiente sección):

```Javascript
const [state, setState] = useState(initialValue)
```

Notice that we define an array of elements `[state, setState]` including the `state` object and the method to change the state `setState` and we can define the initial value of this `state` object.

Fíjate que definimos un array de elementos `[state, setState]` incluyendo el objeto `state` y el método para cambiar el estado `setState`, y podemos definir el valor inicial de este objeto `state`.

**Explicación adicional:** Cuando usamos `useState`, estamos pidiendo a React que gestione una variable especial para nosotros. El primer elemento del array (`state`) es el valor actual, y el segundo (`setState`) es una función que usamos para cambiar ese valor. Cada vez que llamamos a `setState` con un nuevo valor, React automáticamente re-renderiza el componente para reflejar el cambio.

For instance, when we will make a request to the backend to retrieve the list of restaurants, the returned data should be kept in the state of the `RestaurantsScreen` component. So in this component, we need to define an `state` that will contain the array of restaurants (initially will be an empty array `[]`) as:

Por ejemplo, cuando hagamos una solicitud al backend para recuperar la lista de restaurantes, los datos devueltos deben mantenerse en el estado del componente `RestaurantsScreen`. Entonces, en este componente, necesitamos definir un `estado` que contendrá el array de restaurantes (inicialmente será un array vacío `[]`) así:

```Javascript
const [restaurants, setRestaurants] = useState([])
```

# 3. Props

We can use props to pass data between components (we will see that Context API will help us for the same objective).
Below you can find how we receive the route in the `RestaurantDetailScreen` component as a prop when navigating from `RestaurantsScreen` to `RestaurantDetailScreen`:

Podemos usar props para pasar datos entre componentes (veremos que Context API nos ayudará para el mismo objetivo).
A continuación puede encontrar cómo recibimos la ruta en el componente `RestaurantDetailScreen` como una prop cuando navegamos desde `RestaurantsScreen` a `RestaurantDetailScreen`:

**Explicación adicional:** Los props son el mecanismo principal en React para comunicar información de un componente padre a un componente hijo. Cuando navegamos de una pantalla a otra, podemos enviar información (como el ID de un restaurante) que el componente destino necesita para saber qué mostrar.

```Javascript
export default function RestaurantDetailScreen ({ route }) {
  const { id } = route.params
  return (
        <View style={styles.container}>
            <TextRegular style={{ fontSize: 16, alignSelf: 'center', margin: 20 }}>Restaurant details. Id: {id}</TextRegular>
        </View>
  )
}
```

# 4. Hooks

Hooks are specially-implemented functions that let us add functionality to React components beyond just creating and returning React elements.
We will use hooks for three objectives:

Los Hooks son funciones especialmente implementadas que nos permiten añadir funcionalidad a los componentes de React más allá de solo crear y devolver elementos de React.
Usaremos hooks para tres objetivos:

1. Maintain the state of a component: `useState` hook
2. Update our interface when data is updated or retrieved: `useEffect` hook.
3. Share data between components by defining a context and retrieve that context using the `useContext` hook. We will learn about contexts in following labs.

1. Mantener el estado de un componente: hook `useState`
2. Actualizar nuestra interfaz cuando se actualicen o recuperen datos: hook `useEffect`.
3. Compartir datos entre componentes mediante la definición de un contexto y recuperar ese contexto usando el hook `useContext`. Aprenderemos sobre contextos en laboratorios futuros.

## 4.1. useState hook

```Javascript
const [state, setState] = useState(initialValue)
```

The useState hook returns an array containing:

- the state object
- a function to update the state object (it has to be named `set` and the name given to the state object)

the `setState` function admits a new state object value, and provokes a re-render of the component

```Javascript
setState(newState)
```

El hook useState devuelve un array que contiene:

- el objeto de estado
- una función para actualizar el objeto de estado (debe tener el nombre `set` seguido del nombre dado al objeto de estado)

la función `setState` admite un nuevo valor de objeto de estado y provoca una re-renderización del componente

```Javascript
setState(newState)
```

**Explicación adicional:** La convención de nombres "set" es importante: si tu estado se llama `contador`, su función de actualización debe llamarse `setContador`. Cuando llamamos a `setState`, React compara el nuevo valor con el anterior, y si son diferentes, re-renderiza el componente para que pueda mostrar los cambios en la pantalla.

## 4.2. useEffect hook

```Javascript
useEffect(() => {
   //code to be executed
  }, [object1, object2, ...])
```

The useEffect hook takes two arguments:

- the function to be run when the hook is triggered
- an optional array containing the dependency values that will trigger the hook when their values have changed. If the array is empty, it will be executed once the component is mount (inserted in the DOM tree). If the parameter is not present, will be executed when the component is mount and every time the component updates (after every re-render).

El hook useEffect toma dos argumentos:

- la función a ejecutar cuando se dispare el hook
- un array opcional que contiene los valores de dependencia que activarán el hook cuando sus valores cambien. Si el array está vacío, se ejecutará una sola vez cuando el componente se monte (se inserte en el árbol del DOM). Si el parámetro no está presente, se ejecutará cuando el componente se monte y cada vez que el componente se actualice (después de cada re-renderizado).

**Explicación adicional:** El array de dependencias es crucial para evitar errores. Si no incluyes dependencias `[]`, el efecto se ejecutará infinitamente cada vez que el componente se re-renderice. Por ejemplo, si necesitas cargar datos cuando el componente aparece por primera vez, usarás `[]` (sin dependencias). Si necesitas actualizar algo cuando cambia una variable específica, pon esa variable en el array.

# 5. Developing RestaurantsScreen and RestaurantDetailScreen

We want to develop two screens:

- RestaurantsScreen should render a list of restaurants that belongs to the owner. Each element should render at least the name of the restaurant, and if an element is clicked or tapped, should navigate to the restaurant detail screen of that restaurant.
- RestaurantDetailScreen should render the details of the restaurant selected in the previous screen, including description and the products (menu) of that restaurant.

Queremos desarrollar dos pantallas:

- RestaurantsScreen debe renderizar una lista de restaurantes que pertenecen al propietario. Cada elemento debe mostrar al menos el nombre del restaurante, y si se hace clic o se toca un elemento, debe navegar a la pantalla de detalle del restaurante.
- RestaurantDetailScreen debe renderizar los detalles del restaurante seleccionado en la pantalla anterior, incluyendo la descripción y los productos (menú) de ese restaurante.

In your project you will find a new folder `api`. In the future it will contain one file for each of the entities that have to be requested to the backend. In this lab, we included a mock `RestaurantEndpoints.js` file where you will find two methods:

En tu proyecto encontrarás una nueva carpeta `api`. En el futuro contendrá un archivo para cada una de las entidades que deben solicitarse al backend. En este laboratorio, incluimos un archivo mock `RestaurantEndpoints.js` donde encontrarás dos métodos:

- `getAll` will return some restaurants (at this point they are preloaded in the code)
- `getDetail(id)` will return all restaurant details of the given restaurant `id`, including the products (menu).

- `getAll` devolverá algunos restaurantes (en este momento están precargados en el código)
- `getDetail(id)` devolverá todos los detalles del restaurante del `id` de restaurante dado, incluyendo los productos (menú).

Notice that **this is a mockup**, not real API calls will be found. We will learn how to perform API calls in the next lab.

Observa que **esto es un mock**, no se encontrarán llamadas reales a la API. Aprenderemos cómo realizar llamadas a la API en el siguiente laboratorio.

**Explicación adicional:** Un "mock" es una versión falsa o simulada de algo. En este caso, en lugar de conectarnos a un servidor real, los métodos devuelven datos ficticios. Esto nos permite practicar el código sin necesidad de un backend real completamente funcional.

## 5.1. RestaurantsScreen

First, open `RestaurantsScreen.js`. We will need to use some hooks (`useState` and `useEffect`), components and functions from other files. To this end, we have added the following import statements:

Primero, abre `RestaurantsScreen.js`. Necesitaremos usar algunos hooks (`useState` y `useEffect`), componentes y funciones de otros archivos. Para ello, hemos añadido las siguientes declaraciones de importación:

```Javascript
import { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Pressable } from 'react-native'
import TextRegular from '../../components/TextRegular'
import { getAll } from '../../api/RestaurantEndpoints'
import * as GlobalStyles from '../../styles/GlobalStyles'
```

Next, we will **define the component state**, which will be a `restaurants` object array where we will store the list of restaurants. To this end, you can add the following line **inside the RestaurantsScreen function component**:

A continuación, **definiremos el estado del componente**, que será un array de objetos `restaurants` donde almacenaremos la lista de restaurantes. Para ello, puedes añadir la siguiente línea **dentro del componente de función RestaurantsScreen**:

```Javascript
  const [restaurants, setRestaurants] = useState([])
```

At first render, the `restaurants` state object will be empty (its initial value is an empty array `[]`). We need to load our restaurants in the state. To this end, we will define a new _effect_ with the `useEffect` hook. As explained before, this hook takes two arguments: the function to be triggered, and an optional array of objects which triggers the function when their values have been changed. To load the restaurants, we do not need the optional dependencies array, as no dependency is needed to trigger the loading. To imitate the loading from a real API, a two-seconds timeout is established so restaurants will load after these two seconds delay. To do this, you can include the following **inside the RestaurantsScreen function component**:

En la primera renderización, el objeto de estado `restaurants` estará vacío (su valor inicial es un array vacío `[]`). Necesitamos cargar nuestros restaurantes en el estado. Para ello, definiremos un nuevo _efecto_ con el hook `useEffect`. Como se explicó antes, este hook toma dos argumentos: la función a disparar y un array opcional de objetos que dispara la función cuando sus valores han cambiado. Para cargar los restaurantes, no necesitamos el array de dependencias opcional, ya que no se necesita ninguna dependencia para disparar la carga. Para imitar la carga desde una API real, se establece un timeout de dos segundos para que los restaurantes se carguen después de estos dos segundos. Para hacer esto, puedes incluir lo siguiente **dentro del componente de función RestaurantsScreen**:

```Javascript
useEffect(() => {
    console.log('Loading restaurants, please wait 2 seconds')
    setTimeout(() => {
      setRestaurants(getAll) // getAll function has to be imported
      console.log('Restaurants loaded')
    }, 2000)
  }, [])
```

At this point, we have the necessary elements to load the list of restaurants as an state object. Next, we will render them by using one of the core components included with React-native: `FlatList`. More info about FlatLists can be found in the official documentation: <https://reactnative.dev/docs/flatlist>

En este punto, tenemos los elementos necesarios para cargar la lista de restaurantes como un objeto de estado. A continuación, los renderizaremos utilizando uno de los componentes principales incluidos en React-native: `FlatList`. Más información sobre FlatLists se puede encontrar en la documentación oficial: <https://reactnative.dev/docs/flatlist>

**Explicación adicional:** `FlatList` es un componente especializado para mostrar listas largas de elementos de forma eficiente. En lugar de renderizar todos los elementos de una vez, `FlatList` solo renderiza los elementos visibles en la pantalla, lo que hace que la aplicación sea más rápida incluso con miles de elementos.

In order to use this FlatList component we will need to pass some props to it:

- `data`: the array of elements to be rendered.
- `renderItem`: the function that receives each element (composed of the item itself, the index within the flatlist and separator elements).
- `keyExtractor`: the function that extracts a unique key for each element. Keys are required to be of type string. Our ids are defined as numerics, so we will just transform these ids to string.

Para usar este componente FlatList necesitaremos pasar algunas props:

- `data`: el array de elementos a renderizar.
- `renderItem`: la función que recibe cada elemento (compuesta por el elemento en sí, el índice dentro de flatlist y elementos separadores).
- `keyExtractor`: la función que extrae una clave única para cada elemento. Las claves deben ser de tipo string. Nuestros ids se definen como numéricos, así que simplemente transformaremos estos ids a string.

Let us first define how to render each item (restaurant). We will define a new function called `renderRestaurant`. This function will receive the item to be rendered (a restaurant) and have to return the graphical components that will render each restaurant on the `FlatList`. We propose to define a `Pressable` area and print the restaurant name inside. When pressed, it should navigate to the `RestaurantDetailScreen`, passing the restaurant `id` as a prop included the `route` object.

Primero definamos cómo renderizar cada elemento (restaurante). Definiremos una nueva función llamada `renderRestaurant`. Esta función recibirá el elemento a renderizar (un restaurante) y debe devolver los componentes gráficos que renderizarán cada restaurante en el `FlatList`. Proponemos definir un área `Pressable` e imprimir el nombre del restaurante dentro. Cuando se presiona, debe navegar a `RestaurantDetailScreen`, pasando el `id` del restaurante como una prop incluida en el objeto `route`.

```Javascript
const renderRestaurant = ({ item }) => {
    return (
      <Pressable
        style={styles.row}
        onPress={() => {
          navigation.navigate('RestaurantDetailScreen', { id: item.id })
        }}>
          <TextRegular>
              {item.name}
          </TextRegular>
      </Pressable>
    )
  }
```

Finally, we will overwrite the return statement of our component. We will include the `Flatlist` defining the following props:

- `data`: as our `restaurants` state object.
- `renderItem`: the `renderRestaurant` function.
- `keyExtractor`: the function that extracts a unique key for each element (it needs to be a String): `item => item.id.toString()`

Finalmente, sobrescribiremos la declaración de retorno de nuestro componente. Incluiremos el `Flatlist` definiendo las siguientes props:

- `data`: como nuestro objeto de estado `restaurants`.
- `renderItem`: la función `renderRestaurant`.
- `keyExtractor`: la función que extrae una clave única para cada elemento (debe ser una String): `item => item.id.toString()`

```Javascript
return (
      <FlatList
        style={styles.container}
        data={restaurants}
        renderItem={renderRestaurant}
        keyExtractor={item => item.id.toString()}
      />
  )
```

At this point, your `RestaurantsScreen` should show a list with two restaurants, and when one is clicked or tapped it should navigate to the `RestaurantDetailScreen` which only shows the id of the pressed restaurant.

En este punto, tu `RestaurantsScreen` debe mostrar una lista con dos restaurantes, y cuando se hace clic o se toca uno, debe navegar a `RestaurantDetailScreen` que solo muestra el id del restaurante presionado.

## 5.2. RestaurantDetailScreen

Next, we will develop our RestaurantDetailScreen so it queries all the details of a restaurant, including its products, and will render its name, description and the list of products. To this end we will follow the same approach: defining the state object, defining a useEffect so it retrieves the restaurant details from de mock API, and render the FlatList component.
Define the state object:

A continuación, desarrollaremos nuestro RestaurantDetailScreen para que consulte todos los detalles de un restaurante, incluyendo sus productos, y renderice su nombre, descripción y la lista de productos. Para ello seguiremos el mismo enfoque: definir el objeto de estado, definir un useEffect para que recupere los detalles del restaurante de la API mock, y renderizar el componente FlatList.
Define el objeto de estado:

```Javascript
  const [restaurant, setRestaurant] = useState({})
```

Define the useEffect hook to load restaurant details:

Define el hook useEffect para cargar los detalles del restaurante:

```Javascript
useEffect(() => {
    console.log('Loading restaurant details, please wait 1 second')
    setTimeout(() => {
      setRestaurant(getDetail(route.params.id))
      console.log('Restaurant details loaded')
    }, 1000)
  }, [])
```

Define a `renderProduct` function:

Define una función `renderProduct`:

```Javascript
const renderProduct = ({ item }) => {
    return (
      <Pressable
        style={styles.row}
        onPress={() => { }}>
          <TextRegular>
              {item.name}
          </TextRegular>
      </Pressable>
    )
  }
```

Notice that at this moment, it does not navigate when pressed. We will change this behaviour in future labs.

Observa que en este momento, no navega cuando se presiona. Cambiaremos este comportamiento en laboratorios futuros.

Finally, render all these elements:

Finalmente, renderiza todos estos elementos:

```Javascript
return (
        <View style={styles.container}>
            <TextRegular style={styles.textTitle}>{restaurant.name}</TextRegular>
            <TextRegular style={styles.text}>{restaurant.description}</TextRegular>
            <TextRegular style={styles.text}>shippingCosts: {restaurant.shippingCosts}</TextRegular>
            <FlatList
              style={styles.container}
              data={restaurant.products}
              renderItem={renderProduct}
              keyExtractor={item => item.id.toString()}
            />
        </View>
  )
```

# 6. Debugging React Native code

We can debug our code by following these steps:

- Deploy frontend with `npm start`
- Open the debug view located in Visual Studio Code, left menu, tab 'Debug', and run the configuration 'Debug Frontend'.
- This will launch a new Chrome window with the application running with debug capabilities activated.

Podemos depurar nuestro código siguiendo estos pasos:

- Despliega el frontend con `npm start`
- Abre la vista de depuración ubicada en Visual Studio Code, menú izquierdo, pestaña 'Debug', y ejecuta la configuración 'Debug Frontend'.
- Esto abrirá una nueva ventana de Chrome con la aplicación ejecutándose con capacidades de depuración activadas.

Now you can include breakpoints within your code by clicking on the left margin of your code line. VS Code will pop up when the breakpoint is reached.

Ahora puedes incluir puntos de quiebre en tu código haciendo clic en el margen izquierdo de tu línea de código. VS Code aparecerá cuando se alcance el punto de quiebre.

# 7. Extra exercises

Restaurants, Products and other entities include some image properties. These properties store relative path to the images. For instance, a restaurant logo property value could be: `logo: 'public/restaurants/100MontaditosLogo.jpeg'`. This is the relative path of this image in the server. In order to load the image, we need to add the backend server ip. To do this, copy the `.env.example` and rename the copy as `.env` file. Check that the following property points to your backend deployment server and port: `API_BASE_URL=http://localhost:3000`

Los restaurantes, productos y otras entidades incluyen algunas propiedades de imagen. Estas propiedades almacenan la ruta relativa de las imágenes. Por ejemplo, el valor de la propiedad del logo de un restaurante podría ser: `logo: 'public/restaurants/100MontaditosLogo.jpeg'`. Esta es la ruta relativa de esta imagen en el servidor. Para cargar la imagen, necesitamos añadir la IP del servidor backend. Para hacer esto, copia `.env.example` y renombra la copia como archivo `.env`. Comprueba que la siguiente propiedad apunte a tu servidor de implementación backend y puerto: `API_BASE_URL=http://localhost:3000`

Your project includes the needed packages for reading the `.env` file. To access a property you can just use the following: `process.env.PROPERTY_NAME`. For instance the API_BASE_URL property can be read by `process.env.API_BASE_URL`

Tu proyecto incluye los paquetes necesarios para leer el archivo `.env`. Para acceder a una propiedad simplemente puedes usar lo siguiente: `process.env.PROPERTY_NAME`. Por ejemplo, la propiedad API_BASE_URL se puede leer con `process.env.API_BASE_URL`

## 7.1. List header

Modify the `RestaurantDetailScreen` component so now the FlatList renders the header that includes the information about the restaurant. See <https://reactnative.dev/docs/flatlist#listheadercomponent> for more information.

Modifica el componente `RestaurantDetailScreen` para que ahora el FlatList renderice el encabezado que incluye la información sobre el restaurante. Ver <https://reactnative.dev/docs/flatlist#listheadercomponent> para más información.

**Explicación adicional:** El encabezado de una lista es una sección especial que aparece al principio de un FlatList, antes de todos los elementos. Es útil para mostrar información general o filtros que se aplican a toda la lista.

You can use the following renderHeader function (you will need to add some imports).

Puedes usar la siguiente función renderHeader (necesitarás añadir algunas importaciones).

```Javascript
const renderHeader = () => {
    return (
      <ImageBackground source={(restaurant?.heroImage) ? { uri: process.env.API_BASE_URL + '/' + restaurant.heroImage, cache: 'force-cache' } : undefined } style={styles.imageBackground}>
        <View style={styles.restaurantHeaderContainer}>
            <TextSemiBold textStyle={styles.textTitle}>{restaurant.name}</TextSemiBold>
            <Image style={styles.image} source={restaurant.logo ? { uri: process.env.API_BASE_URL + '/' + restaurant.logo, cache: 'force-cache' } : undefined} />
            <TextRegular textStyle={styles.text}>{restaurant.description}</TextRegular>
        </View>
      </ImageBackground>
    )
  }
```

And you can add the following styles:

Y puedes añadir los siguientes estilos:

```Javascript
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: GlobalStyles.brandSecondary
  },
  restaurantHeaderContainer: {
    height: 250,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'column',
    alignItems: 'center'
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  image: {
    height: 100,
    width: 100,
    margin: 10
  },
  text: {
    color: 'white'
  },
  textTitle: {
    fontSize: 20,
    color: 'white'
  }
})
```

## 7.2. Card components

Card components are a very popular solution to render information about items. Learn more about cards here: <https://material.io/components/cards>

Los componentes Card son una solución muy popular para renderizar información sobre elementos. Aprende más sobre tarjetas aquí: <https://material.io/components/cards>

**Explicación adicional:** Una tarjeta (card) es un contenedor rectangular que agrupa información relacionada. Es un patrón de diseño muy común en interfaces modernas que hace que el contenido sea más organizado y fácil de escanear para el usuario.

You have been provided with an `ImageCard` component at the `components` folder. You may use it to render restaurant items or product items. For instance, we can render the restaurant item at the `RestaurantsScreen` with the following renderer function:

Se te ha proporcionado un componente `ImageCard` en la carpeta `components`. Puedes usarlo para renderizar elementos de restaurantes o productos. Por ejemplo, podemos renderizar el elemento de restaurante en `RestaurantsScreen` con la siguiente función renderizadora:

```JavaScript
const renderRestaurantWithImageCard = ({ item }) => {
    return (
      <ImageCard
        imageUri={item.logo ? { uri: API_BASE_URL + '/' + item.logo } : restaurantLogo}
        title={item.name}
        onPress={() => {
          navigation.navigate('RestaurantDetailScreen', { id: item.id })
        }}
      >
        <TextRegular numberOfLines={2}>{item.description}</TextRegular>
        {item.averageServiceMinutes !== null &&
          <TextSemiBold>Avg. service time: <TextSemiBold textStyle={{ color: GlobalStyles.brandPrimary }}>{item.averageServiceMinutes} min.</TextSemiBold></TextSemiBold>
        }
        <TextSemiBold>Shipping: <TextSemiBold textStyle={{ color: GlobalStyles.brandPrimary }}>{item.shippingCosts.toFixed(2)}€</TextSemiBold></TextSemiBold>
      </ImageCard>
    )
  }
```

You may need to add the needed imports.

Puede que necesites añadir las importaciones necesarias.

Once you have rendered your restaurants with the `ImageCard` component, use this component to render the products of a restaurant as well.

Una vez que hayas renderizado tus restaurantes con el componente `ImageCard`, usa este componente para renderizar también los productos de un restaurante.

# ANNEX

## 1. Tab navigation

According to the requirements, we can classify owners functionalities in the following categories:
- Profile (login, logout and edit his profile)
- Restaurants (listing owned restaurants, create and edit them), navigate to its orders as well.
- Control panel showing business stats

De acuerdo con los requisitos, podemos clasificar las funcionalidades del propietario en las siguientes categorías:
- Perfil (iniciar sesión, cerrar sesión y editar su perfil)
- Restaurantes (listar restaurantes propios, crearlos y editarlos), navegar también a sus pedidos.
- Panel de control que muestre estadísticas del negocio

We propose to create a Tab navigation using Reactnavigation tools, and following these steps (detailed documentation can be found at: <https://reactnavigation.org/docs/bottom-tab-navigator>)

Proponemos crear una navegación por Tabs utilizando herramientas de Reactnavigation, y siguiendo estos pasos (la documentación detallada se puede encontrar en: <https://reactnavigation.org/docs/bottom-tab-navigator>)

**Explicación adicional:** Una navegación por Tabs es un patrón común en aplicaciones móviles donde el usuario puede cambiar entre diferentes secciones principales haciendo clic en pestañas ubicadas generalmente en la parte inferior de la pantalla.

0. The required react navigation dependencies were already declared in `package.json`.

0. Las dependencias requeridas de navegación de react ya se han declarado en `package.json`.

1. The following folders and files were already created:
   - The folder `src/screens`
   - One folder for each tab `src/screens/profile`, `src/screens/restaurants`, `src/screens/controlPanel`
   - For each folder we created a screen, `ProfileScreen.js`, `RestaurantsScreen.js` and `ControlPanelScreen.js`

1. Las siguientes carpetas y archivos ya fueron creados:
   - La carpeta `src/screens`
   - Una carpeta para cada pestaña `src/screens/profile`, `src/screens/restaurants`, `src/screens/controlPanel`
   - Para cada carpeta creamos una pantalla, `ProfileScreen.js`, `RestaurantsScreen.js` y `ControlPanelScreen.js`

2. In the  `src/screens/Layout.js` file a tab navigator is declared as follows:

2. En el archivo `src/screens/Layout.js` se declara un navegador de pestañas de la siguiente manera:

```Javascript
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as GlobalStyles from '../styles/GlobalStyles'
import RestaurantsStack from './restaurants/RestaurantsStack'
import ProfileStack from './profile/ProfileStack'
import ControlPanelScreen from './controlPanel/ControlPanelScreen'

const Tab = createBottomTabNavigator()

export default function Layout() {

  return (
    <>
      {fontsLoaded && (
        <NavigationContainer theme={GlobalStyles.navigationTheme}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName
                if (route.name === 'My Restaurants') {
                  iconName = 'silverware-fork-knife'
                } else if (route.name === 'Control Panel') {
                  iconName = 'view-dashboard'
                } else if (route.name === 'Profile') {
                  iconName = 'account-circle'
                }
                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    color={color}
                    size={size}
                  />
                )
              },
              headerShown: false
            })}
          >
            <Tab.Screen name="My Restaurants" component={RestaurantsStack} />
            <Tab.Screen name="Control Panel" component={ControlPanelScreen} />
            <Tab.Screen name="Profile" component={ProfileStack} />
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </>
  )
}
```

## 3. Stack navigation nested in the tab navigator

Some parts of the UI require a stack-type navigation between screens. The following video shows a stack navigator:

Algunas partes de la interfaz de usuario requieren una navegaci\u00f3n de tipo stack entre pantallas. El siguiente video muestra un navegador de stack:

<https://user-images.githubusercontent.com/19324988/155882422-5974b582-4a6e-4ad0-8df6-31b504b791e5.mov>

**Explicaci\u00f3n adicional:** La navegaci\u00f3n de stack es como un mont\u00f3n de cartas. Cuando navegas a una nueva pantalla, se a\u00f1ade al principio del mont\u00f3n. Cuando regresas, la pantalla actual se elimina del mont\u00f3n y vuelves a la pantalla anterior. Esto es lo que ves cuando presionas un bot\u00f3n \"Atr\u00e1s\" en una aplicaci\u00f3n.

0. The required react navigation dependencies were already declared in `package.json`.
1. A stack navigation example can be found at `src/screens/restaurants/RestaurantStack.js`

0. Las dependencias requeridas de navegaci\u00f3n de react ya se han declarado en `package.json`.
1. Un ejemplo de navegaci\u00f3n de stack se puede encontrar en `src/screens/restaurants/RestaurantStack.js`

```Javascript
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RestaurantDetailScreen from './RestaurantDetailScreen'
import RestaurantsScreen from './RestaurantsScreen'

const Stack = createNativeStackNavigator()

export default function RestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RestaurantsScreen"
        component={RestaurantsScreen}
        options={{
          title: 'My Restaurants'
        }}
      />
      <Stack.Screen
        name="RestaurantDetailScreen"
        component={RestaurantDetailScreen}
        options={{
          title: 'Restaurant Detail'
        }}
      />
    </Stack.Navigator>
  )
}
```

2. In order to navigate from `RestaurantsScreen` to `RestaurantDetailScreen` we need to receive the navigation object and create a button for the action. Moreover, we can pass data from one screen to another including a second parameter:

2. Para navegar desde `RestaurantsScreen` a `RestaurantDetailScreen` necesitamos recibir el objeto de navegación y crear un botón para la acción. Además, podemos pasar datos de una pantalla a otra incluyendo un segundo parámetro:

```Javascript
export default function RestaurantsScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <TextRegular style={{ fontSize: 16, alignSelf: 'center', margin: 20 }}>
        Random Restaurant
      </TextRegular>
      <Pressable
        onPress={() => {
          navigation.navigate('RestaurantDetailScreen', {
            id: Math.floor(Math.random() * 100)
          })
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? GlobalStyles.brandBlueTap
              : GlobalStyles.brandBlue
          },
          styles.actionButton
        ]}
      >
        <TextRegular textStyle={styles.text}>Restaurant Details</TextRegular>
      </Pressable>
    </View>
  )
}
```

3. We can access data passed through the route object at `RestaurantDetailScreen.js`

3. Podemos acceder a los datos pasados a través del objeto route en `RestaurantDetailScreen.js`

```Javascript
export default function RestaurantDetailScreen({ route }) {
  const { id } = route.params
  return (
    <View style={styles.container}>
      <TextRegular style={{ fontSize: 16, alignSelf: 'center', margin: 20 }}>
        Restaurant details. Id: {id}
      </TextRegular>
    </View>
  )
}
```
