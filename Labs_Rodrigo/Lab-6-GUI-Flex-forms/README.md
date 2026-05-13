# Introduction

We will learn how to design screens by using FlexBox to create our Layout. Once we understand basic Flexbox, we will design our first Form screen to create Restaurants and secondly, to create Products.

Aprenderemos a diseñar pantallas utilizando FlexBox para crear nuestro diseño. Una vez que entendamos Flexbox básico, diseñaremos nuestra primera pantalla de formulario para crear Restaurantes y, en segundo lugar, para crear Productos.

**Explicación adicional:** Flexbox es un sistema de diseño flexible que permite crear interfaces responsivas y adaptables a diferentes tamaños de pantalla. Es fundamental en React Native para lograr diseños atractivos y funcionales.

# 0. Setup

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

- Previous labs solved.
- Added button to create restaurant, and navigates to CreateRestaurantScreen.
- Added button to create product, and navigates to CreateProductScreen.
- An InputItem component that renders forms inputs, labels and manages errors.

Keep in mind that to make some API requests, it is needed to be logged-in. So **confirm that you can log-in with some owner user**. The provided user-seeder at the backend creates an owner with the following credentials:

- email: `owner1@owner.com`
- password: `secret`

Once the user is logged in, the bearer token is used in every request.

# 1. GUI Design

## 1.1. Flexbox

React native components use Flexbox algorithm to define the layout of its children. Flexbox is also available in standard CSS styles definition for web interfaces.

Los componentes nativos de React utilizan el algoritmo Flexbox para definir el diseño de sus componentes hijos. Flexbox también está disponible en la definición de estilos CSS estándar para interfaces web.

**Explicación adicional:** Flexbox es un sistema de diseño flexible que permite crear layouts responsivos. Cada elemento padre puede controlar cómo se distribuyen y alinean sus elementos hijos.

For instance, within a `View` component we can include some children, such as `Text`, `Pressable`, `Image`, `InputItems` or nested `View`. The parent `View` can define the Flexbox behaviour of these children (children of these children do not inherit these properties). The most common properties to be defined are:

Por ejemplo, dentro de un componente `View` podemos incluir algunos componentes hijos, como `Text`, `Pressable`, `Image`, `InputItems` o `View` anidados. El `View` padre puede definir el comportamiento de Flexbox de estos hijos (los hijos de estos hijos no heredan estas propiedades). Las propiedades más comunes a definir son:

- `flexDirection` which can take two values: `column` (default) if we want its children to render vertically or `row` if we want them to be rendered horizontally. Check
- `justifyContent` which can take the following values:
  - `flex-start` (default). The contents are distributed at the start of the primary axis (the flex direction determines the primary and secondary axis)
  - `center`. The contents are distributed at the center.
  - `flex-end`. The contents are distributed at the end.
  - `space-around` and `space-between` so the contentes are distributed evenly.
- `alignItems` define how the content will be aligned along the secondary axis (depending on the `flexDirection`)
  - `flex-start`,
  - `center`,
  - `flex-end`,
  - `stretch` (default) contents will be stretched to fill the space available

Los componentes React Native utilizan el algoritmo Flexbox para definir el diseño de sus elementos secundarios. Flexbox también está disponible en la definición de estilos CSS estándar para interfaces web.

Por ejemplo, dentro de un componente `View` podemos incluir algunos elementos secundarios, como `Text`, `Pressable`, `Image`, `InputItems` o `View` anidados. El `View` padre puede definir el comportamiento de Flexbox de estos elementos secundarios (los elementos secundarios de estos no heredan estas propiedades). Las propiedades más comunes a definir son:

- `flexDirection` que puede tomar dos valores: `column` (predeterminado) si queremos que sus elementos secundarios se representen verticalmente o `row` si queremos que se representen horizontalmente. 
- `justifyContent` que puede tomar los siguientes valores:
  - `flex-start` (predeterminado). Los contenidos se distribuyen al inicio del eje primario (la dirección flexible determina el eje primario y secundario)
  - `center`. Los contenidos se distribuyen en el centro.
  - `flex-end`. Los contenidos se distribuyen al final.
  - `space-around` y `space-between` para que los contenidos se distribuyan uniformemente.
- `alignItems` define cómo se alineará el contenido a lo largo del eje secundario (dependiendo de `flexDirection`)
  - `flex-start`,
  - `center`,
  - `flex-end`,
  - `stretch` (predeterminado) los contenidos se estirarán para llenar el espacio disponible

