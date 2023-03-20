# Descripcion
Sencillo simulador de ondas senoidales para uso educativo. 
El simulador permite (permitirá) generar ondas senoidales parametrizables. Manejar sus atributos (frecuencia y amplitud), reproducir su sonido, fusionarlas con otras ondas etc.

# Por hacer
 - [ ] redimensionar correctamente
 - [ ] interfaz rediseñada
 - [ ] sumar ondas
 - [ ] sliders para modificar los valores de frecuencia
    - [ ] si se modifican los parametros de una onda tambien de sus sumas
 - [ ] multiples ondas pudiendo mostrar y ocultarlas
   - esto se haria con mas canvases o con mas contexts?
 - [ ] buenas practicas de codigo (modularizar)
 - [ ] reescribir todo teniendo en cuenta lo aprendido y con buenas practicas de programacion.
   - [ ] las operaciones y estructuras de graficos al modulo operations (rebautizar?)
   - [ ] definir que necesita la clase Wave (quizas guardar ahi el canvas que le corresponde?)
   - [ ] utilizar script para albergar los modulos, asignar funciones a los modulos y gestionar los elementos del DOM
 - [ ] medidas realistas
   - [ ] grid que muestre la escala
      - [ ] dimensiones dinamicas
   - [ ] animaciones realistas (1 Hz -> un ciclo por segundo)
- [ ] reproduccion de audio.
- [ ] limite de ondas
- [ ] cambiar el nombre. 2 opciones 
    - funcion a parte
    - rehacer de modo que el parametro de las cards sea un id
      - darle campo id a las cards y hacer que las keys del mapa sean ids

### Señal senoidal
A sen (w t + o)
A = amplitud
w = frecuencia
o = fase