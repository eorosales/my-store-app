import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { client } from '../database';
import { UserStore } from '../models/user';

dotenv.config();
const store = new UserStore();

describe("User Model", () => {
  const user = {
    "firstName": "test",
    "lastName": "user", 
    "password": "password123"
  }

  it("should have index method", () => {
    expect(store.index).toBeDefined();
  })

  it("should have show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have create method", () => {
    expect(store.create).toBeDefined();
  })

  it("should have delete method", () => {
    expect(store.delete).toBeDefined();
  })

  it("creates method should add a new user", async () => {
    const newUser = await store.create(user);
    expect(newUser).toBeDefined();
  })

  it("craeted user's passwords should be encrypted", async () => {
    await store.create(user);
    const conn = await client.connect();
    const sql = 'SELECT * FROM users WHERE first_name=($1) AND last_name=($2)';
    const result = await conn.query(sql, ["test", "user"]);
    expect(result.rows[0].password_digest).not.toBe(user.password);
  })


  it("index method should return a list of users", async() => {
    const result = await store.index();
    expect(result).not.toBe([]);
  })

  it("show method should return the correct user", async () => {
    const showUser = await store.show("1");
    const conn = await client.connect();
    const sql = 'SELECT * FROM users WHERE id=($1)';
    const result = await conn.query(sql, [1]);
    conn.release();
    expect(showUser).toEqual(result.rows[0]);
  })

  it("authenticate method should generate token", async () => {
    const u = await store.authenticate(user.firstName, user.lastName, user.password);
    const token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
    expect(token).toBeDefined();
  })

  it("delete method should delete the correct user", async () => {
    const deletedUser = await store.delete("1");
    const indexUsers = await store.index();
    expect(indexUsers).not.toContain(deletedUser)
  })

  // DB teardown 
  afterAll(async() => {
    const conn = await client.connect();
    const sql = 'DELETE FROM users; ALTER SEQUENCE users_id_seq RESTART with 1';
    await conn.query(sql);
    conn.release();
  })
})