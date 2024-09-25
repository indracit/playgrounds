import { getToken,onMessage  } from "firebase/messaging";
import { messaging } from "../../firebase/firebaseconfig";
import { useEffect,useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Message from "./Message";
import {vapidKey} from '../../assets/config.json'
import "react-toastify/dist/ReactToastify.css";
import './notification.css';

const Firebase = () => {
const [token,setToken] = useState('');
const [notification,setNotification] = useState(false);
  
  async function requestPermission() {
    
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      try {
      const token = await getToken(messaging, {
        vapidKey
      });

      setToken(token);
      setNotification(true)
      //We can send token to server
      console.log("Token generated : ", token);
    } catch(e){
      console.log(e);
    }
    } else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification");
    }
  }

  useEffect(() => {
      if(notification)  fetch('http://localhost:3000/notification');
    requestPermission();
    
    const onMessageListener = onMessage(messaging, (payload) => {
      console.log(payload);
      toast(<Message notification={payload.notification} />);
    });

    return () => {
      // Cleanup listener on component unmount
      onMessageListener();
      
      
    };
  }, [token]);

 

  return (
    <div> 
      <h1>notification page</h1>
      <p>{token}</p>
      <ToastContainer />
    </div>
  )
}

export default Firebase