**Explicación adicional:** Flexbox funciona estableciendo dos ejes: el eje primario (determinado por flexDirection) y el eje secundario (perpendicular al primario). Las propiedades justifyContent y alignItems controlan cómo se distribuyen los elementos a lo largo de estos ejes.

You can experiment with these properties and values at the following example:
<https://snack.expo.dev/@afdez/flex-example>

Please, take your time to understand the behaviour of Flexbox algorithm.

There are some more properties that defines the Flexbox algorithm behaviour, you can learn more at: <https://reactnative.dev/docs/flexbox>

## 1.2. Views as containers

Usually we will define a general container for our components. This container will usually be a `View` component and it will determine the Flexbox behaviour of its children and the size, margins etc where we will render our elements.
Notice that the return statement must include one and only one root element. For instance this return statement would be wrong:

Generalmente definiremos un contenedor general para nuestros componentes. Este contenedor generalmente será un componente `View` y determinará el comportamiento de Flexbox de sus elementos secundarios y el tamaño, márgenes, etc. donde renderizaremos nuestros elementos.
Observe que la declaración de retorno debe incluir uno y solo un elemento raíz. Por ejemplo, esta declaración de retorno sería incorrecta:

**Explicación adicional:** React requiere que los componentes devuelvan un único elemento raíz. Si tienes múltiples elementos hermanos al nivel superior, debes envolverlos en un contenedor común como `View` o el fragmento vacío `<>`.

```JSX
return (
  <View>
    <Text>Some text</Text>
  </View>
  <View>
    <Text>Some other text</Text>
  </View>
)
```

To fix this, we must include a parent element to those siblings,for instance the empty tag `<>`:

Para solucionarlo, debemos incluir un elemento padre para esos elementos hermanos, por ejemplo la etiqueta vacía `<>`:

```JSX
return (
  <>
    <View>
      <Text>Some text</Text>
    </View>
    <View>
      <Text>Some other text</Text>
    </View>
  </>
)
```

Let's start designing the `CreateRestaurantScreen.js`.

Comencemos a diseñar `CreateRestaurantScreen.js`.

1. Include a `<View style={{ alignItems: 'center' }}>`
2. Insert some `<InputItem name='sampleInput' label='Sample input' />`
3. Check results.

You will notice that the input items are arranged from top to bottom, full width.

1. Let's modify our container, so it does not fill all the horizontal space, just 60%. To this end we will create a **nested** view width 60%: `<View style={{ width: '60%' }}>`
2. Check results
3. Include a `Pressable` button after the set of inputs.
4. Check results.

The following code snippet, includes all the previous steps:

```JSX
export default function CreateRestaurantScreen () {
  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ width: '60%' }}>
      <InputItem
        name='sampleInput'
        label='Sample input'
      />
      <InputItem
        name='sampleInput'
        label='Sample input'
      />
      <InputItem
        name='sampleInput'
        label='Sample input'
      />
      <InputItem
        name='sampleInput'
        label='Sample input'
      />
      <InputItem
        name='sampleInput'
        label='Sample input'
      />
      <InputItem
        name='sampleInput'
        label='Sample input'
      />
      <InputItem
        name='sampleInput'
        label='Sample input'
      />
      <InputItem
        name='sampleInput'
        label='Sample input'
      />
      <Pressable
        onPress={() => console.log('Button pressed')
        }
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? GlobalStyles.brandPrimaryTap
              : GlobalStyles.brandPrimary
          },
          styles.button
        ]}>
        <TextRegular textStyle={styles.text}>
          Create restaurant
        </TextRegular>
      </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
button: {
    borderRadius: 8,
    height: 40,
    padding: 10,
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginLeft: 5
  }
})
```

You may ask yourself: why was it needed to include two nested views? The reason is that the first view defines that its children have to be centered. You can check what happens if we declare just a view with both properties: `<View style={{ alignItems: 'center', width: '60%' }}>`.
Layout definition can be quite tricky sometimes, and various solutions can be found: for instance there is another property named `alignSelf`, that could have been used to this end.

## 1.3. ScrollViews

Insert more `InputItems` so they exceed the vertical space available. Notice that you cannot scroll down to see them all. `Views` are not scrollable. To this end we have to use the `<ScrollView>` component. Add a new `<ScrollView>` parent and check results. Scrolling should be enabled.

