import { trpc } from '@helpers'
import { AdminPageTitle } from '@widgets'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Toast } from 'primereact/toast'
import { classNames } from 'primereact/utils'
import { useRef } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

interface IFromOptionsAdd {
	name: string
	description: string
	price: number
}

export const OptionsAddPage = () => {
	const mutation = trpc.addService.useMutation()

	const { control, handleSubmit } = useForm<IFromOptionsAdd>({})

	const toast = useRef<Toast>(null)

	const show = () => {
		toast.current?.show({ severity: 'success', summary: 'Успех!', detail: 'Данные успешно обновлены' })
	}

	const onSubmit: SubmitHandler<IFromOptionsAdd> = async (formData) => {
		await mutation.mutateAsync({ ...formData })

		if (mutation.isSuccess) {
			alert('success')
		}

		show()
	}

	return (
		<>
			<AdminPageTitle title={'Добавить услугу'} />
			<Toast ref={toast} />
			<form className='col-4 mt-4' onSubmit={handleSubmit(onSubmit)}>
				<Controller
					control={control}
					rules={{ required: 'Название не введено' }}
					name='name'
					render={({ field, fieldState }) => (
						<div className='' style={{ width: '100%' }}>
							<label htmlFor={field.name}></label>
							<span className='p-float-label'>
								<InputText
									id={field.name}
									className={classNames({ 'p-invalid': fieldState.error })}
									style={{ width: '100%' }}
									onChange={(e) => field.onChange(e.target.value)}
								/>
								<label htmlFor={field.name}>Название</label>
							</span>
						</div>
					)}
				/>
				<Controller
					name='description'
					control={control}
					rules={{ required: 'Описнаие не введено' }}
					render={({ field, fieldState }) => {
						return (
							<span className='p-float-label mt-5'>
								<InputTextarea
									id={field.name}
									{...field}
									rows={4}
									cols={30}
									className={classNames({ 'p-invalid': fieldState.error })}
									style={{ width: '100%' }}
								/>
								<label htmlFor={field.name}>Описание</label>
							</span>
						)
					}}
				/>
				<Controller
					name='price'
					control={control}
					rules={{ required: 'Описнаие не введено' }}
					render={({ field, fieldState }) => {
						return (
							<span className='p-float-label mt-5'>
								<InputText
									type='number'
									className={classNames({ 'p-invalid': fieldState.error })}
									style={{ width: '100%' }}
									min={0}
									step={1000}
									onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
								/>
								<label htmlFor={field.name}>Цена (руб)</label>
							</span>
						)
					}}
				/>
				<Button label='Сохранить' icon='pi pi-save' className='col-12 mt-4' />
			</form>
		</>
	)
}
