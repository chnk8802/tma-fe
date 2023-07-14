import Pagination from 'react-bootstrap/Pagination';

function Paginationn() {
  return (
    <Pagination className='d-flex justify-content-center'>
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Item active>{2}</Pagination.Item>
      <Pagination.Ellipsis />
      <Pagination.Item >{4}</Pagination.Item>
      <Pagination.Next />
    </Pagination>
  );
}

export default Paginationn;