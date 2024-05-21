import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterApp } from './routes'
import '../app/GlobalStyles/index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterApp />
	</React.StrictMode>
)
