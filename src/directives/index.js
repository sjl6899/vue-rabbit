//定义懒加载
import { useIntersectionObserver } from '@vueuse/core'
export const lazyPlugin = {
    install(app) {
        app.directive('img-lazy', {
            mounted(el, binding) {
                //el:指令绑定的哪个元素 img
                //binding：binding.value 指令等于号后面绑定
                console.log(el, binding.value);
                const { stop } = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                        if (isIntersecting) {
                            //进入视口区域
                            el.src = binding.value
                            stop()
                        }
                    }
                )
            }
        })
    }
}