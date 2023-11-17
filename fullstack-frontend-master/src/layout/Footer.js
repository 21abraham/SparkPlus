import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className=" w3-black w3-center w3-margin-top">
            <div className="w3-aqua" style={{ textAlign: 'center', color: 'black', padding: '20px 0 20px 20px', fontSize: '20px'}}>
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

    );
}
