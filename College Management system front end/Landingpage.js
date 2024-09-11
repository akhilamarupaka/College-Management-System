import React from 'react';
import './LandingPage.css'; // Import your CSS file
import {Link} from 'react-router-dom';
import Login_Nav from './Login_Nav';
import './Login_Nav.css';

function Landingpage() {
    return (
        <div class="landing-page">
     <Login_Nav/>
            <div id="lp-hd">
            <section class="home">
                <h1>Welcome to Academic Program Management</h1>
                <h3>Your One-stop Solution for Academic Excellence</h3>
            </section>

            <section class="about">
                <h2>About Us</h2>
                <p>We provide a comprehensive set of tools to manage your academic programs efficiently</p>
            </section>

            <section class="services">
                <h2>Our Services</h2>
                <ul>
                    <li>Program Overview: Explore the details of academic programs and their objectives</li>
                    <li>Course Information: Access course materials, syllabi, and additional resources</li>
                    <li>Performance Tracking: Measure student performance with exams and assessments</li>
                </ul>
            </section>

            <section class="contact">
                <h2>Contact Us</h2>
                <p>Have questions? Feel free to reach out to us.</p>
            </section>
        </div>
        </div>
    );
}

export default Landingpage;

