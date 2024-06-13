import 'primeicons/primeicons.css'
import { PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
import ReactDOM from 'react-dom/client'
import { RouterApp } from './routes'
import '/node_modules/primeflex/primeflex.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
		<PrimeReactProvider>
			<RouterApp />
		</PrimeReactProvider>
)
