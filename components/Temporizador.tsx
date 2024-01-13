import styles from "../styles/Temporizador.module.css"
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

interface TemporizadorProps{
    key: any
    duracao: number
    tempoEsgotado: () => void
}

export default function Temporizador(props: TemporizadorProps){
    return (
        <div className={styles.temporizador}>
            <CountdownCircleTimer 
                duration={props.duracao}
                size={120}
                isPlaying
                onComplete={props.tempoEsgotado}
                colors={['#ED827A', '#F7B801', '#BCE596']}
                colorsTime={[7, 4, 2]}
            >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
        </div>
    )
}
