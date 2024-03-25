import { Container, Row, Button, Table, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetQuery } from "../hooks/useRequest";
import { setUser } from "../lib/auth";

const UserList = () => {
  const { data, isLoading, isError} = useGetQuery(`/api/users/`, {
    useCache: false,
  });
  const handleLogin = (username) => {
    setUser(username);
  };
  if (isLoading) return <Spinner variant="primary" />;

  if (isError) return <h3>ERROR. Please reload.</h3>;
  return (
    <Container className="mt-3 mb-4">
      <Row>
        <div className="bg-white p-4 shadow-sm">
          <Table className="table mb-0">
            <thead>
              <tr>
                <th>Username</th>
                <th>Roles</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>
                    {user.group_names[0].name}
                  </td>
                  <td>
                    <Link to={user.groups.includes(1) ? "/admin" : "/paints"}>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleLogin(user.username)}
                      >
                        Login
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Row>
    </Container>
  );
};

export default UserList;
