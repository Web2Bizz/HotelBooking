import { AdminPageTitle } from '@widgets'
import { InputText } from 'primereact/inputtext'

export const OptionsAddPage = () => {
	return (
		<>
			<AdminPageTitle title={'Добавить услугу'} />
            <form className='mt-5'>
                <label htmlFor=""></label>
                <InputText/>
            </form>
		</>
	)
}
