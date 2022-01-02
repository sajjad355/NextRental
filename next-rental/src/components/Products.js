import React, { useState } from "react";
import data from '../data.json';
import { Modal } from 'react-bootstrap';
import { Form, Button, FormGroup, InputGroup, FormControl, ControlLabel } from "react-bootstrap";

import "./style.css"
import "./modal.css"
import {
    MDBNavbar,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBIcon
} from 'mdb-react-ui-kit';
// import Modal from "react-modal";
import { MDBContainer, } from "mdbreact";


// Modal.setAppElement("#root");

export default function App() {
    const [serarchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenReturn, setIsOpenReturn] = useState(false);
    const [isOpenReturnValue, setIsOpenReturnvalue] = useState(false);
    const [isOpenBookingValue, setIsOpenBookingvalue] = useState(false);
    const [isOpenBookingValueCompleted, setIsOpenBookingvalueCompleted] = useState(false);
    const [product, setProduct] = useState("");
    const [productBooking, setProductBooking] = useState("");
    const [amount, setAmount] = useState("");
    const [amountPreview, setamountPreview] = useState("");
    const [repair, setRepair] = useState("");
    const [rentPeriod, setRentPeriod] = useState("");
    const [fromDate, setFromdate] = useState("");
    const [toDate, setToDate] = useState("");

    function toggleModal() {
        setIsOpen(!isOpen);
    }
    function toggleModalReturn() {
        setIsOpenReturn(!isOpenReturn);
    }
    function toggleModalBookingValueComplted() {
        setIsOpenBookingvalueCompleted(!isOpenBookingValueCompleted);
        setIsOpenBookingvalueCompleted(!isOpenBookingValueCompleted);
        setIsOpenBookingvalue(!isOpenBookingValue);
        setIsOpen(!isOpen);
    }
    function toggleModalBookingValueCompltedFinal() {
        setIsOpenBookingvalueCompleted(!isOpenBookingValueCompleted);

    }
    function toggleModalReturnValueFinal() {
        setIsOpenReturnvalue(!isOpenReturnValue);
        setIsOpenReturn(!isOpenReturn);
    }
    function toggleModalReturnValue() {
        if (product && amount) {
            setIsOpenReturnvalue(!isOpenReturnValue);
            var a = data.filter(item => item.name === product)
            setamountPreview(a[0].price * amount);
            setRepair(a[0].needing_repair === "false" ? "No" : "Yes");
            setRentPeriod(a[0].minimum_rent_period);
        }
        else {
            alert("Please Fill all the required Fields");
        }
    }
    function toggleModalBookingValue() {
        if (productBooking && fromDate && toDate) {
            var currentDate = new Date();
            console.log(currentDate);
            var startingDate = new Date(fromDate);
            var a = data.filter(item => item.name === productBooking)
            const date1 = new Date(toDate);
            const date2 = new Date(fromDate);
            const diffTime = Math.abs(date2 - date1);
            const dayDiff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (fromDate > toDate || currentDate > startingDate) {
                alert("To Date must be Greater than From Date && From Date must be Greater than System Date!")
                setIsOpenBookingvalue(isOpenBookingValue);
            }
            else {
                if (dayDiff > a[0].minimum_rent_period)
                    setIsOpenBookingvalue(!isOpenBookingValue);
                else
                    alert("You have to Rent this for minumum " + a[0].minimum_rent_period + " Days");
            }
            setamountPreview(a[0].price * dayDiff);
        }
        else {
            alert("Please Fill all the required Fields");
        }
    }
    return (
        <div className="App">
            <header style={{ backgroundColor: '#2621a0', marginBottom: 30, marginLeft: 0, width: '100%' }}>
                <MDBNavbar expand='lg' >
                    <MDBContainer fluid>
                        <MDBNavbarToggler
                            aria-controls='navbarExample01'
                            aria-expanded='false'
                            aria-label='Toggle navigation'
                        >
                            <MDBIcon fas icon='bars' />
                        </MDBNavbarToggler>
                        <div className='collapse navbar-collapse' id='navbarExample01'>
                            <MDBNavbarNav right className='mb-2 mb-lg-0'>
                                <MDBNavbarItem active>
                                    <MDBNavbarLink aria-current='page' href='#' onMouseOver="this.style.color='#0F0'">
                                        <span style={{ color: 'white', fontSize: 22, fontFamily: "Lucida Handwriting" }}>Next Rental</span>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                                {/* <MDBNavbarItem>
                                    <MDBNavbarLink className="click" href='#' onClick={toggleModal}><span style={{ marginLeft: 20, color: 'white', fontSize: 18, fontFamily: "Lucida Console" }}>Book</span></MDBNavbarLink>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href='#' className="click" onClick={toggleModalReturn}><span style={{ marginLeft: 20, color: 'white', fontSize: 18, fontFamily: "Lucida Console" }}>Return</span></MDBNavbarLink>
                                </MDBNavbarItem> */}

                            </MDBNavbarNav>
                        </div>
                    </MDBContainer>
                </MDBNavbar>
            </header>
            <div className="center">
                <input
                    type="text"
                    placeholder="Search..."
                    className="form-Control search"
                    style={{ marginTop: 0, fontSize: 19.5, height: 44, marginBottom: 10, width: "30.6%", display: 'block' }}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                    }}
                />

                <div className="columnGrid">
                    <div>
                        <Button onClick={toggleModal} style={{ fontsize: 21, color: "white", fontFamily: "Lucida Console", marginTop: 0, marginBottom: 10, width: "100%", display: 'block' }}>
                            Book
                        </Button>
                    </div>

                    <div>
                        <Button variant="danger" onClick={toggleModalReturn} style={{ fontsize: 21, color: "white", fontFamily: "Lucida Console", marginTop: 0, marginLeft: 10, marginBottom: 10, width: "100%", display: 'block' }}>
                            Return
                        </Button>
                    </div>
                </div>
                <table className="table table-hover table-striped TableDesign" style={{ width: "1330px", marginBottom: 80 }}>
                    <thead className="" style={{ backgroundColor: '#2621a0' }}>
                        <tr>
                            <th style={{ fontsize: 21, color: "white", fontFamily: "Lucida Console" }}>Name</th>
                            <th style={{ fontsize: 21, color: "white", fontFamily: "Lucida Console" }}>Type </th>
                            <th style={{ fontsize: 21, color: "white", fontFamily: "Lucida Console" }}>Availability</th>
                            <th style={{ fontsize: 21, color: "white", fontFamily: "Lucida Console" }}>Repair Needed</th>
                            <th style={{ fontsize: 21, color: "white", fontFamily: "Lucida Console" }}>Durability</th>
                            <th style={{ fontsize: 21, color: "white", fontFamily: "Lucida Console" }}>Maximum Durability</th>
                            <th style={{ fontsize: 21, color: "white", fontFamily: "Lucida Console" }}>Mileage</th>
                            <th style={{ fontsize: 21, color: "white", fontFamily: "Lucida Console" }}>Price</th>
                            <th style={{ fontsize: 21, color: "white", fontFamily: "Lucida Console" }}>Minimum Rent Period</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.filter((val) => {
                            if (serarchTerm == "") {
                                return val;
                            }
                            else if (
                                val.name.toLowerCase().includes(serarchTerm.toLowerCase()) ||
                                val.type.toLowerCase().includes(serarchTerm.toLowerCase())

                            ) {
                                return val;
                            }
                        }).map((m) => (
                            <tr key={m.code}>
                                <td>{m.name}</td>
                                <td>{m.type}</td>
                                <td>{m.availability === true ? "Yes" : "No"}</td>
                                <td>{m.needing_repair === true ? "Yes" : "No"}</td>
                                <td>{m.durability}</td>
                                <td>{m.max_durability}</td>
                                <td>{m.mileage === "" || m.mileage === null ? "N/A" : m.mileage}</td>
                                <td>{m.price}</td>
                                <td>{m.minimum_rent_period}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="footer-copyright text-center" style={{ backgroundColor: '#2621a0', color: 'white', marginBottom: 20, marginTop: -80, width: 1330, height: 5 }}>
                    <MDBContainer fluid>
                    </MDBContainer>
                </div>
            </div>


            {/* Start of Booking Product Process */}

            {/* Book Product Initialize */}
            <Modal
                show={isOpen ? true : false}
                onRequestClose={toggleModal}
                style={{ marginTop: 100 }}
                contentLabel="My dialog"
            >
                <Modal.Header>
                    <div><span style={{ fontSize: 20, fontFamily: "Lucida Console", fontWeight: 'bold' }} >BOOK A PRODUCT</span></div>
                </Modal.Header>

                <Modal.Body>
                    <div><span style={{ fontSize: 18, fontFamily: "Lucida Console" }} >SELECT PRODUCT</span><span style={{ color: 'red' }}>*</span></div>
                    <select
                        align="center"
                        className="form-control"
                        name="product"
                        value={productBooking}
                        onChange={(e) => setProductBooking(e.target.value)}
                        required={true}
                        style={{ width: '100%' }}
                    >
                        <option value="" disabled>-- Product --</option>

                        {data.map((val) => (
                            <option text={val.code}>
                                {val.name}
                            </option>
                        ))}
                    </select>
                    <br />
                    <span style={{ fontSize: 18, fontFamily: "Lucida Console" }} >FROM</span><span style={{ color: 'red' }}>*</span> &nbsp;

                    {/* <input
                        type="date"
                        placeholder="Search..."
                        className="form-Control"
                        value={fromDate}
                        onChange={(e) => {
                            setFromdate(e.target.value);
                        }}
                    /> */}

                    <Form.Control type="date" value={fromDate} onChange={(e) => {
                        setFromdate(e.target.value);
                    }} />

                    <br />
                    {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                    <span style={{ fontSize: 18, fontFamily: "Lucida Console" }} >TO</span><span style={{ color: 'red' }}>*</span>&nbsp;
                    {/* <input
                        type="date"
                        placeholder="Search..."
                        className="form-Control"
                        value={toDate}
                        onChange={(e) => {
                            setToDate(e.target.value);
                        }}
                    /> */}
                    <Form.Control type="date" value={toDate} onChange={(e) => {
                        setToDate(e.target.value);
                    }} />
                </Modal.Body>
                <br /><br />
                <Modal.Footer>
                    <button onClick={toggleModalBookingValue} style={{ fontSize: 18, width: 105, fontFamily: "Lucida Console", height: 30, marginBottom: 10, marginLeft: 357, backgroundColor: '#2621a0', color: 'white' }}>Book Now</button><br />
                    <button onClick={toggleModal} style={{ fontSize: 18, fontFamily: "Lucida Console", width: 105, height: 30, marginLeft: 357, background: 'red', color: 'white' }}>Close</button><br />
                </Modal.Footer>
            </Modal>
            {/* Book Product Initialize */}

            {/* Estimated Price After Booking Product */}
            <Modal
                show={isOpenBookingValue ? true : false}
                onRequestClose={toggleModalBookingValue}
                contentLabel="My dialog"
                style={{ marginTop: 100 }}
            >
                <Modal.Header>
                    <div><span style={{ fontSize: 20, fontFamily: "Lucida Console", fontWeight: 'bold' }} >BOOK A PRODUCT</span></div>
                </Modal.Header>

                <Modal.Body>
                    <span style={{ fontSize: 23, fontFamily: "Lucida Console" }}>Your Estimated Price&nbsp;</span> $<input
                        type="number"
                        placeholder="Enter Amount"
                        value={amountPreview}
                        style={{ border: "0", fontSize: 22, fontFamily: "Lucida Handwriting", background: 'white', fontWeight: 'bold', marginBottom: 10 }}
                        disabled

                    />
                    <br />
                </Modal.Body>

                <Modal.Footer>
                    <span style={{ fontsize: 22, fontFamily: "Lucida Console" }}>DO you want to procedure?</span> <br /><br />
                    <button onClick={toggleModalBookingValueComplted} style={{ fontSize: 18, fontFamily: "Lucida Console", height: 30, marginBottom: 10, marginLeft: 200, backgroundColor: '#2621a0', color: 'white' }}>PROCEED</button><br />
                </Modal.Footer>
            </Modal>
            {/* Estimated Price After Booking Product */}

            {/* Booking Product Confirmation */}
            <Modal
                show={isOpenBookingValueCompleted ? true : false}
                onRequestClose={toggleModalBookingValueComplted}
                contentLabel="My dialog"
            >
                <Modal.Header>
                    <span style={{ fontFamily: "Lucida Handwriting", fontSize: 22 }}>CONGRATULATIONS!</span><br /><br />
                </Modal.Header>

                <Modal.Body>
                    <span style={{ fontsize: 22, fontFamily: "Lucida Console" }}>YOU HAVE BOOKED THIS PRODUCT!</span> <br />
                </Modal.Body>

                <Modal.Footer>
                    <button onClick={toggleModalBookingValueCompltedFinal} style={{ fontSize: 18, fontFamily: "Lucida Console", width: 120, height: 30, marginLeft: 158, background: '#2621a0', color: 'white' }}>Main Menu</button><br />
                </Modal.Footer>
            </Modal>
            {/* Booking Product Confirmation */}

            {/* End of Booking Product Process */}

            {/* Start of Returing Product Process */}
            {/* Return Product Initialize */}
            <Modal
                show={isOpenReturn ? true : false}
                onRequestClose={toggleModalReturn}
                contentLabel="My dialog"
            >
                <Modal.Header>
                    <div><span style={{ fontSize: 20, fontFamily: "Lucida Console", fontWeight: 'bold' }} >RETURN PRODUCT</span></div>
                </Modal.Header>

                <Modal.Body>
                    <div><span style={{ fontSize: 18, fontFamily: "Lucida Console" }} >Select a product</span><span style={{ color: 'red' }}>*</span></div>

                    <select
                        className="form-control"
                        name="product"
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        style={{ width: '100%' }}
                        required
                    >
                        <option value="" disabled>-- Product --</option>

                        {data.map((val) => (
                            <option text={val.code}>
                                {val.name}
                            </option>
                        ))}
                    </select>
                    <br />
                    <div><span style={{ fontSize: 18, fontFamily: "Lucida Console" }} >Used Mileage</span><span style={{ color: 'red' }}>*</span></div>
                    <input
                        type="number"
                        placeholder="Enter Mileage"
                        value={amount}
                        min="0"
                        style={{ width: '100%' }}
                        className="form-control"
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                    />
                    <br />
                </Modal.Body>

                <Modal.Footer>
                    <button onClick={toggleModalReturnValue} style={{ width: 47, fontSize: 18, fontFamily: "Lucida Console", height: 30, marginBottom: 10, backgroundColor: '#2621a0', marginLeft: 360, color: 'white' }}>Yes</button>
                    &nbsp;
                    <button onClick={toggleModalReturn} style={{ width: 47, marginTop: -2, fontSize: 18, fontFamily: "Lucida Console", height: 30, background: 'red', color: 'white' }}>No</button>
                </Modal.Footer>
            </Modal>
            {/* Return Product Initialize */}

            <Modal
                show={isOpenReturnValue ? true : false}
                onRequestClose={toggleModalReturnValue}
                contentLabel="My dialog"
            >

                <Modal.Header>
                    <span style={{ fontFamily: "Lucida Handwriting", fontSize: 22 }}> RETURN A PRODUCT!</span> <br /> <br />
                </Modal.Header>
                <Modal.Body>
                    <span style={{ fontsize: 22, fontFamily: "Lucida Console" }}>YOU ARE GOING TO RETUEN PRODUCT...</span> <br /><br />
                    <span style={{ fontSize: 20, fontFamily: "Lucida Console" }}>Your Total Price is&nbsp;</span> $
                    <input
                        value={amountPreview}
                        style={{ border: "0", fontSize: 22, fontFamily: "Lucida Handwriting", background: 'white', fontWeight: 'bold', marginBottom: 10 }}
                        disabled
                    /><br />
                    <span style={{ fontSize: 22, fontFamily: "Lucida Console" }}>Is Repair Needed?&nbsp;</span>
                    <input
                        value={repair}
                        style={{ border: "0", fontSize: 22, fontFamily: "Lucida Console", background: 'white', fontWeight: 'bold', marginBottom: 10 }}
                        disabled
                    /><br />
                    <span style={{ fontSize: 22, fontFamily: "Lucida Console" }}>Minimum Rent Period&nbsp;</span>
                    <input
                        value={rentPeriod}
                        style={{ border: "0", fontSize: 22, fontFamily: "Lucida Console", background: 'white', fontWeight: 'bold', marginBottom: 10 }}
                        disabled

                    /><br />
                </Modal.Body>

                <Modal.Footer>
                    <span style={{ fontsize: 22, fontFamily: "Lucida Console" }}>DO you want to procedure?</span> <br /><br />
                    <button onClick={toggleModalReturnValueFinal} style={{ fontSize: 18, fontFamily: "Lucida Console", width: 120, height: 34, marginLeft: 170, background: '#2621a0', color: 'white' }}>Confirm</button><br />
                </Modal.Footer>
            </Modal>
            {/* End of Returing Product Process */}



            <div className="footer-copyright text-center py-3" style={{ backgroundColor: '#2621a0', color: 'white', marginTop: 0, marginLeft: 0, width: '100%' }}>
                <MDBContainer fluid>
                    Copyright&nbsp;&copy; {new Date().getFullYear()}
                </MDBContainer>
            </div>
        </div>
    );
}
