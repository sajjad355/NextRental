import React, { useState, useEffect } from "react";
import data from '../../src/data/data.json';
import { Button, Table, InputGroup, FormControl } from "react-bootstrap";
import BookProduct from './BookProduct/Booking'
import ReturnProduct from './ReturnProduct/Return'
import "./style.css"

export default function App() {
    const [serarchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenReturn, setIsOpenReturn] = useState(false);
    const [day, setDay] = useState("");


    function toggleModal() {

        setIsOpen(true);
    }
    function toggleModalReturn() {
        setIsOpenReturn(true);
    }
    return (
        <div className="App">{console.log(day)}
            <div className="center">

                <div className="float-right mt-4" style={{ marginRight: 20 }}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Name or Type"
                            aria-label="Search"
                            style={{ height: 40 }}
                            aria-describedby="basic-addon1"
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }}
                        />
                    </InputGroup>
                </div>

                <div style={{ marginRight: 20, border: '1px solid white' }} className="TableDesign">
                    <Table responsive="sm" responsive="md" responsive="xs" responsive="lg" responsive="xl" striped hover>
                        <thead className="" style={{ backgroundColor: '#2621a0' }}>
                            <tr>
                                <th style={{ fontsize: 21, color: "white", fontFamily: "Lucida Console" }}></th>
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
                            }).map((m, index) => (
                                <tr key={m.code}>
                                    <td>{index + 1}</td>
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
                    </Table>
                </div>
            </div>
            <div className="mb-5" style={{ marginRight: 31, display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={toggleModal} style={{ width: 85 }} >Book</Button>
                <Button onClick={toggleModalReturn} style={{ marginLeft: 5, width: 85 }} variant="danger">Return</Button>{console.log(isOpen)}
            </div>
            <div>
                {isOpen ? <BookProduct status={isOpen} /> : ""}
                {isOpenReturn ? <ReturnProduct status={isOpenReturn} /> : ""}
            </div>
        </div >
    );
}
