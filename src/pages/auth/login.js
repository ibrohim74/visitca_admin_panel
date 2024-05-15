import React, {useState} from 'react';
import style from './login.module.css'
import {Icons} from "../../assets/icons/icons";
import { Form, Input, notification} from "antd";
import {$host} from "../../processes/http/http";
import {ADMIN_HOME, CABINET, MODERATE_HOME} from "../../processes/utils/consts";

const Login = () => {
    // eslint-disable-next-line no-unused-vars
    const [initialState, setInitialState] = useState({
        login: '',
        password: ''
    })

    // eslint-disable-next-line no-unused-vars
    const [mess, contextHolder] = notification.useNotification();

    const loginAPI = async ()=>{
        try {
            console.log(initialState)
            const res = await $host.post('login' , initialState)
            if (res.status === 200){
                if (res?.data.role === 'admin' || res?.data.role === "support" || res?.data.role === 'superadmin'){
                    window.localStorage.setItem('token' , res?.data.access_token)
                    mess.success({
                        description:'success'
                    })
                    setInitialState(()=>{
                        if (res?.data.role === 'admin'){
                            window.location.assign(CABINET+ADMIN_HOME)
                        }else if (res?.data.role === 'support'){
                            window.location.assign(CABINET+MODERATE_HOME)
                        }else if(res?.data.role === 'superadmin'){
                            window.location.assign(CABINET)
                        }

                    })
                }else {
                    mess.error({
                        description:"error"
                    })
                }

            }
        }catch (e){
            if (e.code !== "ERR_NETWORK"){
                mess.error({
                    description:e.response?.data.detail
                })
            }else {
                mess.error({
                    description:"ERR_NETWORK"
                })
            }

            console.log(e)
        }
    }

    return (
        <div className={'container'}>
            {contextHolder}
            <div className={style.loginContainer}>
                <div className={style.loginBox}>
                    <div className={style.login_logoIcon}>
                        <Icons.Logo/>
                    </div>
                    <Form className={style.login_form}
                          variant="filled"
                          layout={'vertical'}
                          initialValues={initialState}
                          onFinish={loginAPI}
                    >
                        <h1>Войти</h1>
                        <Form.Item label="Логин"
                                   name="Login"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input!',
                                       },
                                   ]}>
                            <Input type={'text'}
                                   value={initialState?.login}
                                   placeholder="Введите ваш логин"
                                   onChange={e => setInitialState({...initialState, login: e.target.value})}/>
                        </Form.Item>
                        <Form.Item label="Пароль"
                                   name="Password"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input!',
                                       },
                                   ]}>
                            <Input type={'password'}
                                   value={initialState?.login}
                                   placeholder="Введите ваш пароль"
                                   onChange={e => setInitialState({...initialState, password: e.target.value})}/>
                        </Form.Item>
                        <Form.Item>
                            <button  type={"submit"}>Войти</button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;