import { ref } from "vue"
import { EMPLOYEES_URL, Employee, Resp } from "../api/employees"
import Toastify from 'toastify-js'
import { getErrorMessage } from "../validators/employee";

export interface DataEmployee {
  names: string;
  lastnames: string;
  age: number;
  salary: number;
  childs: number;
  hasChilds: boolean;
  birthDate: string;
}


export const useEmployee = async () => {

  const employees = ref<Employee[]>([])
  const isLoading = ref<boolean>(false)
  const errorMsg = ref<string | null>()



  async function deleteEmployee(id: string) {
    const resp = await fetch(`${EMPLOYEES_URL}/${id}`, {
      method: 'DELETE',
    }).then<Resp>(d => d.json())

    employees.value = employees.value.filter(e => e.uid != id);

    Toastify({
      text: "✔ Empleado eliminado con exito",
      duration: 3000,
      gravity: "top",
      className: "info",
      position: "center", // `left`, `center` or `right`

    }).showToast();

  }

  async function updateEmployee(data: DataEmployee, id: string) {

    const resp = await fetch(`${EMPLOYEES_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    const jsonResponse = await resp.json()
    if (resp.status !== 200) {
      const errorType: string = jsonResponse.errors[0].msg
      let mensaje: string = getErrorMessage(errorType);

      Toastify({
        text: mensaje,
        duration: 3000,
        gravity: "top",
        className: "error",
        position: "center", // `left`, `center` or `right`
      }).showToast();

      return

    }

    Toastify({
      text: "🐢 Empleado actualizado",
      duration: 3000,
      gravity: "top",
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      position: "center", // `left`, `center` or `right`
    }).showToast();

  }

  const createEmployee = async (data: DataEmployee) => {
    const resp = await fetch(`${EMPLOYEES_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    const jsonResponse = await resp.json()
    if (resp.status !== 201) {
      const errorType: string = jsonResponse.errors[0].msg
      let mensaje: string = getErrorMessage(errorType);

      Toastify({
        text: mensaje,
        duration: 3000,
        gravity: "top",
        className: "error",
        position: "center", // `left`, `center` or `right`
      }).showToast();

      return

    }

    Toastify({
      text: "🦀 Empleado Creado Exitosamente",
      duration: 3000,
      gravity: "top",
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      position: "center", // `left`, `center` or `right`
    }).showToast();
  }


  const getAllEmployees = async () => {
    try {
      isLoading.value = true
      const resp = await fetch(EMPLOYEES_URL).then<Resp>(d => d.json())
      employees.value = resp.employees
      isLoading.value = false;
      errorMsg.value = null;
    } catch (err) {
      isLoading.value = false;
      errorMsg.value = 'No se pudieron cargar los empleados'
    }
  }

  getAllEmployees()

  return {
    getAllEmployees,
    updateEmployee,
    createEmployee,
    deleteEmployee,
    isLoading,
    employees,
    errorMsg
  }

}