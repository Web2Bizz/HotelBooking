import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, Divider, Input, DatePicker, Form, message } from 'antd'
const { TextArea } = Input
import { repairApplicationCreateAction } from '../../../../../store/actions/repairRoomAction'

export default function RoomServiceRepair(props) {
	const onBackButton = () => {
		props.setIsRepair(false)
	}

	const [messageApi, contextHolder] = message.useMessage()
	const dispatch = useDispatch()
	const { error } = useSelector((state) => state.repairRoomStore)

	const [formsData, setFormsData] = useState([
		{ id_room: props.selectedRoom, name_work: '', description_work: '', start_date: '', end_date: '' }
	])
	const [formRefs, setFormRefs] = useState([React.createRef()])

	const handleAddForm = () => {
		setFormsData([
			...formsData,
			{ id_room: props.selectedRoom, name_work: '', description_work: '', start_date: '', end_date: '' }
		])
		setFormRefs([...formRefs, React.createRef()])
	}

	const handleDeleteForm = (index) => {
		if (formsData.length === 1) {
			return // Не удаляем последнюю форму
		}
		const updatedFormsData = formsData.filter((formData, idx) => idx !== index)
		setFormsData(updatedFormsData)
		const updatedFormRefs = [...formRefs]
		updatedFormRefs.splice(index, 1)
		setFormRefs(updatedFormRefs)
	}

	const handleChange = (index, key, value) => {
		const updatedFormsData = formsData.map((formData, idx) => {
			if (idx === index) {
				return { ...formData, [key]: value }
			}
			return formData
		})

		setFormsData(updatedFormsData)
	}

	const validateStartDate = (_, value) => {
		const today = new Date()
		return value && value > today
			? Promise.resolve()
			: Promise.reject('Дата начала должна быть больше сегодняшней даты')
	}

	const validateEndDate = (_, value, formData) => {
		return value && formData.start_date && value > formData.start_date
			? Promise.resolve()
			: Promise.reject('Дата окончания должна быть больше даты начала')
	}

	const handleSubmit = () => {
		// Валидация форм
		const formValidationPromises = formRefs.map((formRef) => formRef.current.validateFields())
		Promise.all(formValidationPromises)
			.then(() => {
				dispatch(repairApplicationCreateAction(formsData))
				props.setIsRepair(false)
			})
			.catch((e) => {
				messageApi.error(error)
			})
	}

	return (
		<>
			{contextHolder}
			<h2>Добавление ремонтных работ</h2>
			<Button type='text' icon={<ArrowLeftOutlined />} onClick={() => onBackButton()}>
				Назад
			</Button>
			<Card style={{ marginTop: '1vh', marginBottom: '1vh' }}>
				<p>Список плановых ремонтов</p>
				<Divider />
				{formsData.map((formData, idx) => (
					<Form
						key={idx}
						variant='filled'
						style={{ maxWidth: 600 }}
						className='repair-form-container'
						ref={formRefs[idx]}
					>
						<Form.Item
							label='Название работ'
							name='name_work'
							rules={[{ required: true, message: 'Пожалуйста введите название работы' }]}
						>
							<Input
								type='text'
								value={formData.name_work || ''}
								onChange={(e) => handleChange(idx, 'name_work', e.target.value)}
								placeholder='Ремонт двери'
							/>
						</Form.Item>
						<Form.Item
							label='Описание ремонта'
							name='description_work'
							rules={[{ required: true, message: 'Пожалуйста введите описание работы' }]}
						>
							<TextArea
								type='text'
								value={formData.description_work || ''}
								onChange={(e) => handleChange(idx, 'description_work', e.target.value)}
								autoSize={{ minRows: 3, maxRows: 5 }}
								placeholder='Починить дверь на 5 этаже в комнате №234'
							/>
						</Form.Item>
						<Form.Item
							label='Недоступен для заселения с'
							name='start_date'
							rules={[{ required: true, message: 'Пожалуйста введите дату начала' }, { validator: validateStartDate }]}
						>
							<DatePicker
								showTime
								value={formData.start_date || null}
								onChange={(date) => handleChange(idx, 'start_date', date)}
								needConfirm={false}
							/>
						</Form.Item>
						<Form.Item
							label='Недоступен для заселения по'
							name='end_date'
							rules={[
								{ required: true, message: 'Пожалуйста введите дату окончания' },
								{ validator: (_, value) => validateEndDate(_, value, formData) }
							]}
						>
							<DatePicker
								showTime
								value={formData.end_date || null}
								onChange={(date) => handleChange(idx, 'end_date', date)}
								needConfirm={false}
							/>
						</Form.Item>
						{idx > 0 && <button onClick={() => handleDeleteForm(idx)}>Удалить форму</button>}
						<Divider />
					</Form>
				))}
				<Divider />
				<a onClick={handleAddForm} style={{ color: '#3B92FF' }}>
					+ Добавить еще период ремонта
				</a>
			</Card>
			<Button type='primary' onClick={handleSubmit}>
				Сохранить
			</Button>
		</>
	)
}
