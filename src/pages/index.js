import React from 'react';
import { connect, NavLink, useSelector } from 'umi';
import DocumentTitle from 'react-document-title';
import styles from './index.less';

// 函数组件-写法
const Page = React.memo(function InnerPage(props) {
    const { token } = useSelector(({ base }) => ({
        token: base.accessToken,
    }));

    React.useEffect(() => {
        const { history, location, match } = props;
        console.log('token', token);
        console.log('withRouter', history, location, match);
    }, []);

    return (
        <DocumentTitle title="首页">
            <div className={styles.main}>
                <div className={styles.navWrapper}>
                    <NavLink to="/">首页</NavLink>
                    <NavLink to="/login">login页</NavLink>
                    <NavLink to="/chat-group/250">群详情页</NavLink>
                    <NavLink to="/404">404页</NavLink>
                </div>

                <h1 className={styles.title}>im 首页</h1>
            </div>
        </DocumentTitle>
    );
});

// 高阶函数应用
Page.wrappers = ['@/wrappers/auth'];
export default Page;
