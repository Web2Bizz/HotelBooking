import { Button, Layout } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './HomePage.scss'
const { Header, Footer, Content } = Layout

const headerStyle = {
	textAlign: 'center',
	height: '9vh',
	paddingInline: 50,
	lineHeight: '64px',
	backgroundColor: '#F8EFED',
	padding: '0 4vh'
}

const contentStyle = {
	textAlign: 'center',
	minHeight: 120,
	lineHeight: '120px',
	color: '#fff',
	backgroundColor: '#F8EFED'
}

const footerStyle = {
	textAlign: 'center',
	color: '#fff',
	backgroundColor: '#F8EFED'
}

export default function HomePage() {
	const navigation = useNavigate()
	return (
		<Layout>
			<Header style={headerStyle}>
				<div className='d-flex justify-content-between'>
					<div className='d-flex align-items-center'>
						<img src='/image/logo.svg' alt='logo' style={{ width: '8vh' }} />
						<p className='landing-logo-text'>BookRoom</p>
					</div>
					<div className='d-flex landing-header-tabs'>
						<p>О нас</p>
						<p>Номера</p>
						<p>Услуги</p>
						<p>Расценки</p>
						<Button type='primary' onClick={() => navigation('/')}>
							Войти
						</Button>
					</div>
				</div>
			</Header>
			<Content style={contentStyle}>
				<div style={{ padding: '1vh 4vh' }}>
					<div style={{ backgroundColor: 'white', borderRadius: '2vh', height: '70vh' }}>
						<p>Content</p>
					</div>
				</div>
			</Content>
			<Footer style={footerStyle}>Footer</Footer>
		</Layout>
	)
}
