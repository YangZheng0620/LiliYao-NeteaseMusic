import 'element-ui/lib/theme-chalk/index.css';
import { Row, Col, Input, Dropdown, DropdownMenu,
    DropdownItem, Icon, Avatar, Badge, Button, Dialog,
    Form, FormItem, Carousel, CarouselItem } from 'element-ui';

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
    CarouselItem
]

const elements= {
    install(Vue){
        components.map(component => {
            Vue.component(component.name, component);
            // console.log(component)
        })
    }
}

export default elements;