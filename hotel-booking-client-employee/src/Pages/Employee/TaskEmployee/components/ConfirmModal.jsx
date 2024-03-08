import React from 'react'
import { Modal } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'

function ConfirmModal(title, func) {
	const { confirm } = Modal
	return confirm({
		title,
		icon: <ExclamationCircleFilled />,
		okText: 'Да',
		okType: 'danger',
		cancelText: 'Нет',
		onOk() {
			func(123)
		}
	})
}

export default ConfirmModal
