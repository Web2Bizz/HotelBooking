import { Table, Space } from 'antd'
export default function StatisticAndReports() {
	const columns = [
		{
			title: 'Название отчета',
			key: 'action',
			render: () => (
				<Space size='middle'>
					<a style={{ color: '#3B92FF' }}>Какой-то отчет</a>
				</Space>
			)
		},
		{
			title: 'Описанеи отчета',
			dataIndex: 'description',
			key: 'description'
		}
	]
	const data = [
		{
			key: '1',
			description: 'Описание какого-либо отчета'
		},
		{
			key: '2',
			description: 'Описание какого-либо отчета'
		}
	]
	return (
		<>
			<h2 style={{ paddingBottom: '3vh' }}>Статистичекие отчеты</h2>
			<Table columns={columns} dataSource={data} pagination={false} />
			<h2 style={{ paddingBottom: '3vh', paddingTop: '2vh' }}>Отчеты общего назначения</h2>
			<Table columns={columns} dataSource={data} pagination={false} />
		</>
	)
}
