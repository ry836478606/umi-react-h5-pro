import React from 'react';
import { withRouter } from 'umi';
import styles from './index.less';

function Layouts(props) {
    const { location } = props;
    const fullPage = ['/login', '/404'];

    if (fullPage.find(item => item === location.pathname)) {
        return props.children;
    }

    return (
        <div className={styles.mainLayout}>
            <div className={styles.header}>im header</div>
            <div className={styles.content}>{props.children}</div>
            <div className={styles.footer}>im footer</div>
        </div>
    );
}

// 每个页面就能在props中拿到router的信息咯
export default withRouter(Layouts);
