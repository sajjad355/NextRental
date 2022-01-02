import React, { useState, useEffect } from "react";
import data from '../data.json';
import { Modal, Form, Button } from "react-bootstrap";
import "./style.css"

import {
    MDBNavbar,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBIcon
} from 'mdb-react-ui-kit';
import { MDBContainer, } from "mdbreact";

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

    const [day, setDay] = useState("");

    useEffect(() => {
        if (day == "") {
            setDay(1);
        }
        setTimeout(function () {
            var a = day + 1;
            setDay(a);
        }.bind(this), 1000);

    }, [])

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
            var a = data.filter(item => item.name + "/" + item.code === product)
            setamountPreview(a[0].price * amount);
            setRepair(a[0].needing_repair === "false" ? "No" : "Yes");
            setRentPeriod(a[0].minimum_rent_period);
        }
        else {
            alert("Please Fill all the required Fields");
        }
    }
    function toggleBookingValueCancel() {
        setIsOpenBookingvalue(!isOpenBookingValue);
    }
    function toggleModalBookingValue() {
        if (productBooking && fromDate && toDate) {
            var currentDate = new Date();
            console.log(currentDate);
            var startingDate = new Date(fromDate);
            var a = data.filter(item => item.name + "/" + item.code === productBooking)
            const date1 = new Date(toDate);
            const date2 = new Date(fromDate);
            const diffTime = Math.abs(date2 - date1);
            const dayDiff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (fromDate > toDate) {
                alert("To Date must be Greater than From Date!")
                setIsOpenBookingvalue(isOpenBookingValue);
            }
            else {
                if (dayDiff >= a[0].minimum_rent_period)
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
        <div className="App">{console.log(day)}
            <header style={{ backgroundColor: '#2621a0', marginBottom: 30, width: '100%' }}>
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
                                <td>{m.mileage === "" || m.mileage === null ? "N/A" : m.mileage }</td>
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
                                {val.name}/{val.code}
                            </option>
                        ))}
                    </select>
                    <br />

                    {/* Information Start */}
                    {data.filter(product => product.name + "/" + product.code === productBooking).map(products => (
                        <p style={{ fontSize: 22, fontFamily: "Lucida Console" }}>
                            <p>Name:&nbsp;{products.name}</p>
                            <p>Rental Period:&nbsp;{products.minimum_rent_period}</p>{console.log(products.mileage)}
                            <p>Mileage:&nbsp;{products.mileage === null ? "N/A" : products.mileage}</p>
                            <p>Repair Needed:&nbsp;{products.needing_repair === true ? "Yes" : "No"}</p>
                        </p>
                    ))}
                    {/* Information End */}

                    <span style={{ fontSize: 18, fontFamily: "Lucida Console" }} >FROM</span><span style={{ color: 'red' }}>*</span> &nbsp;
                    <Form.Control type="date" value={fromDate} min={new Date().toISOString().split("T")[0]}

                        onChange={(e) => {
                            setFromdate(e.target.value);
                        }} />
                    <br />

                    <span style={{ fontSize: 18, fontFamily: "Lucida Console" }} >TO</span><span style={{ color: 'red' }}>*</span>&nbsp;
                    <Form.Control type="date" value={toDate} onChange={(e) => {
                        setToDate(e.target.value);
                    }} />
                </Modal.Body>
                <br /><br />
                <Modal.Footer>
                    <Button onClick={toggleModalBookingValue} style={{ width: 108, fontSize: 18, fontFamily: "Lucida Console", height: 40, marginBottom: 10, backgroundColor: '#2621a0', color: 'white' }}>Book</Button>
                    &nbsp;
                    <Button variant="danger" onClick={toggleModal} style={{ width: 108, marginTop: -2, fontSize: 18, fontFamily: "Lucida Console", height: 40, color: 'white' }}>Close</Button>

                </Modal.Footer>
            </Modal>
            {/* Book Product Initialize */}

            {/* Estimated Price After Booking Product */}
            <Modal
                show={isOpenBookingValue ? true : false}
                onRequestClose={toggleModalBookingValue}
                contentLabel="My dialog"
            >
                <Modal.Header>
                    <div><span style={{ fontSize: 20, fontFamily: "Lucida Console", fontWeight: 'bold' }} >BOOK A PRODUCT</span></div>
                </Modal.Header>

                <Modal.Body>
                    <span style={{ fontSize: 23, fontFamily: "Lucida Console" }}>Your Estimated Price</span>($)<input
                        type="number"
                        placeholder="Enter Amount"
                        value={amountPreview}
                        style={{ border: "0", fontSize: 22, fontFamily: "Lucida Handwriting", background: 'white', fontWeight: 'bold', marginBottom: 10 }}
                        disabled

                    />
                    <br />
                </Modal.Body>

                <Modal.Footer>
                    <span style={{ fontsize: 22, fontFamily: "Lucida Console" }}>Do you want to procedure?</span> <br /><br />

                    <Button onClick={toggleModalBookingValueComplted} style={{ width: 58, fontSize: 18, fontFamily: "Lucida Console", height: 37, marginBottom: 10, backgroundColor: '#2621a0',  color: 'white' }}>Yes</Button>
                    &nbsp;
                    <Button variant="danger" onClick={toggleBookingValueCancel} style={{ width: 58, marginTop: -2, fontSize: 18, fontFamily: "Lucida Console", height: 37, color: 'white' }}>No</Button>
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
                    <Button onClick={toggleModalBookingValueCompltedFinal} style={{ fontSize: 18, fontFamily: "Lucida Console", width: 150, height: 40, background: '#2621a0', color: 'white' }}>Main Menu</Button><br />
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
                    <div><span style={{ fontSize: 19, fontFamily: "Lucida Console" }} >SELECT PRODUCT</span><span style={{ color: 'red' }}>*</span></div>

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
                                {val.name}/{val.code}
                            </option>
                        ))}
                    </select>
                    <br />

                    {/* Information Start */}
                    {data.filter(allProduct => allProduct.name + "/" + allProduct.code === product).map(products => (
                        <p style={{ fontSize: 22, fontFamily: "Lucida Console" }}>
                            <p>Name:&nbsp;{products.name}</p>
                            <p>Rental Period:&nbsp;{products.minimum_rent_period}</p>
                            <p>Mileage:&nbsp;{products.mileage === null ? "N/A" : products.mileage}</p>
                            <p>Repair Needed:&nbsp;{products.needing_repair === true ? "Yes" : "No"}</p>
                        </p>
                    ))}
                    {/* Information End */}

                    <div><span style={{ fontSize: 19, fontFamily: "Lucida Console" }} >USED MILEAGE</span><span style={{ color: 'red' }}>*</span></div>
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
                    <Button onClick={toggleModalReturnValue} style={{ width: 58, fontSize: 18, fontFamily: "Lucida Console", height: 40, marginBottom: 10, backgroundColor: '#2621a0', color: 'white' }}>Yes</Button>
                    &nbsp;
                    <Button variant="danger" onClick={toggleModalReturn} style={{ width: 58, marginTop: -2, fontSize: 18, fontFamily: "Lucida Console", height: 40, color: 'white' }}>No</Button>
                </Modal.Footer>
            </Modal>
            {/* Return Product Initialize */}

            {/* Return Product Confirmation */}
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
                    <span style={{ fontSize: 20, fontFamily: "Lucida Console" }}>Your Total Price is</span>($)
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
                    <Button onClick={toggleModalReturnValueFinal} style={{ fontSize: 18, fontFamily: "Lucida Console", width: 120, height: 41,  background: '#2621a0', color: 'white' }}>Confirm</Button><br />
                </Modal.Footer>
            </Modal>
            {/* Return Product Confirmation */}

            {/* End of Returing Product Process */}



            <div className="footer-copyright text-center py-3" style={{ backgroundColor: '#2621a0', color: 'white', marginTop: 0, width: '100%' }}>
                <MDBContainer fluid>
                    Copyright&nbsp;&copy; {new Date().getFullYear()}
                </MDBContainer>
            </div>
        </div>
    );
}
