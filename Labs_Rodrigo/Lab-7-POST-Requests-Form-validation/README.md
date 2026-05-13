# Introduction

During this lab first, we will learn how to validate forms with formik and yup. Secondly, we will learn how to perform POST requests to the backend.

Durante este laboratorio primero, aprenderemos a validar formularios con formik y yup. En segundo lugar, aprenderemos cómo realizar solicitudes POST al backend.

**Explicación adicional:** La validación de formularios en el frontend es crucial para mejorar la experiencia del usuario. Formik y yup son librerías populares que automatizan este proceso y hacen el código más limpio y mantenible.

Durante este laboratorio, primero aprenderemos cómo validar formularios con formik y yup. En segundo lugar, aprenderemos cómo realizar solicitudes POST al backend.

**Explicación adicional:** Formik y Yup son bibliotecas estándar en la comunidad de React para validación de formularios. Formik maneja el estado del formulario y Yup define las reglas de validación que deben cumplirse antes de enviar los datos.

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

Open a terminal a run `npm run install:all:bash` (`npm run install:all:bash` for Windows OS) to install dependencies. A folder `node_modules` will be created under the `DeliverUS-Backend` and `DeliverUS-Frontend` folders.

Once you should setup your .env file for DeliverUS-Backend project. API_BASE_URL must points to your server. For instance `API_BASE_URL=http://localhost:3000`.

You have to run the backend server as well. Go to your global project folder and run `start:backend`.

You can then run `start:frontend`. Check that the base project is working.

It is important to notice that this base project includes:

- Previous labs solved, including creating restaurant and products forms (lacks from performing validation and requests to backend)
- Needed packages for validate forms, Formik and yup, added to package.json

Keep in mind that to make some API requests, it is needed to be logged-in. So confirm that you can log-in with some owner user. The provided user-seeder at the backend creates an owner with the following credentials:

email: owner1@owner.com
password: secret
Once the user is logged in, the bearer token is used in every request.

# 1. CreateRestaurant Form validation

Forms have to be validated at front-end before submission is done to backend. Validation should check if the filled data matches the requirements set in the various form inputs. For instance: an input for email should contain a valid email, or password should have a minimum size, or some input is required.

Los formularios deben validarse en el frontend antes de que se envíen al backend. La validación debe verificar si los datos ingresados cumplen con los requisitos establecidos en las diversas entradas del formulario. Por ejemplo: una entrada de correo electrónico debe contener un correo válido, o la contraseña debe tener un tamaño mínimo, o alguna entrada es requerida.

**Explicación adicional:** Validar en el cliente mejora la experiencia del usuario al proporcionar retroalimentación inmediata. Sin embargo, siempre debes validar también en el servidor, ya que el cliente puede ser manipulado.

To this end, we will use the most popular package for validation in React and React Native projects named Formik. See the general docs for Formik React <https://formik.org/docs/overview> and the guide for using it in React-native <https://formik.org/docs/guides/react-native>.

Validation rules could be handwritten or we can use another package. Formik recommend using Yup package for schema validation rules. These can include various rules such as: required, email, strings, numbers, dates or default values. See documentation of Yup package <https://github.com/jquense/yup>.

Para ello, utilizaremos el paquete más popular para la validación en proyectos React y React Native llamado Formik. Consulta la documentación general de Formik React <https://formik.org/docs/overview> y la guía para usarlo en React-native <https://formik.org/docs/guides/react-native>.

Las reglas de validación pueden escribirse manualmente o podemos usar otro paquete. Formik recomienda usar el paquete Yup para reglas de validación de esquemas. Estas pueden incluir varias reglas como: requerido, email, strings, números, fechas o valores por defecto. Ver documentación del paquete Yup <https://github.com/jquense/yup>.

**Explicación adicional:** Formik es una librería que simplifica el manejo del estado de formularios, mientras que Yup proporciona un sistema flexible para definir reglas de validación de forma declarativa.

Los formularios deben validarse en el frontend antes de que se envíe la solicitud al backend. La validación debe verificar si los datos completados cumplen con los requisitos establecidos en las diversas entradas del formulario. Por ejemplo: una entrada de correo electrónico debe contener un correo válido, o una contraseña debe tener un tamaño mínimo, o alguna entrada es requerida.

