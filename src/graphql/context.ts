import { tradeTokenForUser } from '../helpers/trade-token-for-user';

interface IAuthorizationHeader extends Headers {
  authorization: string;
}

export const context = async ({ req }: { req: Request }) => {
  let authToken = null;
  let currentUser = null;

  try {
    const { authorization: authToken } = req.headers as IAuthorizationHeader;

    if (authToken) {
      currentUser = await tradeTokenForUser(authToken);
    }
  } catch (e) {
    console.warn(`No se puede autenticar con token de autorización enviado: ${authToken}`);
  }

  return {
    authToken,
    currentUser,
  };
};
