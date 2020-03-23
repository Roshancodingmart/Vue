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
import signup from "@/components/signup";
import signin from "@/components/signin";
import previous from "@/components/previous";

Vue.use(Router);

export default new Router(
    {
  routes: [{ path: "/", name: "signup", component: signup },
            { path: "/simple", name:"Simple" , component: simple},
            {path:"/scifi" , name:"Scify" , component:scifi},
            {path:"/age" , name:"age" , component:age},
            {path:"/bmi" , name:"bmi" , component:bmi},
            {path:"/movie" , name:"movie" , component:movie},
            {path:"/info/:id",name:"info" , component:info,props:true},
            {path:"/ticket/:id",name:"ticket", component:ticket,props:true},
            {path:"/bill/:props",name:"bill",component:bill,props:true},
            {path:"/signup",name:"signup",component:signup},
            {path:"/signin",name:"signin",component:signin},
            {path:"/previous",name:"previous",component:previous}
]
});
