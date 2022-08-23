import { useState } from 'react'
import {FiSearch} from 'react-icons/fi'
import './styles.css'
import api from './services/api'


function Container(){
    const[input, setInput] = useState('')
    const[cep, setCep] = useState({})

    async function handleSearch(){
    var paragrafo_erro = document.getElementById("erro")
    var border_erro = document.getElementById("container-input")
   

        try{
            paragrafo_erro.innerHTML= ""
            border_erro.style.border = ""
            const response = await api.get(`${input}/json`)
            if(response.data.erro === "true"){

                paragrafo_erro.innerHTML= "CEP desconhecido!"
                border_erro.style.border = "1px solid red"
                setInput('')

            }else{
                setCep(response.data) 
                setInput('')

            }
            
            
        }catch{
            paragrafo_erro.innerHTML= "CEP inválido!"
            border_erro.style.border = "1px solid red"
            setInput('')
        }

         if (input === '') {
            paragrafo_erro.innerHTML= "CEP vázio!"
            border_erro.style.border = "1px solid red"
            setInput('')
        }
        
    }

    document.addEventListener("keypress", (e)=>{

        if(e.key === "Enter"){

            console.log("apertou");
            const btn = document.querySelector(".btn")
            btn.click()
        }

    })
     

    return (   
        <div className="container">
            
          <h1 className="title">Buscador de CEP</h1>
          <div>
          <div id='container-input' className="container-input">
    
            <input 
            type ="text" 
            placeholder="Digite seu CEP"
            value={input}
            onChange={(e)=> setInput(e.target.value)}/>
            <button className='btn'  onClick={handleSearch}>
              <FiSearch size={25} color="#fff" />  
              </button>
              
          </div>
          <div className='container-error'>

            <p id='erro'></p>

          </div>
            </div>

        {Object.keys(cep).length > 1 &&(

        <main className='main'>
    
                <h2>CEP :{cep.cep}</h2>
    
                <span>{cep.logradouro}</span>
                <span>Complemento :{cep.complemento}</span>
                <span>Bairro: {cep.bairro}</span>
                <span>{cep.localidade} : {cep.uf}</span>

          </main>



        )}
          
        </div>
      )

}

export default Container