Para ello, usaremos el paquete más popular para validación en proyectos React y React Native llamado Formik. Consulte la documentación general de Formik React <https://formik.org/docs/overview> y la guía para usarlo en React-native <https://formik.org/docs/guides/react-native>.

Las reglas de validación podrían escribirse a mano o podemos usar otro paquete. Formik recomienda usar el paquete Yup para reglas de validación de esquema. Estos pueden incluir varias reglas como: requerido, correo electrónico, cadenas, números, fechas o valores predeterminados. Ver documentación del paquete Yup <https://github.com/jquense/yup>.

**Explicación adicional:** La validación en el frontend mejora la experiencia del usuario al proporcionar retroalimentación inmediata. Sin embargo, siempre debes validar también en el backend porque el cliente puede ser manipulado.

We will include the validation for the `CreateRestaurantScreen` form by following these steps:

Incluiremos la validación para el formulario `CreateRestaurantScreen` siguiendo estos pasos:

**Explicación adicional:** Cada paso se construye sobre el anterior, comenzando con importaciones, luego definiendo valores iniciales, reglas de validación, y finalmente integrando todo en el componente Formik.

1. Complete the import sentences of Formik and ErrorMessage from 'formik', and yup from yup as follows:

   ```Javascript
   import { ErrorMessage, Formik } from 'formik'
   import * as yup from 'yup'
   ```

1. Completa las declaraciones de importación de Formik y ErrorMessage de 'formik', y yup de yup de la siguiente manera:

   ```Javascript
   import { ErrorMessage, Formik } from 'formik'
   import * as yup from 'yup'
   ```

1. Keep in mind that Formik needs to be fed with an object of the initial values of the form inputs as follows:. Remember that these names has to match the ones that the backend expects when creating a Restaurant:

1. Recuerda que Formik necesita ser alimentado con un objeto de los valores iniciales de las entradas del formulario de la siguiente manera:. Recuerda que estos nombres deben coincidir con los que el backend espera al crear un Restaurante:

   ```Javascript
   const initialRestaurantValues = { name: null, description: null, address: null, postalCode: null, url: null, shippingCosts: null, email: null, phone: null, restaurantCategoryId: null }

   ```

1. Define a new validationSchema object by using yup rules. This validationSchema will be used by Formik to check the validity of the fields. You can use the following code snippet.

1. Define un nuevo objeto validationSchema usando reglas yup. Este validationSchema será utilizado por Formik para verificar la validez de los campos. Puedes usar el siguiente fragmento de código.

   ```Javascript
   const validationSchema = yup.object().shape({
    name: yup.string().max(255, 'Name too long').required('Name is required'),
    address: yup
      .string()
      .max(255, 'Address too long')
      .required('Address is required'),
    postalCode: yup
      .string()
      .max(255, 'Postal code too long')
      .required('Postal code is required'),
    url: yup.string().nullable().url('Please enter a valid url'),
    shippingCosts: yup
      .number()
      .positive('Please provide a valid shipping cost value')
      .required('Shipping costs value is required'),
    email: yup.string().nullable().email('Please enter a valid email'),
    phone: yup.string().nullable().max(255, 'Phone too long'),
    restaurantCategoryId: yup
      .number()
      .positive()
      .integer()
      .required('Restaurant category is required')
     })
   ```

   Notice that:

   - There should be a property named after each of the form inputs that needs validation.
   - Rules defined above include: a type of data that is expected (string, or number for instance), the length of strings, if a number can be negative or not, and if an input is required .
   - If the field does not follow any of these rules, the message passed to each rule should be shown to the user. For instance, if the shippingCosts is not a positive number, the message _Please provide a valid shipping cost value_ will be shown.

   Observa que:

   - Debe haber una propiedad nombrada después de cada una de las entradas del formulario que necesita validación.
   - Las reglas definidas anteriormente incluyen: un tipo de dato que se espera (cadena o número, por ejemplo), la longitud de las cadenas, si un número puede ser negativo o no, y si una entrada es requerida.
   - Si el campo no sigue ninguna de estas reglas, el mensaje pasado a cada regla debe mostrarse al usuario. Por ejemplo, si shippingCosts no es un número positivo, se mostrará el mensaje _Please provide a valid shipping cost value_.

   **Explicación adicional:** Cada regla yup valida un aspecto específico del campo. Las reglas se evalúan en orden y la validación se detiene en la primera que falla. El mensaje personalizado en cada regla es lo que verá el usuario cuando el valor no sea válido.

