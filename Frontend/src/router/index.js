import Vue from "vue";
import Router from "vue-router";
import simple from "@/components/simple";
import scifi from "@/components/scifi";
import age from "@/components/age";
import bmi from "@/components/bmi";
import movie from "@/components/movie";
import info from "@/components/info";
import ticket from "@/components/ticket";
import bill from "@/components/bill";


Vue.use(Router);

export default new Router(
    {
  routes: [{ path: "/", name: "home", component: simple },
            { path: "/simple", name:"Simple" , redirect: '/'},
            {path:"/scifi" , name:"Scify" , component:scifi},
            {path:"/age" , name:"age" , component:age},
            {path:"/bmi" , name:"bmi" , component:bmi},
            {path:"/movie" , name:"movie" , component:movie},
            {path:"/info/:id",name:"info" , component:info,props:true},
            {path:"/ticket/:id",name:"ticket", component:ticket,props:true},
            {path:"/bill/:props",name:"bill",component:bill,props:true}
]
});
