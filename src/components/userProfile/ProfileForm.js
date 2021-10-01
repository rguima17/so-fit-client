function ProfileForm(props) {

  return (
    <form className="" onSubmit={props.handleSubmit}>

      <div className="">
        <label className="">
          <span className="">Name: </span>
          <input
            type="text"
            className=""
            name="name"
            placeholder="Change your Name"
            value={props.profile.name}
            onChange={props.handleChange}
            required
          />
        </label>
      </div>

      <div className="">
        <label className="">
          <span className="">Description: </span>
          <input
            type="text"
            className=""
            name="description"
            placeholder="Change your Description"
            value={props.profile.description}
            onChange={props.handleChange}
            required
          />
        </label>
      </div>

      <div className="">
        <label className="">
          <span className="">Picture: </span>
          <input
            type="text"
            className=""
            name="description"
            placeholder="Change your picture"
            value={props.profile.pictureUrl}
            onChange={props.handleChange}
            
          />
        </label>
      </div>
      <div className="">
        <button className="">
          <h3>Update</h3>
        </button>
      </div>
    </form>
  );
}


export default ProfileForm;
