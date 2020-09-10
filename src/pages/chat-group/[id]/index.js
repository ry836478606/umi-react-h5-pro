import React from 'react';
import {ActivityIndicator} from 'antd-mobile'
import {useSelector, useDispatch} from 'umi'
import DocumentTitle from 'react-document-title'
import styles from './index.less';

// 函数组件-写法
const Page = React.memo(function InnerPage(props) {
  const dispatch = useDispatch()

  const {getGroupDetailsLoading=false} = useSelector(({loading}) => ({
    getGroupDetailsLoading: loading.effects['groupDetails/getGroupDetails'],
  }))

  React.useEffect(() => {
    const {match: {params}} = props

    const initFetch = async () => {
      const {match: {params}} = props

      try{
        const res = await dispatch({
          type: 'groupDetails/getGroupDetails',
          payload: {
            id: params.id,
          }
        })
      }catch (e) {
        console.log('可以在这里拿到异常接口的返回数据', e.response)
      }
    }

    initFetch()

  }, [])

  return (
    <DocumentTitle title="群详情">
      <div className={styles.main}>
        <ActivityIndicator toast text="loading" animating={getGroupDetailsLoading}/>
        测试接口请求错误
      </div>
    </DocumentTitle>
  )
})

// 高阶函数应用
Page.wrappers = ['@/wrappers/auth']
export default Page
