import React, { SyntheticEvent } from "react";
import { useState, useEffect } from "react";
import { validateAccessToken, getMembers } from "../Token";

interface IState {
  _id?: number;
  Name?: string;
  Email?: string;
  Address?: string;
  Birthdate?: Date;
  Entrancedate?: Date;
}

function Edit() {
  const [_id, setID] = useState<any>("");
  const [Name, setName] = useState<any>("");
  const [Email, setEmail] = useState<any>("");
  const [Address, setAddress] = useState<any>("");
  const [Birthdate, setBirthdate] = useState<any>("");
  const [Entrancedate, setEntrance] = useState<any>("");
  const [token, setToken] = useState<string>("");
  const [error, setError] = useState({ status: false, message: "" });
  const [members, setMembers] = useState<IState[]>([]);

  useEffect(() => {
    getMembers().then(async (res) => {
      const content = await res.json();
      setMembers(content.members);
    });

  const localStorageToken = JSON.parse(localStorage.getItem("token")!);
  if (localStorageToken) {
    validateAccessToken(localStorageToken)
      .then((res) => {
        if (res.status === 200) {
          setToken(localStorageToken);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  }, []);

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
        setError({
          status:true,
          message:"Member Deleted Successfully"
        })
        getMembers().then(async (res) => {
          const content = await res.json();
          setMembers(content.members);
        });
      });
    });
  };

  const selectMember = (_id: any) => {
    let member = members.find((x) => x._id === _id);
    setID(member?._id);
    setName(member?.Name);
    setEmail(member?.Email);
    setAddress(member?.Address);
    setBirthdate(member?.Birthdate);
    setEntrance(member?.Entrancedate);
  };
const updateUser = ()=>{

  console.log(Name,Address);
  fetch("http://localhost:1337/members/updateMember", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _id,
      Name,
      Email,
      Address,
      Birthdate,
      Entrancedate,
    }),
  })
    .then((res) => {
      if (res.status === 201)
        setError({
          status: true,
          message: "Member Updated Successfully",
        });
    })
    .catch((err) => {
      if (err.status === 500)
        setError({
          status: true,
          message: "Not successfull. Please try again",
        });
    });;
}

  return (
    <div>
      {error.status ? <h1 color="black">{error.message}</h1> : ""}
      {token ? (
        <div className="table ">
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
                    <button
                      className="w-100 btn btn-lg btn-secondary"
                      onClick={() => selectMember(member._id)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>
            <form>
              <h1 className="h3 mb-3 fw-normal">Update</h1>

              <div>
                <input
                  type="text"
                  value={Name}
                  className="form-control"
                  placeholder="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  type="email"
                  value={Email}
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  type="text"
                  value={Address}
                  className="form-control"
                  placeholder="Address"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  type="date"
                  value={Birthdate}
                  className="form-control"
                  placeholder="Birthdate"
                  onChange={(e) => {
                    setBirthdate(e.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  type="date"
                  value={Entrancedate}
                  className="form-control"
                  placeholder="Entrancedate"
                  onChange={(e) => {
                    setEntrance(e.target.value);
                  }}
                />
                <button
                  className="w-100 btn btn-sml btn-primary"
                  onClick={updateUser}
                >
                  Update Member
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="Error-message">Not Logged in</div>
      )}
    </div>
  );
}

export default Edit;
