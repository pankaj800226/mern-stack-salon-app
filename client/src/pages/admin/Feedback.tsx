import { useState } from "react";
import SidebarNavbar from "../../components/SidebarNavbar";
import axios from "axios";
import { toast } from "react-toastify";

const Feedback = () => {
  const [feedback, setFeedback] = useState<string>("");

  const handleFeedback = async () => {
    try {
      if (feedback !== "") {
        await axios.post("http://localhost:8000/feedback", { feedback });
        toast("🦄 succesfully!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast("🦄 Feild comment!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(`Failed to send feedback ${error}`);
    }
    setFeedback("");
  };
  return (
    <div className="dashboard_container">
      <SidebarNavbar />
      <main>
        <div className="feedback">
          <textarea
            name=""
            id=""
            placeholder="Please Send feedback"
            onChange={(e) => setFeedback(e.target.value)}
            value={feedback}
          ></textarea>
          <button onClick={handleFeedback}>Submit</button>
        </div>
      </main>
    </div>
  );
};

export default Feedback;
