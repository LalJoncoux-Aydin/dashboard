var express = require('express');
const sqlpool = require("../db");
const sha512 = require('js-sha512');

function User() {
    this._username = undefined;
    this._password = undefined;
    this._is_connected = false;
    this._error_occured = false;
};


/* PRIVATE FUNCTION*/
User.prototype.create_user_db = async function() {
  let conn = await sqlpool.getConnection();
  const res = await conn.query("INSERT INTO accounts(username, password) value (?, ?)", [this._username, this._password]);
  if (res.affectedRows > 0 ) {
    this._is_connected = true;
  }
}

User.prototype.login_user_db = async function() {
  let conn = await sqlpool.getConnection();
  const res = await conn.query("SELECT * FROM accounts WHERE username LIKE ? AND password LIKE ?;", [this._username, this._password]);
  if (res.length > 0 ) {
    this._is_connected = true;
  } else {
    this._error_occured = true;
  }
}

User.prototype.delete_user_db = async function(user) {
    let conn = await sqlpool.getConnection();
    const res = await conn.query("DELETE FROM accounts WHERE username = ?", [user]);
    if (res.length <= 0 ) {
        this._error_occured = true;
    }
}

/* PUBLIC FUNCTION*/
User.prototype.create = async function(req, res) {
  // Validate request
  if (!req.body.username || !req.body.password) {
      res.status(400).send({
          message: "Content can not be empty!"
      });
  } else {
    this._username = req.body.username;
    this._password = sha512.sha512(req.body.password);
  }

  await this.create_user_db();
}

User.prototype.login = async function(req, res) {
  // Validate request
  if (!req.body.username || !req.body.password) {
      res.status(400).send({
          message: "Content can not be empty!"
      });
  } else {
    this._username = req.body.username;
    this._password = sha512.sha512(req.body.password);
  }

  await this.login_user_db();
}

User.prototype.change_username = async function(req, res) {
    // Validate request
    if (!req.body.username) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    } else {
        let password = this._password;
        await this.delete_user_db(this._username);
        this._username = req.body.username;
        this._password = password;
        console.log("before create user");
        await this.create_user_db();
        console.log("after create user");
    }
}

User.prototype.logout = function(req, res) {
    this._is_connected = false;
    this._username = undefined;
    this._password = undefined;
    console.log(this._is_connected);
    console.log(this._username);
    console.log(this._password);
}

module.exports = User;
