export type tRoleOption = 'Организация' | 'Сотрудник';

const roleOptionVariables: Record<string, string> = {
  0: 'Организация',
  1: 'Сотрудник',
};

const styledSignUpContainer = {
  maxWidth: '600px',
  margin: '16px auto',
};

export { roleOptionVariables, styledSignUpContainer };
