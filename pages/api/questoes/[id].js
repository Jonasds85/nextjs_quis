import bancoDeDados from '../bancoDeQuestoes'

export default (req, res) => {

    const idSelecionado = +req.query.id

    const unicaQuestaoOuNada = bancoDeDados.filter(questao => questao.id === idSelecionado)

    if (unicaQuestaoOuNada.length === 1){
        const questaoSelecionada = unicaQuestaoOuNada[0].embaralharRespostas()        
        res.status(200).json(questaoSelecionada.paraObjecto())
    }else{
        res.status(204).send()
    }


    
}