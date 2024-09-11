import React from 'react';
import './Landingpage'; // Import your CSS file
import {Link} from 'react-router-dom';


function Programs() {
    return (
        <div class="landing-page">
               <header>
        <nav class="lp">
        <ul>
                <li><Link to='/LandingPage'><a>Home</a></Link></li>
				<li><Link to='/Programs'><a>Programs</a></Link></li>
                <li><Link to='/ContactUs'><a>Contact Us</a></Link></li>
                <li><Link to='/Login'><a>Login</a></Link></li>
                <li><Link to='/SignUp'><a>SignUp</a></Link></li>
				<li>
						<input class="search-container" type="text" id="search" placeholder="Search..?"/>
				</li> 
            </ul>
        </nav>
    </header>
            <div id="lp-hd">
            <section id="home">
                <h1>Welcome to the Department of Computer Science and Engineering</h1>
		        <h3>Below are the courses offered by the department.</h3>
		    </section>

            <div class="box" onclick="window.location.href='course1_policies.html'">
                <h3>Course Name: Course-1</h3>
                <h3>Instructor Name: Name-1</h3>   
            </div>

            <div class="box" onclick="window.location.href='course2_policies.html'">
                <h3>Course Name: Course-2</h3>
                <h3>Instructor Name: Name-2</h3>
            </div>

            <div class="box" onclick="window.location.href='course3_policies.html'">
                <h3>Course Name: Course-3</h3>
                <h3>Instructor Name: Name-3</h3>
             </div>

            
        </div>
        </div>
    );
}

export default Programs;

