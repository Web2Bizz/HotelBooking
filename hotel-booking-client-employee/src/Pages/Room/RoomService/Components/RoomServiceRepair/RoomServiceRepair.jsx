import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, Divider, Input, DatePicker, Form, message, Checkbox } from 'antd'
const { TextArea } = Input
import '../../RoomService.scss'
import {
	repairApplicationCreateAction,
	repairApplicationEditAction
} from '../../../../../store/actions/repairRoomAction'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')

export default function RoomServiceRepair(props) {
	const onBackButton = () => {
		props.setIsRepair(false)
		props.setIsEdit(false)
	}

	const [messageApi, contextHolder] = message.useMessage()
	const dispatch = useDispatch()
	const { error } = useSelector((state) => state.repairRoomStore)

	const formDataInitialValue = {
		id_room: props.selectedRoom,
		name_work: '',
		description_work: '',
		start_date: '',
		end_date: '',
		closeroom: false
	}

	const [formsData, setFormsData] = useState([])
	const [formRefs, setFormRefs] = useState([React.createRef()])

	// Начальное значение форм данных и ссылок на формы
	// const [formsData, setFormsData] = useState([]);
	// const [formRefs, setFormRefs] = useState([]);

	const handleAddForm = () => {
		setFormsData([...formsData, formDataInitialValue])
		setFormRefs([...formRefs, React.createRef()])
	}

	function convertDataArray(dataArray) {
		const tempArray = []
		for (let i = 0; i < dataArray.length; i++) {
			tempArray.push({
				closeroom: dataArray[i].closeroom,
				description_work: dataArray[i].description_work,
				end_date: dataArray[i].end_date,
				start_date: dataArray[i].start_date,
				name_work: dataArray[i].name_work,
				id_room: dataArray[i].id_room
			})
		}
		return tempArray
	}

	useEffect(() => {
		if (props.isEdit) {
			let currentData = props.data.find((obj) => obj.repairs[0].id_room === props.selectedRoom).repairs
			const convertedData = convertDataArray(currentData)
			setFormsData(convertedData)
			setFormRefs(convertedData.map(() => React.createRef())) // Создаем ссылки для каждой формы
		} else {
			setFormsData([formDataInitialValue])
			setFormRefs([React.createRef()]) // Создаем ссылку для первой формы
		}
	}, [])

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
				if (key === 'closeroom') {
					return { ...formData, [key]: value.target.checked }
				} else {
					return { ...formData, [key]: value }
				}
			}
			return formData
		})
		setFormsData(updatedFormsData)
	}

	const validateStartDate = (_, value) => {
		const today = new Date()
		console.log(value, dayjs(today))
		return value && value.startOf('day') >= dayjs(today).startOf('day')
			? Promise.resolve()
			: Promise.reject('Дата начала должна быть не раньше сегодняшней даты')
	}

	const validateEndDate = (_, value, formData) => {
		const today = new Date()
		// Если value (дата окончания) не установлена или равна null, это считается корректным, так как это означает, что поле не заполнено
		if (!value) {
			console.log(1)
			return Promise.resolve('Ошибочка')
		}

		// Если дата окончания меньше сегодняшней или меньше даты начала, возвращаем ошибку
		if (
			dayjs(today).startOf('day') > dayjs(value).startOf('day') ||
			(formData.start_date && value < getConvertedDate(formData.start_date))
		) {
			console.log(2)
			return Promise.reject('Дата окончания должна быть больше или равна сегодняшней дате и дате начала')
		}

		// Иначе возвращаем успешное разрешение
		console.log(3)
		return Promise.resolve()
	}

	const handleSubmit = () => {
		// Валидация форм
		const formValidationPromises = formRefs.map((formRef) => formRef.current.validateFields())
		Promise.all(formValidationPromises)
			.then(() => {
				if (props.isEdit) {
					dispatch(repairApplicationEditAction(formsData))
					props.setIsEdit(false)
				}
				if (props.isRepair) {
					dispatch(repairApplicationCreateAction(formsData))
					props.setIsRepair(false)
				}
			})
			.catch((e) => {
				messageApi.error(e)
			})
	}

	const getConvertedDate = (dateString) => {
		if (!(typeof dateString === 'string' || dateString instanceof String)) return dateString
		const [day, month, year] = dateString.split('.').map(Number)
		const date = new Date(year, month - 1, day)
		return dayjs(date)
	}

	return (
		<>
			{contextHolder}
			<h2>Ремонт</h2>
			<Button type='text' icon={<ArrowLeftOutlined />} onClick={() => onBackButton()}>
				Назад
			</Button>
			<Card style={{ marginTop: '1vh', marginBottom: '1vh' }}>
				<p>Список плановых ремонтов</p>
				<Checkbox onChange={(e) => handleChange(0, 'closeroom', e)}>Заблокировать номер на период ремонта?</Checkbox>

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
								defaultValue={formsData[idx].name_work}
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
								defaultValue={formsData[idx].description_work}
								onChange={(e) => handleChange(idx, 'description_work', e.target.value)}
								autoSize={{ minRows: 3, maxRows: 5 }}
								placeholder='Починить дверь на 5 этаже в комнате №234'
							/>
						</Form.Item>
						<Form.Item
							label='Начало ремонта:'
							name='start_date'
							rules={[{ required: true, message: 'Пожалуйста введите дату начала' }, { validator: validateStartDate }]}
						>
							<DatePicker
								defaultValue={formsData[idx].start_date ? getConvertedDate(formsData[idx].start_date) : null}
								onChange={(date) => handleChange(idx, 'start_date', date)}
								needConfirm={false}
							/>
						</Form.Item>
						<Form.Item
							label='Конец ремонта:'
							name='end_date'
							rules={[
								{ required: true, message: 'Пожалуйста введите дату окончания' },
								{ validator: (_, value) => validateEndDate(_, value, formData) }
							]}
						>
							<DatePicker
								defaultValue={formsData[idx].start_date ? getConvertedDate(formsData[idx].end_date) : null}
								onChange={(date) => handleChange(idx, 'end_date', date)}
								needConfirm={false}
							/>
						</Form.Item>
						{idx > 0 && <Button onClick={() => handleDeleteForm(idx)}>Удалить форму</Button>}
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
