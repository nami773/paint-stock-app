import Form from "react-bootstrap/Form";

function RoleDropdown({ selected_id, user_id, handleUpdate, disabled }) {
  return (
    <Form.Select
      aria-label="Select Role"
      defaultValue={selected_id}
      onChange={(e) => handleUpdate("groups", [e.target.value])}
      disabled={disabled ? "" : "disabled"}
    >
      <option value="1" >Admin</option>
      <option value="2">Inventory Manager</option>
      <option value="3">Painter</option>
      <option value="4">Read Only</option>
    </Form.Select>
  );
}

export default RoleDropdown;
