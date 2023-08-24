enum Role {
  employer = 'Начальник',
  employee = 'Работник',
}

interface User {
  id?: number;
  name?: string;
  lastname?: string;
  avatar?: File;
  role: Role;
  phone?: string;
}

export { type User, Role };