1. Remember that the inputs have to be nested under the `Formik` component. Add the following:

1. Recuerda que las entradas tienen que estar anidadas bajo el componente `Formik`. Agrega lo siguiente:

   ```JSX
   <Formik
     validationSchema={validationSchema}
     initialValues={initialRestaurantValues}
     onSubmit={createRestaurant}>
     {({ handleSubmit, setFieldValue, values }) => (
       <ScrollView>
         /* Your views, form inputs, submit button/pressable */
       </ScrollView>
     )}
   </Formik>
   ```

   It is important to understand how the `Formik` component works. The Formik component is in charge of handling the form values, validation, errors and submission. To this end we have to define the following properties:

   Es importante entender cómo funciona el componente `Formik`. El componente Formik es responsable de manejar los valores del formulario, validación, errores y envío. Para ello tenemos que definir las siguientes propiedades:

   - `validationSchema`: the validation rules, usually a yup object.
   - `initialValues`: the initial values given to each of the form inputs.
   - `onSubmit`: the function to be called when the inserted form values pass the validation. Usually we will call a function that will be in charge of preparing the data and using a creation endpoint for the entity. We will learn how to POST data to the backend later. At this moment we will just print the values in console.

   - `validationSchema`: las reglas de validación, generalmente un objeto yup.
   - `initialValues`: los valores iniciales dados a cada una de las entradas del formulario.
   - `onSubmit`: la función a llamar cuando los valores del formulario insertados pasan la validación. Generalmente llamaremos a una función que será responsable de preparar los datos y usar un endpoint de creación para la entidad. Aprenderemos cómo POST datos al backend más tarde. En este momento solo imprimiremos los valores en la consola.

   **Explicación adicional:** Formik actúa como contenedor de lógica para el formulario. Recibe la validationSchema para saber cómo validar, los initialValues como punto de partida, y onSubmit para saber qué hacer cuando el usuario envía datos válidos.

     ```Javascript
     const createRestaurant = async (values) => {
       //later we will call a method to perform a POST request
       console.log(values)
     }
     ```

   - `handleSubmit`: is the function that triggers the validation. It has to be called when the user presses the submission button.
   - `values`: is the array of elements that represents the state of the form.
   - `setFieldValue`: sometimes we will have to manually handle the storage of field values. This is a function that receives as first parameter the name of the field, and as second parameter the value for that field. It will be needed for non standard `InputItems` such as `Dropdown/select` input controls.

1. Next, we need to modify the behaviour of some components so they use the values object properties handled by `Formik`.

1. A continuación, tenemos que modificar el comportamiento de algunos componentes para que utilicen las propiedades del objeto values manejado por `Formik`.

   - Notice how the `DropDownPicker` properties are defined:

   - Observa cómo se definen las propiedades de `DropDownPicker`:

     ```JSX
     <DropDownPicker
       open={open}
       value={values.restaurantCategoryId}
       items={restaurantCategories}
       setOpen={setOpen}
       onSelectItem={ item => {
         setFieldValue('restaurantCategoryId', item.value)
       }}
       setItems={setRestaurantCategories}
       placeholder='Select the restaurant category'
       containerStyle={{ height: 40, marginTop: 20 }}
       style={{ backgroundColor: GlobalStyles.brandBackground }}
       dropDownStyle={{ backgroundColor: '#fafafa' }}
     />
     ```

   - `InputItem` is a component the includes the error handling. However, non-standard input controls from 3rd parties don't handle `Formik` errors. For instance, `Dropdown picker` does not handle these errors, so add the following `<ErrorMessage>` component following the dropdown picker:

   - `InputItem` es un componente que incluye el manejo de errores. Sin embargo, los controles de entrada no estándar de terceros no manejan errores de `Formik`. Por ejemplo, `Dropdown picker` no maneja estos errores, por lo que agrega el siguiente componente `<ErrorMessage>` después del selector de desplegable:

   **Explicación adicional:** InputItem maneja automáticamente los mensajes de error de Formik, pero los componentes de terceros como DropDownPicker no lo hacen, por lo que necesitamos agregar ErrorMessage manualmente para mantener la consistencia visual.

     ```JSX
       <ErrorMessage
         name={'restaurantCategoryId'}
         render={msg => <TextError>{msg}</TextError>}
       />
     ```

