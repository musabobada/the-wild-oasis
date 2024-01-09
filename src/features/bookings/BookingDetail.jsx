import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ConfirmDelete from '../../ui/ConfirmDelete';
import ButtonGroup from '../../ui/ButtonGroup';
import Heading from '../../ui/Heading';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/Button';
import Empty from '../../ui/Empty';
import Modal from '../../ui/Modal';
import Row from '../../ui/Row';
import Tag from '../../ui/Tag';

import ButtonText from '../../ui/ButtonText';
import { useBooking } from './useBooking';
import { useMoveBack } from '../../hooks/useMoveBack';
import BookingDataBox from './BookingDataBox';
import { useCheckout } from '../check-in-out/useCheckout';
import { useDeleteBooking } from './useDeleteBooking';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const moveBack = useMoveBack()
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout()
  const { deleteBooking, isDeleting } = useDeleteBooking()
  const { isLoading, booking, bookingId } = useBooking() || {}
  const { status } = booking || {}
  const statusToTagName = {
    "unconfirmed": 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource='booking' />;

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading type='h1'>Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />
      <ButtonGroup>
        {status === "unconfirmed" && <Button
          onClick={() => navigate(`/checkin/${bookingId}`)}
        >Check In</Button>}
        {status === 'checked-in' && (
          <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens={`delete-booking-${bookingId}`}>
            <Button variation='danger'>Delete booking</Button>
          </Modal.Open>
          <Modal.Window name={`delete-booking-${bookingId}`}>
            <ConfirmDelete
              resource='booking'
              disabled={isDeleting}
              onConfirm={() => { deleteBooking(bookingId, { onSettled: moveBack() }) }}
            />
          </Modal.Window>
        </Modal>

        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
