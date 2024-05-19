import UploadWidget from "../../components/uploadWidget/UploadWidget";
import "./profileUpdatePage.scss";
import useUserUpdate from "./profileUpdatePageHelper";

export default function ProfileUpdatePage() {
  const { handleSubmit, changeAvatar, currentUser, error, avatar } =
    useUserUpdate();
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser?.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser?.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>error</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar || "/noavatar.jpg"} alt="avatar" className="avatar" />
        <UploadWidget
          uwConfig={{
            cloudName: "dej3mkafm",
            uploadPreset: "estate",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          changeAvatar={changeAvatar}
        />
      </div>
    </div>
  );
}
