import QuestaoModel from '../model/questao'
import { useState, useEffect } from 'react'
import Questionario from '../components/Questionario'
import { useRouter } from 'next/router'

const BASE_URL = 'https://nextjs-quis.vercel.app/api'

export default function Home() {
  const [idsDasQuestores, setidsDasQuestores] = useState<number[]>([])  
  const [questao, setQuestao] = useState<QuestaoModel>(null)
  const [respostasCertas, setRespostasCertas] = useState<number>(0)
  const router = useRouter()

  async function carregarIdsDasQuestoesAsync() {
    const resp = await fetch(`${BASE_URL}/questionario`)
    const idsDasQuestores = await resp.json()    
    setidsDasQuestores(idsDasQuestores)
  }

  async function carregarQuestoesAsync(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
    const questoes = await resp.json()
    const novaQuestao = QuestaoModel.criarUsandoObjeto(questoes)
    setQuestao(novaQuestao)
  }  

  useEffect(() => {
    carregarIdsDasQuestoesAsync()
  }, [])

  useEffect(() => {
    idsDasQuestores.length > 0 && carregarQuestoesAsync(idsDasQuestores[0])
  }, [idsDasQuestores])  

  function questaoRespondida(questaoRespondida: QuestaoModel){
    setQuestao(questaoRespondida)
    const acertou = questaoRespondida.acertou
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0))    
  }

  function idProximaPergunta(){
    const proximoIndice = idsDasQuestores.indexOf(questao?.id) + 1
    return idsDasQuestores[proximoIndice]
  }

  function irPraProximoPasso(){
    const proximoId = idProximaPergunta()
    proximoId ? carregarQuestoesAsync(proximoId) : finallizar()
  }

  function finallizar(){
    router.push({
      pathname: '/resultado',
      query: {
        total: idsDasQuestores.length,
        certas: respostasCertas
      }
    })
  }

  return (
    questao ?
      <Questionario 
        questao={questao}
        ultima={idProximaPergunta() === undefined}
        questaoRespondida={questaoRespondida}
        irPraProximoPasso={irPraProximoPasso}/>           
      : false
  )
}
