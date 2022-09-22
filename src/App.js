import React from "react"
import forca0 from "./assets/forca0.png"
import palavras from "./palavras"


export default function App() {
    const [palavra, setPalavra] = React.useState("inicio")
    const letras = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    let erros = 0;
    
    function sortearPalavra() {
        setPalavra(palavras[Math.floor(Math.random() * palavras.length)]);
    }

    return(
    <>
    <div className="conteudo">
    <div className="principal">
    <img className="img-forca" src={forca0} alt="imagem forca" />
    <div className="right">
    <button className="escolher" onClick={sortearPalavra}>Escolher palavra</button>
    <div className="palavra-div"><p className="palavra">{}</p></div>
    </div>
    </div>
    <div className="teclado">
    {letras.map((l) => <button className="tecla">{l}</button>)}
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