import { createContext, Context } from 'react';

const LoggedInUserContext: Context<any> = createContext(null);

export default LoggedInUserContext;
