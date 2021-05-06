import React, { Component } from 'react'
import { Form, InputGroup} from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default class searchhdoctor extends Component {
    render() {
        return (
            <div className="form__search">
                <Form>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Tìm theo tên"
                        />
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faSearch} />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                    </InputGroup>
                    <br></br>
                    <Form.Control as = "select">
                        <option>Tìm theo chuyên khoa</option>
                        <option>Nội</option>
                        <option>Tai - Mũi - Họng</option>
                        <option>Tim Mạch</option>
                        </Form.Control>
                </Form>
            </div>   
                
        )
    }
}
