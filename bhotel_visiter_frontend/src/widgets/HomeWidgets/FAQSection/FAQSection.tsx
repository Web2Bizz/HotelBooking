import { Collapse } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'

import type { CollapseProps } from 'antd'
import { useEffect, useState, type CSSProperties } from 'react'
import { trpc } from '@helpers'

import './style.scss'
import { TFaq } from 'trpc-package'

type TFaqItem = {
	key: string
	label: string
	children: JSX.Element
	style: CSSProperties
}

const FAQSection = () => {
	const [faq, setFaq] = useState<Array<TFaqItem>>([])

	const panelStyle: React.CSSProperties = {
		marginBottom: 24,
		background: '#e9e9e9',
		borderRadius: 15,
		border: 'none'
	}

	const getAllFAQ = trpc.useQueries((t) => [t.getAllFAQ()])

	const getItems = (panelStyle: CSSProperties) =>
		getAllFAQ !== undefined &&
		Array.isArray(getAllFAQ[0].data) &&
		getAllFAQ[0].data.map((item, index) => ({
			key: index.toString(),
			label: item.title,
			children: <p>{item.description}</p>,
			style: panelStyle
		}))

	return (
		faq !== undefined && (
			<div className='FAQSection-container'>
				<div>
					<h1>Часто задаваемые вопросы</h1>
				</div>
				<div className='FAQSection-collapse'>
					<Collapse
						bordered={false}
						expandIconPosition='end'
						expandIcon={({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />)}
						items={getItems(panelStyle)}
						style={{ background: '#e9e9e9' }}
					/>
				</div>
			</div>
		)
	)
}

export default FAQSection
