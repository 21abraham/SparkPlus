import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Welcome_admin() {
    const [showSidebar, setShowSidebar] = useState(false);
    const navigate = useNavigate();
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };
    const [users, setUsers] = useState([]);
    const { id } = useParams();
    const [user, setUser] = useState({
        username: "",
        email: "",
        usertype: 0,
    });

    const loadUser = async () => {
        try {
            const result = await axios.get(`http://localhost:8081/user/${id}`);
            setUser(result.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load user");
        }
    };

    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        Promise.all([loadUser(), loadUsers()])
            .then(() => {
                setIsDataLoaded(true);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to load data");
            });
    }, []);

    useEffect(() => {
        if (isDataLoaded) {
            toast.success("Login successful");
        }
    }, [isDataLoaded]);
    const loadUsers = async () => {
        try {
            const result = await axios.get("http://localhost:8081/users");
            setUsers(result.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load users");
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/user/${id}`);
            loadUsers();
            toast.success("User deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete user");
        }
    };

    const handleLogout = () => {
        axios
            .post("http://localhost:8081/logout")
            .then((response) => {
                console.log(response.data);
                navigate("/");
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to logout");
            });
    };
    const filterUser = (user, search1, search2, search3) => {
        const userNameMatch = user.username.toUpperCase().includes(search1.toUpperCase());
        const userTypeMatch = user.usertype.toString().includes(search2);
        const emailMatch = user.email.toUpperCase().includes(search3.toUpperCase());

        return userNameMatch && userTypeMatch && emailMatch;
    };


    const [searchCriteria, setSearchCriteria] = useState({
        search1: "",
        search2: "",
        search3: "",
    });

    const handleSearch = (event) => {
        const { name, value, type } = event.target;
        if (type === "checkbox") {
            setSearchCriteria((prevSearchCriteria) => ({
                ...prevSearchCriteria,
                [name]: event.target.checked,
            }));
        } else {
            setSearchCriteria((prevSearchCriteria) => ({
                ...prevSearchCriteria,
                [name]: value,
            }));
        }
    };
    return (

        <div>
            <div className="w3-bar w3-white w3-large w3-top">
                <Link
                    to={`/welcome_admin/${user.id}`}
                    className="w3-bar-item w3-button w3-aqua w3-mobile"
                >
                    <i className="fa fa-bed w3-margin-right"></i>SPARK+
                </Link>
                <Link to={`/addhost/${user.id}`} className="w3-bar-item w3-button w3-mobile">
                    Add Host
                </Link>
                <Link
                    onClick={handleLogout}
                    className="w3-bar-item w3-button w3-right w3-light-green w3-mobile"
                >
                    Logout
                </Link>
            </div>
            <div style={{ padding: "50px 0 0 0" }} className="w3-row">
                <div className="w3-col l10">
                    <div className="container">
                        <div className="py-4">
                            <div className="card-body table-responsive p-0" id="smallbox">
                                <table className="table table-hover text-nowrap border shadow">
                                <thead>
                                    <tr>
                                        <th scope="col">S.N</th>
                                        <th scope="col">Usertype</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {users
                                            .filter((user) =>
                                                filterUser(
                                                    user,
                                                    searchCriteria.search1,
                                                    searchCriteria.search2,
                                                    searchCriteria.search3
                                                )
                                            ).map((user, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{user.usertype}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <Link
                                                    className="btn btn-primary mx-2"
                                                    to={`/viewuser/${user.id}`}
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    className="btn btn-outline-primary mx-2"
                                                    to={`/edituser/${user.id}`}
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    className="btn btn-danger mx-2"
                                                    onClick={() => deleteUser(user.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="w3-col l2">
                    <nav
                        className={` w3-light-grey w3-collapse ${showSidebar ? "w3-show" : ""}`}
                        style={{ zIndex: 0, width: "260px" }}
                        id="mySidebar"
                    >
                        <div className="w3-container w3-display-container w3-padding-16">
                            <i
                                onClick={toggleSidebar}
                                className="fa fa-remove w3-hide-large w3-button w3-transparent w3-display-topright"
                            ></i>
                            <h3>Welcome</h3>
                            <h6>{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h6>
                            <hr />
                            <div id="searchspace">
                                <input value={searchCriteria.search1} name="search1" className="w3-button w3-block w3-white" type="text" placeholder="Search Username" onChange={handleSearch} aria-label="Search" />
                            </div>
                            <div id="searchspace">
                                <input value={searchCriteria.search2} name="search2" className="w3-button w3-block w3-white" type="text" placeholder="Search Usertype" onChange={handleSearch} aria-label="Search" />
                            </div>
                            <div id="searchspace">
                                <input value={searchCriteria.search3} name="search3" className="w3-button w3-block w3-white" type="text" placeholder="Search Email" onChange={handleSearch} aria-label="Search" />
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <footer className=" w3-black w3-center w3-margin-top" style={
                {
                    position: 'fixed',width: '100%',bottom: '0'
                }
            }>
                <div className="w3-aqua" style={{ textAlign: 'center', color: 'black', padding: '20px 0 20px 20px', fontSize: '20px' }}>
                    <div className="row">
                        <div className="col-lg-6">
                            <b style={{ fontSize: '30px' }}>About Us:</b>
                            <br />
                            <ul className="list-unstyled">
                                <li>Computer department.</li>
                                <li>Abraham Ahmed</li>
                                <li>Ajinkya Khete</li>
                                <li>Kaustubh Bhavsar</li>
                            </ul>
                        </div>
                        <div className="col-lg-6">
                            <b style={{ fontSize: '30px' }}>Instructor:</b>
                            <br />
                            <p>Mr. Suresh Pal, Instructor of Super 30 Batch.</p>
                            <br />
                        </div>
                    </div>
                </div>
                <div style={{ fontSize: '20px', textAlign: 'center', backgroundColor: 'black' }}>
                    <Link style={{ textDecoration: 'none', color: 'white' }} to="https://mitaoe.ac.in/" ><h>@MITAOE</h></Link>
                </div>
            </footer>
        </div>
    );
}
