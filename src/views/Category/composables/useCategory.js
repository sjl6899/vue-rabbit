//封装分类业务数据相关代码
import { getCategoryAPI } from '@/apis/category'
import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

export function useCategory() {
    const categoryData = ref({})
    const route = useRoute()
    const getCategory = async (id = route.params.id) => {
        // 如何在setup中获取路由参数 useRoute() -> route 等价于this.$route
        const res = await getCategoryAPI(id)
        categoryData.value = res.result
    }
    onMounted(() => getCategory())
    //目标：路由参数发生变化 可以把分类数据接口重新发送
    onBeforeRouteUpdate((to) => {
        console.log('路由变化了');
        getCategory(to.params.id)
    })

    return{
        categoryData
    }
}