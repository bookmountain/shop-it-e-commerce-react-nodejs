import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../actions/productActions";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import { Link } from "react-router-dom";
import { allUsers, deleteUser } from "../../actions/userActions";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import Loader from "../layout/Loader";
import { MDBDataTable } from "mdbreact";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UserList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(allUsers());

    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }

    if (isDeleted) {
      alert.success("Product deleted successfully ");
      history.push("/admin/users");
      dispatch({
        type: DELETE_USER_RESET,
      });
    }
  }, [dispatch, alert, error, isDeleted]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "User ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        actions: (
          <>
            <Link
              to={`/admin/user/${user._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil" />
            </Link>
            <button
              className="btn btn-danger py-1 px-2 mx-2 "
              onClick={() => deleteOrderHandler(user._id)}
            >
              <i className="fa fa-trash" />
            </button>
          </>
        ),
      });
    });

    return data;
  };
  return (
    <>
      <div className="row">
        <MetaData title="All Users" />
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <h1 className="my-5">All Users</h1>
          {loading ? (
            <Loader />
          ) : (
            <>
              <MDBDataTable
                data={setUsers()}
                className="px-3"
                bordered
                striped
                hover
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserList;
