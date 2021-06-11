import type { Request, Response } from "express"
import { post, del, put, get } from "../src/routes/players"

const request = require("supertest")
const app = require("../src/routes/players/index")

const getMockResponse = () => {
  return {
    data: [],
    writeHead : function(status, header) {},
    end: function(body) {
      this.data.push(body);
    }
  }
}
describe("the `players` endpoint", () => {
    it("exports a `post` function, checks `post` function if it adds to the list and if `get` gives the updated list", () => {
        expect(post).toBeDefined()
        let req = {body: JSON.stringify({id:0})}
        let res = getMockResponse()
      post(req as Request, res as unknown as Response);
        res = getMockResponse()
      get(req as Request, res as unknown as Response)
      expect(JSON.parse(res.data[0]).length).toEqual(6)
    })
    it("exports a `delete` function", () => {
      expect(del).toBeDefined()
    })
    it("exports a `put` function", () => {
      expect(put).toBeDefined()
    })
    it("exports a `get` function", () => {
      expect(get).toBeDefined()
    })
    // Add more tests here (e.g. 'returns 200 on success or 500 for invalid requests')
})