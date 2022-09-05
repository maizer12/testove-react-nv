import React from 'react'
import './form.Module.scss'
import axios from 'axios'
import { useForm } from 'react-hook-form'
const Form = ({
	setDataGet,
	setLoad,
	setMassiveCart,
	massiveCart,
	setActiveElem,
}) => {
	const search = (obj, data) =>
		axios.post('https://api.novaposhta.ua/v2.0/json/', obj).then(res => {
			if (res.data.data[0].Status === 'Номер не найден') {
				alert('Номер не найден')
			} else {
				setLoad(false)
				setDataGet(res.data.data[0])
				setActiveElem(55)
				setMassiveCart(massiveCart.concat([data.DocumentNumber]))
				setLoad(true)
				localStorage.setItem(
					'history',
					JSON.stringify(massiveCart.concat([data.DocumentNumber]))
				)
			}
		})

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm()
	const onSubmit = data => {
		if (massiveCart.filter(e => e === data.DocumentNumber).length >= 1) {
			alert('Цей номер вже є у вашій історії!')
		} else {
			const obj = {
				apiKey: 'f8d845dad31ff4d74da31ed7628e7a54',
				modelName: 'TrackingDocument',
				calledMethod: 'getStatusDocuments',
				methodProperties: {
					Documents: [data],
				},
			}
			search(obj, data)
			reset()
		}
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)} className='form'>
			<label className='form__label'>
				<input
					type='number'
					placeholder='Введіть код TTH'
					className='form__input'
					{...register('DocumentNumber', {
						required: '*Поле має бути заповнене',
						minLength: {
							value: 14,
							message: 'Код не може бути коротше 14 цифр',
						},
						maxLength: {
							value: 14,
							message: 'Код не може бути більше 14 цифр',
						},
					})}
				/>
				<button type='reset' className='form__reset'>
					<img  src='./img/reset.svg' alt='reset' />{' '}
				</button>
				<p className='form__error'>{errors?.DocumentNumber?.message}</p>
			</label>
			<button type='submit' className='form__btn'>
				<p>Відстежити</p>
			</button>
		</form>
	)
}

export default Form
