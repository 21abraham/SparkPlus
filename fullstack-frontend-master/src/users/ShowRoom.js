import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css"

export default function ShowRoom() {
    const [showSidebar, setShowSidebar] = useState(false);
    const navigate = useNavigate();
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };
    const [hotel, setHotel] = useState([]);
    const [rooms, setRooms] = useState([]);

    const { hotelId } = useParams();

    const loadHotel = async () => {
        try {
            const result = await axios.get(`http://localhost:8081/hotel/${hotelId}`);
            setHotel(result.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load hotel");
        }
    };
    useEffect(() => {
        loadHotel();
        loadRooms();
    }, []);
    /*const searchname = () => {
        var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("mySearch1");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}*/




    /*const search1 = (event) => {
        const filter = event.target.value.toUpperCase();
        const filteredRooms = rooms.filter((room) => {
            return room.room_type.toUpperCase().indexOf(filter) > -1;
        });
        setFilteredRooms(filteredRooms);
    };
    const search2 = (event) => {
        const filter = event.target.value.toUpperCase();
        const filteredRooms = rooms.filter((room) => {
            return room.capacity.toString().indexOf(filter) > -1;
        });
        setFilteredRooms(filteredRooms);
    };

    const search3 = (event) => {
        const filter = event.target.value.toUpperCase();
        const filteredRooms = rooms.filter((room) => {
            return room.price.toString().indexOf(filter) > -1;
        });
        setFilteredRooms(filteredRooms);
    };*/

    const [filteredRooms, setFilteredRooms] = useState([]);
    const filterRooms = (room, search1, search2, search3) => {
        const roomTypeMatch = room.room_type.toUpperCase().includes(search1.toUpperCase());
        const capacityMatch = room.capacity.toString().includes(search2);
        const priceMatch = room.price.toString().includes(search3);
/*        const availabilityMatch = searchCriteria.searchAvailability
            ? room.availability.toString() === searchCriteria.searchAvailability
            : true;*/

        return roomTypeMatch && capacityMatch && priceMatch;/* && availabilityMatch;*/
    };


    const [searchCriteria, setSearchCriteria] = useState({
        search1: "",
        search2: "",
        search3: "",
        searchAvailability: "",
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

    const loadRooms = async () => {
        try {
            const result = await axios.get(`http://localhost:8081/hotelroom/${hotelId}`);
            setRooms(result.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load rooms");
        }
    };

    const deleteRoom = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/room/${id}`);
            loadRooms();
            toast.success("Room deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete room");
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
    const [user, setUser] = useState(null);

    const loadUser = async (userId) => {
        try {
            const result = await axios.get(`http://localhost:8081/user/${userId}`);
            setUser(result.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load user");
        }
    };


    useEffect(() => {
        if (hotel && hotel.user && hotel.user.id) {
            loadUser(hotel.user.id);
        }
    }, [hotel]);
    return (

        <div>
            <div className="w3-bar w3-white w3-large w3-top">
                <Link
                    to={`/showroom/${hotelId}`}
                    className="w3-bar-item w3-button w3-aqua w3-mobile"
                >
                    <i className="fa fa-bed w3-margin-right"></i>SPARK+
                </Link>
                {user && (
                    <Link to={`/welcome_host/${user.id}`} className="w3-bar-item w3-button w3-mobile">
                        Hotels
                    </Link>
                )}
                <Link to={`/addroom/${hotelId}`} className="w3-bar-item w3-button w3-mobile">
                    Add Rooms
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
                                        <th scope="col">Room-1</th>
                                        <th scope="col">Room-2</th>
                                        <th scope="col">Room-3</th>
                                        <th scope="col">Room Type</th>
                                        <th scope="col">Capacity</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Availability</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                    <tbody id="myTable" className="searchable">
                                        {rooms
                                            .filter((room) =>
                                                filterRooms(
                                                    room,
                                                    searchCriteria.search1,
                                                    searchCriteria.search2,
                                                    searchCriteria.search3
                                                )
                                            ).map((room, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                                    <td><img
                                                        src={room.hotel.image1url}
                                                        alt="NO URL"
                                                        style={{ width: '550px', maxWidth: '100%', height: '150px' }}
                                                    /></td>
                                                    <td><img
                                                        src={room.hotel.image2url}
                                                        alt="NO URL"
                                                        style={{ width: '550px', maxWidth: '100%', height: '150px' }}
                                                    /></td>
                                                    <td><img
                                                        src={room.hotel.image3url}
                                                        alt="NO URL"
                                                        style={{ width: '550px', maxWidth: '100%', height: '150px' }}
                                                    /></td>
                                            <td>{room.room_type}</td>
                                            <td>{room.capacity}</td>
                                            <td>{room.price}</td>
                                            <td>{room.availability ? "Available" : "Not Available"}</td>
                                            <td>
                                                {room.availability ? "" : <Link
                                                    className="btn btn-success mx-2"
                                                    to={`/showroom/${hotelId}`}
                                                >
                                                    Booked
                                                </Link>}
                                                <Link
                                                    className="btn btn-outline-primary mx-2"
                                                    to={`/editroom/${room.roomId}/${hotelId}`}
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    className="btn btn-danger mx-2"
                                                    onClick={() => deleteRoom(room.roomId)}
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
                            <h3>Accessed Hotel:</h3>
                            <h6>{hotel.hotelName}</h6>
                            <hr />
                            <div id="searchspace">
                                <input value={searchCriteria.search1} name="search1" className="w3-button w3-block w3-white" type="text" placeholder="Search Room Type" onChange={handleSearch} aria-label="Search" />
                            </div>
                            <div id="searchspace">
                            <input value={searchCriteria.search2} name="search2" className="w3-button w3-block w3-white" type="text" placeholder="Search Capacity" onChange={handleSearch} aria-label="Search" />
                            </div>
                            <div id="searchspace">
                                <input value={searchCriteria.search3} name="search3" className="w3-button w3-block w3-white" type="text" placeholder="Search Price" onChange={handleSearch} aria-label="Search"/>
                            </div>
                            {/*<div id="searchspace">
                                <input
                                    value={searchCriteria.searchAvailability}
                                    name="searchAvailability"
                                    className="w3-button w3-block w3-white"
                                    type="checkbox"
                                    placeholder="Search Availability"
                                    onChange={handleSearch}
                                    aria-label="Search"
                                />
                            </div>*/}

                        </div>
                    </nav>
                </div>
            </div>
            <footer className=" w3-black w3-center w3-margin-top">
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
