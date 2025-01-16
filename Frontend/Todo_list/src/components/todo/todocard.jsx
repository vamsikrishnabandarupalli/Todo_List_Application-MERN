import PropTypes from 'prop-types';

export default function TodoCard({ id, title,body, onDelete, onEdit }) {
  return (
    <div className="col-md-4 mb-4 todo-body">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{body}</p>
          <div className="d-flex justify-content-between">
            <button data-bs-toggle="modal" data-bs-target="#editModal"
              className="btn btn-warning btn-sm w-auto"
              onClick={() => onEdit(id, title,body)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm w-auto"
              onClick={() => onDelete(id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

TodoCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body:PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

