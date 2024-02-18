import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './userStore'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'
export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  //1.定义state - cartList
  const cartList = ref([])
  //2.定义action  -addCart  判断是否登录
  const addCart = async (goods) => {
    const { skuId, count } = goods
    if (isLogin.value) {
      //登录之后加入购物车逻辑 调接口
      await insertCartAPI({ skuId, count })
      updateNewList()
    } else {
      //没有登录 走本地逻辑
      console.log('添加', goods)
      // 添加购物车操作
      // 已添加过 - count + 1
      // 没有添加过 - 直接push
      // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        // 找到了
        item.count += goods.count
      } else {
        // 没找到
        cartList.value.push(goods)
      }
    }

  }

  //删除购物车数据 action
  const delCart = async (skuId) => {
    if (isLogin.value) {
      //调接口
      await delCartAPI([skuId])
      updateNewList()
    } else {
      //1.找到下标值 - splice
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx, 1)
    }

  }

  //单选功能
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  //全选功能
  const allCheck = (selected) => {
    cartList.value.forEach((item) => item.selected = selected)
  }

  //获取最新购物车列表
  const updateNewList =async () => {
    const res = await findNewCartListAPI()
    cartList.value = res.result
  }

  //计算属性
  //1.总数量 所有项的count 之和
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  //2.总价
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

  //3.已选择数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
  //4.已选择商品价格总价
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

  //3.是否全选
  const isAll = computed(() => cartList.value.every((item) => item.selected))
  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    singleCheck,
    isAll,
    allCheck,
    selectedCount,
    selectedPrice
  }
}, {
  persist: true
})