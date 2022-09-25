import React, {useState} from "react"
import palavras from "./palavras"
// import forca0 from "./assets/forca0.png"



    export default function App() {
        let letras = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    
    let [palavra, setPalavra] = useState("")
    let [desabilitado , setDesabilitado] = useState("desabilitado")
    
    let [erros, setErros] = useState(0)
    let [arrayPalavra, setArrayPalavra] = useState(palavra.split(""))
    // const clicados = [];
    
    function sortearPalavra() {
        let novaPalavra = palavras[Math.floor(Math.random() * palavras.length)]
        setPalavra(novaPalavra);
        setDesabilitado("tecla")
        let novoArray = novaPalavra.split("")
        let arrayTransformado = [];
        novoArray.forEach(function(l) {
            arrayTransformado.push("_")
        })
        setArrayPalavra(arrayTransformado)
    }

 
    function verificaLetra(letra) {
        // clicados.push(letras[botao])
        // console.log(clicados)
        // setDesabilitado("desabilitado")
        let guardaErros = 0
        let guardaPalavra = palavra.split("")
        let novoArray = [...arrayPalavra];
        let contador = 0
        guardaPalavra.forEach(function (l, index) { 
            if(l===letra) {
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
            setTimeout(() => alert("VOCÊ GANHOU"), 500)
        }
        if(guardaErros === 6) {
            setTimeout(() => alert("VOCÊ PERDEU"), 500)
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
        {arrayPalavra.map((l) => <div className="palavra">{l}</div>)}
    </div>
    </div>
    </div>
    <div className="teclado">
    {letras.map((l) => <button className={desabilitado} onClick={() => verificaLetra(l)}>{l.toUpperCase()}</button>)}
    </div>
    <div className="bottom">
    <p>Já sei a palavra!</p>
    <input></input>
    <button>Chutar</button>
    </div>
    </div>
    </>
    )
}