export interface Note {
  id: number;
  text: string;
  date: string;
}

export interface Document {
  id: number;
  file: File;
  date: string;
}

export interface PersonalInfo {
  firstName: string;
  patronymic?: string;
  lastName: string;
  imgSrc?: string;
  salary?: number;
  dateOfBirth?: Date;
  age?: number;
  position: string;
  status?: 'working' | 'fired';
  hiring?: Date;
  workExperience?: number;
  email?: string;
  balance?: number;
  phoneNumber?: string;
}

export interface Metric {
  id: number;
  name: string;
  value: number;
  change: number;
}

export interface EmployeeValues {
  standard?: number;
  metrics?: Metric[];
}

export interface Event {
  companyId: number;
  name: string;
  format?: string;
  category: string;
  description?: string;
  imgSrc?: string;
  reward?: number;
  date: string;
}

export interface Transaction {
  productId: number;
  amount?: number;
  description?: string;
  type?: string;
  date: string;
  status: string;
}

export interface Employee {
  id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  company_id?: number;
  imgSrc: string;
  salary: string;
  birth_date: string;
  position: string;
  status: string;
  date_of_hiring: string;
  work_experience: number;
  balance: string;
  rating: number | null;
}

export interface EmployeeTest {
  id: number;
  personalInfo: PersonalInfo;
  notes?: Note[];
  documents?: Document[];
  values?: EmployeeValues;
  events?: Event[];
  transactions?: Transaction[];
}

export interface EmployeeOperation {
  id: number;
  name: string;
  date: string;
  status: string;
  description?: string;
}

export interface EmployeeEvent {
  id: number;
  name: string;
  date: string;
  status: string;
  duration: number;
  description?: string;
}

interface User {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
}

export interface TopEmployee {
  id: number;
  birth_date: string;
  position: string;
  company_id?: number;
  work_experience: number;
  salary: string;
  balance: string;
  imgSrc: string;
  status: string;
  date_of_hiring: string;
  rating: number | null;
}

export interface TopEmployees {
  employee: TopEmployee;
  user: User;
  employee_risk: number;
}
