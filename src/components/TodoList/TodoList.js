import React, { useEffect, useState } from 'react';
import { Button, FormControl, ButtonGroup, Row, Col } from 'react-bootstrap'
import s from './TodoList.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare, faLock, faLockOpen, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

const TodoList = ({ todo, setTodo }) => {
    const [edit, setEdit] = useState(null)
    const [value, setValue] = useState('')
    const [todoFiltred, setTodoFiltred] = useState(todo)

    useEffect(() => {
        localStorage.setItem('itemsTodo', JSON.stringify([...todo]))
        setTodoFiltred(todo)
    }, [todo])

    const deleteTodo = (id) => {
        if (window.confirm('Вы уверены?')) {
            const newTodo = [...todo].filter(item => item.id !== id)
            localStorage.setItem('itemsTodo', JSON.stringify([...newTodo]))
            setTodo(newTodo)
        }

    }

    const statusTodo = (id) => {
        const newTodo = [...todo].filter(item => {
            if (item.id === id) {
                item.status = !item.status
            }
            return item
        })
        setTodo(newTodo)
    }

    const editTodo = (id, title) => {
        setEdit(id)
        setValue(title)
    }

    const saveTodo = (id) => {
        const newTodo = [...todo].map(item => {
            if (item.id === id) {
                item.title = value
            }
            return item
        })
        setTodo(newTodo)
        setEdit(null)

    }

    const todoFilter = (status) => {
        if (status === 'all') {
            setTodoFiltred(todo)
        } else {
            const newTodo = [...todo].filter(item => item.status === status)
            setTodoFiltred(newTodo)
        }
    }

    return (
        <div>
            <ButtonGroup className={s.btns} aria-label="Basic example">
                <Button onClick={() => todoFilter('all')} variant="success">Все</Button>
                <Button onClick={() => todoFilter(true)} variant="success">В работе</Button>
                <Button onClick={() => todoFilter(false)} variant="success">Выполненные</Button>
            </ButtonGroup>

            {
                todoFiltred.map(item => (

                    <div key={item.id} className={s.todoItems}>
                        {
                            edit === item.id ?
                                <Row>
                                    <Col>
                                        <FormControl value={value} onChange={(e) => setValue(e.target.value)} />
                                    </Col>
                                </Row>
                                :
                                <div className={!item.status ? s.close : ''}>{item.title}</div>
                        }

                        {
                            edit === item.id ?
                                <div>
                                    <Button size='sm' variant='success' onClick={() => saveTodo(item.id)}><FontAwesomeIcon icon={faFloppyDisk} /></Button>
                                </div>
                                :
                                <div>
                                    <Button size='sm' variant='danger' onClick={() => deleteTodo(item.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                    <Button size='sm' className={s.btn} variant='info' onClick={() => editTodo(item.id, item.title)}><FontAwesomeIcon icon={faPenToSquare} /></Button>
                                    <Button size='sm' className={s.btn} variant='warning' onClick={() => statusTodo(item.id)}>
                                        {
                                            item.status ? <FontAwesomeIcon icon={faLockOpen} /> : <FontAwesomeIcon icon={faLock} />
                                        }
                                    </Button>
                                </div>
                        }
                    </div>
                ))
            }
        </div>
    );
};

export default TodoList;