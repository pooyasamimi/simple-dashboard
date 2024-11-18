import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import style from "../style.module.css";
import Swal from "sweetalert2";
import { jpAxios } from "../../utils/JpAxios";
import Title from "../Title";

const AddUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    address: {
      city: "",
      street: "",
      suite: "",
      zipcode: "",
    },
  });

  useEffect(() => {
    if (id) {
      jpAxios.get(`/users/${id}`).then((res) =>
        setData({
          name: res.data.name,
          username: res.data.username,
          email: res.data.email,
          address: {
            city: res.data.address.city,
            street: res.data.address.street,
            suite: res.data.address.suite,
            zipcode: res.data.address.zipcode,
          },
        })
      );
    }
  }, []);

  function handleAddUser(event) {
    event.preventDefault();
    if (!id) {
      console.log(data);

      jpAxios
        .post("/users", data)
        .then((res) => {
          console.log(res);

          if (res.status === 201) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
            setData({
              name: "",
              username: "",
              email: "",
              address: {
                city: "",
                street: "",
                suite: "",
                zipcode: "",
              },
            });
          }
        })
        .catch((err) => alert(err));
    } else {
      jpAxios.put(`/users/${id}`).then((res) => {
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
      <Title> Add User </Title>
      <h4 className="text-center text-primary">
        {id ? "ویرایش کاربر" : "افزودن کاربر"}
      </h4>
      <div className="row justify-content-center mt-5 ">
        {(id && data.username) || !id ? (
          <form
            className="col-12 col-md-6 bg-light rounded shadow-lg p-3"
            onSubmit={handleAddUser}
          >
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                نام و نام خانوادگی
              </label>
              <input
                type="text"
                className="form-control"
                value={data.name}
                onChange={(event) =>
                  setData({ ...data, name: event.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                نام کاربری
              </label>
              <input
                type="text"
                className="form-control"
                value={data.username}
                onChange={(event) =>
                  setData({ ...data, username: event.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                ایمیل
              </label>
              <input
                type="email"
                className="form-control"
                value={data.email}
                onChange={(event) =>
                  setData({ ...data, email: event.target.value })
                }
              />
            </div>
            <div className="mb-3 row">
              <label htmlFor="exampleInputEmail1" className="form-label">
                آدرس
              </label>
              <div className="col-6 my-1">
                <input
                  type="text"
                  className="form-control"
                  placeholder="شهر"
                  value={data.address.city}
                  onChange={(event) =>
                    setData({
                      ...data,
                      address: { ...data.address, city: event.target.value },
                    })
                  }
                />
              </div>
              <div className="col-6 my-1">
                <input
                  type="text"
                  className="form-control"
                  placeholder="خیابان"
                  value={data.address.street}
                  onChange={(event) =>
                    setData({
                      ...data,
                      address: { ...data.address, street: event.target.value },
                    })
                  }
                />
              </div>
              <div className="col-6 my-1">
                <input
                  type="text"
                  className="form-control"
                  placeholder="ادامه آدرس"
                  value={data.address.suite}
                  onChange={(event) =>
                    setData({
                      ...data,
                      address: { ...data.address, suite: event.target.value },
                    })
                  }
                />
              </div>
              <div className="col-6 my-1">
                <input
                  type="text"
                  className="form-control"
                  placeholder="کد پستی"
                  value={data.address.zipcode}
                  onChange={(event) =>
                    setData({
                      ...data,
                      address: { ...data.address, zipcode: event.target.value },
                    })
                  }
                />
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
      {/* <Outlet/> */}
    </div>
  );
};

export default AddUser;
