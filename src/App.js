import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
    const [oname, setOName] = useState("");
    const [business_role, setBusiness_role] = useState("");
    const [owner_address, setOwner_address] = useState("");

    const [ownerList, setOwnerList] = useState([]);

    const addOwner = () => {
        Axios.post("https://csc174-tranzact.herokuapp.com//create", {
            oname: oname,
            business_role: business_role,
            owner_address: owner_address,
        }).then(() => {
            setOwnerList([
                ...ownerList,
                {
                    oname: oname,
                    business_role: business_role,
                    owner_address: owner_address,
                },
            ]);
        });
    };

    const getOwner = () => {
        Axios.get("https://csc174-tranzact.herokuapp.com//owner").then((response) => {
            setOwnerList(response.data);
        });
    };

    const deleteOwner = (oid) => {
        Axios.delete(`https://csc174-tranzact.herokuapp.com//delete/${oid}`).then((response) => {
            setOwnerList(
                ownerList.filter((val) => {
                    return val.oid != oid;
                })
            );
        });
    };

    return (
        <div className="App">
            <div className="information">
                <label>Name:</label>
                <input
                    type="text"
                    onChange={(event) => {
                        setOName(event.target.value);
                    }}
                />
                <label>Business Role:</label>
                <input
                    type="text"
                    onChange={(event) => {
                        setBusiness_role(event.target.value);
                    }}
                />
                <label>Owners Address:</label>
                <input
                    type="text"
                    onChange={(event) => {
                        setOwner_address(event.target.value);
                    }}
                />

                <button onClick={addOwner}>Add an Owner</button>
            </div>
            <div className="owners">
                <button onClick={getOwner}>Show all Owners</button>

                {ownerList.map((val, key) => {
                    return (
                        <div className="owner">
                            <div>
                                <h3>Name: {val.oname}</h3>
                                <h3>Business Role: {val.business_role}</h3>
                                <h3>Owners Address: {val.owner_address}</h3>
                            </div>
                            <div>

                                <button
                                    onClick={() => {
                                        deleteOwner(val.oid);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;