import Vue          from 'vue'
import Router       from 'vue-router'
import UserLocation from '@/pages/UserLocation'
import LogIn       from  '@/pages/LogIn'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/userlocation',
      component: UserLocation
      // name: 'HelloWorld',
      // component: HelloWorld
    },
    {
      path: '/login',
      component: LogIn
    }
  ]
})
