import { getImageSources } from "@/common/helpers";

describe("test helpers functions", () => {
  it("test getImageSources", () => {
    const imageSrc = "/public/img/users/user.jpg";

    expect(getImageSources(imageSrc)).toEqual({
      webpSrcset:
        "/public/img/users/user.webp 1x, /public/img/users/user@2x.webp 2x, /public/img/users/user@4x.webp 4x",
      srcset:
        "/public/img/users/user@2x.jpg 2x, /public/img/users/user@4x.jpg 4x",
    });
  });
});
