import React from 'react';
import logo from '../assets/logo.png';
import RecipeItems from '../components/RecipeItems';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'
import { useState } from 'react';

export default function Home() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const addRecipe = () => {
        let token = localStorage.getItem("token")

        if (token) {
            navigate("/addRecipe")
        } else {
            setIsOpen(true)
        }

        // navigate("/addRecipe")
    }

    return (
        <>
            <section className="home">
                <div className="left">
                    <h1>Food Recipe</h1>
                    <h5>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. </h5>
                    <button onClick={addRecipe}>Share your recipe</button>
                </div>
                <div className="right">
                    <img src={logo} width="320px" height="320px" alt="" />
                </div>
            </section>
            <div className='bg'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FFAD84" fillOpacity="1" d="M0,128L26.7,149.3C53.3,171,107,213,160,224C213.3,235,267,213,320,192C373.3,171,427,149,480,144C533.3,139,587,149,640,170.7C693.3,192,747,224,800,202.7C853.3,181,907,107,960,90.7C1013.3,75,1067,117,1120,160C1173.3,203,1227,245,1280,240C1333.3,235,1387,181,1413,154.7L1440,128L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path></svg>
            </div>

            {(isOpen) && <Modal onClose={() => setIsOpen(false)}><InputForm setIsOpen={() => setIsOpen(false)} /></Modal>}

            <div className='recipe'>
                <RecipeItems />
            </div>
        </>
    )
}