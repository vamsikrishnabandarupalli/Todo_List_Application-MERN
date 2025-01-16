import './home.css'
import { Link } from 'react-router-dom';

// Code to display the Home page of the application
const Home = () => {
  return (
    <>
        <div className="d-flex justify-content-center align-items-center home p-5" style={{width: '100%'} }>
            <div className=" text-center home-content lh-lg">
                <h3 className='text-center'>
                    Simplify Your <br /> Tasks and Goals.
                </h3>
                <p className="text-center fs-6">
                    Stay organized, achieve more, and take control <br />
                    with the To-Do List App—your trusted task manager.
                </p>
                <button className="btn btn-info"><Link className="nav-link active" to="/todo">Make Todo List</Link></button>
            </div>
        </div>
    </>
  )
}

export default Home;

