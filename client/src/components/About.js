import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const { theme, colorSchemes, colorScheme } = useContext(ThemeContext);

  useEffect(() => {
    fetch("http://localhost:3000/api/about")
      .then((res) => res.json())
      .then((data) => {
        setAboutData(data[0]); // assuming single about object
      })
      .catch((err) => console.error("Error fetching About:", err));
  }, []);

  if (!aboutData) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-[80vh] gap-12 p-8">
        
        <div>
          <h2 className={`text-3xl md:text-5xl font-bold mb-2 ${colorSchemes[colorScheme].text}`}>Aarya Patankar</h2>
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>B.Tech(ENTC) 3rd year - Cummins College of Engineering for Women, Pune</h1>
          <p className={`text-xl leading-relaxed ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>I am a full stack software developer based in Pune, Maharashtra, with a passion for building intuitive and scalable web applications.</p> 
          <br></br><br></br>
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>Skills & Tech Stack:</h1>
          <p className={`text-xl leading-relaxed ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>Programming Languages: Java,
C<br></br>
Tools & Technologies:Postman, Git, VS Code<br></br>
Frontend: HTML, CSS, JavaScript, React<br></br>Backend: Node.js, Express, MongoDB, MySQL</p>
        <br></br><br></br>  
	<h1 className="text-2xl font-bold text-gray-900 text-center">Let's build something great together!</h1>
	<br></br>
	<div className="flex flex-wrap justify-center md:justify-center gap-4">
              <Link 
                to="/contact" 
                className={`px-6 py-3 rounded-lg ${colorSchemes[colorScheme].primary} text-white ${colorSchemes[colorScheme].hover} transition`}
              >
                Contact Me
              </Link>
 	   </div>
	</div>
      
    </div>
  );
};

export default About;
