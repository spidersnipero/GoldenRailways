import { useEffect,useState } from "react";

export default function UserProfile(){
    const [profile, setProfile] = useState({});
    const [edit,setEdit] = useState(false);
    const [name,setName] = useState(profile.name);
    const [password,setPassword] = useState(localStorage.getItem("passcode"));
    const [age,setAge]  = useState(profile.age);
    const [phoneno,setPhoneno]  = useState(profile.phoneno);
    const [address,setAddress]  = useState(profile.address);
    const [error,setError] = useState("");


    function handleName(e){
        setName(e.target.value);
    }
    function handlePassword(e){
        setPassword(e.target.value);
    }
    function handleAge(e){
        setAge(e.target.value);
    }
    function handlePhoneno(e){
        setPhoneno(e.target.value);
    }

    function handleAddress(e){
        setAddress(e.target.value);
    }
    function handleEdit(){
        setEdit(true);
    }

    function validateForm() {
        if(name.length === 0){
            setError("Name is required");
            return false;
        }
        if(password.length === 0 ){
            setError("Password is required");
            return false;
        }
        if(password.length < 6){
            setError("Password must be atleast 6 characters");
            return false;
        }
        
        if(age <= 0 ){
            setError("Age is required");
            return false;
        }
        if(phoneno.length === 0 && phoneno.length < 10){
            setError("Phone Number is required");
            return false;
        }
        if(address.length === 0){
            setError("Address is required");
            return false;
        }
        return true;
    }

    useEffect(() => {
        const data = {email:localStorage.getItem("email"),password:localStorage.getItem("passcode")}
        console.log(data);
        const fetchData = async () => {
            const response = await fetch('http://localhost:8000/userlogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const res = await response.json();
            console.log(res);
            setProfile(res);
            setName(res.name);
            setAge(res.age);
            setPhoneno(res.phoneno);
            setAddress(res.address);
            setPassword(res.passcode);
        }
        if(true){
            fetchData();
        }
        
    }, []);

    function handleUpdate(){
        const data = {
            name,
            age,
            phoneno,
            address,
            email:profile.email,
            password
        }
        console.log(data);
        fetch("http://localhost:8000/updateprofile",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            setProfile(data);
            setEdit(false);
        })

    }

    return(
        <>        
        <form className="container">
            <div className="d-flex mt-3">
            <h4>Name</h4>
            {!edit && <input type="text" readonly className="ms-2 form-control-plaintext"  value={profile.name}/>}
            {edit && <input type="text"  className="ms-2 form-control-plaintext" placeholder="enter name" defaultValue={profile.name} onChange={handleName} />}
            </div>
            <div className="d-flex mt-3">
            <h4>Password</h4>
            {!edit && <input type="text" readonly className="ms-2 form-control-plaintext"  value={profile.passcode}/>}
            {edit && <input type="text"  className="ms-2 form-control-plaintext" placeholder="enter name" defaultValue={profile.passcode} onChange={handlePassword} />}
            </div>
            <div className="d-flex mt-3">
            <h4>Age</h4>
            {!edit && <input type="number" readonly className="ms-2 form-control-plaintext"  value={profile.age}/>}
            {edit && <input type="number"  className="ms-2 form-control-plaintext" placeholder="enter name" defaultValue={profile.age} onChange={handleAge} />}
            </div>
            <div className="d-flex mt-3">
            <h4>Address</h4>
            {!edit &&   <textarea type="text" readonly className="ms-2 form-control-plaintext"  value={profile.address}/>}
            {edit &&    <textarea type="text"  className="ms-2 form-control-plaintext" placeholder="enter name" defaultValue={profile.address} onChange={handleAddress} />}
            </div>
            <div className="d-flex mt-3">
            <h4>Phone number</h4>
            {!edit && <input type="text" readonly className="ms-2 form-control-plaintext"  value={profile.phoneno}/>}
            {edit && <input type="text"  className="ms-2 form-control-plaintext" placeholder="enter name" defaultValue={profile.phoneno} onChange={handlePhoneno} />}
            </div>
            

        </form>
        <div className="container" >
            <button className="btn btn-danger m-2" onClick={()=>setEdit(true)}>Edit</button>
            {edit && <button className="btn btn-success m-2" onClick={handleUpdate}>submit</button>}
        </div>
        <div className="container">
            {error !="" && <h3 className="text-center mt-5">{error}</h3>}
        </div>
        </>
    )
}