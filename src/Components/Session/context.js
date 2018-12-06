import React from 'react';

const SessionContext = React.createContext(null);

export const withSession = Component => props => (
    <SessionContext.Consumer>
        {session => <Component {...props} session={session} />}
    </SessionContext.Consumer>
)

export default SessionContext;