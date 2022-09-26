import React, {useState} from "react"
import palavras from "./palavras"
// import forca0 from "./assets/forca0.png"



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
    <div className="conteudo">
    <div className="principal">
    <img className="img-forca" src={`./forca${erros}.png`} alt="imagem forca" />
    <div className="right">
    <button className="escolher" onClick={sortearPalavra}>Escolher palavra</button>
    <div className="palavra-div">
        {arrayPalavra.map((l) => <div className={`palavra ${cor}`}>{l}</div>)}
    </div>
    </div>
    </div>
    <div className="teclado">
    {letras.map((l) => <button className={`botao ${desabilitado} ${clicados.includes(l) ? "desabilitado" : ""}`} onClick={() => verificaLetra(l)}>{l.toUpperCase()}</button>)}
    </div>
    <div className="bottom">
    <p>Já sei a palavra!</p>
    <input onChange={(e)=> setChute(e.target.value)} value={chute} ></input>
    <button className={`bottom-button ${desabilitado}`} onClick={verificarChute} >Chutar</button>
    </div>
    </div>
    </>
    )
}