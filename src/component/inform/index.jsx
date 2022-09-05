import React from 'react'
import './form.Module.scss'
const Inform = ({ data, load }) => {
	return (
		<div>
			{load ? (
				<div className='inform'>
					<h4 className='inform__title'>Інформація:</h4>
					<div className='inform__window'>
						<h5 className='inform__status'>Статус доставки: {data.Status}</h5>
						<p className='inform__paragraph'>
							Відправлена:{' '}
							{data.WarehouseSenderAddress.length > 1
								? data.WarehouseSenderAddress
								: data.CitySender}
						</p>
						<p className='inform__paragraph'>
							Отримана: {data.WarehouseRecipient}
						</p>
						<p className='inform__paragraph'>
							Дата відправки: {data.DateCreated}
						</p>
						<p className='inform__paragraph'>
							Дата прибуття: {data.ActualDeliveryDate}
						</p>
					</div>
				</div>
			) : (
				<div className='inform'>
					<h4 className='inform__title'>Інформація:</h4>
					<div className='inform__window'>
						<h5 className='inform__status'>Статус доставки: Невідомо</h5>
						<p className='inform__paragraph'>Відправлена: Невідомо</p>
						<p className='inform__paragraph'>Отримана: Невідомо</p>
						<p className='inform__paragraph'>Дата відправки: Невідомо</p>
						<p className='inform__paragraph'>Дата отримання: Невідомо</p>
					</div>
				</div>
			)}
		</div>
	)
}

export default Inform
