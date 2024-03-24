import profilePic from './assets/photo.jpg'
function Card(){

    return(
        <div className="card">
            <img className="card-image" src={profilePic} alt="profile picture"></img>
            <h2 className="card-title">Tomasz</h2>
            <p className="card-text">I study applied computer science</p>
        </div>

    );
}

export default Card