export const validateRole = (rol: string) => (next: any) => (root: any, args: any, context: any, info: any) => {
  if (!context.currentUser.roles.includes(rol)) {
    throw new Error(`El usuario actual no tiene el rol de seguridad necesario`);
  }

  return next(root, args, context, info);
};
