import { Row, Col, Input, Dropdown, DropdownMenu,
    DropdownItem, Icon, Avatar, Badge, Button,
    Modal, Form, FormItem, Carousel, CarouselItem} from 'view-design';

const elements = [
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
    Modal,
    Form,
    FormItem,
    Carousel,
    CarouselItem
]

const iviews= {
    install(Vue){
        elements.map(element => {
            Vue.component(element.name, element);
            // console.log(element)
        })
    }
}

export default iviews;