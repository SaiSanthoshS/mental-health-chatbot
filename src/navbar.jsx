import React ,{useState}from 'react';
import './navbar.css';
import logo from "./saplogo.png";

const Navbar = () =>{
   const [active,setActive]=useState('navBar')
   const showNav=()=>{
    setActive('navBar activeNavbar')
   }
   const removeNav=()=>{
    setActive('navBar')
   }

    const handleButtonClick = () => {
        // Set the URL you want the button to navigate to
        window.location.href = 'https://www.sap.com/india/index.html';
    };

  return(
    <section className='navBarSection' >
        <header className='header flex'>
            <div className='logoDiv'>
                <a href='#' className='logo flex'>
                    <img src={logo} alt='logo' height={50} width={100} className='img1'/>
                </a>

            </div>
            <button className='btn' onClick={handleButtonClick}>OUR PRODUCTS</button>


        </header>
    </section>
  )
}

export default Navbar