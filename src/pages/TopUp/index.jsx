import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import axios from "axios";
import {useParams} from "react-router-dom"
import LayoutInput from "../../components/LayoutInput";

const TopUp = () => {
  const [username, setUsername] = useState("Kuwan");

  const [namaBank, setNamaBank] = useState("");
  const [nomerRekening, setNomerRekening] = useState("");

  const [token, setToken] = useState("");

  const {harga,id} = useParams()

  const api = axios.create({
    baseURL: "https://tesmidtrans.marwanmaulana.repl.co/"
  });

  const buttonPayHandler = async () => {
    if(namaBank.length && nomerRekening.length >=0 ){

    const data = {
      name:username,
      order_id:id,
      total:harga,
    };

    console.log(data);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },

    };
    
    const response = await api.post("/process-transaction", data, config);
    console.log(response);

    setToken(response.data.token)
  }else{
    alert("Input Tidak Boleh Kosong")
  }
  };

  useEffect(() => {
    if (token) {
      window.snap.pay(token, {
        onSuccess: (result) => {
          console.log("Succes",result);
          setToken("");
        },
        onPending: (result) => {
          console.log("Pending",result);
          setToken("");
        },
        onError: (error) => {
          console.log(error);
          setToken("");
        },
        onClose: () => {
          console.log("Anda belum menyelesaikan pembayaran");
          setToken("");
        },
      });
    }
  }, [token]);

  useEffect(() => {
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");

    scriptTag.src = midtransUrl;

    const midtransClientKey = "SB-Mid-client-oiw0xy0oDNwna3EN";

    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);

    return () => document.body.removeChild(scriptTag);
  }, []);
  return (
    <form className="w-full max-w-lg px-5 py-10">
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Username
        </label>
        <input value={username} readOnly className="appearance-none block  w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="nama_bank" type="text"/>
      </div>

        <div className="flex flex-wrap w-full mb-2">
      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
          Bank
        </label>
        <div className="relative">
          <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
            <option>Gopay</option>
            <option>Dana</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
    </div>

      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nama_bank">
          Nama Bank
        </label>
        <input onChange={(e)=>setNamaBank(e.target.value)} value={namaBank} className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${namaBank.length <= 0 ?"border-red-500":"border-gray-300"}`} id="nama_bank" type="text" placeholder="Nama Bank"/>
        {namaBank.length <= 0 &&
        <p className="text-red-500 text-xs italic">Nama bank tidak boleh kosong!</p>}
      </div>
      <div className="w-full md:w-1/2 px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nomer_rekening">
         Nomer Rekening Bank
        </label>
        <input onChange={(e)=>setNomerRekening(e.target.value)} value={nomerRekening} className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white  ${nomerRekening.length <= 0 ?"border-red-500":"border-gray-300"}`} id="nomer_rekening" type="number" placeholder="Nomer Rekening"/>
        {namaBank.length <= 0 &&
        <p className="text-red-500 text-xs italic">Nomer rekening tidak boleh kosong!</p>}
      </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
          Total Yang Harus Di Bayar
        </label>
        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" value={`Rp.${harga}`} readOnly/>
      </div>
    </div>
  
      <div className="flex justify-end w-full">
      <Button handler={buttonPayHandler}>Bayar</Button>
      </div>
  </form>
  );
};

export default TopUp;
