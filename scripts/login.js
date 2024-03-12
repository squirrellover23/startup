function display_error(errormsg) {
  console.log("error", errormsg);
  const error_box = document.querySelector("#error-msg");
  error_box.textContent = errormsg;
  error_box.classList.add("error-message");
  wait(10000).then(() => {
    error_box.classList.remove("error-message");
  });
}

function wait(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  let success = true;
  attempt_login(username, password, (err, pass) => {
    if (err) {
      display_error(err);
    }
    success = pass;
  });
  if (success) {
    // update current user
    // I don't know what to do once we are done with local store
    localStorage.setItem("currentuser", username);
  }
  return success;
}

function attempt_login(username, password, callback) {
  const user_info_raw = localStorage.getItem(username);
  if (!user_info_raw) {
    callback("Incorrect Username", false);
  } else {
    const userinfo = JSON.parse(user_info_raw);
    if (userinfo.password != password) {
      callback("Incorrect Password", false);
    } else {
      callback(null, true);
    }
  }
}

function try_new_account() {
  const username = document.getElementById("username").value;
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const password = document.getElementById("password").value;
  create_user([username, password, firstname, lastname], (err) => {
    display_error(err);
  });
}

function create_user(
  [username, password, firstname, lastname, email = "none"],
  err
) {
  // create user
  // key username
  // value json {}
  // {username: 'petersonwingate', password: '12344576', firstname: 'Peterson', lastname: 'Wingate', email: 'petersonwingate@gmail.com'}
  if (localStorage.getItem(username)) {
    err("Username already exists");
  }
  localStorage.setItem(
    username,
    JSON.stringify({
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      email: email,
    })
  );
}
