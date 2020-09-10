import React from 'react';
import { Redirect } from 'umi';
import { isLogin } from 'hooks/useAuth';

export default props => {
    if (isLogin()) {
        return <>{props.children}</>;
    } else {
        return <Redirect to="/login" />;
    }
};
