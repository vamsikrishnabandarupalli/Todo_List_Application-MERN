import './About.css';

export default function About() {
    return (
        <>
            <div className=" d-flex justify-content-center align-items-center about my-0 px-3 py-5" style={{width: '100%'}}>
                <div className="container lh-lg">
                    <div className="d-flex">
                        <h3>About Us </h3>
                    </div>
                    <p className='text-jusify text-justify-inter-word fs-6'>
                        At todo App, we believe in simplifying your day-to-day life with a smarter, 
                        more intuitive approach to staying organized. 
                        Our to-do list application is designed to help you prioritize tasks, 
                        manage deadlines, and achieve your goals with ease. 
                        Whether you’re juggling personal errands or professional projects, 
                        we’ve got you covered with powerful features that keep you on track. <br />
                        Driven by a passion for productivity, our team is committed to creating a tool 
                        that’s not only efficient but also enjoyable to use. With a focus on simplicity and functionality, 
                        todo App is here to help you make the most of every moment. Let’s conquer your to-dos together! 
                    </p>
                </div>
            </div>
        </>
    )};