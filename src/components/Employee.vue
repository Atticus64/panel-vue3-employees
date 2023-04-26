<script setup lang="ts">
import { useEmployee } from '../composables/useEmployee'
import { Employee } from '../api/employees'
import { ref } from 'vue'
import FormEdit from './FormEdit.vue'
import FormCreate from './FormCreate..vue'
import Moon from './icons/Moon.vue'
import Sun from './icons/Sun.vue'

const avatarsUrl = "https://api.dicebear.com/6.x/initials/svg?seed="
let changeEmployee = ref<boolean>(false)
let currentEmployee = ref<Employee>()
let createEmployee = ref<boolean>(false)
let darkTheme = ref<boolean>()

const { 
  employees, 
  errorMsg, 
  isLoading, 
  deleteEmployee, 
  getAllEmployees
} = await useEmployee()


const editEmployee = (emp: Employee) => {
  currentEmployee.value = emp
  changeEmployee.value = true;
}

const closeEdit = async () => {
  changeEmployee.value = false
  await getAllEmployees()
}

const toggleTheme = () => {
  if (localStorage.getItem("color-theme")) {
      if (localStorage.getItem("color-theme") === "light") {
        document.documentElement.style.backgroundColor = "#1e293b"
        document.documentElement.style.setProperty("--bg-color", "#1e293b")
        document.documentElement.classList.remove("light")
        document.documentElement.classList.add("dark")
        darkTheme.value = true;
        localStorage.setItem("color-theme", "dark")
      } else {
        document.documentElement.classList.remove("dark")
        document.documentElement.classList.add("light")
        darkTheme.value = false;
        document.documentElement.style.backgroundColor = "#f6f6f6"
        document.documentElement.style.color = "#000000"
        document.documentElement.style.setProperty("--bg-color", "#f6f6f6")
        localStorage.setItem("color-theme", "light")
      }

      // if NOT set via local storage previously
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark")
        document.documentElement.style.backgroundColor = "#f6f6f6"
        document.documentElement.style.setProperty("--bg-color", "#f6f6f6")
        localStorage.setItem("color-theme", "light")
        darkTheme.value = false
      } else {
        document.documentElement.style.backgroundColor = "#1e293b"
        document.documentElement.style.setProperty("--bg-color", "#1e293b")
        darkTheme.value = true
        document.documentElement.classList.add("dark")
        localStorage.setItem("color-theme", "dark")
      }
    }
}

const checkTheme = function () {
  if (localStorage.getItem("color-theme") === "light") {
    document.documentElement.classList.remove("dark")
    document.documentElement.classList.add("light")
    darkTheme.value = false;
    document.documentElement.style.backgroundColor = "#f6f6f6"
    document.documentElement.style.color = "#000000"
    document.documentElement.style.setProperty("--bg-color", "#f6f6f6")
    darkTheme.value = true;
  } else {
    document.documentElement.style.backgroundColor = "#1e293b"
    document.documentElement.style.setProperty("--bg-color", "#1e293b")
    document.documentElement.classList.remove("light")
    document.documentElement.classList.add("dark")
  }
}


const closeCreate = async () => {
  createEmployee.value = false
  await getAllEmployees()
}

checkTheme()

</script>


<template>
  <div class="flex flex-row">
    <h1 class="font-mono p-2 m-2 dark:text-white">Jonacorp App</h1>  
    <button @click="toggleTheme" class="bg-white dark:bg-cyan-900 dark:border-transparent">
      <div v-if="darkTheme">
        <Moon />
      </div>
      <div v-else>
        <Sun/>
      </div>
    </button>
  </div>
  <div v-if="isLoading">
    
    <div class="max-w-xs bg-white border rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700" role="alert">
      <div class="flex items-center p-4">
        <div class="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
        <span class="sr-only">Loading...</span>
      </div>
      <p class="ml-3 text-sm text-gray-700 dark:text-gray-400">
        Actualizando empleados
      </p>
    </div>
  </div>
    </div> 
  
  <div v-if="errorMsg">
    <h2 class="text-3xl p-4">Intentelo mas tarde</h2>
    <div class="max-w-xs bg-white border rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700" role="alert">
      <div class="flex p-4">
    <div class="flex-shrink-0">
      <svg class="h-4 w-4 text-red-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
      </svg>
    </div>
    <div class="ml-3">
      <p class="text-sm text-gray-700 dark:text-gray-400">
        {{ errorMsg }}
      </p>
    </div>
  </div>
</div>

</div>
<button @click="createEmployee = true" class="m-4 p-4 bg-white dark:bg-cyan-900 dark:border-transparent">Nuevo Empleado</button>
<div v-if="createEmployee">
  <FormCreate :create="createEmployee">
    <button class="p-2 m-2 bg-white dark:bg-cyan-900 dark:border-transparent" @click="closeCreate">Salir</button>
  </FormCreate>
</div>
  <section v-if="employees.length > 0">
    <h3 class="text-3xl font-bold">Employees List</h3>
    <ul>
      <div v-if="currentEmployee && changeEmployee">
        <div>
          <FormEdit :employee="currentEmployee" :change="changeEmployee">
            <button class="p-2 m-2 bg-white dark:bg-cyan-900 dark:border-transparent" @click="closeEdit">Salir</button>
          </FormEdit>
        </div>
      </div>
      <li v-for="emp in employees" class="card" :key="emp.uid">
        <div class="w-full max-w-sm grid p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="flex flex-col items-center pb-10">
            <img class="w-24 h-24 mb-3 rounded-full shadow-lg" :src="`${avatarsUrl} + ${emp.names} ${emp.lastnames}`" :alt="`${emp.names} ${emp.lastnames} image`"/>
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Nombre: {{ emp.names }} {{ emp.lastnames }}
            </h5>
            <h4>Fecha de admisión: {{ emp.admissionDate }}</h4>
            <h6 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Edad: {{ emp.age }}
            </h6>
            <div v-if="emp.hasChilds">
              Numero de hijos: {{ emp.childs }}
            </div>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              Salario: ${{ emp.salary }}
            </span>
            <div class="flex mt-4 space-x-3 md:mt-6">
              <button @click="editEmployee(emp)" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
                Update Employee
              </button>
              <button @click="deleteEmployee(emp.uid)" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
                Delete Employee
              </button>
          </div>
        </div>
      </div>
      </li>
  </ul>
  </section>
  </template>

<style scoped>

.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  list-style: none;
}

</style>