Note: Some components are an extension of `ScrollView` component. For instance, `FlatList` inherits the properties of `ScrollView`, but load contents lazily (when you have to render lots of elements, `FlatList` will be a more performant solution than `ScrollView`).

Inserta más `InputItems` para que superen el espacio vertical disponible. Observe que no puede desplazarse hacia abajo para verlos todos. `View` no son desplazables. Para ello tenemos que usar el componente `<ScrollView>`. Agregue un nuevo padre `<ScrollView>` y verifique los resultados. El desplazamiento debe estar habilitado.

Nota: Algunos componentes son una extensión del componente `ScrollView`. Por ejemplo, `FlatList` hereda las propiedades de `ScrollView`, pero carga contenidos de forma perezosa (cuando tienes que renderizar muchos elementos, `FlatList` será una solución más eficiente que `ScrollView`).

**Explicación adicional:** ScrollView es un contenedor que permite desplazarse cuando el contenido excede el espacio disponible. FlatList es más eficiente que ScrollView para listas grandes porque solo renderiza los elementos visibles.

# 2. Forms

Forms are the way of alowing users to submit data from the frontend GUI to the backend. This is needed to create new elements of our entities.
In order to create and mantain the state of the form, we will use a third party component: `<Formik>`.

Formik manages the state of the inputs within the form, and can apply validation rules to them. Formik component needs to be initialized with the names and initial values of the inputs of the form.

Los formularios son la forma de permitir que los usuarios envíen datos desde la GUI del frontend al backend. Esto es necesario para crear nuevos elementos de nuestras entidades.
Para crear y mantener el estado del formulario, usaremos un componente de terceros: `<Formik>`.

Formik administra el estado de las entradas dentro del formulario y puede aplicar reglas de validación a ellas. El componente Formik necesita inicializarse con los nombres y valores iniciales de las entradas del formulario.

**Explicación adicional:** Formik simplifica el manejo del estado del formulario y la validación. Sin él, tendrías que gestionar manualmente el estado de cada entrada y validar cada campo, lo que resultaría en mucho código repetitivo y propenso a errores.

We will learn more about Formik in the next lab. In this lab you just have to add the following parent element in the return sentence of the screens that include a form:

Aprenderemos más sobre Formik en el próximo laboratorio. En este laboratorio solo tienes que agregar el siguiente elemento padre en la declaración de retorno de las pantallas que incluyen un formulario:

```Javascript
import { Formik } from 'formik'


export default function CreateRestaurantScreen ({ navigation }) {
  const initialRestaurantValues = {
    name: null,
    description: null,
    address: null,
    postalCode: null,
    url: null,
    shippingCosts: null,
    email: null,
    phone: null,
    restaurantCategoryId: null
  }

  // Rest of the code of this component
  // ...

  return (
    <Formik
    initialValues={initialRestaurantValues}
    >
      {({ setFieldValue, values }) => (
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '60%' }}>
              <InputItem
                name='name'
                label='Name:'
              />

              {/* Any other inputs */}

            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  )
```

Forms present to the user various input fields. The most popular are:

- Text inputs: where user introduces some kind of text. It is usually the most general input, we can use it so users can include information such as: names, surnames, emails, descriptions, urls, addresses, prices, postal codes or telephones. You have been provided the `src/components/InputItem.js` component that returns:
  - A `TextInput`.
  - A label for the input.
  - Some elements needed for validation that we will use in the next lab.
- Image/File pickers: where user can select an image/file from its gallery or file system in order to upload them. You have been provided the `src/components/ImagePicker.js` component that returns:
  - A `Pressable` area that triggers the system's media library.
  - An `Image` preview that intelligently handles three states: newly selected local files, existing remote URLs from a backend, or a default placeholder.
  - A label and a visual "edit" icon to improve user experience.
  - Automatic permission handling for mobile platforms to ensure the app has access to the device's photos.
- Select/Dropdown: where users can select a value for a field from a given set of options. Typical use cases includes: select some category from the ones that exist, select some status value from a given set of possible values.
- Switches: where user is asked between two options that are typically send as a boolean.

Los formularios presentan al usuario varios campos de entrada. Los más populares son:

