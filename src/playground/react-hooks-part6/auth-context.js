import React from 'react';

// set default value for context
const authContext = React.createContext({ status: false, login: () => {} });

export default authContext;
