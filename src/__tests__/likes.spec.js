const request = require("supertest");
const { uuid } = require("uuidv4");
const app = require("../app");

describe("Likes", () => {
  it("should be able to give a like to the repository", async () => {
    const repository = await request(app)
      .post("/repositories")
      .send({
        id: uuid(),
        title: "Hair Shop",
        url: "https://github.com/leopacciulli/Hair-Shop",
        techs: ["ReactJS"],
        likes: 0
      });

    let response = await request(app).post(
      `/repositories/${repository.body.id}/like`
    );
    
    expect(response.body).toMatchObject({
      likes: 1
    });

    response = await request(app).post(
      `/repositories/${repository.body.id}/like`
    );

    expect(response.body).toMatchObject({
      likes: 2
    });
  });

  it("should not be able to like a repository that does not exist", async () => {
    await request(app)
      .post(`/repositories/123/like`)
      .expect(400);
  });
});