- Entradas de texto: donde el usuario introduce algún tipo de texto. Suele ser la entrada más general, podemos usarla para que los usuarios incluyan información como: nombres, apellidos, correos electrónicos, descripciones, URL, direcciones, precios, códigos postales o números de teléfono. Se le ha proporcionado el componente `src/components/InputItem.js` que devuelve:
  - Un `TextInput`.
  - Una etiqueta para la entrada.
  - Algunos elementos necesarios para la validación que usaremos en el próximo laboratorio.
- Selectores de imagen/archivo: donde el usuario puede seleccionar una imagen/archivo de su galería o sistema de archivos para cargarlos. Se le ha proporcionado el componente `src/components/ImagePicker.js` que devuelve:
  - Un área `Pressable` que desencadena la biblioteca de medios del sistema.
  - Una vista previa de `Image` que maneja inteligentemente tres estados: archivos locales recién seleccionados, URL remotas existentes desde un backend o un marcador de posición predeterminado.
  - Una etiqueta y un icono visual de "edición" para mejorar la experiencia del usuario.
  - Manejo automático de permisos para plataformas móviles para asegurar que la aplicación tiene acceso a las fotos del dispositivo.
- Seleccionar/Desplegable: donde los usuarios pueden seleccionar un valor para un campo de un conjunto dado de opciones. Los casos de uso típicos incluyen: seleccionar alguna categoría de las que existen, seleccionar algún valor de estado de un conjunto dado de valores posibles.
- Conmutadores: donde se pide al usuario que elija entre dos opciones que generalmente se envían como un booleano.

**Explicación adicional:** Cada tipo de campo de entrada tiene un propósito específico. Los campos de texto son versátiles, los selectores de imagen permiten multimedia, los desplegables reducen errores con opciones predefinidas, y los conmutadores ofrecen una forma intuitiva de configurar valores booleanos.

## 2.1 CreateRestaurant Form

### 2.1.1 Text inputs

Modify the CreateRestaurantScreen so the user is presented with the needed text inputs for the creation of new restaurants including:

- `name`
- `description`
- `address`
- `postalCode`
- `url`
- `shippingCosts`
- `email`
- `phone`

Notice that `InputItem` can receive the following properties:

- `name`: the name of the field. **It has to match the name of the field expected at the backend.**
- `label`: the text presented to the user so it will be rendered among the text input.
- Other properties: any other property available for the react-native `TextInput`component. For instance, the `placeholder` property will render a hint in the input so the user can better understand what kind of value is expected. You can see the full `TextInput` reference at: <https://reactnative.dev/docs/textinput>

Modifica CreateRestaurantScreen para que se presenten al usuario las entradas de texto necesarias para la creación de nuevos restaurantes incluyendo:

- `name`
- `description`
- `address`
- `postalCode`
- `url`
- `shippingCosts`
- `email`
- `phone`

Observe que `InputItem` puede recibir las siguientes propiedades:

- `name`: el nombre del campo. **Debe coincidir con el nombre del campo esperado en el backend.**
- `label`: el texto presentado al usuario para que se represente entre la entrada de texto.
- Otras propiedades: cualquier otra propiedad disponible para el componente `TextInput` de react-native. Por ejemplo, la propiedad `placeholder` renderizará una sugerencia en la entrada para que el usuario pueda entender mejor qué tipo de valor se espera. Puede ver la referencia completa de `TextInput` en: <https://reactnative.dev/docs/textinput>

**Explicación adicional:** El atributo `name` es crucial porque React lo utiliza para asociar el campo con el estado de Formik. El backend espera recibir datos con estos nombres exactos de campo.

### 2.1.2 Image pickers

Restaurants can be created including images, such as a **logo** and a **heroImage** (used as a background in the `RestaurantDetailScreen`). To simplify this process, the logic for handling permissions, gallery access, and image previewing has been encapsulated into a reusable component.

To include an image picker for the restaurant images, follow these steps:

1. **Import the custom component and default assets:**
    Notice that we already provided the import of the `ImagePicker` component and the local images that will serve as placeholders when no image has been selected yet.

    ```javascript
    import ImagePicker from '../../../components/ImagePicker'
    import restaurantLogo from '../../../assets/restaurantLogo.jpeg'
    import restaurantBackground from '../../../assets/restaurantBackground.jpeg'
    ```