1. Next, we need to modify the final `<Pressable>` component to call the `handleSubmit` method. Modify the `onPress` handler definition: `onPress={handleSubmit}`

1. A continuación, tenemos que modificar el componente `<Pressable>` final para llamar al método `handleSubmit`. Modifica la definición del manejador `onPress`: `onPress={handleSubmit}`

Check that the validation now works and shows to the user the validation rules broken. Notice that these errors are handled and rendered in the `InputItem` component provided, or the `ErrorMessage` added after the `DropdownPicker`.

Verifica que la validación ahora funciona y muestra al usuario las reglas de validación incumplidas. Observe que estos errores se manejan y se representan en el componente `InputItem` proporcionado, o en el `ErrorMessage` agregado después de `DropdownPicker`.

Fill the form with valid values and check if they are printed in the console when pressing the last `pressable` labeled with _Save_.

Completa el formulario con valores válidos y verifica si se imprimen en la consola cuando presionas el último `pressable` etiquetado como _Save_.

**Explicación adicional:** La validación es acumulativa: todos los campos deben validarse correctamente antes de que handleSubmit ejecute la función onSubmit. Si hay algún error, Formik no llamará a onSubmit y mostrará los mensajes de error en su lugar.

# 2. POST Request to create a restaurant

Backend provides a POST endpoint to create a restaurant. Notice that handling of images and files is already solved at frontend and backend in various provided artifacts. To include the POST request to your project, you can follow these steps:

El backend proporciona un endpoint POST para crear un restaurante. Observe que el manejo de imágenes y archivos ya está resuelto en frontend y backend en varios artefactos proporcionados. Para incluir la solicitud POST en su proyecto, puede seguir estos pasos:

**Explicación adicional:** Los archivos de imágenes se manejan de forma especial en solicitudes HTTP. El proyecto ya tiene la infraestructura para esto, así que solo necesitas enfocarte en los datos del formulario.

1.  Add new endpoint
    In order to create a restaurant, we have to perform a `POST` request to `/restaurants`. `ApiRequestHelper` includes a `post` function that help us with this, we just need to provide the route and the data to be posted. To this end, include the following at the `RestaurantEndpoints.js` file:

El backend proporciona un endpoint POST para crear un restaurante. Observe que el manejo de imágenes y archivos ya se ha resuelto en el frontend y backend en varios artefactos proporcionados. Para incluir la solicitud POST en su proyecto, puede seguir estos pasos:

1.  Agregar nuevo endpoint
    Para crear un restaurante, tenemos que realizar una solicitud `POST` a `/restaurants`. `ApiRequestHelper` incluye una función `post` que nos ayuda con esto, solo tenemos que proporcionar la ruta y los datos a publicar. Para ello, incluya lo siguiente en el archivo `RestaurantEndpoints.js`:

   **Explicación adicional:** Una solicitud POST se usa para crear nuevos recursos en el servidor. La función post() de ApiRequestHelper maneja automáticamente los encabezados HTTP y la serialización de datos.
      ```Javascript
            function create (data) {
             return post('restaurants', data)
           }
      ```

   Remember to import the `post` function from `ApiRequestHelper` and export the `create` function as well.

    Recuerda importar la función `post` desde `ApiRequestHelper` y también exportar la función `create`.

1.  Implement `createRestaurant` function at `CreateRestaurantScreen.js` file.
    In the previous exercise we just printed the values in the console. Now we need to make the API POST request. To this end keep in mind that:

