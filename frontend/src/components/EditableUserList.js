import { useState } from "react";
import {
  Container,
  Row,
  Alert,
  Table,
  Spinner,
  Form,
  Button,
} from "react-bootstrap";
import RoleDropdown from "./RoleDropdown";
import { useGetQuery, usePatchQuery } from "../hooks/useRequest";

const EditableUserList = () => {
  const [alert, setAlert] = useState("");
  const [userId, setUserId] = useState(null);
  const [newData, setNewData] = useState({});
  const { data, isLoading, isError, execute } = useGetQuery(`/api/users/`, {
    useCache: false,
  });
  const { execute: executeEdit} = usePatchQuery(
    `/api/users/${userId}/`
  );
  const handleUpdate = (key, value) => {
    newData[key] = value;
    setNewData(newData);
  };

  const handleSave = () => {
    console.log(newData);
    executeEdit({
      data: newData,
    })
      .then((response) => {
        // refetch the data
        setAlert("");
        setUserId(null);
        execute();
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          // Handle Forbidden error
          setAlert(
            "Forbidden: You don't have permission to perform edt users."
          );
        } else {
          // Handle other errors
          console.log(error);
          setAlert("Edit user failed. Please try again.");
        }
      });
  };

  const enableEdit = (user_id, user_name) => {
    console.log(user_name);
    if (user_name === "adam"){
      setAlert("Editing Adam's role is disabled for demo purposes.")
      return;
    }
    execute();
    setUserId(user_id);
    setNewData({});
  };

  if (isLoading) return <Spinner variant="primary" />;

  if (isError) return <>ERROR</>;
  return (
    <>
      {alert && <Alert variant="danger">{alert}</Alert>}
      <Container className="mt-3 mb-4">
        <Row>
          <div className="bg-white p-4 shadow-sm">
            <Table className="table mb-0">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Roles</th>
                  <th>Active</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td className="text-center">
                      <div className="d-inline-block">
                        <RoleDropdown
                          selected_id={user.group_names[0].id}
                          user_id={user.id}
                          handleUpdate={handleUpdate}
                          disabled={userId === user.id}
                        />
                      </div>
                    </td>
                    <td>
                      <Form.Check
                        type="switch"
                        defaultChecked={user.is_active}
                        disabled={userId === user.id ? "" : "disabled"}
                        onChange={() =>
                          handleUpdate("is_active", !user.is_active)
                        }
                      />
                    </td>
                    <td>
                      {userId === user.id ? (
                        <Button variant="primary" onClick={() => handleSave()}>
                          Save
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          onClick={() => enableEdit(user.id, user.username)}
                        >
                          Edit
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default EditableUserList;
