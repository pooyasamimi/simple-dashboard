import React from "react";
import style from "../style.module.css";
import { Link } from "react-router-dom";
import { jpAxios } from "../../utils/JpAxios";
import { Alert, Confirm } from "../../utils/Alerts";
import Swal from "sweetalert2";
import Search from "../../Hoc/Search";
import Title from "../Title";

const Posts = (props) => {
  let { handleSearch, mainDatas, setMainDatas, text } = props;

  async function handleDelete(id) {
    await Confirm(
      `Are you sure to delete user ${id} ?`,
      "You won't be able to revert this!",
      "warning",
      "Yes, delete it!"
    ).then((res) => {
      if (res.isConfirmed) {
        jpAxios
          .delete(`/posts/${id}`)
          .then((res) => {
            if (res.status === 200) {
              let newPosts = mainDatas.filter((user) => user.id !== id);
              setMainDatas(newPosts);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err,
            });
          });
      } else {
        Alert("..! The user was not deleted");
      }
    });
  }
  return (
    <div className={`${style.item_content} mt-5 p-4 container-fluid`}>
      <Title> Posts </Title>

      <h4 className="text-center">مدیریت پست ها</h4>
      <div className="row my-2 mb-4 justify-content-between w-100 mx-0">
        <div className="form-group col-10 col-md-6 col-lg-4">
          <input
            type="text"
            className="form-control shadow"
            placeholder="جستجو از بین عنوان ها"
            onChange={handleSearch}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
        <div className="col-2 text-start px-0">
          <Link to={"/post/add"}>
            <button className="btn btn-success">
              <i className="fas fa-plus text-light"></i>
            </button>
          </Link>
        </div>
      </div>
      {mainDatas.length ? (
        <table className="table bg-light shadow">
          <thead>
            <tr>
              <th>#</th>
              <th>آیدی کاربر</th>
              <th>عنوان</th>
              <th>بدنه</th>
            </tr>
          </thead>
          <tbody>
            {mainDatas.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.userId}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>
                  <Link to={`/post/add/${post.id}`}>
                    <i className="fas fa-edit text-warning mx-2 pointer"></i>
                  </Link>
                  <i
                    className="fas fa-trash text-danger mx-2 pointer"
                    onClick={() => handleDelete(post.id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>{text}</h2>
      )}
    </div>
  );
};

export default Search(Posts, "posts", "title");