1.  Implementa la función `createRestaurant` en el archivo `CreateRestaurantScreen.js`.
    En el ejercicio anterior solo imprimimos los valores en la consola. Ahora necesitamos hacer la solicitud POST de la API. Para ello tenga en cuenta que:

    - Errors can occur at backend, so we need to handle the backend response to check if some errors ocurred.
    - I/O operations can freeze the interface so we need to handle with promises. The cleanest way of doing so is to declare the function `async` and using `await` when calling to the API.
    - Once the restaurant is created we may navigate to the `RestaurantsScreen`. You will need to declare the {route} param at the component level, and you will need to navigate including some information, so the RestaurantScreen will refresh the restaurant list and therefore the newly created restaurant is listed.
      To address these issues, we propose the following code snippet:

    - Los errores pueden ocurrir en el backend, por lo que necesitamos manejar la respuesta del backend para verificar si ocurrieron errores.
    - Las operaciones de E/S pueden congelar la interfaz, por lo que necesitamos manejar promesas. La forma más limpia de hacerlo es declarar la función como `async` y usar `await` al llamar a la API.
    - Una vez que se crea el restaurante, podemos navegar a `RestaurantsScreen`. Necesitarás declarar el parámetro {route} a nivel de componente, y necesitarás navegar incluyendo información, por lo que RestaurantScreen actualizará la lista de restaurantes y el restaurante recién creado se enumerará.
      Para abordar estos problemas, proponemos el siguiente fragmento de código:

    **Explicación adicional:** Las funciones async/await permiten escribir código que se ve síncrono pero que realmente es asíncrono. El try/catch maneja errores tanto de la red como del backend de manera elegante.
      const createRestaurant = async values => {
        setBackendErrors([])
        try {
          const createdRestaurant = await create(values)
          showMessage({
            message: `Restaurant ${createdRestaurant.name} successfully created`,
            type: 'success',
            style: GlobalStyles.flashStyle,
            titleStyle: GlobalStyles.flashTextStyle
          })
          navigation.navigate('RestaurantsScreen') // we will add this parameter in the future: { dirty: true })
        } catch (error) {
          console.log(error)
          setBackendErrors(error.errors)
        }
      }

      ```

    Moreover, we will need to store backend errors that eventually are returned in a state variable:

    Además, necesitaremos almacenar errores del backend que eventualmente se devuelven en una variable de estado:

    ```Javascript
    const [backendErrors, setBackendErrors] = useState()
    ```

    And finally, we will need to show backendErrors if present. To do so, we can add the following at the end of the form, just before the last _Save_ `Pressable`:

    Y finalmente, necesitaremos mostrar backendErrors si están presentes. Para hacerlo, podemos agregar lo siguiente al final del formulario, justo antes del último `Pressable` _Save_:

    ```JSX
    {backendErrors &&
      backendErrors.map((error, index) => (
        <TextError key={index}>
          {error.param}-{error.msg}
        </TextError>
    ))}
    ```

    See the _Annex: Conditional Rendering_ for an explanation on the code above.

    Ver el _Anexo: Renderizado Condicional_ para una explicación del código anterior.

    **Explicación adicional:** El backend devuelve errores específicos de validación que el frontend no puede detectar (como "ese email ya está registrado"). Almacenarlos en estado y mostrarlos al usuario proporciona retroalimentación útil.

## 2.1. Refreshing the restaurant list
Once a new restaurant has been created, we need to refresh the Restaurants list at `RestaurantsScreen`. To this end, we will trigger the 'useEffect' not only when the `loggedInUser` variable changes, but also, when we navigate to this screen (specially when we navigate after creating a new restaurant).

To this end, we need to:
* add the `{route}` as a component prop at `RestaurantsScreen.js`:

## 2.1. Actualizando la lista de restaurantes
Una vez que se ha creado un nuevo restaurante, necesitamos actualizar la lista de Restaurantes en `RestaurantsScreen`. Para ello, dispararemos el 'useEffect' no solo cuando cambia la variable `loggedInUser`, sino también cuando navegamos a esta pantalla (especialmente cuando navegamos después de crear un nuevo restaurante).

Para ello, necesitamos:
* agregar `{route}` como un prop de componente en `RestaurantsScreen.js`:

**Explicación adicional:** Agregar `route` como dependencia del useEffect permite que se vuelva a ejecutar cada vez que navegamos a la pantalla, asegurando que siempre veamos los datos más recientes.

  ```javascript
    export default function RestaurantsScreen({ navigation, route })
    ```

* add another trigger variable to the `useEffect` that queries the restaurant list. At the moment it was triggered if `loggedInUser` was changed, now add the route param as follows:

* agregar otra variable de disparo al `useEffect` que consulta la lista de restaurantes. En el momento fue activado si `loggedInUser` fue cambiado, ahora agregue el parámetro route de la siguiente manera:

    ```javascript
    useEffect(() => {
    if (loggedInUser) {
      fetchRestaurants()
    } else {
      setRestaurants(null)
    }
  }, [loggedInUser, route])
  ```

* in `CreateRestaurantsScreen.js`, update the navigation logic within the `createRestaurant` function. We will pass a parameter (e.g., `{ dirty: true }`) to signal that the data is "stale" and needs to be reloaded:

* en `CreateRestaurantsScreen.js`, actualiza la lógica de navegación dentro de la función `createRestaurant`. Pasaremos un parámetro (por ejemplo, `{ dirty: true }`) para señalar que los datos están "obsoletos" y necesitan ser recargados:

  ```javascript
        navigation.navigate('RestaurantsScreen', { dirty: true })
  ```

Test the complete solution.

Prueba la solución completa.

**Explicación adicional:** Pasar { dirty: true } es una convención para indicar que los datos en la pantalla anterior han cambiado. Aunque route se agregó a las dependencias del useEffect, el parámetro dirty también sirve como recordatorio visual de esta intención.

# 4. Extra: Component refactoring

Discuss with your teacher and partners if some components could be refactored. Is it possible to create a submit button component so that we don't copy/paste all the pressable details? Do you identify other elements that could be refactored as custom components and reused after?

Could it be possible to refactor de `DropdownPicker` and its error message?

# 4. Extra: Refactorización de componentes

Discute con tu profesor y compañeros si algunos componentes podrían refacturizarse. ¿Es posible crear un componente de botón de envío para que no tengamos que copiar/pegar todos los detalles de pressable? ¿Identificas otros elementos que podrían refacturizarse como componentes personalizados y reutilizarse después?

¿Sería posible refactorizar `DropdownPicker` y su mensaje de error?

**Explicación adicional:** La refactorización reduce código duplicado y mejora el mantenimiento. Crear componentes reutilizables como SubmitButton o SelectField hace el código más limpio y más fácil de actualizar.

# Annex: conditional rendering in JSX

Sometimes it is necessary to show a content depending on some conditions. To do this, it is possible to enter boolean conditions in the render method (return) of the component. Before the conditioned block prepend the condition followed by &&. Such block will only be rendered when the condition resolves to _truthy_.

Anexo: renderizado condicional en JSX

A veces es necesario mostrar un contenido dependiendo de algunas condiciones. Para ello, es posible ingresar condiciones booleanas en el método de renderizado (return) del componente. Antes del bloque acondicionado, anteponga la condición seguida de &&. Ese bloque solo se representará cuando la condición se resuelva en _truthy_.

```Javascript
return (
   // some JSX elements
   { backendErrors &&
        backendErrors.map((error, index) => <TextError key={index}>{error.msg}</TextError>)
   }
)
```

The expression `backendErrors && ...` checks that the the variable is _truthy_ or not and therefore, errors will only be rendered when backendErrors is not undefined nor null.

La expresión `backendErrors && ...` verifica si la variable es _truthy_ o no, por lo tanto, los errores solo se renderizarán cuando backendErrors no sea undefined ni null.

**Explicación adicional:** El operador && en JavaScript es un operador lógico que devuelve el primer valor falsy o el último valor si todos son truthy. En JSX, esto permite renderizar condicionalmente: si la primera parte es false/falsy, no renderiza nada; si es true, renderiza la segunda parte.
