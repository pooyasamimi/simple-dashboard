// with useReducer

import React, { useEffect, useReducer } from "react";
import { useParams, useNavigate } from "react-router";
import style from "../style.module.css";
import Swal from "sweetalert2";
import { jpAxios } from "../../utils/JpAxios";
import Title from "../Title";
const init = {
  postData: {
    id: "",
    userId: "",
    title: "",
    body: "",
  },
  users: [],
};

const reduser = (state, action) => {
  switch (action.type) {
    case "changeUsers":
      return {
        ...state,
        users: action.payload,
      };
    case "isUpdate":
      return {
        ...state,
        postData: action.payload,
      };
    case "setInputValue":
      return {
        ...state,
        postData: { ...state.postData, [action.propName]: action.propValue },
      };

    default:
      return state;
      break;
  }
};

const AddPost2 = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, dispath] = useReducer(reduser, init);

  function setInputValues(event, propName) {
    dispath({
      type: "setInputValue",
      propName,
      propValue: event.target.value,
    });
  }

  useEffect(() => {
    jpAxios
      .get("/users")
      .then((res) =>
        dispath({
          type: "changeUsers",
          payload: res.data,
        })
      )
      .catch((err) => alert(err));

    if (id) {
      jpAxios.get(`/posts/${id}`).then((res) =>
        dispath({
          type: "isUpdate",
          payload: res.data,
        })
      );
    }
  }, []);

  function handleAddPost(event) {
    event.preventDefault();
    if (!id) {
      jpAxios
        .post("/posts", data.postData)
        .then((res) => {
          if (res.status === 201) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      jpAxios.put(`/posts/${id}`).then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  }

  return (
    <div className={`${style.item_content} mt-5 p-4 container-fluid container`}>
      <Title> Add Posts </Title>

      <h4 className="text-center text-primary">
        {id ? "ویرایش پست" : "افزودن پست"}
      </h4>
      <div className="row justify-content-center mt-5 ">
        {(id && data.postData.title) || !id ? (
          <form
            className="col-12 col-md-6 bg-light rounded shadow-lg p-3"
            onSubmit={handleAddPost}
          >
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                کاربر
              </label>
              <select
                name="user"
                value={data.postData.userId}
                onChange={(event) => setInputValues(event, "userId")}
                disabled={id}
              >
                <option value="">لطفا انتخاب کنید </option>
                {data.users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                آیدی
              </label>
              <input
                type="text"
                className="form-control"
                value={data.postData.userId}
                onChange={(event) => setInputValues(event, "userId")}
                disabled={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                عنوان
              </label>
              <input
                className="form-control"
                value={data.postData.title}
                onChange={(event) => setInputValues(event, "title")}
              />
            </div>
            <div className="mb-3 row">
              <label htmlFor="exampleInputEmail1" className="form-label">
                بدنه
              </label>
              <div className="my-1">
                <textarea
                  rows={5}
                  type="text"
                  className="form-control"
                  value={data.postData.body}
                  onChange={(event) => setInputValues(event, "body")}
                ></textarea>
              </div>
            </div>

            <div className="col-12 text-start">
              <button
                type="button"
                className="btn btn-danger ms-2"
                onClick={() => navigate(-1)}
              >
                بازگشت
              </button>
              <button type="submit" className="btn btn-primary">
                {id ? "ویرایش " : "افزودن "}
              </button>
            </div>
          </form>
        ) : (
          "لطفا صبر کنید"
        )}
      </div>
    </div>
  );
};

export default AddPost2;
