import { Button, Form, Input, message } from 'antd';
import { handleEncrypted } from '../fuc';

export const Form2 = ({ keyCode }: { keyCode: string }) => {
    return (
        <Form layout='vertical' className='grid w-full grid-cols-1 md:grid-cols-2 gap-x-10'>
            <div>
                <Form.Item
                    label={<h1 className='text-lg font-medium'>Văn bản</h1>}
                    name="valueInput"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập văn bản',
                        },
                        ({ setFieldValue }) => ({
                            validator(_, value) {
                                if (value.trim()) {
                                    const valueOutput = handleEncrypted(value, keyCode);
                                    console.log("valueOutput:", valueOutput)
                                    setFieldValue("valueOutput", valueOutput);
                                } else {
                                    setFieldValue("valueOutput", "");
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <Input.TextArea
                        autoSize={{
                            minRows: 6,
                            maxRows: 6,
                        }}
                        size='large'
                        allowClear
                    />
                </Form.Item>
                <Form.Item shouldUpdate>
                    {({ setFieldValue }) => {
                        return (
                            <Button
                                onClick={async () => {
                                    try {
                                        const pasteText = await navigator.clipboard.readText();
                                        setFieldValue("valueInput", pasteText);
                                        const valueOutput = handleEncrypted(pasteText.trim(), keyCode);
                                        setFieldValue("valueOutput", valueOutput);
                                    } catch (error) {
                                        message.error("Error reading")
                                    }
                                }}
                                type="primary"
                                className='w-full'
                            >
                                Dán
                            </Button>
                        )
                    }}
                </Form.Item>
            </div>
            <div>
                <Form.Item
                    name="valueOutput"
                    label={<h1 className='text-lg font-medium'>Hash code</h1>}
                >
                    <Input.TextArea
                        disabled
                        autoSize={{
                            minRows: 6,
                            maxRows: 6,
                        }}
                        size='large'
                    />
                </Form.Item>
                <Form.Item shouldUpdate>
                    {({ getFieldValue }) => {
                        const valueOutput = getFieldValue("valueOutput");
                        return (
                            <Button
                                onClick={() => {
                                    navigator.clipboard.writeText(valueOutput || "");
                                    message.success("Đã Copy")
                                }}
                                disabled={!valueOutput}
                                type="primary"
                                className='w-full'
                            >
                                Copy
                            </Button>
                        )
                    }}
                </Form.Item>
            </div>
        </Form>
    )
}
