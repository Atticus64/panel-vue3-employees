
<script setup lang="ts">
import { useEmployee } from '../composables/useEmployee'
import { Employee } from '../api/employees'
import { ref } from 'vue'
import { z } from 'zod' 
import Modal from './Modal.vue'
import "toastify-js/src/toastify.css"

const  { updateEmployee } = await useEmployee()


interface Props {
  employee: Employee,
  change: boolean
}

const props = defineProps<Props>();

let changeEmployee = ref<boolean>(props.change)
let currentEmployee = ref<Employee>(props.employee)
  
const saveEmployee = async (event: Event, id: string) => {
  const { names, lastnames, hasChilds, birthDate, ...formData  } = Object.fromEntries(new FormData(event.target as HTMLFormElement))

  const employee = {
    age: Number(formData.age),
    salary: Number(formData.salary),
    childs: Number(formData.childs),
    names,
    lastnames,
    hasChilds: hasChilds ? true : false,
    birthDate
  }

  const formSchema = z.object({
    names: z.string(),
    lastnames: z.string(),
    age: z.number(),
    salary: z.number(),
    childs: z.number(),
    hasChilds: z.boolean(),
    birthDate: z.string(),
  })

  if (formSchema.safeParse(employee)) {
    const data = formSchema.parse(employee)

    await updateEmployee(data, id)
    currentEmployee.value = {
        ...employee,
        active: currentEmployee.value!.active,
        uid: currentEmployee.value!.uid,
        admissionDate: currentEmployee.value!.admissionDate
    } as Employee;

  } else {
    console.log(formSchema.safeParse(formData))
  }

}


</script>

<template>
  <div v-if="changeEmployee && currentEmployee" class="modal-form flex flex-col p-4 ">
        <div>
          <Modal>
            <form class="form" @submit.prevent="(e) => saveEmployee(e, currentEmployee!.uid)">
              <h5 class="text-2xl m-2">Editar Empleado</h5>
            <label for="input-label" class="block text-sm font-medium mb-2 dark:text-white">
              Nombres
            </label>
            <input type="text" name="names" class="py-3 px-5 block w-full border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Input text" :value="currentEmployee.names" >
            <label for="input-label" class="block text-sm font-medium mb-2 dark:text-white">
              Apellidos
            </label>
            <input type="text" name="lastnames" class="py-3 px-5 block w-full border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Input text" :value="currentEmployee.lastnames">
            <label for="input-label" class="block text-sm font-medium mb-2 dark:text-white">
              Edad
            </label>
            <input type="number" name="age" class="py-3 px-5 block w-full border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Input text" :value="currentEmployee.age">
            <label for="input-label" class="block text-sm font-medium mb-2 dark:text-white">
              Salario
            </label>
            <input type="number"  name="salary" class="py-3 px-5 block w-full border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Input text" :value="currentEmployee.salary">
            <label for="input-label" class="block text-sm font-medium mb-2 dark:text-white">Numero de 
              hijos
            </label>
            <input type="number" name="childs" class="py-3 px-5 block w-full border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Input text" :value="currentEmployee.childs">
            <label for="input-label" class="block text-sm font-medium mb-2 dark:text-white">Tiene 
              hijos
            </label>
            <input type="checkbox" name="hasChilds" class="py-3 px-5 block w-full border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Input text" :checked="currentEmployee.hasChilds" :value="currentEmployee.hasChilds">
            <label for="input-label" class="block text-sm font-medium mb-2 dark:text-white">Fecha de 
              Cumpleaños
            </label>
            <input type="text"  name="birthDate" class="py-3 px-5 block w-full border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Input text" :value="currentEmployee.birthDate">
          
            <button class="p-2 m-2 bg-white dark:bg-cyan-900 dark:border-transparent" >Guardar</button>
            <slot/>
          </form>
          </Modal>
        </div>
      </div>
</template>