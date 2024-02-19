import request from '@/utils/http'

//生成-订单(结算页)
export const getCheckInfoAPI = ()=>{
  return request({
    url:'/member/order/pre'
  })
}