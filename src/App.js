import logo from "./logo.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const endpoint = "https://6682af384102471fa4c7d2e6.mockapi.io/pelanggan";
  const [pelanggan, setPelanggan] = useState([]);
  const [detailPelanggan, setDetailPelanggan] = useState({});
  const [id, setId] = useState({});
  const [nama, setNama] = useState("");
  const [jk, setJk] = useState(true);
  const [alamat, setAlamat] = useState("");

  useEffect(() => {
    getPelangganData();
  }, []);
  return (
    <div className="container">
      <h1 className="text-center">React BS</h1>
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label>Nama</label>
            <input
              type="text"
              className="form-control"
              value={detailPelanggan.nama_pelanggan}
              onChange={(e) => {
                setNama(e.target.value);
              }}
              placeholder="masukan nama"
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label>Jenis Kelamin</label>
            <br></br>
            <input
              type="radio"
              id="pria"
              onClick={(e) => {
                setJk(e.target.value);
              }}
              name="jenis_kelamin"
              value={true}
            />
            Pria
            <input
              type="radio"
              id="wanita"
              onClick={(e) => {
                setJk(e.target.value);
              }}
              name="jenis_kelamin"
              value={false}
            />{" "}
            Wanita
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label>Alamat</label>
            <textarea
              className="form-control"
              placeholder="masukan alamat anda"
              onChange={(e) => {
                setAlamat(e.target.value);
              }}
              cols={21}
              rows={15}
              value={detailPelanggan.alamat}
            />
          </div>
        </div>
        <div className="col-md-12">
          <br></br>
          <button className="btn btn-warning" onClick={updatePelanggan}>
            Update
          </button>
          &nbsp;
          <button className="btn btn-success" onClick={insertPelanggan}>
            Submit
          </button>
        </div>
      </div>
      <div>
        <br></br>
        <table className="table" style={{ width: "100%" }} border={1}>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Jenis Kelamin</th>
              <th>Alamat</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
            {pelanggan.map((e) => (
              <tr>
                <td>{e.nama_pelanggan}</td>
                <td>{e.jenis_kelamin}</td>
                <td>{e.alamat}</td>
                <td>
                  <a
                    href="#"
                    className="btn btn-warning"
                    onClick={() => {
                      setDetailPelanggan(e);
                      setId(e.id);
                    }}
                  >
                    Update
                  </a>
                  ||{" "}
                  <a href="#" className="btn btn-danger" onClick={() => deletePelanggan(e.id)}>
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  async function getPelangganData() {
    try {
      const response = await axios.get(endpoint);
      const data = response.data;
      setPelanggan(data);
    } catch (error) {}
  }
  async function insertPelanggan() {
    try {
      let dt = {
        nama_pelanggan: nama,
        alamat: alamat,
        type: 0,
        jenis_kelamin: jk,
      };
      const response = await axios.post(endpoint, dt);
      const sp = response.data;
      getPelangganData();
    } catch (error) {
      console.log(error);
    }
  }
  async function updatePelanggan() {
    try {
      let dt = {
        nama_pelanggan: nama,
        alamat: alamat,
        type: 0,
        jenis_kelamin: jk,
      };
      const response = await axios.update(`${endpoint}/${id}`, dt);
      const sp = response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async function deletePelanggan(id) {
    try {
      const response = await axios.delete(`${endpoint}/${id}`);
      const sp = response.data;
      getPelangganData();
    } catch (error) {
      console.log(error);
    }
  }
}

export default App;