2. **Use the ImagePicker component:**
    Instead of manually managing `useEffect` hooks for permissions or defining `pickImage` functions in every screen, you can now simply use the `<ImagePicker />` component. This component internally handles system permissions, launches the gallery, and manages the conditional rendering of the image source.

    You can include the following code snippet within your form:

    ```jsx
    <ImagePicker
      label="Logo:"
      image={values.logo}
      defaultImage={restaurantLogo}
      onImagePicked={result => setFieldValue('logo', result)}
    />
    <ImagePicker
      label="Hero Image:"
      image={values.heroImage}
      defaultImage={restaurantBackground}
      onImagePicked={result => setFieldValue('heroImage', result)}
    />
    ```

3. **Understanding the Props:**
    The component is designed to be highly adaptive for both **creation** and **edition** screens:
    - **`label`**: The text displayed above the picker.
    - **`image`**: The current state value. It intelligently handles two formats: a newly picked image object (with an `assets` array) or a simple string URL (when loading data from the backend).
    - **`defaultImage`**: The local asset used as a fallback if no image is currently selected.
    - **`onImagePicked`**: A callback function that receives the result from the picker to update your state or form values (e.g., using Formik's `setFieldValue`).

Los restaurantes se pueden crear incluyendo imágenes, como un **logo** e **heroImage** (utilizado como fondo en `RestaurantDetailScreen`). Para simplificar este proceso, la lógica para manejar permisos, acceso a la galería y vista previa de imágenes se ha encapsulado en un componente reutilizable.

Para incluir un selector de imágenes para las imágenes del restaurante, siga estos pasos:

1. **Importa el componente personalizado y los activos predeterminados:**
    Observe que ya proporcionamos la importación del componente `ImagePicker` y las imágenes locales que servirán como marcadores de posición cuando no se haya seleccionado ninguna imagen.

    ```javascript
    import ImagePicker from '../../../components/ImagePicker'
    import restaurantLogo from '../../../assets/restaurantLogo.jpeg'
    import restaurantBackground from '../../../assets/restaurantBackground.jpeg'
    ```

2. **Usar el componente ImagePicker:**
    En lugar de administrar manualmente hooks `useEffect` para permisos o definir funciones `pickImage` en cada pantalla, ahora puede simplemente usar el componente `<ImagePicker />`. Este componente maneja internamente permisos del sistema, lanza la galería y administra la representación condicional de la fuente de la imagen.

    Puede incluir el siguiente fragmento de código dentro de su formulario:

    ```jsx
    <ImagePicker
      label="Logo:"
      image={values.logo}
      defaultImage={restaurantLogo}
      onImagePicked={result => setFieldValue('logo', result)}
    />
    <ImagePicker
      label="Hero Image:"
      image={values.heroImage}
      defaultImage={restaurantBackground}
      onImagePicked={result => setFieldValue('heroImage', result)}
    />
    ```

3. **Entendiendo los props:**
    El componente está diseñado para ser altamente adaptable tanto para pantallas de **creación** como de **edición**:
    - **`label`**: El texto mostrado encima del selector.
    - **`image`**: El valor de estado actual. Maneja inteligentemente dos formatos: un objeto de imagen recién seleccionado (con un array `assets`) o una URL de cadena simple (cuando se cargan datos desde el backend).
    - **`defaultImage`**: El activo local utilizado como alternativa si no hay una imagen seleccionada actualmente.
    - **`onImagePicked`**: Una función de devolución de llamada que recibe el resultado del selector para actualizar el estado o los valores del formulario (por ejemplo, usando `setFieldValue` de Formik).

**Explicación adicional:** El componente ImagePicker abstrae toda la complejidad de manejo de permisos y selección de imágenes. Esto permite que el código del formulario sea más limpio y enfocado en la lógica del negocio en lugar de detalles técnicos de bajo nivel.

> [!NOTE]
> The component automatically requests **Media Library Permissions** when it mounts on mobile devices. If permissions are denied, an alert will notify the user that the feature requires access to the camera roll.
>
### 2.1.4. CreateRestaurantScreen.js

<details>
  <summary>
Click here to check the complete CreateRestaurantScreen component:
  </summary>

```JSX
import { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { getRestaurantCategories } from '../../api/RestaurantEndpoints'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import * as GlobalStyles from '../../styles/GlobalStyles'
import restaurantLogo from '../../../assets/restaurantLogo.jpeg'
import restaurantBackground from '../../../assets/restaurantBackground.jpeg'
import { showMessage } from 'react-native-flash-message'
import { Formik } from 'formik'
import ImagePicker from '../../components/ImagePicker'

export default function CreateRestaurantScreen({ navigation }) {

  const initialRestaurantValues = {
    name: null,
    description: null,
    address: null,
    postalCode: null,
    url: null,
    shippingCosts: null,
    email: null,
    phone: null,
    restaurantCategoryId: null
  }
  return (
    <Formik
      initialValues={initialRestaurantValues}
    >
      {({ setFieldValue, values }) => (
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '60%' }}>
              <InputItem name="name" label="Name:" />
              <InputItem name="description" label="Description:" />
              <InputItem name="address" label="Address:" />
              <InputItem name="postalCode" label="Postal code:" />
              <InputItem name="url" label="Url:" />
              <InputItem name="shippingCosts" label="Shipping costs:" />
              <InputItem name="email" label="Email:" />
              <InputItem name="phone" label="Phone:" />


              <ImagePicker
                label="Logo:"
                image={values.logo}
                defaultImage={restaurantLogo}
                onImagePicked={result => setFieldValue('logo', result)}
              />

              <ImagePicker
                label="Hero Image:"
                image={values.heroImage}
                defaultImage={restaurantBackground}
                onImagePicked={result => setFieldValue('heroImage', result)}
              />

             

              <Pressable
                onPress={() => console.log('Submit pressed')}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? GlobalStyles.brandSuccessTap
                      : GlobalStyles.brandSuccess
                  },
                  styles.button
                ]}
              >
                <View
                  style={[
                    { flex: 1, flexDirection: 'row', justifyContent: 'center' }
                  ]}
                >
                  <MaterialCommunityIcons
                    name="content-save"
                    color={'white'}
                    size={20}
                  />
                  <TextRegular textStyle={styles.text}>Save</TextRegular>
                </View>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 40,
    padding: 10,
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginLeft: 5
  },
  imagePicker: {
    height: 40,
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 80
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 5
  }
})
```

</details>

## 2.2. CreateProduct Form

Now, follow and adapt the steps given for the `CreateRestaurantScreen` component in order to create a new product for a selected restaurant. Complete the `CreateProductScreen.js` component. Remember the needed properties when creating a product:

- `name`,
- `description`,
- `price`,
- `image`,
- `order` (remember, we can define the position where each product will be in the returned product list when querying restaurant details),
- `productCategory`,
- `availability`

Ahora, sigue y adapta los pasos dados para el componente `CreateRestaurantScreen` para crear un nuevo producto para un restaurante seleccionado. Completa el componente `CreateProductScreen.js`. Recuerda las propiedades necesarias al crear un producto:

- `name`,
- `description`,
- `price`,
- `image`,
- `order` (recuerda, podemos definir la posición donde cada producto estará en la lista de productos devuelta al consultar detalles del restaurante),
- `productCategory`,
- `availability`

**Explicación adicional:** El proceso para crear un formulario de producto es muy similar al del restaurante. La diferencia principal es que el producto incluye propiedades como `order` que permite controlar su posición en la lista, y `availability` para indicar si está disponible o no.

# 3. Other form input components

Restaurants and products can belong to some categories. Include a select input to allow the user to select from available values of RestaurantCategories and from valid statuses when creating a new restaurant.

Los restaurantes y productos pueden pertenecer a algunas categorías. Incluya una entrada de selección para permitir que el usuario seleccione entre valores disponibles de RestaurantCategories y entre estados válidos al crear un nuevo restaurante.

**Explicación adicional:** Las categorías son datos predeterminados del sistema (como "Comida Rápida", "Restaurante Fino", etc.) que el usuario debe seleccionar de una lista, no escribir manualmente. Esto garantiza la consistencia de los datos.

### 3.1 Select/Dropdown picker

React native does not provide a Dropdown picker component, so we will use a third party component. You can check the documentation at: <https://hossein-zare.github.io/react-native-dropdown-picker-website/>

In the `CreateRestaurantScreen` form we will use the dropdown to select the restaurant category.

Remember that the options of `DropDownPicker` are a list of pairs value/label. For instance the restaurant categories would be the pair `value: restaurantCategoryId, label: restaurantCategoryName`.

In order to populate the options of the `DropDownPicker` we need:

React Native no proporciona un componente Dropdown picker, por lo que usaremos un componente de terceros. Puede consultar la documentación en: <https://hossein-zare.github.io/react-native-dropdown-picker-website/>

En el formulario `CreateRestaurantScreen` usaremos el desplegable para seleccionar la categoría del restaurante.

Recuerda que las opciones de `DropDownPicker` son una lista de pares valor/etiqueta. Por ejemplo, las categorías de restaurante serían el par `value: restaurantCategoryId, label: restaurantCategoryName`.

Para completar las opciones de `DropDownPicker` necesitamos:

**Explicación adicional:** El componente DropDownPicker es externo porque React Native no incluye un componente de selección nativo. Necesita dos propiedades clave: `value` (el valor seleccionado) y `items` (la lista de opciones disponibles).

1. Import the `DropDownPicker`component:

   ```Javascript
    import DropDownPicker from 'react-native-dropdown-picker'
   ```

1. A state to store the restaurant categories:

   ```Javascript
   const [restaurantCategories, setRestaurantCategories] = useState([])
   ```

1. A boolean state to set if the option list of the `DropDownPicker` are visible or not:

   ```Javascript
   const [open, setOpen] = useState(false)
   ```

1. A `useEffect` hook to retrieve the restaurant categories from backend:

   ```Javascript
   useEffect(() => {
    async function fetchRestaurantCategories() {
      try {
        const fetchedRestaurantCategories = await getRestaurantCategories()
        const fetchedRestaurantCategoriesReshaped =
          fetchedRestaurantCategories.map(e => {
            return {
              label: e.name,
              value: e.id
            }
          })
        setRestaurantCategories(fetchedRestaurantCategoriesReshaped)
      } catch (error) {
        showMessage({
          message: `There was an error while retrieving restaurant categories. ${error} `,
          type: 'error',
          style: GlobalStyles.flashStyle,
          titleStyle: GlobalStyles.flashTextStyle
        })
      }
    }
    fetchRestaurantCategories()
  }, [])
   ```

1. Finally, we have to add the component in the `return` sentence of the `CreateRestaurantScreen` component. Find below a code snippet to add a `DropDownPicker` component for restaurant categories:

   ```JSX
   <DropDownPicker
      open={open}
      value={values.restaurantCategoryId}
      items={restaurantCategories}
      setOpen={setOpen}
      onSelectItem={item => {
        setFieldValue('restaurantCategoryId', item.value)
      }}
      setItems={setRestaurantCategories}
      placeholder="Select the restaurant category"
      containerStyle={{ height: 40, marginTop: 20 }}
      style={{ backgroundColor: GlobalStyles.brandBackground }}
      dropDownStyle={{ backgroundColor: '#fafafa' }}
    />
   ```

Similarly, when creating a new product, include a select input to select from ProductCategories.

### 3.2. Switch

Moreover, products can be available or not, we can add a radio or switch control to the `CreateProduct` Form. React native provides a Switch component. You can check the documentation at: <https://reactnative.dev/docs/switch>

First, you have to add the `Switch` component to the import statement of the react-native components:

```Javascript
import { Image, Platform, Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native'
```

Find below a code snippet for including a `Switch` component for the product availability:

Además, los productos pueden estar disponibles o no, podemos agregar un control de radio o conmutador al formulario `CreateProduct`. React Native proporciona un componente Switch. Puede consultar la documentación en: <https://reactnative.dev/docs/switch>

Primero, debe agregar el componente `Switch` a la declaración de importación de los componentes react-native:

```Javascript
import { Image, Platform, Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native'
```

A continuación, encontrará un fragmento de código para incluir un componente `Switch` para la disponibilidad del producto:

**Explicación adicional:** El componente Switch proporciona una forma intuitiva y nativa de los dispositivos para que los usuarios alterne entre dos estados (disponible/no disponible, activo/inactivo, etc.).

```JSX
<TextRegular>Is it available?</TextRegular>
<Switch
  trackColor={{
    false: GlobalStyles.brandSecondary,
    true: GlobalStyles.brandPrimary
  }}
  thumbColor={
    values.availability ? GlobalStyles.brandSecondary : '#f4f3f4'
  }
  value={values.availability}
  style={styles.switch}
  onValueChange={value => setFieldValue('availability', value)}   // si la función es más compleja, podemos invocar otra función así onValueChange={toggleSwitch}

/>
```

And you can add some styling to your StyleSheet:

```Javascript
switch: {
  marginTop: 20
}
```
