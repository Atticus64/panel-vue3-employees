# Vue 3 + TypeScript + Vite

## Panel web del api [EmployeesApi](https://github.com/Atticus64/employees-ts)

Necesito un sistema que me permita dar de alta Empleados, donde pueda registrar el nombre, apellidos, edad, fecha de ingreso, fecha de nacimiento, si tiene hijos y cuantos, sueldo, Activo. De esa manera podre administrar los empleados de mi organizacion.

Validaciones:
* No se permiten empleados menores de 18 años
* El nombre, apellidos, no debe ser mayor a 100 caracteres
* La edad debe almacenar un valor numerico entre 18 y 60
* El sueldo debe almacenar un valor numerico sin decimales
* El atributo Activo deber almacenar un bit que indique si el empleado esta activo o no en la empresa

En caso de no cumplirse las validaciones mandar al usuario un mensaje indicando el error

Las validaciones deben ser superadas para crear o actualizar un empleado
La accion "Eliminar empleado" debera desactivar al empleado y no eliminarlo de la base de datos.