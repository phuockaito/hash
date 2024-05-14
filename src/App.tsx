import { Button, Form, Input } from 'antd';

import React from 'react';
import { Form1, Form2 } from './components';

export const App = () => {
    const [key, setKey] = React.useState("");
    if (!key.trim()) {
        return (
            <div className='flex flex-col items-center justify-center min-h-screen p-3'>
                <div>
                    <Form
                        name='form1'
                        layout='vertical'
                        size='large'
                        onFinish={({ keyWord }) => setKey(keyWord)}
                    >
                        <Form.Item
                            name="keyWord"
                            rules={[{ required: true, message: "Vui lòng nhập khoá bí mật" }]}
                            label={<h1 className='text-xl font-bold text-center uppercase'>Khoá bí mật</h1>}
                        >
                            <Input className='!w-[400px]' placeholder='Cụm từ bí mật' />
                        </Form.Item>
                        <Form.Item shouldUpdate>
                            {({ getFieldValue }) => {
                                const valueOutput = getFieldValue("keyWord");
                                return (
                                    <Button
                                        htmlType="submit"
                                        disabled={!valueOutput}
                                        type="primary"
                                        className='w-full'
                                    >
                                        Tiếp tục
                                    </Button>
                                )
                            }}
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className='p-2 text-right md:p-5'>
                <a href="https://github.com/phuockaito" className='font-medium' target='_blank'>GitHub</a>
            </div>
            <div className='flex flex-col items-center justify-center w-full min-h-screen p-5 mx-auto divide-y'>
                <Form2 keyCode={key} />
                <Form1 keyCode={key} />
                <Button size='large' danger className='!w-[120px]' onClick={() => setKey("")}>Reset</Button>
            </div>
        </>
    )
}
