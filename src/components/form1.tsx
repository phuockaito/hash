import { Button, Form, Input, message } from 'antd';
import { handleDecrypted } from '../fuc';

export const Form1 = ({ keyCode }: { keyCode: string }) => {
    return (
        <Form name='form3' layout='vertical' className='grid w-full grid-cols-1 pt-5 md:grid-cols-2 gap-x-10'>
            <div>
                <Form.Item
                    label={<h1 className='text-lg font-medium'>Hash code</h1>}
                    name="valueInput"
                    rules={[
                        ({ setFieldValue }) => ({
                            validator(_, value) {
                                if (value.trim()) {
                                    const valueOutput = handleDecrypted(value, keyCode);
                                    if (valueOutput) {
                                        setFieldValue("valueOutput", handleDecrypted(value, keyCode));
                                    }
                                    else {
                                        message.error("Hash code chưa đúng");
                                        setFieldValue("valueOutput", "");
                                    }
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
                        allowClear
                        size='large'
                    />
                </Form.Item>
                <Form.Item shouldUpdate>
                    {({ setFieldValue }) => {
                        return (
                            <Button
                                onClick={async () => {
                                    try {
                                        const pasteText = await navigator.clipboard.readText();
                                        if (pasteText) {
                                            const valueOutput = handleDecrypted(pasteText, keyCode);
                                            if (valueOutput) {
                                                setFieldValue("valueOutput", handleDecrypted(pasteText, keyCode));
                                            }
                                            else {
                                                message.error("Hash code chưa đúng");
                                                setFieldValue("valueOutput", "");
                                            }
                                            setFieldValue("valueInput", pasteText);
                                        }
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
                    label={<h1 className='text-lg font-medium'>Văn bản</h1>}
                >
                    <Input.TextArea
                        disabled
                        autoSize={{
                            minRows: 6,
                            maxRows: 6,
                        }}
                        allowClear
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
