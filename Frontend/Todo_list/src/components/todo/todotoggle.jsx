import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Todotoggle({ onAddTask, editingTask, onUpdateTask }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setBody(editingTask.body || "");
    }
  }, [editingTask]);

  const handleSave = () => {
    if (!title.trim() || !body.trim()) {
      toast.error("Both title and body are required");
      return;
    }

    if (editingTask) {
      onUpdateTask(editingTask._id, { title, body });
      toast.success("Task updated successfully");
    } else {
      onAddTask({ title, body });
      toast.success("Task added successfully");
    }

    setTitle("");
    setBody("");
  };

  return (
    <>

      {/* Addition button */}
      <div className="modal fade" id="addModal" tabIndex="-1">
      
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addModalLabel">
              {"Add To-Do"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setTitle("");
                setBody("");
              }}
            ></button>
          </div>
          <div className="modal-body gap-1">
            <textarea
              className="form-control"
              placeholder="Enter the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>
            <br />
            <textarea
              className="form-control"
              placeholder="Enter the body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>
          <div className="modal-footer d-flex ">
            <button
              type="button"
              className="btn btn-secondary w-auto"
              data-bs-dismiss="modal"
              onClick={() => {
                setTitle("");
                setBody("");
              }}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary w-auto"
              data-bs-dismiss="modal"
              onClick={handleSave}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Edit button */}
    <div className="modal fade" id="editModal" tabIndex="-1">
     
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editModalLabel">
              { "Edit To-Do" }
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setTitle("");
                setBody("");
              }}
            ></button>
          </div>
          <div className="modal-body gap-1">
            <textarea
              className="form-control"
              placeholder="Enter the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>
            <br />
            <textarea
              className="form-control"
              placeholder="Enter the to-do"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>
          <div className="modal-footer d-flex ">
            <button
              type="button"
              className="btn btn-secondary w-auto"
              data-bs-dismiss="modal"
              onClick={() => {
                setTitle("");
                setBody("");
              }}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-success w-auto"
              data-bs-dismiss="modal"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    </>

    
  );
}

Todotoggle.propTypes = {
  onAddTask: PropTypes.func.isRequired,
  editingTask: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
  }),
  onUpdateTask: PropTypes.func.isRequired,
};
