import { useEffect, useState } from "react";
import SidebarNavbar from "../components/SidebarNavbar";
import axios from "axios";
import { FaDeleteLeft } from "react-icons/fa6";
import { toast } from "react-toastify";
interface Feed {
  feedback: string;
  _id: string;
}
const Feedback = () => {
  const [feedback, setFeedback] = useState<Feed[]>([]);
  console.log(feedback);

  useEffect(() => {
    // Fetch data from the server
    const fetchApiData = async () => {
      try {
        const response = await axios.post("http://localhost:8000/feedbackData");
        setFeedback(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchApiData();
  }, [feedback]);

  // delete functionality

  const deleteHandler = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/feedbackDelete/${id}`);
      setFeedback((prevData) => prevData.filter((data) => data._id === id));
      toast("🦄  delete", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.log(error);
      toast("🦄  delete faild", {
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
  };

  return (
    <div>
      <div className="dashboard_container">
        <SidebarNavbar />
        <main>
          <div className="feedback_container">
            {feedback.length === 0 ? (
              <h1>Fedback Not Yet</h1>
            ) : (
              feedback.map((feedbackItem) => (
                <div className="feedback_item">
                  <p>{feedbackItem.feedback}</p>
                  <FaDeleteLeft
                    onClick={() => deleteHandler(feedbackItem._id)}
                  />
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Feedback;
