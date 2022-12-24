import resize from "./../resize";

it("expect myFunc(5) to equal 25", async () => {
  await resize("./../output.jpg", 300, 300).then((data) =>
    expect(data).toEqual({
      format: "jpeg",
      width: 300,
      height: 300,
      channels: 3,
      premultiplied: false,
    })
  );
});
