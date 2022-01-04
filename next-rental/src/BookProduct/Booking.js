import React, { useState, useEffect } from "react";
import data from '../data/data.json';
import { Modal, Form, Button, InputGroup } from "react-bootstrap";

export default function Booking(props) {
    const [isOpenBookingValue, setIsOpenBookingvalue] = useState(false);
    const [isOpenBookingValueCompleted, setIsOpenBookingvalueCompleted] = useState(false);
    const [productBooking, setProductBooking] = useState("");
    const [amountPreview, setamountPreview] = useState("");
    const [fromDate, setFromdate] = useState("");
    const [toDate, setToDate] = useState("");
    const [bookModal, setBookModal] = useState(true);


    useEffect(() => {
        console.log(props.status)
        setBookModal(props.status);
    }, []);

    function toggleModal() {
        setBookModal(false);
    }

    function toggleModalBookingValueComplted() {
        setIsOpenBookingvalueCompleted(!isOpenBookingValueCompleted);
        setIsOpenBookingvalueCompleted(!isOpenBookingValueCompleted);
        setIsOpenBookingvalue(!isOpenBookingValue);
    }
    function toggleModalBookingValueCompltedFinal() {
        setIsOpenBookingvalueCompleted(!isOpenBookingValueCompleted);
        setBookModal(false);

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

        <div className="App">{console.log(props.status)}       { console.log(bookModal)}

            {/* Book Product Initialize */}
            <Modal
                show={bookModal ? true : false}
                onRequestClose={toggleModal}
                contentLabel="My dialog"
            >
                <Modal.Header>
                    <div><span style={{ fontSize: 20, fontFamily: "Lucida Console", fontWeight: 'bold' }} >BOOK A PRODUCT</span></div>
                </Modal.Header>

                <Modal.Body>
                    <div><span style={{ fontSize: 18, fontFamily: "Lucida Console" }} >SELECT PRODUCT</span><span style={{ color: 'red' }}>*</span></div>

                    <InputGroup className="mb-3">
                        <select
                            align="center"
                            className="form-control"
                            name="product"
                            value={productBooking}
                            onChange={(e) => setProductBooking(e.target.value)}
                            required={true}
                        >
                            <option value="" disabled>-- Product --</option>

                            {data.map((val) => (
                                <option text={val.code}>
                                    {val.name}/{val.code}
                                </option>
                            ))}
                        </select>
                        <InputGroup.Text id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down" viewBox="0 0 16 16">
                            <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
                        </svg>
                        </InputGroup.Text>
                    </InputGroup>
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
                    <Button onClick={toggleModalBookingValue} style={{ width: 108, fontSize: 18, fontFamily: "Lucida Console", height: 40, marginBottom: 10, backgroundColor: '#2621a0', color: 'white' }}>Yes</Button>
                    &nbsp;
                    <Button variant="danger" onClick={toggleModal} style={{ width: 108, marginTop: -2, fontSize: 18, fontFamily: "Lucida Console", height: 40, color: 'white' }}>No</Button>

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

                    <Button onClick={toggleModalBookingValueComplted} style={{ width: 58, fontSize: 18, fontFamily: "Lucida Console", height: 37, marginBottom: 10, backgroundColor: '#2621a0', color: 'white' }}>Yes</Button>
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
        </div>
    );
}
