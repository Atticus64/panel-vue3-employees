import { ERROR_MESSAGES } from "../constants";


export function getErrorMessage(errorType: string) {
	let mensaje: string = 'Hubo un error, los campos son incorrectos';

	if (errorType.includes(ERROR_MESSAGES.CHILDS_NO_CORRECT_FORMAT)) {
		mensaje = 'Revisa que el numero y la opcion de hijos esten correctos'
	}

	if (errorType.includes(ERROR_MESSAGES.DATE_INCORRECT_FORMAT)) {
		mensaje = 'Revisa que la fecha tenga el formato Año/Mes/Dia ejemplo 2003/05/01'
	}

	if (errorType.includes(ERROR_MESSAGES.NAMES_OR_LASTNAMES_TO_LONG)) {
		mensaje = 'Revisa que los nombres y los apellidos no pasen de 100 caracteres'
	}

	if (errorType.includes(ERROR_MESSAGES.AGE_NOT_CORRECT)) {
		mensaje = 'La edad del empleado no es correcta'
	}

	if (errorType.includes(ERROR_MESSAGES.SALARY_INCORRECT_QUANTITY)) {
		mensaje = 'La cantidad de salario es absurda, coloque una normal porfavor'
	}


	return mensaje
}
