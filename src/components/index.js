//把components中所有组件进行全局组件注册
//通过插件的方法
import ImageView from '@/components/imageView/index.vue'
import XtxSku from '@/components/XtxSku/index.vue'
export const componentPlugin={
  install(app){
    //app.component('组件名称',组件配置对象)
    app.component('ImageView',ImageView)
    app.component('XtxSku',XtxSku)
  }
}