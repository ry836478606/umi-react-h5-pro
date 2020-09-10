import React from 'react';
import { connect } from 'umi';
import DocumentTitle from 'react-document-title';
import styles from './index.less';

function NotFounded(props) {
    console.log('token', props.base.accessToken);

    return (
        <DocumentTitle title="404页">
            <div className={styles.main}>im 404</div>
        </DocumentTitle>
    );
}

// 函数组件绑定connect
export default connect(({ base }) => ({
    base,
}))(NotFounded);
