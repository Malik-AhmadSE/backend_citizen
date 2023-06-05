function UserDTO(user) {
    this._id = user._id;
    this.userName = user.userName;
    this.userEmail = user.userEmail;
}
  
module.exports = UserDTO;
  