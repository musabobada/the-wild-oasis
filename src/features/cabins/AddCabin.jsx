import CreateCabinForm from "./CreateCabinForm";
import Button from '../../ui/Button';
import Modal from "../../ui/Modal";

export default function AddCabin() {
  return (<Modal>
    <Modal.Open opens="cabin-form">
      <Button>Add New Cabin</Button>
    </Modal.Open>
    <Modal.Window name="cabin-form">
      <CreateCabinForm />
    </Modal.Window>
  </Modal>
  );
}