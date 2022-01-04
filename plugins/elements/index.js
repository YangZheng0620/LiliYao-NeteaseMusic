import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import { Row, Col, Input, Dropdown, DropdownMenu,
    DropdownItem, Icon, Avatar, Badge, Button, Dialog,
    Form, FormItem, Carousel, CarouselItem, Notification,
    Image, } from 'element-ui';

const components = [
    Row,
    Input,
    Col,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Icon,
    Avatar,
    Badge,
    Button,
    Dialog,
    Form,
    FormItem,
    Carousel,
    CarouselItem,
    Image
]

const elements= {
    install(Vue){
        components.map(component => {
            Vue.component(component.name, component);
            // console.log(component)
        })
    }
}

Vue.prototype.$notify = Notification;

export default elements;