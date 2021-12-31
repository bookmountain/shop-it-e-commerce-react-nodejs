import React, { useEffect } from "react";
import {
  getAdminProducts,
  clearErrors,
  deleteProduct,
} from "../../actions/productActions";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { MDBDataTable } from "mdbreact";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstant";

const ProductList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }

    if (deleteError) {
      alert.error(error);
      dispatch(clearErrors);
    }

    if (isDeleted) {
      alert.success("Product deleted successfully ");
      history.push("/admin/products");
      dispatch({
        type: DELETE_PRODUCT_RESET,
      });
    }
  }, [dispatch, alert, error, deleteError, isDeleted, history]);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
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
    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        stock: product.stock,
        actions: (
          <>
            <Link
              to={`/admin/product/${product._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil" />
            </Link>
            <button
              className="btn btn-danger py-1 px-2 mx-2"
              onClick={() => deleteProductHandler(product._id)}
            >
              <i className="fa fa-trash" />
            </button>
          </>
        ),
      });
    });

    return data;
  };

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <>
      <div className="row">
        <MetaData title="All Products" />
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <h1 className="my-5">All Products</h1>
          {loading ? (
            <Loader />
          ) : (
            <>
              <MDBDataTable
                data={setProducts()}
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

export default ProductList;
