import { Row, Col, Input } from 'view-design';

const elements = [
    Row,
    Input,
    Col,
]

const iviews= {
    install(Vue){
        elements.map(element => {
            Vue.component(element.name, element);
            console.log(element)
        })
    }
}

export default iviews;