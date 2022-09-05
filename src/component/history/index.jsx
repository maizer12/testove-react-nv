import React, { useState } from 'react'
import './history.Module.scss'
import axios from 'axios'
const History = ({
	massiveCart,
	setLoad,
	setDataGet,
	setActiveElem,
	activeElem,
	setMassiveCart,
}) => {
	const search = (obj, index) => {
		if (index === activeElem) {
			setActiveElem(55)
		} else {
			axios.post('https://api.novaposhta.ua/v2.0/json/', obj).then(res => {
				setLoad(false)
				setDataGet(res.data.data[0])
				setActiveElem(index)
				setLoad(true)
			})
		}
	}
	const getHistory = (number, index) => {
		const obj = {
			apiKey: 'f8d845dad31ff4d74da31ed7628e7a54',
			modelName: 'TrackingDocument',
			calledMethod: 'getStatusDocuments',
			methodProperties: {
				Documents: [number],
			},
		}
		search(obj, index)
	}
	const removeItem = async item => {
		setMassiveCart([... massiveCart.filter(e => e !== item)])
		const newDate = [...massiveCart.filter(e => e !== item)]
		await localStorage.setItem('history', JSON.stringify(newDate))
	}
	return (
		<div className='history'>
			<h2 className='history__title'>Історія:</h2>
			<ul className='history__items'>
				{Array.isArray(massiveCart) ? (
					massiveCart.map((e, i) => (
						<li
							key={i}
							className={`history__item ${
								activeElem === i ? 'history__item-active' : ''
							}`}
						>
							<p onClick={() => getHistory(e, i)}>{e}</p>
							<button onClick={() => removeItem(e)} className='btn-remove'>
								<img
									width={15}
									height={15}
									src='./img/reset.svg'
									alt='remove'
								/>
							</button>
						</li>
					))
				) : (
					<li className='history__item-none'>Ви ще нічого не шукали</li>
				)}
			</ul>
		</div>
	)
}

export default History
