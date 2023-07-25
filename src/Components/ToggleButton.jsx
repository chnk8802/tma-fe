import Form from 'react-bootstrap/Form';

function ToggleCheckButton() {
  return (
    <Form>
      <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
      />
    </Form>
  );
}

export default ToggleCheckButton;