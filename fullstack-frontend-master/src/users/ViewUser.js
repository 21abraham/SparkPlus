import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./style.css";
export default function ViewUser() {
  const [user, setUser] = useState({
    mobileno: 0,
    username: "",
    email: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8081/user/${id}`);
    setUser(result.data);
  };

    return (
       <div className="bg-img">
            <div className="content" style={{ overflow: 'hidden' }}>
                <header style={{ paddingTop: '50px' }}>SPARK+</header>
                <h2 className="text-center m-4" style={{color: 'white'} }>User Details</h2>
                    <div className="field">
                    <span className="fa fa-user"></span>
                    <h2 className="text-center" style={{fontSize: '20px'} }>{user.username}</h2>
                    </div>
                    <div className="field space">
                    <span className="fa fa-envelope"></span>
                    <h2 className="text-center" style={{ fontSize: '20px' }}>{user.email}</h2>
                    </div>
                    <div className="field space">
                    <span className="fa fa-map-marker"></span>
                    <h2 className="text-center" style={{ fontSize: '20px' }}>{user.address}</h2>
                    </div>
                    <div className="field space">
                    <span className="fa fa-phone"></span>
                    <h2 className="text-center" style={{ fontSize: '20px' }}>{user.mobileno}</h2>
                    </div>
                <div className="login"><Link className="btn btn-primary my-2" to={`/welcome_admin/${user.id}`}>
            Back to Home
          </Link></div>
            </div>
        </div>
  );
}