import { useEffect, useState } from 'react'
import Form from './component/form'
import History from './component/history'
import Inform from './component/inform'
import './style/null.scss'
import './style/style.scss'
import './style/adaptive.scss'
function App() {
	const [activeElem, setActiveElem] = useState(55)
	const [dataGet, setDataGet] = useState()
	const [load, setLoad] = useState(false)
	const [openHistory, setOpenHistory] = useState(false)
	const [massiveCart, setMassiveCart] = useState([])
	useEffect(()=> {
		localStorage.getItem('history')
			? setMassiveCart(JSON.parse(localStorage.getItem('history')))
			: setMassiveCart([])
	},[])
	return (
		<main className='sending'>
			<section className='sending-window'>
				<div className='sending-window__content'>
					<h2 className='sending-window__title'>
						Відстежити посилку на Новій Пошті
					</h2>
					<Form
						setActiveElem={setActiveElem}
						setDataGet={setDataGet}
						setMassiveCart={setMassiveCart}
						setLoad={setLoad}
						massiveCart={massiveCart}
					/>
					<Inform load={load} data={dataGet} />
					<button
						onClick={() => setOpenHistory(!openHistory)}
						className={`sending-btn ${openHistory ? 'sending-btn-active' : ''}`}
					>
						<img
							width={25}
							height={25}
							src='./img/arrow.svg'
							alt='arrow'
							className='sending-btn__icon'
						/>
					</button>
				</div>
				{openHistory ? (
					<History
						setMassiveCart={setMassiveCart}
						activeElem={activeElem}
						setActiveElem={setActiveElem}
						setDataGet={setDataGet}
						setLoad={setLoad}
						massiveCart={massiveCart}
					/>
				) : (
					''
				)}
			</section>
		</main>
	)
}

export default App
