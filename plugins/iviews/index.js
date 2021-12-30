import { Row, Col, Input, Dropdown, DropdownMenu,
    DropdownItem, Icon, Avatar, Badge, Button,
    Modal, Form, FormItem} from 'view-design';

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
    FormItem
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