import React from 'react';
import { Button, InputItem, ActivityIndicator, Toast } from 'antd-mobile';
import { connect, history } from 'umi';
import DocumentTitle from 'react-document-title';
import { getTokenForStorage, setTokenForStorage } from 'utils';

import styles from './index.less';

// class-写法: @connect
@connect(({ base, loading }) => ({
    token: base.accessToken,
    loginLoading: loading.effects['auth/login'],
}))
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: 'xmp',
            password: '123456',
        };
    }

    componentDidMount() {
        console.log('token', this.props.token);
    }

    handleLogin = async () => {
        const { account, password } = this.state;
        const { dispatch } = this.props;

        if (!account.trim() && !password.trim()) {
            Toast.fail('账户、密码不能为空');
        } else {
            const res = await dispatch({
                type: 'auth/login',
                payload: {
                    body: {
                        account,
                        password,
                    },
                },
            });

            if (res) {
                setTokenForStorage('xmp_token');
                dispatch({
                    type: 'base/setAccessToken',
                    payload: {
                        accessToken: 'xmp_token',
                    },
                });
                history.replace('/');
            }
        }
    };

    handleChange = (type = 'account', value) => {
        this.setState({
            [type]: value,
        });
    };

    render() {
        const { account, password } = this.state;
        const { loginLoading = false } = this.props;

        return (
            <DocumentTitle title="login页">
                <div className={styles.main}>
                    {getTokenForStorage() ? (
                        <div className={styles.hadLogin}>
                            <div className={styles.txt}>已登录</div>
                            <Button
                                onClick={() => {
                                    history.push('/');
                                }}
                            >
                                返回首页
                            </Button>
                        </div>
                    ) : (
                        <>
                            <ActivityIndicator
                                toast
                                text="loading"
                                animating={loginLoading}
                            />

                            <InputItem
                                value={account}
                                placeholder="请输入账户"
                                maxLength={20}
                                onChange={value => {
                                    this.handleChange('account', value);
                                }}
                            />
                            <InputItem
                                value={password}
                                placeholder="请输入密码"
                                type="password"
                                maxLength={10}
                                onChange={value => {
                                    this.handleChange('password', value);
                                }}
                            />

                            <div className={styles.btnWrapper}>
                                <Button
                                    type="primary"
                                    onClick={this.handleLogin}
                                >
                                    登录
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </DocumentTitle>
        );
    }
}
