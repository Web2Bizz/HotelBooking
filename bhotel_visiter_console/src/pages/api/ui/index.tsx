/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AdminPageTitle } from '@widgets'
import { Button } from 'primereact/button'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { trpc } from '@helpers'

export const ApiPage = () => {
	const [checkConnection] = trpc.useQueries((t) => [
		t.publicRouter.pgConnectionaRouter.checkConnection()
	])

	const onCheckDB = () => {
		checkConnection.refetch()
	}

	const pgData = trpc.publicRouter.pgConnectionaRouter.getPgData.useQuery().data

	return (
		<>
			<AdminPageTitle title={'настройки API'} />
			<form className='col-4' onSubmit={(e) => e.preventDefault()}>
				<h3>API административной части:</h3>
				<div className='my-3'>
					{/* @ts-ignore */}
					<FloatLabel>
						<InputText id='username' className='col-12' />
						<label htmlFor='username'>api ссылка</label>
					</FloatLabel>
				</div>
				<Button label='Проверить соединение' />
				<h3>API backend:</h3>
				<div className='my-3'>
					{/* @ts-ignore */}
					{/* <FloatLabel>
						<InputText id='username' className='col-12' />
						<label htmlFor='username'>api ссылка</label>
					</FloatLabel> */}
				</div>
				<Button label='Проверить соединение' />
				<Button label='Сохранить' severity='success' className='col-12 mt-3' />
				<h3>Данные подключения к БД (Только для чтения):</h3>
				<div className='flex flex-column gap-2 my-3'>
					<label htmlFor='username'>Название БД:</label>
					<InputText
						value={pgData?.name}
						readOnly
						id='username'
						aria-describedby='username-help'
					/>
				</div>
				<div className='flex flex-column gap-2 my-3'>
					<label htmlFor='username'>Пользователь:</label>
					<InputText
						value={pgData?.user}
						readOnly
						id='username'
						aria-describedby='username-help'
					/>
				</div>
				<div className='flex flex-column gap-2 my-3'>
					<label htmlFor='username'>Хост:</label>
					<InputText
						value={pgData?.host}
						readOnly
						id='username'
						aria-describedby='username-help'
					/>
				</div>
				<div className='flex flex-column gap-2 my-3'>
					<label htmlFor='username'>Порт:</label>
					<InputText
						value={pgData?.port.toString()}
						readOnly
						id='username'
						aria-describedby='username-help'
					/>
				</div>
				<p>Статус: {checkConnection.status}</p>
				<Button label='Проверить соединение' onClick={onCheckDB} />
			</form>
		</>
	)
}
