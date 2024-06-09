import { Button, Modal, Table, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CgDanger } from "react-icons/cg";
import { GiCheckMark } from "react-icons/gi";
import { ImCross } from "react-icons/im";

function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setLoading(false);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);

      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-500 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {loading ? (
        <div className="flex justify-center items-center w-full min-h-screen">
          <Spinner size="xl" />
        </div>
      ) : currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>DATE Created</Table.HeadCell>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell> Delete</Table.HeadCell>
            </Table.Head>

            {users.map((user) => (
              <Table.Body className="divide-y" key={user._id}>
                <Table.Row>
                  <Table.Cell className="w-1/2">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>

                  <Table.Cell className="w-1/2">
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-full h-full object-cover bg-gray-500 rounded-3xl"
                    />
                  </Table.Cell>
                  <Table.Cell className="w-1/2">{user.username}</Table.Cell>
                  <Table.Cell className="w-1/2">{user.email}</Table.Cell>
                  <Table.Cell className="w-1/2">
                    {user.isAdmin ? <GiCheckMark /> : <ImCross />}
                  </Table.Cell>
                  <Table.Cell className="w-3/5">
                    <Button
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                      color="red"
                      outline
                    >
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <Button
              onClick={handleShowMore}
              className="w-full text-purple-100 self-center text-sm py-7"
            >
              Show more
            </Button>
          )}
        </>
      ) : (
        <p>There are no users available. You have no users yet.</p>
      )}
      {/* modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <CgDanger className="h-14 w-14 text-gray-950 mb-4 mx-auto" />
            <h3 className="mb-5 text-xl font-bold">
              Are you sure you want to delete this user?
            </h3>

            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color="success" onClick={() => setShowModal(false)}>
                No, keep it
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DashUsers;
