import React from 'react';

const SessionContext = React.createContext(null);

export const withAuth = Component => props => (
    <SessionContext.Consumer>
        {session => <Component {...props} session={session} />}
    </SessionContext.Consumer>
)

export default SessionContext;