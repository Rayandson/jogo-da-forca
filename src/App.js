import React, {useState} from "react"
import styled from 'styled-components';
import palavras from "./palavras"
import forca0 from "./assets/forca0.png"
import forca1 from "./assets/forca1.png"
import forca2 from "./assets/forca2.png"
import forca3 from "./assets/forca3.png"
import forca4 from "./assets/forca4.png"
import forca5 from "./assets/forca5.png"
import forca6 from "./assets/forca6.png"


const imagens = [forca0, forca1, forca2, forca3, forca4, forca5, forca6]
    export default function App() {
        let letras = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    
    const [palavra, setPalavra] = useState("")
    const [desabilitado , setDesabilitado] = useState("desabilitado")
    
    const [erros, setErros] = useState(0)
    const [arrayPalavra, setArrayPalavra] = useState(palavra.split(""))
    const [cor, setCor] = useState("")
    const [clicados, setClicados] = useState([])
    const [chute, setChute] = useState("")
    
    function sortearPalavra() {
        let novaPalavra = palavras[Math.floor(Math.random() * palavras.length)]
        setPalavra(novaPalavra);
        setDesabilitado("tecla")
        setClicados([])
        let novoArray = novaPalavra.split("")
        let arrayTransformado = [];
        novoArray.forEach(function(l) {
            arrayTransformado.push("_")
        })
        setArrayPalavra(arrayTransformado)
        setCor("")
        setErros(0)
    }

 
    function verificaLetra(letra) {
        setClicados([...clicados, letra])
        // setDesabilitado("desabilitado")
        let guardaErros = 0
        let guardaPalavra = palavra.split("")
        let novoArray = [...arrayPalavra];
        let contador = 0
        guardaPalavra.forEach(function (l, index) { 
            if(l === "ç" && letra === "c") {
            novoArray[index] = l;  
            } else if((l === "á" || l === "à" || l === "â" || l === "ã") && letra === "a") {
            novoArray[index] = l;     
            } else if((l === "ó" || l === "ô") && letra === "o") {
            novoArray[index] = l;     
            } else if(l === "í" && letra === "i") {
            novoArray[index] = l;     
            } else if(l === "ú" && letra === "u") {
                novoArray[index] = l; 
            } else if(l===letra) {
            novoArray[index] = l;
        } else {
            contador++
        }
        }
        )
        if(contador === guardaPalavra.length) {
            guardaErros = erros + 1
            setErros(guardaErros)
        }
        setArrayPalavra(novoArray)
        if(!novoArray.includes("_")) {
            // setTimeout(() => alert("VOCÊ GANHOU"), 500)
            setCor("verde")
            setArrayPalavra(guardaPalavra)
            setDesabilitado("desabilitado")
        }
        if(guardaErros === 6) {
            // setTimeout(() => alert("VOCÊ PERDEU"), 500)
            setCor("vermelho")
            setArrayPalavra(guardaPalavra)
            setDesabilitado("desabilitado")
        }
    }

    function verificarChute() {
        let guardaPalavra = palavra.split("")
        if(chute === palavra) {
            setArrayPalavra(guardaPalavra)
            setCor("verde")
            setDesabilitado("desabilitado")
            setChute("")
        } else {
            setCor("vermelho")
            setArrayPalavra(guardaPalavra)
            setDesabilitado("desabilitado")
            setChute("")
        }
    }

    return(
    <>
    <Conteudo>
    <Principal>
    {/* <ImagemForca src={`./forca${erros}.png`} alt="imagem forca" /> */}
    <ImagemForca data-identifier="game-image" src={imagens[erros]} alt="imagem forca" /> 
    <Right>
    <BotaoEscolher data-identifier="choose-word" onClick={sortearPalavra}>Escolher palavra</BotaoEscolher>
    <PalavraDiv>
        {arrayPalavra.map((l) => <Palavra data-identifier="word" className={cor}>{l}</Palavra>)}
    </PalavraDiv>
    </Right>
    </Principal>
    <Teclado>
    {letras.map((l) => <Tecla data-identifier="letter" className={`${desabilitado} ${clicados.includes(l) ? "desabilitado" : ""}`} onClick={() => verificaLetra(l)}>{l.toUpperCase()}</Tecla>)}
    </Teclado>
    <Bottom>
    <p>Já sei a palavra!</p>
    <input data-identifier="type-guess" onChange={(e)=> setChute(e.target.value)} value={chute} ></input>
    <BottomButton data-identifier="guess-button" className={`${desabilitado}`} onClick={verificarChute} >Chutar </BottomButton>
    </Bottom>
    </Conteudo>
    </>
    )
}


// styled-components
const Conteudo = styled.div`
width: 700px;
margin: 10px auto;
display: flex;
flex-direction: column;
align-items: center;
font-family: 'Roboto', sans-serif;
`;

const Principal = styled.div`
width: 700px;
display: flex;
justify-content: space-between;
`;

const Right = styled.div`
width: 350px;
display: flex;
justify-content: space-between;
flex-direction: column;
`;

const PalavraDiv = styled.div`
display: flex;
gap: 5px;
margin: 0 auto;
`;

const Palavra = styled.div`
font-size: 30px;
font-weight: 700;
`;

const BotaoEscolher = styled.button`
width: 150px;
height: 40px;
margin-top: 35px;
margin-left: 175px;
background-color: #28AE60;
color: white;
font-family: 'Roboto', sans-serif;
font-weight: 700;
border: none;
border-radius: 5px;
`;

const ImagemForca = styled.img`
width: 350px;
`;

const Teclado = styled.div`
width: 575px;
display: flex;
flex-wrap: wrap;
gap: 10px;
margin-top: 50px;
`;

const Tecla = styled.button`
width:35px;
height: 35px;
`;

const Bottom = styled.div`
width: 470px;
display: flex;
align-items: center;
gap: 10px;
margin-top: 25px;

p {
    font-size: 15px; 
}
input {
    width: 250px;
    height: 25px; 
}
`;

const BottomButton = styled.button`
width: 65px;
height: 35px;
background-color: #E1ECF4;
color: #526ca8;
border: 1px solid #74a3da;
border-radius: 5px;
font-family: 'Roboto', sans-serif;
font-weight: 700;
`;