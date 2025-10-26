import { SquarePen, Trash } from "lucide-react";
import DeleteConfirmationModal from "./DeleteConfirmationModal.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast}  from 'react-toastify';
import axios from 'axios';

// id
const CardNote = ({ title, description, date, id, onDelete }) => {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const deleteNote= async()=>{
    try {
      //Eliminando la nota de la BD
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/notes/${id}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Error al eliminar la nota');
        }
        toast.success('Nota eliminada correctamente', {
            position: 'bottom-right',
            autoClose: 3000,
            theme: 'colored',
          });
        

        //Eliminamos la nota desde el frontend desde la UI
        if (onDelete)  onDelete(id);
        
        //Cerrar el modal
        setShowConfirmModal(false);

        //Refrescar la página después de eliminar
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      toast.error('Error al eliminar la nota', {
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'colored',
      });
    }
  };

  return (
    <>
      <div className="card bg-base-300 w-full shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-accent font-bold lg:text-2xl">
            {title}
          </h2>
          <p className="text-amber-50">{description}</p>
          <div className="flex justify-between items-center mt-6">
            <time dateTime={date}>{date}</time>
            <div className="flex gap-4">
              <SquarePen
                className="text-white cursor-pointer"
                onClick={() => navigate(`/editNote/${id}`)}
              ></SquarePen>
              <Trash
                className="text-red-400 cursor-pointer"
                onClick={() => setShowConfirmModal(true)}
              ></Trash>
            </div>
          </div>
        </div>
      </div>
      {showConfirmModal && (
        <DeleteConfirmationModal
         title={title}
          deleteNote={deleteNote}
          setShowConfirmModal={setShowConfirmModal}
        />
      )}
    </>
  );
};
export default CardNote;
