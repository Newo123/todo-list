import React, { useState } from 'react';
import { Row, Col, Button, FormControl } from 'react-bootstrap';
import { v4 } from 'uuid';
// add todo!!!
const AddTodo = ({ todo, setTodo }) => {
    const [value, setValue] = useState('')

    const saveTodo = () => {
        if (value !== '') {
            setTodo(
                [...todo, {
                    id: v4(),
                    title: value,
                    status: true,
                }]
            )
        }
        setValue('')
    }

    return (
        <Row>
            <Col className='d-flex gap-3'>
                <FormControl placeholder='Введите запись' value={value} onChange={(e) => setValue(e.target.value)} />
                <Button variant='success' onClick={saveTodo}>Добавить</Button>
            </Col>
        </Row>
    );
};

export default AddTodo;