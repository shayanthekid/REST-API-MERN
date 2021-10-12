import React, { SyntheticEvent } from "react";
import { useState, useEffect } from "react";
function Edit() {
  interface IState {
    Members: {
      _id?: number;
      Name?: string;
      Email?: string;
      Address?: string;
      Birthdate?: Date;
      Entrancedate?: Date;
    }[];
  }

  const [_id, setID] = useState("");
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [Birthdate, setBirthdate] = useState("");
  const [Entrancedate, setEntrance] = useState("");

  const [members, setMembers] = useState<IState["Members"]>([]);

  useEffect(() => {
    fetch("http://localhost:1337/members/getAllMembers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        // console.log(data);
        setMembers(data.members);
      });
    });
    // const content = await response.json();

    // console.log(content.members);
  }, []);
  console.log(members);
  const deleteMember = (_id: any) => {
    fetch("http://localhost:1337/members/deleteMember", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
      }),
    }).then((res) => {
      res.json().then((resp) => {
        console.warn(resp);
      });
    });
  };

  return (
    <div className="table table-dark">
      <h1>Edit Members</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Birthdate</th>
            <th>Entrancedate</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr>
              <td>{member._id}</td>
              <td>{member.Name}</td>
              <td>{member.Email}</td>
              <td>{member.Address}</td>
              <td>{member.Birthdate}</td>
              <td>{member.Entrancedate}</td>
              <td>
                <button
                  className="w-100 btn btn-lg btn-danger"
                  onClick={() => deleteMember(member._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Edit;
