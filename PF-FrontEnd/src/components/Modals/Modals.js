import Modal from "./Modal";

const Modals = () => {
    const [isOpenModal1, openModal1, closeModal1] = useModal(false);
    const [isOpenModal2, openModal2, closeModal2] = useModal(false);


    return (
        <div>
            <h2>Modales</h2>
            <button onClick={openModal1}>Modal 1</button>
            <Modal isOpen={isOpenModal1} close={closeModal1}>
                <h3>Modal 1</h3>
                <p> Hola. Este es el contenido de mi modal 1. </p>    
            </Modal>
            <button onClick={openModal2}>Modal2</button>
            <Modal isOpen={isOpenModal2} close={closeModal2}>
                <h3>Modal 2</h3>
                <p>Este es el modal 2 con su contenido.</p>
            </Modal>
        </div>
    )
}