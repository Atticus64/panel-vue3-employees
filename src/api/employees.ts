
export const EMPLOYEES_URL = "https://employees-uzma.onrender.com/api/employees"

export interface Resp {
  employees: Employee[];
}

export interface Employee {
  names: string;
  lastnames: string;
  age: number;
  hasChilds: boolean;
  birthDate: string;
  admissionDate: string;
  childs: number;
  active: boolean;
  salary: number;
  uid: string;
}



// export const deleteEmployee = async (id) => {
//   const resp = await fetch(EMPLOYEES_URL)



// }