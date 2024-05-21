/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AdminPageTitle } from '@widgets'
import { FileUpload } from 'primereact/fileupload'
import { Image } from 'primereact/image'
// import { InputText } from 'primereact/inputtext'
// import { InputTextarea } from 'primereact/inputtextarea'
// import { FloatLabel } from 'primereact/floatlabel'
import { Button } from 'primereact/button'

export const GeneralPage = () => (
	<>
		<AdminPageTitle title={'Основное'} />
		<form className='col-4'>
			<h3>Логотип и бренд</h3>
			<div className='flex row gap-3 my-2 col-4'>
				<Image src='https://placehold.co/128' alt='Image' width='128' />
				<Image src='https://placehold.co/64' alt='Image' width='64' />
				<Image src='https://placehold.co/48' alt='Image' width='48' />
			</div>
			<div className='my-2'>
				<FileUpload
					className='m-0'
					name='demo'
					url={'/api/upload'}
					accept='image/*'
					chooseLabel='Выбрать файл'
					uploadLabel='Загрузить'
					cancelLabel='Отмена'
					maxFileSize={1000000}
					emptyTemplate={<p className='m-0'>Перетяните сюда чтобы загрузить изображение</p>}
				/>
			</div>
			<div className='my-2 col-4'>
				{/* @ts-ignore */}
				{/* <FloatLabel>
					<InputText id='username' className='col-12' />
					<label htmlFor='username'>Бренд</label>
				</FloatLabel> */}
			</div>
			<h3>Метаданные сайта</h3>
			<div className='my-2'>
				{/* @ts-ignore */}
				{/* <FloatLabel>
					<InputText id='username' className='col-12' />
					<label htmlFor='username'>Название сайта</label>
				</FloatLabel> */}
			</div>
			<div className='my-5'>
				{/* @ts-ignore */}
				{/* <FloatLabel>
					<InputTextarea id='username' rows={5} cols={30} className='col-12' />
					<label htmlFor='username'>Описание сайта</label>
				</FloatLabel> */}
			</div>
			<div className='my-2'>
				<FileUpload
					className='m-0'
					name='demo'
					url={'/api/upload'}
					accept='image/*'
					chooseLabel='Выбрать файл'
					uploadLabel='Загрузить'
					cancelLabel='Отмена'
					maxFileSize={1000000}
					emptyTemplate={<p className='m-0'>Перетяните сюда чтобы загрузить favicon</p>}
				/>
			</div>
			<Button label='Сохранить' severity='success' className='col-12 mt-3' />
		</form>
	</>
)
