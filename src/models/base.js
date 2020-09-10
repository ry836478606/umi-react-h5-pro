export default {
    namespace: 'base',
    state: {
        accessToken: '',
    },

    effects: {},

    reducers: {
        // 修改state的accessToken
        setAccessToken(state, action) {
            const { accessToken = '' } = action.payload;
            // setTokenForStorage({token: accessToken, corpId})

            // 启用 immer 之后，直接修改state中的屬性
            state.accessToken = accessToken;

            // 未启用 immer,
            // return {
            //   ...state,
            //   accessToken: accessToken,
            // }
        },
    },
};
