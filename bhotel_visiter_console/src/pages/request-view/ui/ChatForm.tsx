import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import {
	ChangeEvent,
	MutableRefObject,
	useRef,
	useState
} from 'react'
import { Socket } from 'socket.io-client'

type TChatFormProps = {
    socketRef: MutableRefObject<Socket>
}

export const ChatForm = (props: TChatFormProps) => {
    const { socketRef } = props

    const inputRef = useRef<HTMLInputElement>(null)
    const buttonRef = useRef<Button>(null)

    const [isSendButtonEnabled, setIsButtonEnabled] = useState<boolean>(false)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsButtonEnabled(e.target.value.length > 0)
    }

    const handleSendMessage = () => {
        if (inputRef.current === null) return

        inputRef.current.value = ''

        if (inputRef.current.value.length > 0) {
            if (socketRef.current !== null) {
                socketRef.current.emit('chat message', inputRef.current.value)
            }
        }
    }

    return (
        <div className='chat-form'>
            <div className='grid w-full'>
                <div className='col-11'>
                    <InputText
                        onChange={onChange}
                        ref={inputRef}
                        className='w-full'
                        placeholder='Введите сообщение'
                    />
                </div>
                <div className='col-1'>
                    <Button
                        disabled={!isSendButtonEnabled}
                        ref={buttonRef}
                        onClick={handleSendMessage}
                        className='w-full'
                        icon={'pi pi-send'}
                    />
                </div>
            </div>
        </div>
    )
}