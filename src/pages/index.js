import Head from "next/head";
import React, { useEffect, useState } from 'react'
import Add from '../pages/add.js';
import Card from '../pages/cards.js';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import Image from "next/image.js";
import githubImage from "../../public/github.svg";
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const api = "https://jsonplaceholder.typicode.com";
  const [apiData, getApiData] = useState([]);
  const [addData, setAddData] = useState({ title: "", description: "" });
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await axios.get(api + "/posts");
      getApiData(response.data);
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }

  const handleDelete = async (id) => {
    try {
      const responseApi = await axios.delete(api + `/posts/${id}`);
      if (responseApi.status === 200) {
        const filterCard = apiData.filter((currentItem) => currentItem.id !== id);
        getApiData(filterCard);
        toast.success('Successfully deleted!');
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAddData({ ...addData, [name]: value.toLowerCase().trim() }); //[name]:value update dynamic value 
  }

  const handleAdd = async (event) => {
    event.preventDefault();
    try {
      const object = {
        body: addData.description,
        id: "",
        title: addData.title,
        userId: Date.now()
      }
      const response = await axios.post(api + "/posts", object);
      toast.success('Successfully created!');
      getApiData([...apiData, response.data]); //response one object copying in apidata and syntax create new array
      setAddData({ title: "", description: "" });
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }

  const handleEditItem = (item) => {
    setSelectedItem(item); // Create a shallow copy
    setAddData({ title: item.title, description: item.body });
  }

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const object = {
        body: addData.description,
        id: selectedItem.id,
        title: addData.title,
        userId: selectedItem.userId
      }
      await axios.put(api + `/posts/${selectedItem.id}`, { object });
      const updatedApiData = apiData.map((item) =>
        item.id === selectedItem.id ? { ...item, title: addData.title, body: addData.description } : item
      );
      toast.success('Successfully Updated!');
      getApiData(updatedApiData); //response one object copying in apidata and syntax create new array
      setSelectedItem(null);
      setAddData({ title: "", description: "" });
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }

  return (
    <>
      <Head>
        <title>Axios + Curd + Project</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-secondary p-2">
        <header className='d-flex justify-content-center'>
          <a href="https://github.com/Nandakishore695/axios-curd-project">
            <Image src={githubImage} alt="gitHub Nandakishore695" width={70} className="float-right" />
          </a>
          <h1 className='text-white m-4'>Vite + React + Axios + Curd</h1>
        </header>
        <div className='container  text-center '>
          <Toaster position="top-center" reverseOrder={false} />
          <Add handleInputChange={handleInputChange} handleSubmit={handleAdd} isValue={addData} handleEditSubmit={handleEditSubmit} />
          <Card apiDataObjectProps={apiData} handleDelete={handleDelete} handleEditItem={handleEditItem} />
        </div>
      </main>
    </>
  );
}